"use client";
import React from 'react'

const SubsTableItem = ({email,mongoId,deleteEmail,date,company}) => {
    
    const emailDate = new Date(date);

  return (
    <tr className='bg-white border-b text-left'>
      <td className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'>
        {email?email:"No Email"}
      </td>
      <td className='px-6 py-4'>{company || "Unknown"}</td>
      <td className='px-6 py-4'>{emailDate.toDateString()}</td>
      <td className='px-6 py-4 cursor-pointer text-center' onClick={()=>deleteEmail(mongoId)}>
        <svg 
          className="w-5 h-5 text-red-500 hover:text-red-700 transition-colors duration-200" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
          />
        </svg>
      </td>
    </tr>
  )
}

export default SubsTableItem
