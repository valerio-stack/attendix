import { useState, useEffect, useRef } from 'react'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom'
import FirstView from './firstView/firstView';
import SignUp_signIn from './getStarted/getStarted'
import MainPage from './mainPage/mainPage'
import Room from './room/room'


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FirstView/>}/>
          <Route path="/getStarted" element={<SignUp_signIn/>}/>

          <Route 
            path='/mainPage' 
            element={ <MainPage/>}
          />

          <Route 
            path={`/room/:roomNameNId`} 
            element={<Room/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
