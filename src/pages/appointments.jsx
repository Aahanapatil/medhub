import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/appointments.css';

function Appointments() {
    const [formData, setFormData] = useState({
        patientId: '',  // This should come from your auth system
        doctorId: '',
        doctorName: '',
        patientName: '',
        appointmentTime: '',
        appointmentDate: '',
        status: 'SCHEDULED',
        email: ''
    });

    const [doctors, setDoctors] = useState([]);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    // Fetch doctors when component mounts
    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/doctors');
                if (!response.ok) throw new Error('Failed to fetch doctors');
                const data = await response.json();
                console.log('Fetched doctors:', data);
                setDoctors(data);
            } catch (err) {
                setError('Failed to load doctors. Please try again later.');
            }
        };

        fetchDoctors();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => {
            if (name === 'doctorId') {
                const selectedDoctor = doctors.find(d => d.id === parseInt(value));
                return {
                    ...prev,
                    doctorId: parseInt(value),
                    doctorName: selectedDoctor ? selectedDoctor.name : ''
                };
            }
            return {
                ...prev,
                [name]: value
            };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const appointmentData = {
                ...formData,
                appointmentTime: `${formData.appointmentTime}:00`, // Adding seconds for SQL Time format
                appointmentDate: formData.appointmentDate // Already in yyyy-MM-dd format
            };

            const response = await fetch('http://localhost:8080/api/appointments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(appointmentData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to book appointment');
            }

            const data = await response.json();
            setShowConfirmation(true);
        } catch (err) {
            setError(err.message);
            setShowConfirmation(false);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="appointments-page">
            <header className='main-header'>
                <Link to="/home" className="logo-link">
                    <img src="/images/logo.png" alt="Hospital Logo" className="hospital-logo" />
                </Link>
                <h1 className='site-title'>Medical Appointment Booking</h1>
            </header>
            <main>
                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}
                <section id="appointmentForm" className={showConfirmation ? 'hidden' : ''}>
                    <h2>Book an Appointment</h2>
                    <form id="bookingForm" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="patientId">Patient ID:</label>
                            <input
                                type="number"
                                id="patientId"
                                name="patientId"
                                value={formData.patientId}
                                onChange={handleChange}
                                required
                                min="1"
                                placeholder="Enter your patient ID"
                            />
                            <label htmlFor="doctorId">Select Doctor:</label>
                            <select 
                                name="doctorId"
                                id="doctorId"
                                value={formData.doctorId}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select a doctor</option>
                                {doctors.map((doctor) => (
                                    <option key={doctor.id} value={doctor.id}>
                                        {doctor.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="appointmentDate">Select Date:</label>
                            <input 
                                type="date"
                                id="appointmentDate"
                                name="appointmentDate"
                                value={formData.appointmentDate}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="appointmentTime">Select Time:</label>
                            <input 
                                type="time"
                                id="appointmentTime"
                                name="appointmentTime"
                                value={formData.appointmentTime}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="patientName">Your Name:</label>
                            <input 
                                type="text"
                                id="patientName"
                                name="patientName"
                                placeholder="Your Name"
                                value={formData.patientName}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Your Email:</label>
                            <input 
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Your Email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <button 
                            type="submit" 
                            disabled={loading}
                        >
                            {loading ? 'Booking...' : 'Book Appointment'}
                        </button>
                    </form>
                </section>

                <section id="confirmation" className={showConfirmation ? '' : 'hidden'}>
                    <h2>Appointment Confirmed!</h2>
                    <p>
                        Thank you, {formData.patientName}! Your appointment has been scheduled for{' '}
                        {formData.appointmentDate} at {formData.appointmentTime}.
                    </p>
                </section>
            </main>
        </div>
    );
}

export default Appointments;