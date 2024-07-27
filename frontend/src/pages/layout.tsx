import { Outlet } from 'react-router-dom'
import Navbar from '../components/Client/Navbar'

const layout = () => {
  return (
    <>
    <Navbar/>
    <Outlet/>
    
    </>
  )
}

export default layout