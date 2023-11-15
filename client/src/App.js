import './App.css';
//animate css
import 'animate.css';
//react router
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage } from './pages/HomePage';
import { WeeklyView } from "./components/Habit/WeekView/WeeklyView";
import { TodayView } from "./components/Habit/TodayView/TodayView";
//redux store
import store from './store';
import { Provider } from 'react-redux';
//hot toast
import toast, { Toaster } from 'react-hot-toast';
import { Theme } from '@radix-ui/themes';

function App() {
  const router = createBrowserRouter([
    { 
      path: '/',
      element:<HomePage />,
      children:[
        { 
          index: true,
          element:<TodayView />
        },
        {
          path:"/weekly",
          element: <WeeklyView />

        }
      ]
    },

  ])
  
  return (
    <Provider store={store}>
      <Theme>
        <Toaster />
        <RouterProvider router={router}></RouterProvider>
      </Theme>
    </Provider>
    
  );
}

export default App;
