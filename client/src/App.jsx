import './App.css'
import {Route,Routes} from 'react-router-dom'
import IndexPage from './pages/IndexPage'
import LoginPage from './pages/LoginPage'
import Layout from './Layout'
import RegisterPage from './pages/RegisterPage'
import axios from 'axios'
import { UserContextProvider } from './UserContext'
import ProfilePage from './pages/ProfilePage'
import MyItemsPage from './pages/MyItemsPage'
import ItemsFormPage from './pages/ItemsFormPage'
import ItemPage from './pages/ItemPage'
import MyBookingsPage from './pages/MyBookingsPage'
import BookingPage from './pages/BookingPage'



// DEFINING A BASE URL FOR SERVER
// not use local host in place of 127.0.0.1 as it give error in the set cookie in response header 
axios.defaults.baseURL='http://127.0.0.1:4000';
axios.defaults.withCredentials=true;

function App() {
 
  return (
 // making usercontextprovider available to all nested componets

  <UserContextProvider>
      <Routes>
        <Route path='/' element={<Layout/>}>
           {/* RENDER A PARTICULAR COMPONENT WHEN VISIT TO PARTICULAR PATH  */}
            <Route index element={<IndexPage/>}/>
            <Route path='/login' element={<LoginPage/>}/>
            <Route path='/register' element={<RegisterPage/>}/>
            <Route path='/account' element={<ProfilePage/>}/>
            <Route path='/account/items' element={<MyItemsPage/>}/>
            <Route path='/account/items/new' element={<ItemsFormPage/>}/>
            <Route path='/account/items/:id' element={<ItemsFormPage/>}/>
            <Route path='/item/:id' element={<ItemPage/>}/>
            <Route path='/account/bookings' element={<MyBookingsPage/>}/>
            <Route path='/account/bookings/:id' element={<BookingPage/>}/>
        </Route>
      </Routes>
  </UserContextProvider>
  )
}


export default App
