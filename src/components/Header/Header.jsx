import { Link } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import './Header.css';
import logo from '../../assets/logo.png';

const NAV_LINKS = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/news', label: 'News' },
  { path: '/gallery', label: 'Gallery' },
  { path: '/contact', label: 'Contact' }
];

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  useEffect(() => {
    const appContainer = document.querySelector('.app-container');
    const header = document.querySelector('.header');
    const mobileMenuBar = document.querySelector('.mobile-menu-bar');
    
    const elements = [appContainer, header, mobileMenuBar];
    const action = isMenuOpen ? 'add' : 'remove';
    
    elements.forEach(element => {
      element?.classList[action]('menu-open');
    });
  }, [isMenuOpen]);

  return (
    <>
      <div className="mobile-menu-bar">
        <button 
          className={`menu-toggle ${isMenuOpen ? 'active' : ''}`} 
          onClick={toggleMenu} 
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
      
      <nav 
        className={`nav-links group ${isMenuOpen ? 'active' : ''}`}
        aria-label="Mobile navigation"
      >
        {NAV_LINKS.map(link => (
          <Link 
            key={link.path} 
            to={link.path} 
            onClick={closeMenu}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <header className="header">
        <div className="header-container">
          <div className="logo">
            <Link to="/" aria-label="Go to homepage">
              <img src={logo} alt="CLF Kung Fu Club Logo" />
            </Link>
          </div>

          <nav className="nav-links-desktop group" aria-label="Desktop navigation">
            {NAV_LINKS.map(link => (
              <Link key={link.path} to={link.path}>
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
    </>
  );
}

export default Header;
