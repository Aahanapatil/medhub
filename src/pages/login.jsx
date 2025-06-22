import { Link } from 'react-router-dom';
import '../css/login.css';

function Login() {
    return (
        <div className="login-container">
            <div className="login-box">
                <h1>Welcome to Health Hub</h1>
                
                {/* Google Sign-In Button */}
                {/* <div id="g_id_onload"
                    data-client_id="http://627164574521-6napvob87b6ps9t0q9r8tdo0518jk53e.apps.googleusercontent.com/"
                    data-login_uri="https://your.domain/your_login_endpoint"
                    data-auto_prompt="false">
                </div> */}
                {/* <div className="g_id_signin"
                    data-type="standard"
                    data-size="large"
                    data-theme="outline"
                    data-text="sign_in_with"
                    data-shape="rectangular"
                    data-logo_alignment="left">
                </div> */}
                <button className="google-btn">
                    <img 
                        src="/images/googleIcon.png" 
                        alt="Google icon" 
                        className="google-icon"
                    />
                    Sign in with Google
                </button>

                <div className="home-link">
                    <Link to="/home">Go to Home</Link>
                </div>               
                <div className="home-link">
                    <Link to="/user/login">Login as User</Link>
                </div>
                <div className="home-link">
                    <Link to="/doctor/login">Login as Doctor</Link>
                </div>
                <div className="home-link">
                    <Link to="/register/user">Register as User</Link>
                </div>
                <div className="home-link">
                    <Link to="/register/doctor">Register as Doctor</Link>
                </div>
            </div>
        </div>
    );
}

export default Login;