import './Footer.css';
import clf1 from '../../assets/footer-clf.png';
import clf2 from '../../assets/footer-clf2.png';
import clf3 from '../../assets/footer-clf3.png';

const FOOTER_LOGOS = [
  { id: 1, src: clf1, alt: 'CLF Kung Fu Club Partner Logo 1' },
  { id: 2, src: clf2, alt: 'CLF Kung Fu Club Partner Logo 2' },
  { id: 3, src: clf3, alt: 'CLF Kung Fu Club Partner Logo 3' }
];

const CURRENT_YEAR = new Date().getFullYear();

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-images">
          {FOOTER_LOGOS.map(logo => (
            <div key={logo.id} className="clf_footer_logo">
              <img src={logo.src} alt={logo.alt} />
            </div>
          ))}
        </div>
        <div className="footer-copyright">
          <p>© {CURRENT_YEAR} Intelli Design + Technology Inc. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
