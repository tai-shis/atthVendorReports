import { BrowserRouter, Routes, Route } from 'react-router'
import { AuthProvider } from './providers/AuthProvider'
import ProtectedRoutes from './routes/ProtectedRoutes'
import UnprotectedRoutes from './routes/UnprotectedRoutes'

// pages
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Admin from './pages/Admin'

import Dashboard from './pages/Dashboard'
import DashboardHome from './pages/DashboardHome'
import DashboardOrders from './pages/DashboardOrders'
import DashboardSettings from './pages/DashboardSettings' 

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
          <Route element={<ProtectedRoutes/>}>
            <Route path='/dashboard' element={<Dashboard />}>
              <Route path='/dashboard/' element={<DashboardHome />} />
              <Route path='/dashboard/orders' element={<DashboardOrders />} />
              <Route path='/dashboard/settings' element={<DashboardSettings />} />
            </Route>
          </Route>
          <Route path='*' element={<NoPage/>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
