"use client";
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
const SubsTableItem = ({email,mongoId,deleteEmail,date}) => {
    
    const emailDate = new Date(date);
  return (
    <tr className='bg-white border-b text-left'>
      <th scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'>
        {email?email:"No Email"}
      </th>
      <td className='px-6 py-4 hidden sm:block'>{emailDate.toDateString()}</td>
      <td className='px-6 py-4 cursor-pointer' onClick={()=>deleteEmail(mongoId)}>
        <button
          onClick={() => deleteEmail(mongoId)}
          className="text-red-500 hover:text-red-700 transition duration-300"
          title="Delete"
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </td>
    </tr>
  )
}

export default SubsTableItem
