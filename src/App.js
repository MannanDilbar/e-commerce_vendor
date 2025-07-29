import React from 'react'
import { Route, Routes } from 'react-router-dom'
import './scss/style.scss';
import RequireAuth from './components/RequireAuth';



// Containers
import DefaultLayout from './layout/DefaultLayout';
import Login from './views/login/Login';




const App = () => {


  /* fetch('https://api.ipify.org?format=json').then(response => {
    return response.json();
  }).then((res) => {
    console.log( res.ip);
  }).catch((err) => console.error('Problem fetching my IP', err))
 */

 // console.log(window.location.origin)


  return (
    <Routes>     
          
      <Route element={<RequireAuth />}>
        <Route exact path="*" name="Home" element={<DefaultLayout />} />        
      </Route>
      <Route exact path="*" name="Home" element={<DefaultLayout />} />        
      <Route exact path="login" name="Login Page" element={<Login />} />    
    </Routes>

  )
}


export default App
