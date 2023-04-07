import { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { toast } from "react-toastify";
import React from "react"
import "./login/login.css"
import back from "../assets/images/my-account.jpg"
import { db } from "../firebase";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";


export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = formData;
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
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      updateProfile(auth.currentUser, {
        displayName: name,
      });
      const user = userCredential.user;
      const formDataCopy = { ...formData };
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();

      await setDoc(doc(db, "users", user.uid), formDataCopy);
     toast.success("Sign up was successful");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Something went wrong with the registration");
    }
  }
  return (
    <section>

     <>
      <section className='login'>
        <div className='container'>
          <div className='backImg'>
            <img  src="https://images.unsplash.com/flagged/photo-1564767609342-620cb19b2357?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1373&q=80" alt='' />
            <div className='text'>
              <h3>Sign up</h3>
              <h1>New User</h1>
            </div>
          </div>

          <form onSubmit={onSubmit} >
           <span>Username *</span>
            
            <input       type=""
                type="text"
              id="name"
              value={name}
              onChange={onChange}
              placeholder="Full name" required />
            <span>Email address *</span>

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
            <button className='button'>Sign up</button>
             <p className="mb-6 p-1">
                Have a account?
                <Link
                  to="/login"
                  className="text-red-600 p2 hover:text-red-700 transition duration-200 ease-in-out ml-1"
                >
                  Login
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
