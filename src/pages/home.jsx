import { Link } from 'react-router-dom';
import '../css/home.css';
import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import FAQSection from './FAQSection';

function Home() {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    return (
        <div className="home-page">
            <header className='name-header'>
                <h1>Mufasa Hospitals</h1>
            </header>
            <nav className="navbar">
                <div className="nav-links">
                    <Link to="/contacts">Contact Us</Link>
                    <Link to="/appointments">Appointments</Link>
                    <Link to="/information">Information</Link>
                    <Link to="/prescription">Prescription Reminders</Link>
                    <Link to="/bill">Generate Bill</Link>
                    <Link to="/news">Latest News</Link>
                    <Link to="/login">Logout</Link>
                </div>
                <Dropdown>
                    <Dropdown.Toggle variant="primary" id="dropdown-basic">
                        More
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item as={Link} to="/aboutus">About Us</Dropdown.Item>
                        <Dropdown.Item as={Link} to="/settings">Settings</Dropdown.Item>
                        <Dropdown.Item as={Link} to="/help">Help</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </nav>

            <div className="hero-container">
            <video
                className="hero-video"
                autoPlay
                loop
                muted
                playsInline
                src="/videos/home.mp4"
                type="video/mp4"
            />
            <div className="hero-content">
            <main>
                <section id="news1">
                    <h2>Latest News 1</h2>
                    <p>Reschedule in Pediatrician visit.</p>
                </section>

                <section id="news2">
                    <h2>Latest News 2</h2>
                    <p>A seminar on personal hygiene will be conducted on 27th.</p>
                </section>

                <section id="news3">
                    <h2>Latest News 3</h2>
                    <p>This is the third news section.</p>
                </section>
            </main>
            </div>
            </div>
            <section id="faq">
                <FAQSection />
            </section>
            <footer className="footer">
                &copy; Health Hub 2025
            </footer>
        </div>
    );
}

export default Home;