import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getTodayHabitsAsync } from "../../../redux/habitsSlice";
import { HabitToday } from "./HabitToday";

export const TodayView = ({ toggleHabitForm }) => {

   
    //get habits from store
    const habits = useSelector((state)=> state.habits.habits);
    //get appView
    const appView = useSelector((state)=>state.habits.appView);
    const [localHabits, setLocalHabits] = useState(habits);


    const dispatch = useDispatch();

    const getHabits = () => {
        dispatch(getTodayHabitsAsync());//get today's habits
    }

    

    useEffect(()=>{
        getHabits();
        setLocalHabits(habits);
    }, [habits]);

  
    

    return (
        <div className="flex items-center justify-center mx-8 mt-2">
            <div className="border overflow-hidden shadow-lg rounded-xl w-full md:w-[600px] lg:w-[700px]">
                <table className="font-mono font-extralight w-full">
                    <thead>
                        <tr className="bg-[#fafbfd] text-[#909cc9]">
                            <th className="pl-4 py-2 w-[30px]"></th>
                            <th className="pl-4 py-2 text-left">Habits</th>
                            <th className="pl-4 py-2">Progress</th>
                            <th className="pl-4 py-2">Goal</th>
                            <th className="pl-4 py-2 w-[100px]">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {console.log(localHabits)} */}
                        {localHabits.map((habit, i) => (
                            <tr
                                key={habit._id}
                                className={`text-center ${(i % 2 !== 0) ? "bg-[#fafbfd]" : "bg-[#ecf3fd]"}`}
                            >
                                <HabitToday habit={habit} />
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
