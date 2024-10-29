import React from 'react'

import QuestionCard from '../../components/CommunityCard/CommunityCard'
import Sidebar from '../../components/Sidebar/Sidebar'
const page = () => {
  return (
    <div className="flex">
      
    <div className="w-1/4">
      <Sidebar />
    </div>

   
    <div className="w-3/4 p-4 ">
      <QuestionCard />
    </div>
  </div>
  )
}

export default page
