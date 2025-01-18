import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { items } from './Data';

const Navbar = ({ setData }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const filterByCategory = (category) => {
    const element = items.filter((product) => product.category === category);
    setData(element);
  };

  const getMixedProducts = () => {
    const categories = ['mobiles', 'laptops', 'tablets'];
    let mixedProducts = [];

    categories.forEach((category) => {
      const filteredProducts = items.filter((product) => product.category === category);
      for (let i = 0; i < 3; i++) {
        const randomProduct = filteredProducts[Math.floor(Math.random() * filteredProducts.length)];
        mixedProducts.push(randomProduct);
      }
    });

    setData(mixedProducts);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${searchTerm}`);
    setSearchTerm("");
  };

  return (
    <>
      <header className="sticky-top">
        <div className="nav-bar">
          <Link to={'/'} className="brand">E-Buy</Link>

          <form onSubmit={handleSubmit} className="search-bar">
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              type="text"
              placeholder="Search Products"
            />
            <div className="slogan">
              <span>Enjoy your shopping journey</span>
            </div>
          </form>

          <div className="nav-links">
            <Link to={'/about'} className="nav-link">About Us</Link>
            <Link to={'/contact'} className="nav-link">Contact Us</Link>
          </div>
        </div>

        {location.pathname === '/' && (
          <div className="nav-bar-wrapper">
            <div onClick={getMixedProducts} className="items">All Products</div>
            <div onClick={() => filterByCategory('mobiles')} className="items">Mobiles</div>
            <div onClick={() => filterByCategory('laptops')} className="items">Laptops</div>
            <div onClick={() => filterByCategory('tablets')} className="items">Tablets</div>
            <div className="items coming-soon">Watches <span className="tag">Coming Soon</span></div>
          </div>
        )}
      </header>

      {/* Styles for Navbar */}
      <style>{`
        .nav-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 20px;
          background-color: purple;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .brand {
          font-size: 1.5rem;
          font-weight: bold;
          color: #ffffff;
          text-decoration: none;
        }

        .search-bar {
          display: flex;
          align-items: center;
          position: relative;
          flex-grow: 1;
          margin: 0 20px;
        }

        .search-bar input {
          width: 250px;
          padding: 8px;
          border: 1px solid #ddd;
          border-radius: 4px;
        }

        .slogan {
          margin-left: 15px;
          font-size: 1.1rem;
          color: #ffffff;
          white-space: nowrap;
          overflow: hidden;
          position: relative;
          width: 280px; /* Width of the scrolling area */
          height: 20px;
        }

        .slogan span {
          display: inline-block;
          white-space: nowrap;
          animation: scroll-slogan 8s linear infinite;
        }

        @keyframes scroll-slogan {
          50% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }

        .nav-links {
          display: flex;
          gap: 20px;
        }

        .nav-link {
          color: #ffffff;
          text-decoration: none;
          font-size: 1rem;
          transition: all 0.3s ease-in-out;
        }

        .nav-link:hover {
          color: #ffdd57;
          text-decoration: underline;
        }

        .nav-bar-wrapper {
          display: flex;
          gap: 15px;
          align-items: center;
          justify-content: center;
          padding: 10px 0;
          background-color: purple;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .items {
          padding: 10px;
          cursor: pointer;
        }

        .coming-soon {
          color: #777;
          pointer-events: none;
        }

        .tag {
          font-size: 0.8rem;
          color: #d9534f;
          font-weight: bold;
          margin-left: 5px;
        }
      `}</style>
    </>
  );
};

export default Navbar;
