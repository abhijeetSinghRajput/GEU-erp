import Circular from '@/components/circular/Circular';
import Header from '@/components/Header';
import { StudentProfile } from '@/components/profile/StudentProfile'
import AttandanceTable from '@/components/table/AttandanceTable';
import React from 'react'

const HomePage = () => {
  
  
  return (
    <div>
      <Header/>
      <StudentProfile/>   
      <AttandanceTable/>  
      <Circular/>
    </div>
  )
}

export default HomePage
