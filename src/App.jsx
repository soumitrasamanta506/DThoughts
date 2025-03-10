import { useState, useEffect } from 'react';
import './App.css';
import { Header, Footer } from './components';
import { Outlet } from 'react-router';
import {login, logout} from "./store/authSlice";
import { putPosts } from "./store/postSlice";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import appwriteService from "./appwrite/config";

function App() {
  const [authLoading, setAuthLoading] = useState(true);
  const [postLoading, setPostLoading] = useState(true);
  const dispatch = useDispatch();

  const fetchAndStore = async () => {
    try{
      await authService.getCurrentUser()
      .then((user) => {
        if(user)  dispatch(login(user));
        else dispatch(logout());
      })
      .finally(() => setAuthLoading(false));
      
      await appwriteService.getAllPost()
        .then((posts) => dispatch(putPosts(posts)))
        .finally(() => setPostLoading(false));
    }
    catch(error){
      console.log("app :: error", error.message);
    }
  }

  useEffect(() => {
    fetchAndStore();
  }, []);

  return (
      !authLoading && !postLoading ? (
          <div className='w-dvw h-dvh flex flex-col'>
          <Header />
          <main className='flex-grow p-10 bg-gray-200'>
            <Outlet />
          </main>
          <Footer />
        </div>
      ) : null 
  )
}

export default App
