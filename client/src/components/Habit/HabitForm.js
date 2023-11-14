import { useEffect, useRef } from "react";
// import { Button } from "../Button/Button";
import  {useDispatch, useSelector} from 'react-redux';
import { addHabitAsync } from "../../redux/habitsSlice";
import { habitsActions } from "../../redux/habitsSlice";
import { editHabitAsync } from "../../redux/habitsSlice";
export const HabitForm = () => {
    const currMonth = useSelector((state)=>state.habits.selectedMonth);
    const editHabit = useSelector((state=> state.habits.editHabit));
    const dispatch = useDispatch();
    //get form data
    const nameRef = useRef();
    const goalRef = useRef();
    const descRef = useRef();
    const startRef = useRef();
    const endRef = useRef();

    useEffect(()=>{
        if (editHabit.bool) {
            nameRef.current.value = editHabit.habit.name;
            descRef.current.value = editHabit.habit.description;
            startRef.current.value = new Date(editHabit.habit.startDate).toISOString().slice(0, 10);
            endRef.current.value = new Date(editHabit.habit.endDate).toISOString().slice(0, 10);//convert date, to pre-fill from
            goalRef.current.value = editHabit.habit.goal;  
        } else {
            nameRef.current.value = "";
            goalRef.current.value = "";
            descRef.current.value = "";
        }
    },[])

    //handle add habit, we will handle edit habit also with same
const handleAdd = (e)=>{
        e.preventDefault();
        
        if(editHabit.bool){//edit habit with new data
            console.log('edit')
            //create a new habit with new details
            const newHabit = {
                name: nameRef.current.value,
                description: descRef.current.value,
                startDate: startRef.current.value,
                endDate: endRef.current.value,
                goal: goalRef.current.value,
                progress: editHabit.habit.progress,// event if the habit is edited the progress of the habit remains unchannged
            }
            const id = editHabit.habit._id;
            
            //close the form
            dispatch(habitsActions.toggleHabitForm({bool:false, habit:{}}));

            //dispatch async action to edit the existing habit
            dispatch(editHabitAsync({id,newHabit}));
            
            return;
        }
        else{ //create a new habit
            const newHabit = {
                name: nameRef.current.value,
                description: descRef.current.value,
                startDate: startRef.current.value,
                endDate: endRef.current.value,
                goal: goalRef.current.value,
                progress: 0,
            }
            //close the form on add and make the edit habit false
            dispatch(habitsActions.toggleHabitForm({bool:false, habit:{}}));
            //dispatch action to add habit
            dispatch(addHabitAsync(newHabit));
        }

       



       

    }

    //handle clear form 
    const handleClear =(e)=>{
        e.preventDefault();
        nameRef.current.value = "";
        goalRef.current.value = "";
        descRef.current.value = "";
    }

    //to close the form
    const handleClose = ()=>{
        dispatch(habitsActions.toggleHabitForm({bool:false, habit:{}}))
    }
    return (
      <div className="fixed inset-0 flex items-center justify-center z-10 backdrop-blur-sm">
        <div className="bg-[#e9f1fc]  shadow-md rounded-md w-[70%] max-w-md relative">
            <svg
                    onClick={handleClose}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={3}
                    stroke="#ffffff"
                    className="w-6 h-6 absolute top-[2px]  right-[2px] cursor-pointer"
                >
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>

            <div className=" bg-[#718ffc] h-[30px] w-full rounded-t-md">
                    
            </div>


            <form className="flex flex-col p-2   ">
            
              
    
                <label>Name</label>
                <input ref={nameRef} className="p-2 font-" type="text" placeholder="Enter name of you habit"/>

                <label className="mt-3">Description</label>
                <textarea ref={descRef} className="p-2 h-[50px]" placeholder="Describe the aim of of your habit" type="text"/>

                <label className="mt-3">Start Date</label>
                <input ref={startRef} className="p-2"  type="date" />
                
                <label className="mt-3">End Date</label>
                <input ref={endRef} className="p-2"  type="date" />

                <label className="mt-3">Goal</label>
                <input ref={goalRef} className="p-2" placeholder=" No. of days you want to repeat this habit" type="number" />
                
                
                <div className="flex justify-center my-3 ">
                    <button onClick={handleAdd} className="p-2 m-2  bg-[#718ffc] rounded-md">
                        {editHabit.bool ? "Edit": "Add"}
                    </button>
                    <button onClick={handleClear} className="p-2 m-2  bg-[#718ffc] rounded-md">Clear</button>
                </div>
            

            </form>

        </div>
   
       
      </div>
    );
  };
  