import React from 'react'
import Questions from '../../components/AskComponent/AskCard'
import Sidebar from '../../components/Sidebar/Sidebar'

const page = () => {
  return (
    <div className="flex">
      {/* Sidebar on the left */}
      <div className="w-1/4">
        <Sidebar />
      </div>

      {/* Question card on the right */}
      <div className="w-3/4 p-4">
        <Questions />
      </div>
    </div>
  )
}

export default page
