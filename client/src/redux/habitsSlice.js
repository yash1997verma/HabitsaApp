import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
//hot toast
import toast from 'react-hot-toast';

import { startOfWeek, endOfWeek } from "date-fns";

const apiUrl = 'https://habitsaapp.onrender.com';
// const apiUrl = 'http://localhost:8000'





//async call to get weekly habits all the habits
export const fetchWeelyHabitsAsync = createAsyncThunk(
    "habits/fetchHabitsAsync",
    async (payload)=>{
        try{
            const{startOfWeek, endOfWeek} = payload;
            const res = await axios.get(`${apiUrl}/habit/getWeeklyHabits`,{
                params:{
                    startOfWeek,
                    endOfWeek,
                }
            }
            );
            return res.data;
           
        }catch(err){
            throw err;
        }
    }

);

//async call to get today habits
export const getTodayHabitsAsync = createAsyncThunk(
    'habits/getTodayHabitsAsync' ,
    async(payload)=>{
        try{
            const resdata = await axios.get(`${apiUrl}/habit/getTodayHabits`);
            return resdata.data;
        }catch(err){
            throw err;
        }
    }
)

//async call to add a habit
export const addHabitAsync = createAsyncThunk(
    "habits/addHabitAsync",
    async(newHabit)=>{
        try{
            const res = await axios.post(`${apiUrl}/habit/addHabit`, newHabit);
            return res.data;
        }catch(err){
            throw  err;
        }
    }   
);

//async call to edit a habit
export const editHabitAsync = createAsyncThunk(
    "habits/editHabitAsync",
    async({id,newHabit})=>{
        try{
            const res = await axios.put(`${apiUrl}/habit/editHabit/${id}`, newHabit);
            return res.data;
        }catch(err){
            throw err;
        }
    }
);

//async call to delete habit
export const deleteHabitAsync = createAsyncThunk(
    "habits/deleteHabitAsync",
    async({id})=>{
        try{
            const res = await axios.delete(`${apiUrl}/habit/deleteHabit/${id}`);
            return res.data;
        }catch(err){
            throw err;
        }
    }
    
)

//when user changes the status of a habit for a particular data
export const habitStatusChange = createAsyncThunk(
    "habits/habitStatusChange",
    async({dateStatus, id})=>{
        try{
            const res = await axios.put(`${apiUrl}/habit/changeHabitState/${id}`, dateStatus );
            return res.data;
        }catch(err){
            throw err;
        }
    }
    
)



const calculateWeekRange = () => {
    const currentDate = new Date();
    const startDate = startOfWeek(currentDate, { weekStartsOn: 1 }); // Get the start of the current week with Monday as the start of the week
    const endDate = endOfWeek(currentDate, { weekStartsOn: 1 }); // Get the end of the current week with Monday as the start of the week
    return { startDate, endDate };
  };
  

const habitsSlice  =  createSlice({
    name:'habits',
    initialState:{
        habits:[],
        showHabitForm: false,// to show habbit form
        editHabit:{bool:false, habit:{}},//to edit existing habit and pass habit to Habit Form.
        selectedMonth: new Date().toISOString(),// Initialize with the current month
        startOfWeek: calculateWeekRange().startDate.toISOString(), // Initialize with the start of the current week
        endOfWeek: calculateWeekRange().endDate.toISOString(), // Initialize with the end of the current week
        appView: 'today',//controls appview, true means today, view for now, future upgrades will have 3 views
        status: 'idle',//to track status of api req
        error : null,//to store err
    },
    reducers:{
        //to set a state for selecte month
        setSelectedMonth: (state, action) => {
            state.selectedMonth = action.payload
        },
        setStartOfWeek :(state, action)=>{
            state.startOfWeek = action.payload;
        },
        setEndOfWeek :(state, action)=>{
            state.endOfWeek = action.payload;
        },
        setAppView:(state, action)=>{
            const view = action.payload;
            state.appView = view;
        },
        toggleHabitForm: (state, action)=>{
            if(action.payload){
                state.editHabit = action.payload;
            }
            state.showHabitForm = !state.showHabitForm;
        }
    },
    //use extra reducers for handdling async operations
    extraReducers: (builder)=>{
        builder
        .addCase(fetchWeelyHabitsAsync.pending, (state)=>{
            state.status = 'loading'
        })
        .addCase(fetchWeelyHabitsAsync.fulfilled, (state, action)=>{
            state.status = 'succeeded';
            state.habits = action.payload;
        })
        .addCase(fetchWeelyHabitsAsync.rejected, (state, action)=>{
            state.status = 'failed';
            state.error = action.error.message;
            toast.error("Unable to fetch habits");
        })
        .addCase(getTodayHabitsAsync.pending, (state, action)=>{
            state.status = 'loading';
        })
        .addCase(getTodayHabitsAsync.fulfilled,(state, action)=>{
            state.status = 'succeeded';
            state.habits = action.payload;
        })
        .addCase(getTodayHabitsAsync.rejected, (state, action)=>{
            state.status = 'failed';
            state.error = action.error.message;
            toast.error("Unable to fetch habits");
        })
        //for adding habit
        .addCase(addHabitAsync.fulfilled, (state, action)=>{
            //update the habit in local state
            state.habits.push(action.payload);
            toast.success('Habit Added');
        })
        .addCase(addHabitAsync.rejected , (state, action)=>{
            state.status = 'failed';
            state.error = action.payload;
            toast.error("Error in adding Habit");
        })
        .addCase(deleteHabitAsync.fulfilled, (state, action)=>{
            const deletedHabit = action.payload;
            state.habits = state.habits.filter((habit)=>{
                return habit._id !== deletedHabit._id;
            });
            toast.success('Habit deleted!');
        })
        .addCase(deleteHabitAsync.rejected, (state, action)=>{
            toast.error("Error in deleting Habit");
        })
        //for editing habit
        .addCase(editHabitAsync.fulfilled, (state, action)=>{
            //update the habit in local state
            const updatedHabit = action.payload;
            state.habits = state.habits.map((habit)=>{
                if(habit._id === updatedHabit._id){
                    //return the updated habit
                    return  habit = updatedHabit;
                }
                //return the habit as it is
                return habit;
            });
            toast.success('Habit edited successfully!');
        })
        .addCase(editHabitAsync.rejected, (state, action)=>{
            toast.error("Error in editing Habit");
        })
        //when ever the status of a habit changes for a particular date,
        // we will update the local state as well, when our req to back end is resolved
        //we will use this to show upgraded progress on the screen
        .addCase(habitStatusChange.fulfilled, (state, action)=>{
            //contains update progress
            const updatedHabit = action.payload;
            state.habits = state.habits.map((habit)=>{
                if(habit._id === updatedHabit._id){
                    //return the updated habit
                    return  habit = updatedHabit;
                }
                //return the habit as it is
                return habit;
            });
        })
        
    },
    
});

export const habitsActions = habitsSlice.actions;

export const habitsReducer =  habitsSlice.reducer;
