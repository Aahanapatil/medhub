import { useState } from 'react'
import './App.css'
import {Routes, Route } from 'react-router-dom'
import Login from './pages/login.jsx'
import Home from './pages/home'
import Appointments from './pages/appointments'
import Prescription from './pages/prescription'
import Contacts from './pages/contacts'
import News from './pages/News.jsx'
import UserRegister from './pages/UserRegister.jsx'
import DoctorRegister from './pages/DoctorRegister.jsx'
import UserLogin from './pages/UserLogin.jsx'
import DoctorLogin from './pages/DoctorLogin.jsx'
import AboutUs from './pages/aboutus.jsx'
import Info from './pages/Info'
import Bill from './pages/bill'
import './css/contacts.css'
import './css/prescription.css'
import './css/login.css'
import './css/home.css'
import Register from './pages/register.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      {/* <Route path="/" /> */}
      <Route path="/appointments" element={<Appointments />} />
      <Route path="/information" element={<Info />} />
      <Route path="/contacts" element={<Contacts />} />
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/prescription" element={<Prescription />} />
      <Route path="/register" element={<Register />} />
      <Route path="/bill" element={<Bill />} />
      <Route path="/news" element={<News />} />
      <Route path="/register/user" element={<UserRegister />} />
      <Route path="/register/doctor" element={<DoctorRegister />} />
      <Route path="/user/login" element={<UserLogin />} />
      <Route path="/doctor/login" element={<DoctorLogin />} />
      <Route path="/aboutus" element={<AboutUs />} />

    </Routes>

  );
}


export default App;
