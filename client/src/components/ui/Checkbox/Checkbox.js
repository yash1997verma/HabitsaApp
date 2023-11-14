import React, { useState } from 'react';
import { habitStatusChange } from '../../../redux/habitsSlice';
import { useDispatch } from 'react-redux';
export const  Checkbox= ({status,id, date})=> {
  const [habitStatus, setHabitStatus] = useState(status);//whatever status is saved that will be displayed
  const dispatch = useDispatch();
  const handleCheckboxChange = async () => {

    //create object which contains date and the staus of that date
    //we will use this data to create a doc in habitDateStatus, which is referenced by habit docs
    // by default all the dates habe a none status, we only save the ones, whose status is changed
    const dateStatus = {
      date,
      status: habitStatus,
    }
    
    
    if (habitStatus === 'done') {
      setHabitStatus('not-done'); // Change to "Done" state
      dateStatus.status = 'not-done';
    } else if (habitStatus === 'not-done') {
      setHabitStatus('none'); // Change to "not-done" state
      dateStatus.status = 'none';
    } else {
      setHabitStatus('done'); // Change to "No Action" state
      dateStatus.status = 'done';

    }
    dispatch(habitStatusChange({id, dateStatus}));

    // send req to back end to update status
    // try{
    //   // const res = await axios.put(`https://habitsaapp.onrender.com/habit/changeHabitState/${id}`, dateStatus )
    // }catch(err){
    //   console.log(err);
    // }


  };

  const renderCheckbox = () => {
    if (habitStatus === 'done') {
      return (
        <span className=" w-6 h-6 ml-3  flex items-center justify-center cursor-pointer" onClick={handleCheckboxChange}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="#5ef04a" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>

        </span>
      );
    } else if (habitStatus === 'not-done') {
      return (
        <span className="  w-6 h-6 ml-3  flex items-center justify-center cursor-pointer" onClick={handleCheckboxChange}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="#f95858" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>

        </span>
      );
    } else {
      return (
        <span className=" w-6 h-6 ml-3  flex items-center justify-center cursor-pointer" onClick={handleCheckboxChange}>
            <span className='rounded-full outline-dotted w-4 h-4'>

            </span>
        </span>
      );
    }
  };

  return (
    <div className="flex items-center space-x-2">
      {renderCheckbox()}
      
    </div>
  );
}


