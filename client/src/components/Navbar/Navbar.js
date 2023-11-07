import React, { useState } from "react";
import { Link } from "react-router-dom";
export function Navbar(){
  //show dropdown
  const [isOpen, setIsOpen] = useState(false);
  
   

  

    //handleDropdown
    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };
 
    return(
      <>
     


      
         <nav className="sticky top-0  w-full h-16 bg-[#e9f1fc] text-black flex justify-between px-2 md:px-8 rounded-2xl  shadow-lg">
          <Link className="flex items-center " to ="/">
            <div className="flex items-center cursor-pointer">
              <p className=" font-buybusy ml-2 text-[#6c8aff] font-extrabold">HABITSA</p> 
            </div>

          </Link>
          
          

          <span  className=" flex my-auto text-xl cursor-pointer text-buybusy ">
            
                <div className="hidden sm:inline text-sm my-auto p-2  font-buybusy ">
                  {/* add Id and upgrade premium option here */}
                </div>                
            
            
           

            <div className="dropdown">
              <button className=" inline sm:hidden dropdown-toggle" onClick={toggleDropdown}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>


              </button>
     
            </div>

          </span>
          

         
      </nav>
      {isOpen && (
        <div className="animate__animated animate__fadeInDown flex flex-col items-center p-3 border-b-2 dropdown-list">
          <p>Profile</p>
          <p>Buy Premium</p>
        </div>
      )}
     

      </>
    )
}