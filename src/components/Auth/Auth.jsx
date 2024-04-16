import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
// import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import Input from "../constants/input";
import Button from "../constants/Button";

const AuthForm = () => {
  // const navigate = useNavigate();

  const [variant, setVariant] = useState("LOGIN");
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: ""
    }
  });

  useEffect(() => {
    // Implement redirection logic here if needed
  }, []);

  const toggleVariant = useCallback(() => {
    setVariant((prevVariant) => (prevVariant === "LOGIN" ? "REGISTER" : "LOGIN"));
  }, []);

  const onSubmit = async (data) => {
    setIsLoading(true);

    try {
      if (variant === "REGISTER") {
        await axios.post("/api/auth/register", data);
        // Handle successful registration
        toast.success("Registered successfully!");
        // navigate("/Users");
        
      }

      if (variant === "LOGIN") {
        await axios.post("/api/auth/login", data);
        // Handle successful login
        toast.success("Registered successfully!");
        // navigate("/Users");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

//   const socialAction = async (action) => {
//     setIsLoading(true);

//     try {
//       // Handle social login
//     } catch (error) {
//       toast.error("Something went wrong!");
//     } finally {
//       setIsLoading(false);
//     }
//   };

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md" >
      <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10
      
      ">
        <form className="bg-white space-y-6 border border-blue-300 border-solid rounded-md p-4" onSubmit={handleSubmit(onSubmit)}>
          {variant === "REGISTER" && (
            <Input
              disabled={isLoading}
              register={register}
              errors={errors}
              required
              id="name"
              label="Name"
            />
          )}
          <Input
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            id="email"
            label="Email address"
            type="email"
          />
          <Input
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            id="password"
            label="Password"
            type="password"
          />
          <div>
            <Button disabled={isLoading} fullWidth type="submit">
              {variant === "LOGIN" ? "Sign in" : "Register"}
            </Button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">Or continue with</span>
            </div>
          </div>

          {/* <div className="mt-6 flex gap-2">
            <AuthSocialButton
              icon={BsGithub}
              onClick={() => socialAction("github")}
            />
            <AuthSocialButton
              icon={BsGoogle}
              onClick={() => socialAction("google")}
            />
          </div> */}
        </div>

        <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
          <div>{variant === "LOGIN" ? "New to Oneclickshop?" : "Already have an account?"}</div>
          <div onClick={toggleVariant} className="underline cursor-pointer">
            {variant === "LOGIN" ? "Create an account" : "Login"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
