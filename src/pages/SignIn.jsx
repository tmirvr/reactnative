import { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { toast } from "react-toastify";
import React from "react"
import "./login/login.css"
import back from "../assets/images/my-account.jpg"

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const navigate = useNavigate();
  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }
  async function onSubmit(e) {
    e.preventDefault();
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredential.user) {
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error("Bad user credentials");
    }
  }
  return (
    <section>

     <>
      <section className='login'>
        <div className='container'>
          <div className='backImg'>
            <img src={back} alt='' />
            <div className='text'>
              <h3>Login</h3>
              <h1>My account</h1>
            </div>
          </div>

          <form onSubmit={onSubmit} >
            <span>Username or email address *</span>
            <input       type="email"
              id="email"
              value={email}
              onChange={onChange}
              placeholder="Email address" required />
            <span>Password *</span>
            <input  type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={onChange}
                placeholder="Password"
                className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"  required />
            <button className='button'>Log in</button>
             <p className="mb-6 p-1">
                Don't have a account?
                <Link
                  to="/signup"
                  className="text-red-600 p2 hover:text-red-700 transition duration-200 ease-in-out ml-1"
                >
                  Register
                </Link>
              </p>
          </form>
        </div>

      </section>
    </>

      <div className="flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto">
 
        <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-20">
        
        </div>
      </div>
    </section>
  );
}
