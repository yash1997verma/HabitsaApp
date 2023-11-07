import { configureStore } from '@reduxjs/toolkit';

import { habitsReducer } from './redux/habitsSlice';

const store = configureStore({
    reducer: {
        habits: habitsReducer, 
    }
});

export default store;