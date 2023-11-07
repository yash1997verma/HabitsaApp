import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useDispatch } from 'react-redux';
import { habitsActions } from '../../../redux/habitsSlice';
import { deleteHabitAsync } from '../../../redux/habitsSlice';
import { Checkbox } from '../../ui/Checkbox/Checkbox';
import { startOfWeek, addDays, format, isWednesday } from 'date-fns';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import isSameDay from 'date-fns/isSameDay';
export const HabitWeekly = ({habit})=>{
    const dispatch = useDispatch();
    //get start of week and end of week
    const startOfWeek = new Date(useSelector(state=> state.habits.startOfWeek));
    const endOfWeek = useSelector(state=> state.habits.endOfWeek);
  
    //checkbox date is the date of the checkbox, we want to render
    const getHabitStatusForDate = (habit, checkboxDate) => {
        try {
            let habitStatus  = 'none';//by default status will be none
            habit.habitDateStatus.forEach(data => {
                const convertedDate = new Date(data.date);
                //if the date already exist in the ref array, we show data from ther
                if (isSameDay(convertedDate, checkboxDate)) {
                    habitStatus = data.status;
                }
            });
    
            return habitStatus;
            
        } catch (error) {
            console.error('Error in getHabitStatusForDate:', error);
            return 'none'; // Handle errors gracefully
        }

    }
    //array of checkboxes with date attached to them
    const checkboxes = [];

    for (let i = 0; i < 7; i++) {
        const checkboxDate = addDays(startOfWeek, i);
        
        checkboxes.push(
            <td key={i} className="pl-4 py-4  text-[#718ffc] font-semibold">
                <Checkbox id={habit._id} status={getHabitStatusForDate(habit, checkboxDate)} date={checkboxDate}   />
            </td> 
        );
    }
    

    //to handle edit
    const handleEdit  = ()=>{
        //to load habit in form we send that habit data in payload and 
        dispatch(habitsActions.toggleHabitForm({bool:true, habit}));
    }

    //to handle delete
    const handleDelete = ()=>{
        const id = habit._id
        dispatch(deleteHabitAsync({id}))
    }

   

    return(
        <>
           
            <td className="pl-4 py-4 text-start  text-[#718ffc] font-semibold">{habit.name}</td>
            {checkboxes}
          
            <td className="pl-4 py-4  text-[#718ffc] font-semibold">{habit.progress}</td>
            <td className="pl-4 py-4  text-[#718ffc] font-semibold">{habit.goal}</td>
            {/* action button*/}
            <td className="pl-4 py-4">
                <DropdownMenu.Root>
                    <DropdownMenu.Trigger asChild className="bg-red">
                        <div className="flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 shadow-lg rounded-full">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                            </svg>
                        </div>         
                    </DropdownMenu.Trigger>

                    <DropdownMenu.Portal >
                        <DropdownMenu.Content className="DropdownMenuContent bg-white  shadow-md rounded-md flex flex-col " sideOffset={5}>
                            <DropdownMenu.Item onClick={handleEdit} className="DropdownMenuItem text-sm  flex items-center justify-between p-1 hover:bg-[#e5e7eb] focus:outline-none" >
                                Edit
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                </svg>

                            </DropdownMenu.Item>
                            <DropdownMenu.Item onClick={handleDelete} className="DropdownMenuItem text-sm flex items-center justify-between   hover:bg-[#e5e7eb]  focus:outline-none p-1 ">
                                Delete 
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3 ml-2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                </svg>

                            </DropdownMenu.Item>
                        </DropdownMenu.Content>
                    </DropdownMenu.Portal>
                </DropdownMenu.Root>
            </td> 
        </>
        
    )
}