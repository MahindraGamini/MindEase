import React from 'react'
import Questions from '../../components/AskComponent/AskCard'
import Sidebar from '../../components/Sidebar/Sidebar'

const page = () => {
  return (
    <div className="flex">
      
      <div className="w-1/4">
        <Sidebar />
      </div>

     
      <div className="w-3/4 p-4">
        <Questions />
      </div>
    </div>
  )
}

export default page
