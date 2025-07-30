import { StudentProfile } from '@/components/profile/StudentProfile'
import AttandanceTable from '@/components/table/AttandanceTable';
import DataTable from '@/components/table/dataTable';
import { useAttendanceStore } from '@/stores/useAttendanceStore'
import { useStudentStore } from '@/stores/useStudentStore';
import React, { useEffect } from 'react'

const HomePage = () => {
  
  
  return (
    <div>
      <StudentProfile/>   
      <AttandanceTable/>  
    </div>
  )
}

export default HomePage
