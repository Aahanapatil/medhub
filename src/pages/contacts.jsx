import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/contacts.css';

function Contacts() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        questionText: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const response = await fetch('http://localhost:8080/api/questions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (!response.ok) throw new Error('Failed to submit your question');
            setSuccess(true);
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                questionText: ''
            });
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="contacts-page">
            <header className='main-header'>
                <Link to="/home" className="logo-link">
                    <img src="/images/logo.png" alt="Hospital Logo" className="hospital-logo" />
                </Link>
                <h1>Contact Us</h1>
                <p>Working Hours: Monday-Friday, 9:00 AM - 5:00 PM</p>
            </header>

            <section id="question-section">
                <h2>Ask a Question</h2>
                {success && <div className="success-message">Your question has been submitted successfully!</div>}
                {error && <div className="error-message">{error}</div>}
                <form id="question-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="firstName">First Name:</label>
                        <input 
                            type="text" 
                            id="firstName" 
                            name="firstName" 
                            value={formData.firstName}
                            onChange={handleChange}
                            required 
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="lastName">Last Name:</label>
                        <input 
                            type="text" 
                            id="lastName" 
                            name="lastName" 
                            value={formData.lastName}
                            onChange={handleChange}
                            required 
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email Address:</label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            value={formData.email}
                            onChange={handleChange}
                            required 
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="phone">Contact Number:</label>
                        <input 
                            type="tel" 
                            id="phone" 
                            name="phone" 
                            value={formData.phone}
                            onChange={handleChange}
                            required 
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="questionText">Your Question:</label>
                        <textarea 
                            id="questionText" 
                            name="questionText" 
                            value={formData.questionText}
                            onChange={handleChange}
                            required 
                        />
                    </div>

                    <button type="submit" disabled={loading}>
                        {loading ? 'Submitting...' : 'Submit'}
                    </button>
                </form>
            </section>

            <section id="social-section">
                <h2>Connect with Us</h2>
                <ul>
                    <li><a href="https://www.facebook.com/bitshyderabad" target="_blank" rel="noopener noreferrer">Facebook</a></li>
                    <li><a href="https://twitter.com/bitshyd" target="_blank" rel="noopener noreferrer">Twitter</a></li>
                    <li><a href="https://www.instagram.com/bitshyderabad/" target="_blank" rel="noopener noreferrer">Instagram</a></li>
                </ul>
            </section>
        </div>
    );
}

export default Contacts;