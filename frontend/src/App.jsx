import { BrowserRouter } from "react-router-dom"
import AppRoutes from './Routes/AppRoutes'
import { ThemeProvider } from "./context/ThemeContext"
import { AuthProvider } from "./Context/AuthContext"

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