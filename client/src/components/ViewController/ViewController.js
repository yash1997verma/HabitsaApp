import { Button } from "../ui/Button/Button"
import { useDispatch, useSelector } from "react-redux";
import { habitsActions } from "../../redux/habitsSlice";
import { format, addWeeks, subWeeks } from "date-fns"; // Import date-fns functions
export const ViewController = ({appView, })=>{
    const dispatch = useDispatch();
   
    


    //get the start and end of week
    const startOfWeek = useSelector(state=>state.habits.startOfWeek); 
    const endOfWeek = useSelector(state=>state.habits.endOfWeek);
    
   

    // Function to handle "Next" button click
    const handleNextWeek = () => {
        const nextStartOfWeek = addWeeks(new Date(startOfWeek), 1);
        const nextEndOfWeek = addWeeks(new Date(endOfWeek), 1); // Update both start and end
        dispatch(habitsActions.setStartOfWeek(nextStartOfWeek.toISOString()));
        dispatch(habitsActions.setEndOfWeek(nextEndOfWeek.toISOString()));
    };

    // Function to handle "Prev" button click
    const handlePrevWeek = () => {
        const prevStartOfWeek = subWeeks(new Date(startOfWeek), 1);
        const prevEndOfWeek = subWeeks(new Date(endOfWeek), 1); // Update both start and end
        dispatch(habitsActions.setStartOfWeek(prevStartOfWeek.toISOString()));
        dispatch(habitsActions.setEndOfWeek(prevEndOfWeek.toISOString()));
    };

 
    const formatWeekRange = (startDate, endDate) => {
        const formattedStartDate = format(new Date(startDate), "do MMM yy");
        const formattedEndDate = format(new Date(endDate), "do MMM yy");
        return `${formattedStartDate} to ${formattedEndDate}`;
      };
      
      const weekDisplay = formatWeekRange(startOfWeek, endOfWeek);
    
    
    
    //handle add habit, this will show the habit form
    const handleAddHabit = ()=>{
        dispatch(habitsActions.toggleHabitForm());
    }

    return (
        <div className="mx-8 mt-8 flex items-center justify-center">
            
            <div className="w-full md:w-[600px] lg:w-[700px]">
             
                <div className=" flex justify-between mt-4 ">
                    <p className="pt-2 font-semibold">List of Habits</p>

                    <Button
                        onButtonClick={handleAddHabit}
                        icon={
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="#3db1e3"
                                className="w-4 h-4 mr-1 mt-[2px]"
                                >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 4.5v15m7.5-7.5h-15"
                                />
                            </svg>
                        }
                        text={"ADD HABIT"}
                    />
                </div>
                {/* for showing current week view, and switiching btw weeks */}
                {appView === 'weekly' && 
                    <div className="flex justify-between mt-10">
                        <p>{weekDisplay}</p>
                        <div className="">
                            <button
                                className="border-[1px] rounded-[4px] mx-1 border-black px-2 font-extralight"
                                onClick={handlePrevWeek}
                            >
                                Prev
                            </button>
                            <button
                                className="border-[1px] rounded-[4px] mx-1 border-black px-2"
                                onClick={handleNextWeek}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                }
            </div>  
            
            
       
      </div>
    )
}