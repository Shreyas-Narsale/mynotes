import React from 'react'
import { Link } from 'react-router-dom'
import {ReactComponent as ADDIcon }from'../assets/add.svg';
const AddButton = () => {
  return (
    <Link to="/note/new"className='floating-button'>
      <ADDIcon/>
    </Link>
  )
}

export default AddButton
