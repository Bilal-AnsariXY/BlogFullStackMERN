import React from 'react'
import Navbar from '../src/components/Navbar.jsx'
import Blogs from '../src/pages/Blogs.jsx'
import Contact from '../src/pages/Contact.jsx'
import About from '../src/pages/About.jsx'
import Creater from '../src/pages/Creater.jsx'
import Dashbord from '../src/pages/Dashbord.jsx'
import Login from '../src/pages/Login.jsx'
import Register from '../src/pages/Register.jsx'
import Home from '../src/components/Home.jsx'
import Footer from '../src/components/Footer.jsx'
// import { useAuth } from './contest/Authprovider.jsx'
import { Toaster } from 'react-hot-toast';

import { Routes, Route, useLocation } from 'react-router-dom'
const App = () => {
  const location = useLocation();
  const hideNavbarFooter = ["/dashbord", "/login", "/register"].includes(location.pathname);
  
  return (
    <div>
      {
        !hideNavbarFooter &&
        <Navbar />
      }

      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/blogs' element={<Blogs></Blogs>}></Route>
        <Route path='/about' element={<About />}></Route>
        <Route path='/contact' element={<Contact />}></Route>
        <Route path='/creater' element={<Creater />}></Route>
        <Route path='/dashbord' element={<Dashbord />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
      </Routes>
      <Toaster/>
      {
        !hideNavbarFooter &&
        <Footer />
      }
    </div>
  )
}

export default App
