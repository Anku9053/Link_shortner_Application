import React from 'react'
import { Route, Routes } from 'react-router-dom'
import RedirectUrl from './RedirectUrl'
import ShortenUrlForm from './ShortenUrlForm'
import Signup from '../Pages/Signup'
import Login from '../Pages/Login'

export const MainRoutes = () => {
  return <Routes>
    <Route path="/:shortUrl" element={<RedirectUrl/>}/>
    <Route path="/" element={<ShortenUrlForm/>}/>
    <Route path="/login" element={<Login/>}/>

    <Route path="/signup" element={<Signup/>}/>

  </Routes>
}
