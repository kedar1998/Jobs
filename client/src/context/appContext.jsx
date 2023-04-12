import React, {createContext, useReducer, useContext} from 'react'
import reducer from './reducer'
import {DISPLAY_ALERT, CLEAR_ALERT, REGISTER_USER_BEGIN, REGISTER_USER_SUCCESS, REGISTER_USER_ERROR, LOGIN_USER_BEGIN, LOGIN_USER_SUCCESS, LOGIN_USER_ERROR, TOGGLE_SIDEBAR, LOGOUT_USER} from './actions'
import axios from 'axios'

const token = localStorage.getItem('token')
const user = localStorage.getItem('user')
const location = localStorage.getItem('location')

const initialState = {
    isLoading: false,
    showAlert: false, 
    alertType: '', 
    alertText: '',
    user: user ? JSON.parse(user) : null,
    token: token,
    userLocation: location || '',
    jobLocation: location || '',
    showSidebar: false,
}

const AppContext = createContext()

const AppProvider = ({children}) => {

  
  const [state, dispatch] = useReducer(reducer, initialState)
  
  
  // custom instances && interceptors
  const authFetch = axios.create({
    baseURL: '/api/v1',
  })

  // REQUEST

  authFetch.interceptors.request.use((config) =>{

    config.headers['Authorization'] = `Bearer ${state.token}`
    return config
  }, 
  (error) =>{
    return Promise.reject(error)
  })

  // RESPONSE

  authFetch.interceptors.response.use((response) =>{
    return response
  },
  (error) =>{
    if(error.response.status === 401){
      console.log("Auth Error");
    }
    return Promise.reject(error)
  }
  )


  const displayAlert = () =>{
    dispatch({type: DISPLAY_ALERT})
    clearAlert()
  }

  const clearAlert = () =>{
    setTimeout(() =>{
      dispatch({type: CLEAR_ALERT})
    }, 3000)
  }

  const addUserToLocalStorage = ({user,token,location}) =>{
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('token', token)
    localStorage.setItem('location', location)
  }

  const removeUserFromLocalStorage = () =>{
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    localStorage.removeItem('location')
  }

  const registerUser = async (currentUser) =>{
    dispatch({type: REGISTER_USER_BEGIN})
    try{
      const response = await axios.post('/api/v1/auth/register', currentUser)
      const {user, token, location} = response.data
      dispatch({type: REGISTER_USER_SUCCESS, payload: {user, token, location}})
      addUserToLocalStorage({user,token,location})
    }
    catch(err){
      // console.log(err);
      dispatch({type: REGISTER_USER_ERROR, payload: { msg: err.response.data.msg}})
    }
    clearAlert()
  }

  const loginUser = async (currentUser) =>{
    dispatch({type: LOGIN_USER_BEGIN})
    try{
      const response = await axios.post('/api/v1/auth/login', currentUser)
      const {user, token, location} = response.data
      dispatch({type: LOGIN_USER_SUCCESS, payload: {user, token, location}})
      addUserToLocalStorage({user,token,location})
    }
    catch(err){
      dispatch({type: LOGIN_USER_ERROR, payload: { msg: err.response.data.msg}})
    }
    clearAlert()
  }

  const toggleSidebar = () =>{
    dispatch({type: TOGGLE_SIDEBAR})
  }

  const logoutUser = () =>{
    dispatch({type: LOGOUT_USER})
    removeUserFromLocalStorage()
  }

  const updateUser = async (currentUser) =>{
    try{
      const {data} = await authFetch.patch('/auth/updateUser', 
      currentUser
      )
      console.log(data);
    }
    catch(err){
      // console.log(err.response);
    }
  }

  return <AppContext.Provider value={{...state, displayAlert, registerUser, loginUser, toggleSidebar, logoutUser, updateUser}}>
    {children}
  </AppContext.Provider>
}

export const useAppContext = () =>{
  return useContext(AppContext)
}

export  {AppProvider, initialState}