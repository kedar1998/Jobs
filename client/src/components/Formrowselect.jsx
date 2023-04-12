import React from 'react'

const Formrowselect = ({labelText, name, value, handleChange, list}) => {
  return (
    <div className='form-row'>
        <label htmlFor={name}>{labelText || name}</label>
        <select name={name} value={value} onChange={handleChange} className='form-select'>
            {
                list.map((item, index) =>{
                    return (
                    <option key={index}value={item} >{item}</option>
                    )
                })
            }
        </select>
    </div>
  )
}

export default Formrowselect