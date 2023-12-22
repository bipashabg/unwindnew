import React from 'react'
import Login from './components/Login/Login'
import ForgotPassword from './components/forgotPassword/forgotPassword'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home/Home'
import Quiz from './components/Quiz/quiz'
import Signup from './components/Signup/Signup'
import Gamepage from './components/games/gamepage'
import Breathe from './components/BreathingExercise/BreathingExercise'
import Userprofile from './components/userprofile/userprofile'

function App() {
  return (
    //<div className='App'><button>Sign in with Google</button></div>
    <BrowserRouter>
      <Routes>
        <Route path='/ForgotPassword' element={<ForgotPassword />}></Route>
        <Route path='/Login' element={<Login />}></Route>
        <Route path='/Signup' element={<Signup />}></Route>
        <Route path='/Gamepage' element={<Gamepage />}></Route>
        <Route path='/Breathe' element={<Breathe />}></Route>
        <Route path= '/Quiz' element={<Quiz />}></Route>
        <Route path= '/Userprofile' element={<Userprofile />}></Route>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
