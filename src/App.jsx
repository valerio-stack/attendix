import { useState, useEffect, useRef } from 'react'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom'
import FirstView from './firstView/firstView';
import SignUp_signIn from './getStarted/getStarted'
import MainPage from './mainPage/mainPage'
import Room from './room/room'


function App() {
  let [cookie, set_cookie] = useState(document.cookie)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={(cookie === '') ? <FirstView/> : <MainPage/>}/>
          <Route path="/getStarted" element={<SignUp_signIn set_cookie={set_cookie}/>}/>

          <Route 
            path={`/room/:roomNameNId`} 
            element={<Room/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
