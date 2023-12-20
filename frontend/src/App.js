import React from 'react'
import Login from './components/Login/Login'
import ForgotPassword from './components/forgotPassword/forgotPassword'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/navbar/navbar'
import Home from './components/Home/Home'
import Signup from './components/Signup/Signup'
//import Quiz from './components/Quiz/quiz'
import Breathe from './components/BreathingExercise/BreathingExercise'

function App() {
  return (
    //<div className='App'><button>Sign in with Google</button></div>
    <BrowserRouter>
      <Routes>
        <Route path='/ForgotPassword' element={<ForgotPassword />}></Route>
        <Route path='/Login' element={<Login />}></Route>
        <Route path='/Signup' element={<Signup />}></Route>
        <Route path='/Navbar' element={<Navbar />}></Route>
        
        <Route path='/Breathe' element={<Breathe />}></Route>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
