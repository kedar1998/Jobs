import React from 'react'
import {Formrow, Formrowselect} from '.'
import { useAppContext } from '../context/appContext'
import Wrapper from '../assets/wrappers/SearchContainer'


const SearchContainer = () => {

  const {isLoading, search, searchStatus, searchType, sort, sortOptions, statusOptions, jobTypeOptions, handleChange, clearFilters} = useAppContext()

  const handleSearch = (e) =>{
    // console.log(e.target.name);
    if(isLoading) return
    handleChange({name: e.target.name, value: e.target.value})
  }

  const handleSubmit = (e) =>{
    e.preventDefault()
    clearFilters()
  }

  return (
    <Wrapper>
      <form className='form'>
        <h4>Search Form</h4>
        <div className='form-center'>

          {/* SEARCH */}
          <Formrow type="text" name="search" value={search} handleChange={handleSearch} />

          {/* STATUS */}
          <Formrowselect labelText="job status" name="searchStatus" value={searchStatus} handleChange={handleSearch} list={['all', ...statusOptions]} />

          {/* TYPE */}
          <Formrowselect labelText="job type" name="searchType" value={searchType} handleChange={handleSearch} list={['all', ...jobTypeOptions]} />

          {/* SORT */}
          <Formrowselect name="sort" value={sort} handleChange={handleSearch} list={sortOptions} />

          {/* BUTTON */}
          <button className='btn btn-block btn-danger' disabled={isLoading} onClick={handleSubmit}>Clear Filters</button>

        </div>
      </form>
    </Wrapper>
  )
}

export default SearchContainer