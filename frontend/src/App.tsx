import { BrowserRouter, Routes, Route } from 'react-router'
import { AuthProvider, ProtectedRoutes } from './providers/authProvider'

// pages
import Home from './pages/Home'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route element={<ProtectedRoutes/>}>
          
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
