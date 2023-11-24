import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {Provider} from 'react-redux'
import store from './store/store.js'
import { createBrowserRouter } from 'react-router-dom'
import {AuthLayout} from './components/index.js'
import { Signup, AllPost, AddPost, EditPost, Post} from "./components/pages/index.js";
import { RouterProvider } from 'react-router-dom'
import Home from './components/pages/Home.jsx'
import {Login} from './components/index.js';


const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
          {
              path: "/",
              element: <Home />,
          },
          {
              path: "/login",
              element: (
                  <AuthLayout authentication={false}>
                      <Login />
                  </AuthLayout>
              ),
          },
          {
              path: "/signup",
              element: (
                  <AuthLayout authentication={false}>
                      <Signup />
                  </AuthLayout>
              ),
          },
          {
              path: "/all-posts",
              element: (
                  <AuthLayout authentication>
                      {" "}
                      <AllPost />
                  </AuthLayout>
              ),
          },
          {
              path: "/add-post",
              element: (
                  <AuthLayout authentication>
                      {" "}
                      <AddPost />
                  </AuthLayout>
              ),
          },
          {
              path: "/edit-post/:slug",
              element: (
                  <AuthLayout authentication>
                      {" "}
                      <EditPost />
                  </AuthLayout>
              ),
          },
          {
              path: "/post/:slug",
              element: <Post />,
          },
      ],
  },
  ])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {console.log("Routerrrrr", router)}
    <Provider store={store}>
        <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)
