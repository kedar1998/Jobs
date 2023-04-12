import {Formrow, Alert} from '../../components'
import {useAppContext} from '../../context/appContext'
import Wrapper from '../../assets/wrappers/DashboardFormPage'
import Formrowselect from '../../components/Formrowselect'


const AddJob = () => {

  const {isLoading, isEditing, showAlert, displayAlert, position, company, jobLocation, jobType, jobTypeOptions, status, statusOptions, handleChange, clearValues, createJob} = useAppContext()

  const handleJobInput = (e) =>{
    const name = e.target.name
    const value = e.target.value
    handleChange({name: name, value: value})
  }

  const handleSumit = (e) =>{
    e.preventDefault()

    if(!position || !company || !jobLocation){
      displayAlert()
      return
    }

    if(isEditing){
      return 
    }

    createJob()

  }

  return (
    <Wrapper>
      <form className='form'>
        <h3>{isEditing ? 'edit job' : 'add job'}</h3>
        {showAlert && <Alert />}
        <div className='form-center'>

          <Formrow type="text" name="position" value={position} handleChange={handleJobInput} />

          <Formrow type="text" name="company" value={company} handleChange={handleJobInput} />

          <Formrow type="text" labelText="Job Location" name="jobLocation" value={jobLocation} handleChange={handleJobInput} />

          {/* JOB STATUS */}
          <Formrowselect name="status" value={status} handleChange={handleJobInput} list={statusOptions}  />

          {/* JOB TYPE */}
          <Formrowselect name="jobType" value={jobType} handleChange={handleJobInput} list={jobTypeOptions}  />


          <div className='btn-container'>
            <button type='submit' className='btn btn-block submit-btn' onClick={handleSumit} disabled={isLoading}>submit</button>

            <button type='submit' className='btn btn-block clear-btn' onClick={(e) =>{
              e.preventDefault()
              clearValues()
            }}>clear</button>
          </div>
        </div>
      </form>
    </Wrapper>
  )
}

export default AddJob