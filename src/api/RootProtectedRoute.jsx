// routes/RootProtectedRoute.jsx  
import { Navigate } from "react-router-dom";  
import { useAuth } from "../context/authContext";  

const RootProtectedRoute = ({ children }) => {  
  const { isAuthenticated, user } = useAuth(); // Suponiendo que el contexto auth devuelve el objeto del usuario  

  if (!isAuthenticated || !user?.isRoot) {  
    return <Navigate to="/" />; // Redirigir a la página de inicio si no está autenticado o no es root  
  }  

  return children; // Si es root, renderiza el componente hijo  
};  

export default RootProtectedRoute;