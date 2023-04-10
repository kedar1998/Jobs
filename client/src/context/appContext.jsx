import React, {createContext, useReducer, useContext} from 'react'
import reducer from './reducer'
import {DISPLAY_ALERT, CLEAR_ALERT, REGISTER_USER_BEGIN, REGISTER_USER_SUCCESS, REGISTER_USER_ERROR} from './actions'
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
}

const AppContext = createContext()

const AppProvider = ({children}) => {

  const [state, dispatch] = useReducer(reducer, initialState)

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

  const removeUserToLocalStorage = ({user,token,location}) =>{
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
      console.log(err);
      dispatch({type: REGISTER_USER_ERROR, payload: { msg: err.response.data.msg}})
    }
    clearAlert()
  }

  return <AppContext.Provider value={{...state, displayAlert, registerUser}}>
    {children}
  </AppContext.Provider>
}

export const useAppContext = () =>{
  return useContext(AppContext)
}

export  {AppProvider}