import React, {createContext, useReducer, useContext} from 'react'
import reducer from './reducer'
import {DISPLAY_ALERT, CLEAR_ALERT} from './actions'


const initialState = {
    isLoading: false,
    showAlert: false, 
    alertType: '', 
    alertText: '',
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

  return <AppContext.Provider value={{...state, displayAlert}}>
    {children}
  </AppContext.Provider>
}

export const useAppContext = () =>{
  return useContext(AppContext)
}

export  {AppProvider}