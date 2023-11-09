
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
//for toastify
import { toast } from "react-toastify";
import { format, addDays, startOfWeek, endOfWeek } from "date-fns"; // Import necessary functions


//async call to get weekly habits all the habits
export const fetchWeelyHabitsAsync = createAsyncThunk(
    "habits/fetchHabitsAsync",
    async (payload)=>{
        try{
            const{startOfWeek, endOfWeek} = payload;
            const res = await axios.get('https://habitsaapp.onrender.com/habit/getWeeklyHabits',{
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
           
            const resdata = await axios.get('https://habitsaapp.onrender.com/habit/getTodayHabits');
            // console.log(resdata.data)
            return resdata.data;
        }catch(err){
            console.log(err);
            return err;
        }
    }
)

//async call to add a habit, we will just be using this to display notification
export const addHabitAsync = createAsyncThunk(
    "habits/addHabitAsync",
    async(newHabit)=>{
        try{
            const res = await axios.post('https://habitsaapp.onrender.com/habit/addHabit', newHabit);
            return res.data;
        }catch(err){
            return err;
        }
    }   
);

//async call to edit a habit
export const editHabitAsync = createAsyncThunk(
    "habits/editHabitAsync",
    async({id,newHabit})=>{
        try{
            const res = await axios.put(`https://habitsaapp.onrender.com/habit/editHabit/${id}`, newHabit);
            
            return res.data;
        }catch(err){
            return err;
        }
    }
);

//async call to delete habit
export const deleteHabitAsync = createAsyncThunk(
    "habits/delteHabitAsync",
    async({id})=>{
        try{
            const res = await axios.delete(`https://habitsaapp.onrender.com/habit/deleteHabit/${id}`);
            // console.log(res)
        }catch(err){
            console.log(err)
            return err;
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
        appView: false,//controls appview, true means today, view for now, future upgrades will have 3 views
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
            state.appView = !state.appView;
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
            // console.log(state.habits)

            state.status = 'succeeded';
            state.habits = action.payload;
        })
        .addCase(fetchWeelyHabitsAsync.rejected, (state, action)=>{
            state.status = 'failed';
            state.error = action.error.message;
            toast.error('Unable to fetch Habits!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        })
        .addCase(getTodayHabitsAsync.fulfilled,(state, action)=>{
           state.habits = action.payload;
        })
        //for adding habit
        .addCase(addHabitAsync.fulfilled, (state, action)=>{
            //update the habit in local state
            // state.habits.push(action.payload);

            toast.success('New habit Added!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        })
        //for editing habit
        // .addCase(editHabitAsync.fulfilled, (state, action)=>{
        //     //update the habit in local state
        //     const updatedHabit = action.payload;
        //     state.habits.map((habit)=>{
        //         if(habit._id === updatedHabit._id){
        //             habit = updatedHabit;
        //         }
        //         console.log(habit)
        //     })
   
        //     toast.success('Habit edited successfully!', {
        //         position: "top-center",
        //         autoClose: 5000,
        //         hideProgressBar: false,
        //         closeOnClick: true,
        //         pauseOnHover: false,
        //         draggable: true,
        //         progress: undefined,
        //         theme: "light",
        //     });
        // })
    },
    
});

export const habitsActions = habitsSlice.actions;

export const habitsReducer =  habitsSlice.reducer;
