import express from "express";
import cors from "cors";
import mysql from "mysql2";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Load environment variables from a .env file
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MySQL Database using a connection pool for better handling of multiple requests
const db = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root", // Default MySQL username for XAMPP
  password: process.env.DB_PASSWORD || "", // Default password (leave empty for XAMPP)
  database: process.env.DB_NAME || "ebuy", // Name of your database
  waitForConnections: true,
  connectionLimit: 10, // Max number of connections to the pool
  queueLimit: 0
});

// Check if the database is connecting successfully
db.getConnection((err, connection) => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }
  console.log("Connected to MySQL database.");
  connection.release(); // Release the connection back to the pool
});

// Endpoint to get all reviews (no productId filter)
app.get("/api/review", (req, res) => {
  const query = "SELECT username, review FROM review"; // Fetch all reviews
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching reviews:", err);
      res.status(500).json({ error: "Failed to fetch reviews." });
    } else {
      res.json({ reviews: results });
    }
  });
});

// Endpoint to add a review
app.post("/api/reviews", (req, res) => {
  const { username, review } = req.body; // Extract data from the request body
  if (!username || !review) {
    return res.status(400).json({ error: "Username and review are required." });
  }

  const query = "INSERT INTO reviews (username, review) VALUES (?, ?)";
  db.query(query, [username, review], (err, results) => {
    if (err) {
      console.error("Error adding review:", err);
      res.status(500).json({ error: "Failed to add review." });
    } else {
      res.status(201).json({ message: "Review added successfully." });
    }
  });
});




app.get("/api/review/summary", async (req, res) => {
  try {
    const query = "SELECT review FROM review";
     db.query(query, async (err, results) => {
      if (err) {
        console.error("Error fetching reviews:", err);
        res.status(500).json({ error: "Failed to fetch reviews." });
      } else {
        // console.log(results);
        const reviews = results.map(row => row.review);
    
        const genAI = new GoogleGenerativeAI("AIzaSyBUnZ2qks_ocaPPuMxgK2mH7Q-FSbPP6qs"); 
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); 
    
        const perspectives = [
          "Summarize these reviews with a positive tone.",
          "Summarize these reviews focusing on areas for improvement.",
          "Summarize these reviews creatively, using metaphors and analogies.",
          "Summarize these reviews in a unique way, focusing on recurring themes.",
        ];
        const randomPrompt = perspectives[Math.floor(Math.random() * perspectives.length)];
        const prompt = `${randomPrompt}\n\n${reviews.join('\n')}`;
    
        const result = await model.generateContent(prompt);
        const summary = result.response.text(); 
    
        console.log("Summary:", summary); 
        res.json({ Summary: summary })
    
      }
      }
    )
   
  } catch (err) {
    console.error("Error:", err);
  }
  });


// Start the server
const PORT = process.env.PORT || 5001; // Use 5001 or any other available port
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});