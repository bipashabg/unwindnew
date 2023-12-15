import React from 'react'
import Login from './components/Login/Login'
import ForgotPassword from './components/forgotPassword/forgotPassword'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home/Home'
import Signup from './components/Signup/Signup'


function App() {
  return (
    //<div className='App'><button>Sign in with Google</button></div>
    <BrowserRouter>
      <Routes>
        <Route path='/ForgotPassword' element={<ForgotPassword />}></Route>
        <Route path='/Login' element={<Login />}></Route>
        <Route path='/Signup' element={<Signup />}></Route>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
