import React from "react";
import { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faOpencart } from "@fortawesome/free-brands-svg-icons";
import { useUserContext } from "../contexts/userContext";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function SignUp(){
    const {signUp} = useUserContext();
    const submitForm =(e)=>{
        e.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const samePass = samePassRef.current.value ;
        if(password !== samePass) {
            toast.error("Password don't match!!")
            return;
        }
        signUp(email, password);
    }
    //use Ref to get references from form
    const emailRef = useRef();
    const passwordRef = useRef();
    const samePassRef = useRef();

    useEffect(() => {
        // Disable scroll when the component mounts
        document.body.style.overflow = "hidden";
    
        // Re-enable scroll when the component unmounts
        return () => {
          document.body.style.overflow = "auto";
        };
      }, []);
    return (
        <>  
            <div className=" flex  items-center justify-center h-screen w-screen ">
                <div className=" flex justify-between border-1 border-slate-300 rounded-xl gap-8 md:gap-20  shadow-lg p-6 mt-[-100px] md:w-[900px]">
                  
                    <img className="h-[300px] w-[300px] hidden sm:inline my-auto " src="/Illustrations/signUp.svg" alt="" />
                    <form onSubmit={submitForm} className="flex flex-col h-[500px] w-[300px] sm:h-auto sm:w-auto gap-2 text-2xl p-auto md:pr-10">
                        <div className="mx-auto mb-6 ">
                            <FontAwesomeIcon className="text-xl ml-3 " icon={faOpencart}  style={{color: "#007bff",}} />
                            <p className="text-xl  font-sans  ">Sign Up</p> 
                        </div>
                        <label className="font-buybusy" >Email</label>
                        <input required className="border-2 rounded-md h-[60px] p-4 " spellCheck="false" ref={emailRef} placeholder="johndoe@gmail.com" type="email"  />
                        <label className="font-buybusy" >Password</label>
                        <input required className="border-2 rounded-md h-[60px] p-4 font-sans font-thin" ref={passwordRef} placeholder="Create a strong password" type="password" />
                        <label className="font-buybusy" >Confirm Password</label>
                        <input required className="border-2 rounded-md h-[60px] p-4 font-sans font-thin" ref={samePassRef} placeholder="Re-enter your password" type="password" />
                        <button type="submit"  className="border-2 rounded-md h-[40px] p-2 font-sans font-thin flex items-center justify-center bg-[#6c63ff] text-white">Sign Up</button>

                        <div className="flex justify-between mt-4">
                            <p className="font-sans text-lg">Already have an account ? </p>
                            <Link to="/signIn"><a className="font-sans text-lg text-blue-600 " href="/">Sign In</a></Link>
                        </div>
                    </form>      
                </div>         
            </div>
        </>
    )
}