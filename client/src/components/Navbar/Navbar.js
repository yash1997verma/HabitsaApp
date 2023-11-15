import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { habitsActions } from "../../redux/habitsSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";  
import toast from "react-hot-toast";
export function Navbar(){
  //app view, this will control, what is displayed on screen
  const appView = useSelector(state=> state.habits.appView);
  const dispatch = useDispatch();

  //to navigate between views
  const navigate = useNavigate();
  //show dropdown
  const [isOpen, setIsOpen] = useState(false);
  
  //change app view
  const changeAppView = (view)=>{
    // if(view === 'today'){
    //   navigate('/');

    // }else if(view === 'weekly'){
    //   navigate('/weekly')
    // }

    dispatch(habitsActions.setAppView(view));

  }
   

  //handleDropdown
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };


  //this controlls the view when app is mounted first or  reloaded or when the view changes 
  useEffect(()=>{
    if(appView==='weekly'){
      navigate('/weekly');
    }else if(appView=== 'today'){
      navigate("/");
    } 
  },[appView, navigate]);
 
  return(
    <>
    

    
      <nav className=" sticky top-0  w-full h-[64px] bg-[#e9f1fc] text-black flex justify-between px-2 md:px-8 rounded-2xl  shadow-lg">
        
        <Link className="flex items-center mx-auto " to ="/">
          <div className="flex items-center cursor-pointer">
            <img className="w-6 h-6" src="/icons/habitsLogo.png" alt="not foun" />
            <p className=" font-buybusy ml-2 text-[#6c8aff] font-extrabold text-[20px]">Habitsa</p> 
          </div>

        </Link>
    

        

        {/* <span  className=" flex my-auto text-xl cursor-pointer text-buybusy ">
          
              <div className="hidden sm:inline text-sm my-auto p-2  font-buybusy ">
                
              </div>                
          
          
          

          <div className="dropdown">
            <button className=" inline sm:hidden dropdown-toggle" onClick={toggleDropdown}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>


            </button>
    
          </div>

        </span> */}
        

        
      </nav>

      {/* {isOpen && (
        <div className="animate__animated animate__fadeInDown flex flex-col items-center p-3 border-b-2 dropdown-list">
          <p>Profile</p>
          <p>Buy Premium</p>
        </div>
      )} */}


    
      {/*Side Nav */}
      <div className="fixed gap-8 flex flex-col items-center shadow-lg from-[#f9feff] to-[#e9f1fc] p-4 h-full w-[90px]">
        




        {/* today view */}
        <div onClick={() => changeAppView('today')}  className= {` flex flex-col items-center justify-center h-[80px] w-[60px] rounded-xl  shadow-md cursor-pointer  hover:bg-blue-100 ${appView === 'today' ? 'bg-blue-200': 'bg-white'} `}>
          <img className="w-8 h-8" src="/icons/today.png" alt='N/A' />
          <p className="select-none p-2 text-[10px] font-habitSans font-bold">TODAY</p>
        </div>

        {/* weekly view */}
        <div onClick={() => changeAppView('weekly')}  className={` flex flex-col items-center justify-center h-[80px] w-[60px] rounded-xl  shadow-md cursor-pointer  hover:bg-blue-100 ${appView === 'weekly' ? 'bg-blue-200': 'bg-white'} `}>
          <img className="w-8 h-8" src="/icons/weekly.png" alt='N/A' />
          <p className="select-none p-2 text-[10px] font-habitSans font-bold">WEEKLY</p>
        </div>

        {/* <div onClick={() => changeAppView('habit')}  className={` flex flex-col items-center justify-center h-[80px] w-[60px] rounded-xl  shadow-md cursor-pointer  hover:bg-blue-100 ${appView === 'habit' ? 'bg-blue-200': 'bg-white'} `}>
          <img className="w-8 h-8" src="/icons/viewHabit.png" alt='N/A' />
          <p className="text-center p-2 text-[10px] font-habitSans font-bold">VIEW HABIT</p>
        </div>

        <div onClick={() => changeAppView('settings')} className={`flex flex-col items-center justify-center h-[80px] w-[60px] rounded-xl  shadow-md cursor-pointer  hover:bg-blue-100 ${appView === 'settings' ? 'bg-blue-200': 'bg-white'} `}>
          <img className="w-8 h-8" src="/icons/settings.png" alt='N/A' />
          <p className="select-none text-center p-2 text-[10px] font-habitSans font-bold">SETTINGS</p>
        </div> */}

        {/* profile */}
        {/* <div className="flex flex-col items-center justify-center h-[80px] w-[60px] rounded-xl shadow-md  cursor-pointer ">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div> */}

        {/* logout */}
        <div className="absolute flex flex-col items-center bottom-[100px] cursor-pointer " title="Logout">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
          </svg>
          <p className="select-none text-center p-2 text-[10px] font-habitSans font-bold">LOGOUT</p>

        </div>
      </div>

    </>
  )
}