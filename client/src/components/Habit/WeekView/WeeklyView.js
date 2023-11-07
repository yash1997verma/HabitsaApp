import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeelyHabitsAsync } from "../../../redux/habitsSlice";
import { HabitWeekly } from "./HabitWeekly";

export const WeeklyView = ({ toggleHabitForm }) => {

    // Get the current month from the store
    // const selectedMonth = useSelector((state) => state.habits.selectedMonth);
    
    //at every render we also need to know which week of month is getting rendered
    //get the current week from store
    // const selectedWeek = useSelector(state=> state.habits.selectedWeek);



    //current week range
    const startOfWeek = useSelector(state=> state.habits.startOfWeek);
    const endOfWeek = useSelector(state=> state.habits.endOfWeek);
    
    //get habits from store
    const habits = useSelector((state)=> state.habits.habits);

    const [localHabits, setLocalHabits] = useState(habits);


    const dispatch = useDispatch();

    //get habits for the curr week range
    const getHabits = () => {
        dispatch(fetchWeelyHabitsAsync({startOfWeek, endOfWeek} ));//payload start and end of week
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
                        {localHabits.map((habit, i) => (
                            <tr
                                key={habit._id}
                                className={`text-center ${(i % 2 !== 0) ? "bg-[#fafbfd]" : "bg-[#ecf3fd]"}`}
                            >
                                <HabitWeekly habit={habit} />
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
