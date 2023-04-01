import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './style.css'
import './App.css'

import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Navigate, Route, Routes , useNavigate } from 'react-router-dom'
import Home from './pages/Home'
import Details from './pages/Details'
import AddEditBlog from './pages/AddEditBlog'
import NotFound from './pages/NotFound'
import Auth from './pages/Auth'
import Header from './components/Header'
import { auth } from './firebase'
import { signOut } from 'firebase/auth'

function App() {
  const [count, setCount] = useState(0)
  const [active,setActive] = useState('home')
  const [user,setUser] = useState(null)

  const navigate = useNavigate()


  //call data from data base by use effect

  useEffect(()=>{
    auth.onAuthStateChanged((authUser)=>{
      if(authUser){
        setUser(authUser)
      }else {
        setUser(null)
      }
    })
  },[])


  const handleLogout = ()=>{
    signOut(auth).then(()=>{
      setUser(null)
      setActive('login')
      navigate('/auth')
    })
  }
  console.log(user)


  return (
    <>
      <Header setActive={setActive} active={active} user={user} handleLogout={handleLogout}/>
      <ToastContainer position="top-center"/>

      <Routes>
        <Route path='' element={ <Home  setActive={setActive} user={user} />} />
        <Route path='/details/:id' element={<Details setActive={setActive}/>}  />
        <Route path='/create' element={user?.uid?<AddEditBlog user={user}/>:<Navigate to="/"/>}  />
        <Route path='/update/:id' element={user?.uid?<AddEditBlog user={user} setActive={setActive}/>:<Navigate to="/"/>} />
        <Route path='/auth' element={<Auth setActive={setActive}/>} />
        <Route path='*' element={<NotFound/>} />
      </Routes>
    </>
  )
}

export default App
