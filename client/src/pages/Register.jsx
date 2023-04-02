import {useState, useEffect} from 'react'
import {Logo} from '../components'
import Wrapper from '../assets/wrappers/RegisterPage'
import {Formrow, Alert} from '../components'

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true,
  showAlert: false,
}

const Register = () => {

  const [values, setValues] = useState(initialState)


  const handleChange = (e) =>{
    console.log(e.target.value)
  }

  const handleSubmit = (e) =>{
    e.preventDefault()
    console.log(e.target)
  }

  const toggleMember = () =>{
    setValues({...values, isMember: !values.isMember})
  }

  return (
    <Wrapper className='full-page'>
      <form className='form' onSubmit={handleSubmit}>
        <Logo />
        <h3>{values.isMember ? 'Login' : 'Register'}</h3>

        {values.showAlert && <Alert />}

        {!values.isMember && <Formrow type="text" value={values.name} name="name" handleChange={handleChange} labelText="name" />}
        
        <Formrow type="email" value={values.email} name="email" handleChange={handleChange} labelText="email" />

        <Formrow type="password" value={values.password} name="password" handleChange={handleChange} labelText="password" />

        <button type='submit' className='btn btn-block'>submit</button>
        <p>
          {values.isMember ? 'Not a member yet' : 'Already a member?'}
          <button type="button" onClick={toggleMember} className='member-btn'>{values.isMember ? 'Register' : 'Login'}</button>
        </p>
      </form>
    </Wrapper>
  )
}

export default Register