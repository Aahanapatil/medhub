import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/info.css';

function Info() {
    const [departments, setDepartments] = useState([]);
    const [activeService, setActiveService] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [formData, setFormData] = useState({
        id: '',
        title: '',
        description: '',
        hodName: '',
    });

    // Fetch departments when component mounts
    useEffect(() => {
        fetchDepartments();
    }, []);

    const fetchDepartments = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:8080/api/departments');
            if (!response.ok) throw new Error('Failed to fetch departments');
            const data = await response.json();
            setDepartments(data);
        } catch (err) {
            setError('Failed to load departments');
        } finally {
            setLoading(false);
        }
    };

    const handleServiceClick = async (serviceId) => {
        setActiveService(serviceId);
        try {
            const response = await fetch(`http://localhost:8080/api/departments/${serviceId}`);
            if (!response.ok) throw new Error('Failed to fetch department details');
            const data = await response.json();
            const updatedDepartments = departments.map(dept => 
                dept.id === serviceId ? { ...dept, description: data.description } : dept
            );
            setDepartments(updatedDepartments);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
             const url = formData.id
            ? `http://localhost:8080/api/departments/${formData.id}` // <-- use id in URL for PUT
            : 'http://localhost:8080/api/departments';
            const response = await fetch(url, {
                method: formData.id ? 'PUT' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (!response.ok) throw new Error('Failed to save department');
            await fetchDepartments();
            setShowAddForm(false);
            setFormData({ id: '', title: '', description: '', hodName: '', className: '' });
        } catch (err) {
            setError(err.message);
        }
    };

    const handleEdit = (department) => {
        setFormData(department);
        setShowAddForm(true);
    };

    return (
        <div className="container">
            <div className="header-section">
                <header className='main-header'>
                    <Link to="/home" className="logo-link">
                        <img src="/images/logo.png" alt="Hospital Logo" className="hospital-logo" />
                    </Link>
                </header>
                <h1>Our Departments</h1>
                <button 
                    className="add-button"
                    onClick={() => setShowAddForm(true)}
                >
                    Add New Department
                </button>
            </div>

            {error && <div className="error-message">{error}</div>}

            {showAddForm && (
                <div className="form-overlay">
                    <div className="department-form">
                        <h2>{formData.id ? 'Edit' : 'Add'} Department</h2>
                        <form onSubmit={handleFormSubmit}>
                            <input
                                type="text"
                                placeholder="Department Name"
                                value={formData.title}
                                onChange={(e) => setFormData({...formData, title: e.target.value})}
                                required
                            />
                            <input
                                type="text"
                                placeholder="HOD Name"
                                value={formData.hodName}
                                onChange={(e) => setFormData({...formData, hodName: e.target.value})}
                                required
                            />
                            <textarea
                                placeholder="Department Description"
                                value={formData.description}
                                onChange={(e) => setFormData({...formData, description: e.target.value})}
                                required
                            />
                            <div className="form-buttons">
                                <button type="submit">Save</button>
                                <button type="button" onClick={() => setShowAddForm(false)}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

                <div className="services-section">
                    {loading ? (
                        <div className="loading">Loading departments...</div>
                    ) : (
                        departments.map((department) => (
                        <div
                    key={department.id}
                    className={`service-item ${department.className} ${
                        activeService === department.id ? 'active' : ''
                    }`}
                    onClick={() => handleServiceClick(department.id)}
                >
                    <div className="service-title">{department.title}</div>
                    <div className="hod-name">HOD: {department.hodName}</div>
                    {activeService === department.id && (
                        <div className="service-description">
                            {department.description}
                        </div>
                    )}
                    <div className="edit-button-container">
                        <button 
                            className="edit-button"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleEdit(department);
                            }}
                        >
                            Edit
                        </button>
                    </div>
                </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Info;