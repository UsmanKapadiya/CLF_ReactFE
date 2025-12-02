import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './Header.css';
import logo from "../../assets/logo.png"

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const appContainer = document.querySelector('.app-container');
    const header = document.querySelector('.header');
    const mobileMenuBar = document.querySelector('.mobile-menu-bar');
    
    if (isMenuOpen) {
      if (appContainer) appContainer.classList.add('menu-open');
      if (header) header.classList.add('menu-open');
      if (mobileMenuBar) mobileMenuBar.classList.add('menu-open');
    } else {
      if (appContainer) appContainer.classList.remove('menu-open');
      if (header) header.classList.remove('menu-open');
      if (mobileMenuBar) mobileMenuBar.classList.remove('menu-open');
    }
  }, [isMenuOpen]);

  return (
    <>
      <div className="mobile-menu-bar">
        <button className={`menu-toggle ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu} aria-label="Toggle menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
      
      <nav className={`nav-links group ${isMenuOpen ? 'active' : ''}`}>
        <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
        <Link to="/about" onClick={() => setIsMenuOpen(false)}>About</Link>
        <Link to="/news" onClick={() => setIsMenuOpen(false)}>News</Link>
        <Link to="/gallery" onClick={() => setIsMenuOpen(false)}>Gallery</Link>
        <Link to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link>
      </nav>

      <header className="header">
        <div className="header-container">
          <div className="logo">
            <Link to="/">
              <img src={logo} alt="CLF Logo" />
            </Link>
          </div>

          <nav className="nav-links-desktop group">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/news">News</Link>
            <Link to="/gallery">Gallery</Link>
            <Link to="/contact">Contact</Link>
          </nav>
        </div>
      </header>
    </>
  );
}

export default Header;
