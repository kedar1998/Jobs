import React from 'react'
import {DISPLAY_ALERT, CLEAR_ALERT, REGISTER_USER_BEGIN, REGISTER_USER_SUCCESS, REGISTER_USER_ERROR, LOGIN_USER_BEGIN, LOGIN_USER_SUCCESS, LOGIN_USER_ERROR, TOGGLE_SIDEBAR, LOGOUT_USER, UPDATE_USER_BEGIN, UPDATE_USER_SUCCESS, UPDATE_USER_ERROR, HANDLE_CHANGE, CLEAR_VALUES, CREATE_JOB_BEGIN, CREATE_JOB_SUCCESS, CREATE_JOB_ERROR, GET_JOBS_BEGIN, GET_JOBS_SUCCESS} from './actions'
import { initialState } from './appContext'

const reducer = (state, action) => {

    if(action.type === DISPLAY_ALERT){
        return {...state, showAlert: true, alertType: 'danger', alertText: 'please provide all values!'}
    }

    if(action.type === CLEAR_ALERT){
        return {...state, showAlert: false, alertType: '', alertText: ''}
    }

    if(action.type === REGISTER_USER_BEGIN){
        return {...state, isLoading: true,}
    }

    if(action.type === REGISTER_USER_SUCCESS){
        return {...state, isLoading: false, token: action.payload.token, user: action.payload.user, userLocation: action.payload.location, jobLocation: action.payload.location, showAlert: true, alertText: 'User Created! Redirecting...', alertType: "success"}
    }

    if(action.type === REGISTER_USER_ERROR){
        return {...state, isLoading: false, showAlert: true, alertText: action.payload.msg, alertType: "danger"}
    }

    if(action.type === LOGIN_USER_BEGIN){
        return {...state, isLoading: true,}
    }

    if(action.type === LOGIN_USER_SUCCESS){
        return {...state, isLoading: false, token: action.payload.token, user: action.payload.user, userLocation: action.payload.location, jobLocation: action.payload.location, showAlert: true, alertText: 'Login Successful! Redirecting...', alertType: "success"}
    }

    if(action.type === LOGIN_USER_ERROR){
        return {...state, isLoading: false, showAlert: true, alertText: action.payload.msg, alertType: "danger"}
    }

    if(action.type === TOGGLE_SIDEBAR){
        return {...state, showSidebar: !state.showSidebar}
    }
    
    if(action.type === LOGOUT_USER){
        return {...initialState, user: null, token: null, userLocation: null, jobLocation: null}
    }
    
    if(action.type === UPDATE_USER_BEGIN){
        return {...state, isLoading: true,}
    }

    if(action.type === UPDATE_USER_SUCCESS){
        return {...state, isLoading: false, token: action.payload.token, user: action.payload.user, userLocation: action.payload.location, jobLocation: action.payload.location, showAlert: true, alertText: 'User profile updated!', alertType: "success"}
    }

    if(action.type === UPDATE_USER_ERROR){
        return {...state, isLoading: false, showAlert: true, alertText: action.payload.msg, alertType: "danger"}
    }

    if(action.type === HANDLE_CHANGE){
        return {...state, [action.payload.name]: action.payload.value}
    }

    if(action.type === CLEAR_VALUES){
        const initial = {
            isEditing: false,
            editJobId: '',
            position: '',
            company: '',
            jobLocation: state.userLocation,
            jobType: 'full-time',
            status: 'pending',
        }
        return {...state, ...initial}
    }

    if(action.type === CREATE_JOB_BEGIN){
        return {...state, isLoading: true}
    }

    if(action.type === CREATE_JOB_SUCCESS){
        return {...state, isLoading: false, showAlert: true, alertType: 'success', alertText: 'New Job Created!'}
    }

    if(action.type === CREATE_JOB_ERROR){
        return {...state, isLoading: false, showAlert: true, alertText: action.payload.msg, alertType: "danger"}
    }

    if(action.type === GET_JOBS_BEGIN){
        return {...state, isLoading: true, showAlert: false}
    }

    if(action.type === GET_JOBS_SUCCESS){
        return {...state, isLoading: false, jobs: action.payload.job, totalJobs: action.payload.totalJobs, numOfPages: action.payload.numOfPages}
    }

    
    return state
    throw new Error(`no such action : ${action.type}`)
}

export default reducer