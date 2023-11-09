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
//toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
        <RouterProvider router={router}></RouterProvider>
        <ToastContainer />
      </Theme>
    </Provider>
    
  );
}

export default App;
