import React, { useEffect } from 'react'
import { useAppContext } from '../context/appContext'
import Job from './Job'
import Wrapper from '../assets/wrappers/JobsContainer'
import Loading from './Loading'
import PageBtnContainer from './PageBtnContainer'

const JobsContainer = () => {

    const {getJobs, jobs, isLoading, page, totalJobs, search, searchStatus, searchType, sort, numOfPages} = useAppContext()

    useEffect(() =>{
        getJobs()
    }, [search, searchStatus, searchType, sort, page])

    if(isLoading){
        return <Loading center />
    }

    if(jobs.length === 0){
        return (
            <Wrapper>
                <h2>No jobs to display...</h2>
            </Wrapper>
        )
    }

  return (
    <Wrapper>
        <h5>{totalJobs} job{jobs.length > 1 && 's'}</h5>
        <div className='jobs'>
            {jobs.map((job) =>{
                return <Job key={job._id} {...job} />
            })}
        </div>
        
        {/* PAGINATION */}
        {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  )
}

export default JobsContainer