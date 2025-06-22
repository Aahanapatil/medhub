import { Link } from 'react-router-dom';
import '../css/aboutus.css';

function AboutUs() {
    return (
        <div className="aboutus-page">
            <header className="aboutus-header">
                <Link to="/home" className="logo-link">
                    <img src="/images/logo.png" alt="Hospital Logo" className="hospital-logo" />
                </Link>
                <h1>About Us</h1>
            </header>
            <section className="aboutus-hero">
                <div className="aboutus-hero-content">
                    <h2>Welcome to Mufasa Hospitals</h2>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                        Pellentesque euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, 
                        euismod euismod nisi nisi euismod nisi.
                    </p>
                </div>
            </section>
            <section className="aboutus-content">
                <div className="aboutus-card">
                    <h3>Our Mission</h3>
                    <p>
                        To provide world-class healthcare services with compassion and care. 
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                </div>
                <div className="aboutus-card">
                    <h3>Our Vision</h3>
                    <p>
                        To be the leading healthcare provider in the region, 
                        setting benchmarks in medical excellence and patient care.
                    </p>
                </div>
                <div className="aboutus-card">
                    <h3>Our Values</h3>
                    <ul>
                        <li>Compassion</li>
                        <li>Integrity</li>
                        <li>Innovation</li>
                        <li>Excellence</li>
                    </ul>
                </div>
            </section>
            <section className="aboutus-team">
                <h2>Meet Our Team</h2>
                <div className="team-members">
                    <div className="team-card">
                        <img src="/images/doctor1.png" alt="Doctor 1" />
                        <h4>Dr. Jane Doe</h4>
                        <p>Chief Medical Officer</p>
                    </div>
                    <div className="team-card">
                        <img src="/images/doctor2.png" alt="Doctor 2" />
                        <h4>Dr. John Smith</h4>
                        <p>Head of Surgery</p>
                    </div>
                    <div className="team-card">
                        <img src="/images/doctor3.png" alt="Doctor 3" />
                        <h4>Dr. Emily White</h4>
                        <p>Lead Pediatrician</p>
                    </div>
                </div>
            </section>
            <footer className="aboutus-footer">
                &copy; 2025 Mufasa Hospitals. All rights reserved.
            </footer>
        </div>
    );
}

export default AboutUs;