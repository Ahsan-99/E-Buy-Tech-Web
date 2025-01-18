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
  const [reviews, setReviews] = useState([]);
  const [summary, setSummary] = useState("");

  useEffect(() => {
    // Fetch the main product
    const filterProduct = items.filter((product) => product.id == id);
    setProduct(filterProduct[0]);

    // Fetch related products based on the same category or criteria
    const related = items.filter(
      (prod) => prod.category === filterProduct[0]?.category && prod.id != id
    );
    setRelatedProducts(related);

    // Fetch reviews
    const fetchReviews = async () => {
      try {
        const response = await fetch(`http://localhost:5001/api/review`);
        if (response.ok) {
          const data = await response.json();
          const shuffledReviews = data.reviews.sort(() => 0.5 - Math.random());
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
        </div>
      </div>

{/* Reviews Section */}
<div className="reviews-section">
        <h3>Customer Testimonials</h3>
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div key={index} className="review-card">
              <p>
                <strong>{review.username}:</strong> {review.review}
              </p>
            </div>
          ))
        ) : (
          <p className="no-reviews-text">No reviews available for this product.</p>
        )}
      </div>

      {/* AI Summary Section */}
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
{relatedProducts.length > 0 ? (
  <div className="related-products">
    <Product cart={cart} setCart={setCart} items={relatedProducts} />
  </div>
) : (
  <p className="text-center">No related products available.</p>
)}

    </>
  );
};

export default ProductDetail;
