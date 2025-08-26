'use client'

import { assets } from '@/Assets/assets'
import { useAppContext } from '@/context/AppContext'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import parse from 'html-react-parser'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'
import { useRouter } from 'next/navigation';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5000';

const Page = () => {
  const [status, setStatus] = useState('pending') // Default status

  const handleStatusChange = (e) => {
    setStatus(e.target.value)
    console.log('Status changed to:', e.target.value)
    // Add your logic here for handling accept/reject
  }

  return (
    <div className="min-h-screen bg-blue-50 py-10 px-4 sm:px-10">
      <div className="max-w-md mx-auto">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <label htmlFor="status-dropdown" className="block text-sm font-medium text-gray-700 mb-2">
            Status:
          </label>
          <select 
            id="status-dropdown"
            value={status}
            onChange={handleStatusChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
          >
            <option value="pending">Pending</option>
            <option value="accept">Accept</option>
            <option value="reject">Reject</option>
          </select>
        </div>
      </div>
    </div>
  )
}

export default Page
