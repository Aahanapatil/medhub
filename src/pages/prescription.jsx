import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/prescription.css';

function Prescription() {
    const [formData, setFormData] = useState({
        appointment_id: '',
        medications: '',
        dosage: '',
        instructions: ''
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
            const response = await fetch('http://localhost:8080/api/prescriptions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Failed to save prescription');
            }

            setSuccess(true);
            setFormData({
                appointment_id: '',
                medications: '',
                dosage: '',
                instructions: ''
            });
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="prescription-container">
            <header className='prescription-main-header'>
                <Link to="/home" className="prescription-logo-link">
                    <img src="/images/logo.png" alt="Hospital Logo" className="prescription-hospital-logo" />
                </Link>
                <h1 className="prescription-site-title">Create Prescription</h1>
            </header>
            <section id="prescription-form-section">
                {error && <div className="error-message">{error}</div>}
                {success && <div className="success-message">Prescription saved successfully!</div>}
                
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="appointment_id">Appointment ID:</label>
                        <input
                            type="text"
                            id="appointment_id"
                            name="appointment_id"
                            value={formData.appointment_id}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="medications">Medications:</label>
                        <textarea
                            id="medications"
                            name="medications"
                            value={formData.medications}
                            onChange={handleChange}
                            required
                            maxLength="500"
                            placeholder="Enter medications..."
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="dosage">Dosage:</label>
                        <input
                            type="text"
                            id="dosage"
                            name="dosage"
                            value={formData.dosage}
                            onChange={handleChange}
                            required
                            placeholder="Enter dosage..."
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="instructions">Instructions:</label>
                        <textarea
                            id="instructions"
                            name="instructions"
                            value={formData.instructions}
                            onChange={handleChange}
                            required
                            maxLength="500"
                            placeholder="Enter instructions..."
                        />
                    </div>

                    <button type="submit" disabled={loading}>
                        {loading ? 'Saving...' : 'Save Prescription'}
                    </button>
                </form>
            </section>
        </div>
    );
}

export default Prescription;