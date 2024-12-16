import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { items } from './Data';
import { BsFillCartCheckFill } from 'react-icons/bs';

const Navbar = ({ setData, cart }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const filterByCategory = (category) => {
    const element = items.filter((product) => product.category === category);
    setData(element);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${searchTerm}`);
    setSearchTerm("");
  };

  return (
    <>
      <header className='sticky-top'>
        <div className="nav-bar">
          <Link to={'/'} className="brand">E-Buy</Link>

          <form onSubmit={handleSubmit} className="search-bar">
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              type="text"
              placeholder='Search Products'
            />
          </form>

          <Link to={'/cart'} className="cart">
            <button type="button" className="btn btn-primary position-relative">
              <BsFillCartCheckFill style={{ fontSize: '1.5rem' }} />
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {cart.length}
                <span className="visually-hidden">unread messages</span>
              </span>
            </button>
          </Link>
        </div>

        {location.pathname === '/' && (
          <div className="nav-bar-wrapper">
            {/* All Products */}
            <div onClick={() => setData(items)} className="items">All Products</div>

            {/* Dropdown for Mobiles */}
            <div
              className="items dropdown"
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
            >
              <span onClick={() => filterByCategory('mobiles')}>Mobiles</span>
              {showDropdown && (
                <div className="dropdown-menu">
                  <div onClick={() => filterByCategory('Samsung')} className="dropdown-item">Samsung</div>
                  <div onClick={() => filterByCategory('Apple')} className="dropdown-item">Apple</div>
                  <div onClick={() => filterByCategory('OnePlus')} className="dropdown-item">OnePlus</div>
                  <div onClick={() => filterByCategory('Xiaomi')} className="dropdown-item">Xiaomi</div>
                  <div onClick={() => filterByCategory('Vivo')} className="dropdown-item">Vivo</div>
                </div>
              )}
            </div>

            {/* Static Categories */}
            <div onClick={() => filterByCategory('laptops')} className="items">Laptops</div>
            <div onClick={() => filterByCategory('tablets')} className="items">Tablets</div>

            {/* Coming Soon */}
            <div className="items coming-soon">Watches <span className='tag'>Coming Soon</span></div>
          </div>
        )}
      </header>

      {/* Styles for Dropdown */}
      <style>{`
        .nav-bar-wrapper {
          display: flex;
          gap: 15px;
          align-items: center;
          justify-content: center;
        }

        .items {
          position: relative;
          padding: 10px;
          cursor: pointer;
        }

        .dropdown-menu {
          position: absolute;
          top: 100%;
          left: 0;
          background-color: #fff;
          border: 1px solid #ddd;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          z-index: 1000;
          min-width: 150px;
        }

        .dropdown-item {
          padding: 8px 12px;
          white-space: nowrap;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        .dropdown-item:hover {
          background-color: #f0f0f0;
        }

        .coming-soon {
          position: relative;
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
