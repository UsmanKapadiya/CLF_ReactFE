import './Footer.css';
import clf1 from "../../assets/footer-clf.png";
import clf2 from "../../assets/footer-clf2.png";
import clf3 from "../../assets/footer-clf3.png";

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-images">
                    <div className='clf_footer_logo'>
                        <img src={clf1} alt="Image 1"  />
                    </div>
                    <div className='clf_footer_logo'>
                        <img src={clf2} alt="Image 2" className='' />
                    </div>
                    <div className='clf_footer_logo'>
                        <img src={clf3} alt="Image 3" className='' />
                    </div>
                </div>
                <div className="footer-copyright">
                    <p>© 2020 Intelli Design + Technology Inc. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
