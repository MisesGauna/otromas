import { useAuth } from "../context/authContext";  
import { Link, useNavigate } from "react-router-dom";  
import { useForm } from "react-hook-form";  
import { useEffect, useRef, useState } from "react";  
import { zodResolver } from "@hookform/resolvers/zod";  
import { Card, Message, Button, Input, Label } from "../components/ui";  
import { loginSchema } from "../schemas/auth";  
import ReCAPTCHA from "react-google-recaptcha";  
import {API_KEY_CAPTCHA} from "../config"

export function LoginPage() {  
  const captcha = useRef(null);  
  const [captchaVerified, setCaptchaVerified] = useState(false); // Estado para verificar el captcha  

  const onChange = (value) => {  
    console.log("Captcha value:", value);  
    setCaptchaVerified(!!value); // Establece el estado según si hay un valor  
  };  

  const {  
    register,  
    handleSubmit,  
    formState: { errors },  
  } = useForm({  
    resolver: zodResolver(loginSchema),  
  });  
  const { signin, errors: loginErrors, isAuthenticated } = useAuth();  
  const navigate = useNavigate();  

  const onSubmit = (data) => {  
    if (captchaVerified) {  
      signin(data); // Solo inicia sesión si el captcha fue verificado  
    }  
  };  

  useEffect(() => {  
    if (isAuthenticated) {  
      navigate("/tasks");  
    }  
  }, [isAuthenticated]);  

  return (  
    <div className="h-[calc(100vh-100px)] max-w-md flex items-center justify-center">  
      <Card>  
        {loginErrors.map((error, i) => (  
          <Message message={error} key={i} />  
        ))}  
        <h1 className="text-2xl font-bold">Login</h1>  

        <form onSubmit={handleSubmit(onSubmit)}>  
          <Label htmlFor="email">Email:</Label>  
          <Input  
            label="Write your email"  
            type="email"  
            name="email"  
            placeholder="youremail@domain.tld"  
            {...register("email", { required: true })}  
          />  
          <p>{errors.email?.message}</p>  

          <Label htmlFor="password">Password:</Label>  
          <Input  
            type="password"  
            name="password"  
            placeholder="Write your password"  
            {...register("password", { required: true, minLength: 6 })}  
          />  
          <p>{errors.password?.message}</p>  

          <div className="recaptcha mt-4 flex">  
            <ReCAPTCHA  
              ref={captcha}  
              sitekey={API_KEY_CAPTCHA}
              onChange={onChange}  
            />  
          </div>  

          <Button type="submit" disabled={!captchaVerified}>Login</Button> {/* Deshabilitar si no está verificado */}  
        </form>  

        <p className="flex gap-x-2 justify-between">  
          Don't have an account? <Link to="/register" className="text-sky-500">Sign up</Link>  
        </p>  
      </Card>  
    </div>  
  );  
}