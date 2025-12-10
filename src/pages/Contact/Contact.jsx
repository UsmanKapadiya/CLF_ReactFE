import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import './Contact.css';
import Title from '../../assets/contact_title.png';
import Map from '../../assets/map.png';
import MetaTitle from '../../components/MetaTags/MetaTags';

const INITIAL_FORM_STATE = {
    name: '',
    email: '',
    subject: '',
    message: '',
    captcha: ''
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CAPTCHA_CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
const CAPTCHA_LENGTH = 4;
const SUCCESS_MESSAGE_DURATION = 5000;
const GOOGLE_MAPS_URL = 'https://www.google.ca/maps/place/CLF+Kung+Fu+Club/@49.1811657,-123.1405253,17z/data=!3m1!4b1!4m6!3m5!1s0x54867532bc7a9e67:0xd009f482f8589127!8m2!3d49.1811657!4d-123.1379504!16s%2Fg%2F11btwtqfwd?entry=ttu&g_ep=EgoyMDI1MTEzMC4wIKXMDSoASAFQAw%3D%3D';

function Contact() {
    const [formData, setFormData] = useState(INITIAL_FORM_STATE);
    const [errors, setErrors] = useState({});
    const [submitStatus, setSubmitStatus] = useState('');
    const [captchaCode, setCaptchaCode] = useState('');

    const generateCaptcha = useCallback(() => {
        let code = '';
        for (let i = 0; i < CAPTCHA_LENGTH; i++) {
            code += CAPTCHA_CHARS.charAt(Math.floor(Math.random() * CAPTCHA_CHARS.length));
        }
        setCaptchaCode(code);
    }, []);

    useEffect(() => {
        generateCaptcha();
    }, [generateCaptcha]);

    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    }, [errors]);

    const handleBlur = useCallback((e) => {
        const { name, value } = e.target;

        if (name === 'email' && value.trim() && !EMAIL_REGEX.test(value)) {
            setErrors(prev => ({ ...prev, email: 'Email address seems invalid.' }));
        }
    }, []);

    const validateForm = useCallback(() => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!EMAIL_REGEX.test(formData.email)) {
            newErrors.email = 'Email address seems invalid.';
        }

        if (!formData.subject.trim()) {
            newErrors.subject = 'Subject is required';
        }

        if (!formData.captcha.trim()) {
            newErrors.captcha = 'Captcha is required';
        } else if (formData.captcha !== captchaCode) {
            newErrors.captcha = 'Captcha does not match';
        }

        return newErrors;
    }, [formData, captchaCode]);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();

        const newErrors = validateForm();

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // TODO: Send form data to backend API
        console.log('Form submitted:', formData);

        setSubmitStatus('success');
        setFormData(INITIAL_FORM_STATE);
        generateCaptcha();

        setTimeout(() => setSubmitStatus(''), SUCCESS_MESSAGE_DURATION);
    }, [formData, validateForm, generateCaptcha]);

    const renderFormField = (name, type, placeholder, additionalProps = {}) => (
        <div className={`form-group ${name === 'name' ? 'form-group-no-space' : ''}`}>
            {type === 'textarea' ? (
                <textarea
                    id={name}
                    name={name}
                    placeholder={placeholder}
                    value={formData[name]}
                    onChange={handleChange}
                    className={errors[name] ? 'error' : ''}
                    rows={10}
                    {...additionalProps}
                />
            ) : (
                <input
                    type={type}
                    id={name}
                    name={name}
                    placeholder={placeholder}
                    value={formData[name]}
                    onChange={handleChange}
                    className={errors[name] ? 'error' : ''}
                    {...additionalProps}
                />
            )}
            {errors[name] && <span className="error-message">{errors[name]}</span>}
        </div>
    );

    return (
        <div className="contact-page">
            <MetaTitle pageTitle={"Contact | 振江武術館"} />
            <section className="clf_page_title">
                <img src={Title} alt="CLF Kung Fu Club contact banner" />
            </section>

            <div className="contact-container">
                <div className="contact-boxes">
                    <div className="contact-box contact-info-box">
                        <div>
                            <p className="contact-intro">
                                Please enter your questions or comments below. Your information will only be used to help answer your questions and will not be used for any other purpose.
                            </p>

                            {submitStatus === 'success' && (
                                <div className="alert alert-success">
                                    Thank you for your message! We will get back to you soon.
                                </div>
                            )}

                            <form className="contact-form" onSubmit={handleSubmit}>
                                {renderFormField('name', 'text', 'Name *')}
                                {renderFormField('email', 'email', 'Email *', { onBlur: handleBlur })}
                                {renderFormField('subject', 'text', 'Subject *')}
                                {renderFormField('message', 'textarea', 'Your message')}

                                <div className="form-group captcha-group">
                                    <div className="captcha-container">
                                        <div className="captcha-code">{captchaCode}</div>
                                        <button
                                            type="button"
                                            className="captcha-refresh"
                                            onClick={generateCaptcha}
                                            title="Generate new captcha"
                                        >
                                            ↻
                                        </button>
                                    </div>
                                    <input
                                        type="text"
                                        id="captcha"
                                        name="captcha"
                                        placeholder="Enter captcha *"
                                        value={formData.captcha}
                                        onChange={handleChange}
                                        className={errors.captcha ? 'error' : ''}
                                    />
                                    {errors.captcha && <span className="error-message">{errors.captcha}</span>}
                                </div>

                                <button type="submit" className="submit-btn">
                                    SEND
                                </button>
                            </form>
                        </div>
                    </div>

                    <div className="contact-box contact-image-box">
                        <a
                            href={GOOGLE_MAPS_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="map-link"
                            aria-label="View CLF Kung Fu Club location on Google Maps"
                        >
                            <img src={Map} alt="CLF Kung Fu Club Location Map" className="contact-image" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;
