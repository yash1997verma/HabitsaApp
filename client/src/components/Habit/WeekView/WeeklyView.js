import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeelyHabitsAsync } from "../../../redux/habitsSlice";
import { HabitWeekly } from "./HabitWeekly";
import toast from "react-hot-toast";
export const WeeklyView = ({ toggleHabitForm }) => {

    //to get loading state of data from api
    const loadingStatus = useSelector(state=> state.habits.status);
    //get app view
    const appView = useSelector(state=> state.habits.appView);
    //current week range
    const startOfWeek = useSelector(state=> state.habits.startOfWeek);
    const endOfWeek = useSelector(state=> state.habits.endOfWeek);
    
    //get habits from store
    const habits = useSelector((state)=> state.habits.habits);

    const dispatch = useDispatch();

    //get habits for the curr week range
    const getHabits = () => {
        dispatch(fetchWeelyHabitsAsync({startOfWeek, endOfWeek} ));//payload start and end of week
    }

   

    useEffect(()=>{
        getHabits();
       
    }, [startOfWeek,endOfWeek]); // fetch the habits again if the app view is switched
    
    useEffect(()=>{

         toast('Weekly View', {
            icon:  <img className="w-4 h-4" src="/icons/weekly.png" alt='N/A' />,
           
        });
    },[])
    return (
        <div className="flex items-center justify-center mx-8 mt-2">
            <div className="border overflow-hidden shadow-lg rounded-xl w-full md:w-[600px] lg:w-[700px]">
                {/*Loading skeleton  */}
                {loadingStatus ==='loading' && 
                    <>
                        <p className="text-center font-habitSans font-bold">Please wait back-end service is loading !!</p>

                        <table className="font-mono font-extralight w-full">
                            <thead>
                            <tr className="h-10 w-full">
                                <th>
                                </th>
                            </tr>
                            </thead>

                            <tbody className="border  shadow rounded-md  w-full mx-auto">
                            
                                {Array.from({ length: 3 }).map((_, index) => (
                                    <tr className="" key={index}>
                                        
                                        <td className="pl-4 py-4 text-start">
                                            <div className="animate-pulse h-2 w-[40px] px-4 bg-slate-200 rounded"></div>
                                        </td>
                                        <td className="pl-4 py-4">
                                            <div className="w-6 h-6 animate-pulse rounded-full bg-slate-200"></div>
                                        </td>
                                        <td className="pl-4 py-4">
                                            <div className="w-6 h-6 animate-pulse rounded-full bg-slate-200"></div>
                                        </td>
                                        <td className="pl-4 py-4">
                                            <div className="w-6 h-6 animate-pulse rounded-full bg-slate-200"></div>
                                        </td>
                                        <td className="pl-4 py-4">
                                            <div className="w-6 h-6 animate-pulse rounded-full bg-slate-200"></div>
                                        </td>
                                        <td className="pl-4 py-4">
                                            <div className="w-6 h-6 animate-pulse rounded-full bg-slate-200"></div>
                                        </td>
                                        <td className="pl-4 py-4">
                                            <div className="w-6 h-6 animate-pulse rounded-full bg-slate-200"></div>
                                        </td>
                                        <td className="pl-4 py-4">
                                            <div className="w-6 h-6 animate-pulse rounded-full bg-slate-200"></div>
                                        </td>
                                        <td className="pl-4 py-4 ">
                                            <div className="animate-pulse h-2 w-[20px] mx-auto bg-slate-200 rounded"></div>
                                        </td>
                                        
                                        
                                        <td className="pl-4 py-4">
                                            <div className="flex items-center justify-center animate-pulse">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#909295" className="w-6 h-6 rounded-full">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                                                </svg>
                                            </div>
                                        </td>
                                        </tr>
                                ))}
                            </tbody>
                        </table>
                    </>

                }
                
                {loadingStatus === 'succeeded' && //display table body when the data is recieved from api
                <table className="font-mono font-extralight w-full">
                    <thead>
                        <tr className="bg-[#fafbfd] text-[#909cc9]">
                            <th className="pl-4 py-2 text-left">Habits</th>
                            <th className="pl-4 py-2 text-center">M</th>
                            <th className="pl-4 py-2 text-center">T</th>
                            <th className="pl-4 py-2 text-center">W</th>
                            <th className="pl-4 py-2 text-center">T</th>
                            <th className="pl-4 py-2 text-center">F</th>
                            <th className="pl-4 py-2 text-center">S</th>
                            <th className="pl-4 py-2 text-center">S</th>
                            
                            <th className="pl-4 py-2">Progress</th>
                            <th className="pl-4 py-2">Goal</th>
                            <th className="pl-4 py-2 w-[100px]">Action</th>
                        </tr>
                    </thead>
                    
                    <tbody>
                        {/* {console.log(localHabits)} */}
                        {habits.map((habit, i) => (
                            <tr
                                key={habit._id}
                                className={`text-center ${(i % 2 !== 0) ? "bg-[#fafbfd]" : "bg-[#ecf3fd]"}`}
                            >
                                <HabitWeekly habit={habit} />
                            </tr>
                        ))}
                    </tbody>
                </table>
            }
            </div>
        </div>
    )
}
