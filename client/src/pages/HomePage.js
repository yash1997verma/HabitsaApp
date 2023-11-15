import { Navbar } from "../components/Navbar/Navbar"
import { ViewController } from "../components/ViewController/ViewController";
import { Outlet } from "react-router-dom";
import { useEffect  } from "react";
import { useNavigate } from "react-router-dom";
import { HabitForm } from "../components/Habit/HabitForm";
import { useSelector } from "react-redux";
export const HomePage = ()=>{
    
    const appView = useSelector(state=>state.habits.appView);
    const navigate = useNavigate();



    //to show add habit form
    const showHabitForm = useSelector((state)=>state.habits.showHabitForm);
   

    //this 
    // useEffect(()=>{
    //     if(appView==='weekly'){
    //         navigate('/weekly');
            
    //     }else if(appView=== 'today'){
    //         navigate("/");
    //     }
    // },[appView, navigate]);

    
    return(
        <>
        {showHabitForm && <HabitForm  />}
          <div className="h-screen w-screen  bg-gradient-to-b from-[#f9feff] to-[#e9f1fc] font-habitSans ">
            <Navbar />
            <ViewController 
                appView={appView} 
            />
            <Outlet  />
        </div>
        </>
      
        
    )
}