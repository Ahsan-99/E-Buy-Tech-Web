import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { items } from "./Data";
import Product from "./Product";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../ProductDetail.css"; // Import CSS

const ProductDetail = ({ cart, setCart }) => {
  const { id } = useParams();

  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [comparisonResult, setComparisonResult] = useState("");
  const [reviews, setReviews] = useState([]);
  const [summary, setSummary] = useState(""); // State for the summary

  useEffect(() => {
    const filterProduct = items.filter((product) => product.id == id);
    setProduct(filterProduct[0]);

    const fetchReviews = async () => {
      try {
        const response = await fetch(`http://localhost:5001/api/review`);
        if (response.ok) {
          const data = await response.json();

          // Shuffle reviews
          const shuffledReviews = data.reviews.sort(() => 0.5 - Math.random());

          // Limit to 10 reviews
          const limitedReviews = shuffledReviews.slice(0, 10);

          setReviews(limitedReviews);
        } else {
          console.error("Failed to fetch reviews.");
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [id]);

  const aiComparison = async () => {
    const prompt = `
      Compare the following product:
      Product: ${product.title}
      Description: ${product.description}
      Price: ${product.price}
      
      With the following related products:
      ${relatedProducts
        .map(
          (relProd, index) =>
            `${index + 1}. Product: ${relProd.title}, Description: ${relProd.description}, Price: ${relProd.price}`
        )
        .join("\n")}

      Provide a detailed comparison highlighting pros and cons.
    `;

    try {
      const response = await fetch("https://api.openai.com/v1/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer YOUR_OPENAI_API_KEY`,
        },
        body: JSON.stringify({
          model: "text-davinci-003",
          prompt: prompt,
          max_tokens: 300,
          temperature: 0.7,
        }),
      });

      const data = await response.json();
      const result = data.choices[0]?.text.trim();
      setComparisonResult(result || "No comparison data available.");
      toast.success("AI comparison complete!", {
        position: "top-right",
        autoClose: 1500,
        theme: "dark",
      });
    } catch (error) {
      console.error("Error fetching AI comparison:", error);
      toast.error("Failed to fetch AI comparison.", {
        position: "top-right",
        autoClose: 1500,
        theme: "dark",
      });
    }
  };

  const fetchSummary = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/review/summary");
      if (response.ok) {
        const data = await response.json();
        setSummary(data.Summary);
        toast.success("Summary fetched successfully!", {
          position: "top-right",
          autoClose: 1500,
          theme: "dark",
        });
      } else {
        toast.error("Failed to fetch summary.", {
          position: "top-right",
          autoClose: 1500,
          theme: "dark",
        });
      }
    } catch (error) {
      console.error("Error fetching summary:", error);
      toast.error("An error occurred while fetching summary.", {
        position: "top-right",
        autoClose: 1500,
        theme: "dark",
      });
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="container con">
        <div className="img">
          <img src={product.imgSrc} alt={product.title} />
        </div>
        <div className="text-center">
          <h1 className="card-title">{product.title}</h1>
          <p className="card-text">{product.description}</p>
          <button className="btn btn-primary mx-3">{product.price} PKR</button>
          <button onClick={fetchSummary} className="btn btn-warning">
          AI-Generated Summary
          </button>
        </div>
      </div>
      <div className="reviews-section">
        <h3>Customer Reviews ({reviews.length}):</h3>
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div key={index} className="review">
              <p>
                <strong>{review.username}:</strong> {review.review}
              </p>
            </div>
          ))
        ) : (
          <p>No reviews available for this product.</p>
        )}
      </div>
      <div className="text-center my-3">
        <button onClick={fetchSummary} className="btn btn-info my-3">
        AI-Generated Summary
        </button>
      </div>
      {summary && (
        <div className="summary-section">
          <h3>AI-Generated Summary:</h3>
          <p>{summary}</p>
        </div>
        
      )}
      <h1 className="text-center">Related Products</h1>
      <Product cart={cart} setCart={setCart} items={relatedProducts} />
      {/* <div className="comparison-result">
        <h3>AI Comparison Result:</h3>
        <p>{comparisonResult}</p>
      </div> */}
    </>
  );
};

export default ProductDetail;
