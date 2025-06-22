import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/news.css';

function News() {
    const [newsList, setNewsList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({ id: '', title: '', content: '' });

    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = async () => {
        setLoading(true);
        try {
            const res = await fetch('http://localhost:8080/api/news');
            if (!res.ok) throw new Error('Failed to fetch news');
            const data = await res.json();
            setNewsList(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = formData.id
                ? `http://localhost:8080/api/news/${formData.id}`
                : 'http://localhost:8080/api/news';
            const method = formData.id ? 'PUT' : 'POST';
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            if (!res.ok) throw new Error('Failed to save news');
            setShowForm(false);
            setFormData({ id: '', title: '', content: '' });
            await fetchNews();
        } catch (err) {
            setError(err.message);
        }
    };

    const handleEdit = (news) => {
        setFormData(news);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this news item?')) return;
        try {
            const res = await fetch(`http://localhost:8080/api/news/${id}`, { method: 'DELETE' });
            if (!res.ok) throw new Error('Failed to delete news');
            await fetchNews();
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="news-container">
            <div className="news-header">
                <header className='main-header'>
                    <Link to="/home" className="logo-link">
                        <img src="/images/logo.png" alt="Hospital Logo" className="hospital-logo" />
                    </Link>
                </header>
                <h1>News Management</h1>
                <button className="news-add-btn" onClick={() => { setFormData({ id: '', title: '', content: '' }); setShowForm(true); }}>
                    Add News
                </button>
            </div>
            {error && <div className="news-error">{error}</div>}
            {loading ? (
                <div className="news-loading">Loading...</div>
            ) : (
                <div className="news-list">
                    {newsList.length === 0 && <div>No news found.</div>}
                    {newsList.map((news) => (
                        <div className="news-item" key={news.id}>
                            <div className="news-title">{news.title}</div>
                            <div className="news-content">{news.content}</div>
                            <div className="news-actions">
                                <button className="news-edit-btn" onClick={() => handleEdit(news)}>Edit</button>
                                <button className="news-delete-btn" onClick={() => handleDelete(news.id)}>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {showForm && (
                <div className="news-form-overlay">
                    <div className="news-form-box">
                        <h2>{formData.id ? 'Edit News' : 'Add News'}</h2>
                        <form onSubmit={handleFormSubmit}>
                            <input
                                type="text"
                                placeholder="Title"
                                value={formData.title}
                                onChange={e => setFormData({ ...formData, title: e.target.value })}
                                required
                            />
                            <textarea
                                placeholder="Content"
                                value={formData.content}
                                onChange={e => setFormData({ ...formData, content: e.target.value })}
                                required
                            />
                            <div className="news-form-actions">
                                <button type="submit">{formData.id ? 'Update' : 'Add'}</button>
                                <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default News;