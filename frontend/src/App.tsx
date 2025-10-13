import { BrowserRouter, Routes, Route } from 'react-router'
import { AuthProvider, ProtectedRoutes } from './providers/AuthProvider'
import UnprotectedRoutes from './pages/UnprotectedRoutes'

// pages
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'

import Admin from './pages/Admin'
import NoPage from './pages/NoPage'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<UnprotectedRoutes/>}>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            
            <Route path='/admin' element={<Admin />} /> 
          </Route>
          <Route path='/dashboard' element={<ProtectedRoutes/>}>
            {/* <Route path='/dashboard' element={<Dashboard />} /> */}
          </Route>
          <Route path='*' element={<NoPage/>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
