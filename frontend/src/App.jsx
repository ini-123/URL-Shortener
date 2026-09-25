import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './Routes/AppRoutes'
import { AuthProvider } from './Context/AuthProvider'
import { ThemeProvider } from './Context/ThemeContext'

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App