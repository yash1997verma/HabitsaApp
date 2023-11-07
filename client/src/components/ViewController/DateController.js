import { format, addMonths, subMonths, startOfWeek, endOfWeek, isSameMonth, addDays } from 'date-fns';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { habitsActions } from '../../redux/habitsSlice';

export const DateController =  ({appView})=>{
    //to track currently displayed date, we will always calculate month, from current date
    //either next month or prev month, both will be done from current date
    const [currentDate, setCurrentDate] = useState(new Date());
    const dispatch = useDispatch();

    


    // Function to navigate to the previous month
    const goToPreviousMonth = () => {
        const newDate = subMonths(currentDate, 1);
        setCurrentDate(newDate);
        // Convert the newDate to an ISO string, bcz we can only save serilizable value in redux state.
        const isoDateString = newDate.toISOString();
        
        // Dispatch the action to update the selected month in the store
        dispatch(habitsActions.setSelectedMonth(isoDateString));
    };

    // Function to navigate to the next month
    const goToNextMonth = () => {
        const newDate = addMonths(currentDate, 1);
        setCurrentDate(newDate);
    
        // Convert the newDate to an ISO string
        const isoDateString = newDate.toISOString();
    
        // Dispatch the action to update the selected month in the store
        dispatch(habitsActions.setSelectedMonth(isoDateString));
    };

    // Function to render the days of the current month
    // const renderDays = () => {
    //     const monthStart = startOfWeek(currentDate);
    //     const monthEnd = endOfWeek(addMonths(currentDate, 1));
    //     const days = [];
        
    //     let day = monthStart;

    //     while (day <= monthEnd) {
    //     days.push(
    //         <div key={day} className={isSameMonth(day, currentDate) ? 'current-month' : 'other-month'}>
    //         {format(day, 'd')}
    //         </div>
    //     );

    //     day = addDays(day, 1);
    //     }

    //     return days;
    // };


    return(
        <>
            {/*only display change month functionality in weekly view  */}
            {appView &&
                <div className="flex">
                <div className="flex items-center gap-3">
                
                    <svg onClick={goToPreviousMonth} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="cursor-pointer w-3 h-3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>

                    <p className='font-bold select-none '>{format(currentDate, 'MMMM yyyy')}</p>
                    <svg onClick={goToNextMonth} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="cursor-pointer w-3 h-3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>


                </div>
                <div className="days">
                </div>
                </div>
            }
        </>
        

        
    )
}