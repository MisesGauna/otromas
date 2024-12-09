// import { useEffect } from "react";  
// import { createContext, useContext, useState } from "react";  
// import { loginRequest, registerRequest, verifyTokenRequest } from "../api/auth";  
// import Cookies from "js-cookie";  

// const AuthContext = createContext();  

// export const useAuth = () => {  
//   const context = useContext(AuthContext);  
//   if (!context) throw new Error("useAuth must be used within a AuthProvider");  
//   return context;  
// };  

// export const AuthProvider = ({ children }) => {  
//   const [user, setUser] = useState(null);  
//   const [isAuthenticated, setIsAuthenticated] = useState(false);  
//   const [isAdmin, setIsAdmin] = useState(false); // Nuevo estado para verificar si es admin  
//   const [errors, setErrors] = useState([]);  
//   const [loading, setLoading] = useState(true);  

//   useEffect(() => {  
//     if (errors.length > 0) {  
//       const timer = setTimeout(() => {  
//         setErrors([]);  
//       }, 5000);  
//       return () => clearTimeout(timer);  
//     }  
//   }, [errors]);  

//   const signup = async (user) => {  
//     try {  
//       const res = await registerRequest(user);  
//       if (res.status === 200) {  
//         setUser(res.data);  
//         setIsAuthenticated(true);  
//         setIsAdmin(res.data.isAdmin || false); // Asumiendo que la respuesta incluye isAdmin  
//       }  
//     } catch (error) {  
//       console.log(error.response.data);  
//       setErrors(error.response.data.message);  
//     }  
//   };  

//   const signin = async (user) => {  
//     try {  
//       const res = await loginRequest(user);  
//       setUser(res.data);  
//       setIsAuthenticated(true);  
//       setIsAdmin(res.data.isAdmin || false); // Asumiendo que la respuesta incluye isAdmin  
//     } catch (error) {  
//       console.log(error);  
//       // setErrors(error.response.data.message);  
//     }  
//   };  

//   const logout = () => {  
//     Cookies.remove("token");  
//     setUser(null);  
//     setIsAuthenticated(false);  
//     setIsAdmin(false); // Restablecer el estado de admin al cerrar sesión  
//   };  

//   useEffect(() => {  
//     const checkLogin = async () => {  
//       const cookies = Cookies.get();  
//       if (!cookies.token) {  
//         setIsAuthenticated(false);  
//         setLoading(false);  
//         return;  
//       }  

//       try {  
//         const res = await verifyTokenRequest(cookies.token);  
//         console.log(res);  
//         if (!res.data) return setIsAuthenticated(false);  
//         setIsAuthenticated(true);  
//         setUser(res.data);  
//         setIsAdmin(res.data.isAdmin || false); // Establecer el estado de admin  
//         setLoading(false);  
//       } catch (error) {  
//         setIsAuthenticated(false);  
//         setLoading(false);  
//       }  
//     };  
//     checkLogin();  
//   }, []);  

//   return (  
//     <AuthContext.Provider  
//       value={{  
//         user,  
//         signup,  
//         signin,  
//         logout,  
//         isAuthenticated,  
//         isAdmin, // Proveer el estado de admin  
//         errors,  
//         loading,  
//       }}  
//     >  
//       {children}  
//     </AuthContext.Provider>  
//   );  
// };  

// export default AuthContext;

import { useEffect } from "react";  
import { createContext, useContext, useState } from "react";  
import { loginRequest, registerRequest, verifyTokenRequest } from "../api/auth";  
import Cookies from "js-cookie";  

const AuthContext = createContext();  

export const useAuth = () => {  
  const context = useContext(AuthContext);  
  if (!context) throw new Error("useAuth must be used within a AuthProvider");  
  return context;  
};  

export const AuthProvider = ({ children }) => {  
  const [user, setUser] = useState(null);  
  const [isAuthenticated, setIsAuthenticated] = useState(false);  
  const [isAdmin, setIsAdmin] = useState(false); // Estado para verificar si es admin  
  const [isRoot, setIsRoot] = useState(false); // Nuevo estado para verificar si es root  
  const [errors, setErrors] = useState([]);  
  const [loading, setLoading] = useState(true);  

  useEffect(() => {  
    if (errors.length > 0) {  
      const timer = setTimeout(() => {  
        setErrors([]);  
      }, 5000);  
      return () => clearTimeout(timer);  
    }  
  }, [errors]);  

  const signup = async (user) => {  
    try {  
      const res = await registerRequest(user);  
      if (res.status === 200) {  
        setUser(res.data);  
        setIsAuthenticated(true);  
        setIsAdmin(res.data.isAdmin || false); // Asumiendo que la respuesta incluye isAdmin  
        setIsRoot(res.data.isRoot || false); // Asumiendo que la respuesta incluye isRoot  
      }  
    } catch (error) {  
      console.log(error.response.data);  
      setErrors(error.response.data.message);  
    }  
  };  

  const signin = async (user) => {  
    try {  
      const res = await loginRequest(user);  
      setUser(res.data);  
      setIsAuthenticated(true);  
      setIsAdmin(res.data.isAdmin || false); // Asumiendo que la respuesta incluye isAdmin  
      setIsRoot(res.data.isRoot || false); // Asumiendo que la respuesta incluye isRoot  
    } catch (error) {  
      console.log(error);  
      // setErrors(error.response.data.message);  
    }  
  };  

  const logout = () => {  
    Cookies.remove("token");  
    setUser(null);  
    setIsAuthenticated(false);  
    setIsAdmin(false); // Restablecer el estado de admin al cerrar sesión  
    setIsRoot(false); // Restablecer el estado de root al cerrar sesión  
  };  

  useEffect(() => {  
    const checkLogin = async () => {  
      const cookies = Cookies.get();  
      if (!cookies.token) {  
        setIsAuthenticated(false);  
        setLoading(false);  
        return;  
      }  

      try {  
        const res = await verifyTokenRequest(cookies.token);  
        console.log(res);  
        if (!res.data) return setIsAuthenticated(false);  
        setIsAuthenticated(true);  
        setUser(res.data);  
        setIsAdmin(res.data.isAdmin || false); // Establecer el estado de admin  
        setIsRoot(res.data.isRoot || false); // Establecer el estado de root  
        setLoading(false);  
      } catch (error) {  
        setIsAuthenticated(false);  
        setLoading(false);  
      }  
    };  
    checkLogin();  
  }, []);  

  return (  
    <AuthContext.Provider  
      value={{  
        user,  
        signup,  
        signin,  
        logout,  
        isAuthenticated,  
        isAdmin, // Proveer el estado de admin  
        isRoot, // Proveer el estado de root  
        errors,  
        loading,  
      }}  
    >  
      {children}  
    </AuthContext.Provider>  
  );  
};  

export default AuthContext;