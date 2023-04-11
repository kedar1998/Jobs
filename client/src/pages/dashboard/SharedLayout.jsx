import React from 'react'
import { Outlet } from 'react-router-dom'
import Wrapper from '../../assets/wrappers/SharedLayout'

const SharedLayout = () => {
  return (
    <Wrapper>
        SharedLayout
        <Outlet />
    </Wrapper>
  )
}

export default SharedLayout