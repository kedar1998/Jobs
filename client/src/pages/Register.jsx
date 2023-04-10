import {useState, useEffect} from 'react'
import {Logo} from '../components'
import Wrapper from '../assets/wrappers/RegisterPage'
import {Formrow, Alert} from '../components'
import { useAppContext } from '../context/appContext'
import {useNavigate} from 'react-router-dom'

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: false,
}

const Register = () => {

  const [values, setValues] = useState(initialState)

  const {user, isLoading, displayAlert, showAlert, registerUser} = useAppContext()

  const navigate = useNavigate()

  const handleChange = (e) =>{
    setValues({...values, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e) =>{
    e.preventDefault()
    const {name, email, password, isMember} = values

    if(!email || !password || (!isMember && !name)){
      displayAlert()
      return 
    }

    const currentUser = {name,email,password}

    if(isMember){
      console.log("already a member");
    }
    else{
      registerUser(currentUser)
    }

  }


  useEffect(() =>{
    if(user){
      setTimeout(() =>{
        navigate("/")
      }, 3000)
    }
  }, [user, navigate])

  const toggleMember = () =>{
    setValues({...values, isMember: !values.isMember})
  }

  return (
    <Wrapper className='full-page'>
      <form className='form' onSubmit={handleSubmit}>
        <Logo />
        <h3>{values.isMember ? 'Login' : 'Register'}</h3>

        {showAlert && <Alert />}

        {!values.isMember && <Formrow type="text" value={values.name} name="name" handleChange={handleChange} labelText="name" />}
        
        <Formrow type="email" value={values.email} name="email" handleChange={handleChange} labelText="email" />

        <Formrow type="password" value={values.password} name="password" handleChange={handleChange} labelText="password" />

        <button type='submit' className='btn btn-block' disabled={isLoading}>submit</button>
        <p>
          {values.isMember ? 'Not a member yet' : 'Already a member?'}
          <button type="button" onClick={toggleMember} className='member-btn'>{values.isMember ? 'Register' : 'Login'}</button>
        </p>
      </form>
    </Wrapper>
  )
}

export default Register