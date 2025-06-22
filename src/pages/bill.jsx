import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/bill.css';

function Bill() {
    const [formData, setFormData] = useState({
        patientName: '',
        services: '',
        totalAmount: '',
        paymentStatus: 'Unpaid',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const response = await fetch('http://localhost:8080/api/bills', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    totalAmount: parseFloat(formData.totalAmount)
                }),
            });
            if (!response.ok) throw new Error('Failed to save bill');
            setSuccess(true);
            setFormData({
                patientName: '',
                services: '',
                totalAmount: '',
                paymentStatus: 'Unpaid',
            });
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bill-container">
            <div className="bill-box">
                <header className='main-header'>
                    <Link to="/home" className="logo-link">
                        <img src="/images/logo.png" alt="Hospital Logo" className="hospital-logo" />
                    </Link>
                </header>
                <h1>Generate Bill</h1>
                {error && <div className="bill-error">{error}</div>}
                {success && <div className="bill-success">Bill saved successfully!</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="patientName">Patient Name</label>
                        <input
                            type="text"
                            id="patientName"
                            name="patientName"
                            value={formData.patientName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="services">Services</label>
                        <input
                            type="text"
                            id="services"
                            name="services"
                            value={formData.services}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="totalAmount">Total Amount (₹)</label>
                        <input
                            type="number"
                            id="totalAmount"
                            name="totalAmount"
                            value={formData.totalAmount}
                            onChange={handleChange}
                            required
                            min="0"
                            step="0.01"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="paymentStatus">Payment Status</label>
                        <select
                            id="paymentStatus"
                            name="paymentStatus"
                            value={formData.paymentStatus}
                            onChange={handleChange}
                            required
                        >
                            <option value="Unpaid">Unpaid</option>
                            <option value="Paid">Paid</option>
                        </select>
                    </div>
                    <button type="submit" disabled={loading}>
                        {loading ? 'Saving...' : 'Save Bill'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Bill;