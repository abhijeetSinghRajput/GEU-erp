import Circular from '@/components/circular/Circular';
import { StudentProfile } from '@/components/profile/StudentProfile'
import AttandanceTable from '@/components/table/AttandanceTable';
import React from 'react'

const HomePage = () => {
  
  
  return (
    <div>
      <StudentProfile/>   
      <AttandanceTable/>  
      <Circular/>
    </div>
  )
}

export default HomePage
