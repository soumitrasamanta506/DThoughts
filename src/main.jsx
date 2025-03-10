import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import store from "./store/store.js";
import { Provider } from "react-redux";
import {RouterProvider, createBrowserRouter } from "react-router";
import { Home, AllPosts, Signin, Signup, AddPost, MyPosts, Post, EditPost } from "./pages/index.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/all-posts",
        element: <AllPosts />
      },
      {
        path: "/my-posts",
        element: <MyPosts />
      },
      {
        path: "/signin",
        element: <Signin />
      },
      {
        path: "/signup",
        element: <Signup />
      },
      {
        path: "/add-post",
        element: <AddPost />
      },
      {
        path: "/post/:postId",
        element: <Post />
      },
      {
        path: "/edit-post/:postId",
        element: <EditPost />
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <Provider store={store}>
    <RouterProvider router={router}/>
  </Provider>
  </StrictMode>
)
