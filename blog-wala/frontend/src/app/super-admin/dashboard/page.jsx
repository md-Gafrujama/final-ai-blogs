"use client";
import React, { useEffect, useState } from 'react'
import { assets, dashboard_data } from '@/Assets/assets'
import { useAppContext } from '@/context/AppContext'
import toast from 'react-hot-toast'
const baseURL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5000';

const Dashboard = () => {
    const [dashboardData, setDashboardData] = useState({
        blogs: 0,
        comments: 0,
        drafts: 0,
        recentBlogs: [],
        companyBlogCounts: {}
    })

    const [companySorting, setCompanySorting] = useState('alphabetical')
    const { axios } = useAppContext()

    const fetchDashboard = async () => {
        try {
            const { data } = await axios.get(`${baseURL}/api/admin/dashboard`)
            data.success ? setDashboardData(data.dashboardData) : toast.error(data.message)
        } catch (error) {
            toast.error(error.message)
        }
    }

    const handleSortingChange = (e) => {
        setCompanySorting(e.target.value)
        // You can add sorting logic here based on the selected option
        console.log('Sorting changed to:', e.target.value)
    }

    // Get company count from companyBlogCounts object
    const getCompanyCount = () => {
        return Object.keys(dashboardData.companyBlogCounts || {}).length
    }

    useEffect(() => {
        fetchDashboard()
    }, [])

    return (
        <div className='flex-1 p-4 md:p-10 bg-blue-50/50'>
            <div className='flex flex-wrap gap-4'>
                {/* First Card - Total Companies */}
                <div className='flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all'>
                    <img src={assets.dashboard_icon_1} alt="" />
                    <div>
                        <p className='text-xl font-semibold text-gray-600'>{dashboardData.blogs}</p>
                        <p className='text-gray-400 font-light'>Total Number of Companies</p>
                    </div>
                </div>

                {/* Second Card - Blog Count */}
                <div className='flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all'>
                    <img src={assets.dashboard_icon_2} alt="" />
                    <div>
                        <p className='text-xl font-semibold text-gray-600'>{dashboardData.comments}</p>
                        <p className='text-gray-400 font-light'>Blogs Count</p>
                    </div>
                </div>

                {/* Third Card - Company Sorting */}
                <div className='bg-white p-4 min-w-58 rounded shadow hover:shadow-lg transition-all'>
                    <div className='flex items-center gap-3 mb-3'>
                        <div>
                            <p className='text-xl font-semibold text-gray-600'>{getCompanyCount()}</p>
                            <p className='text-gray-400 font-light'>Active Companies</p>
                        </div>
                    </div>
                    
                    <div className='mt-3'>
                        <label htmlFor="company-sort" className='block text-sm font-medium text-gray-600 mb-2'>
                            Company Sorting:
                        </label>
                        <select 
                            id="company-sort"
                            value={companySorting}
                            onChange={handleSortingChange}
                            className='w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white'
                        >
                            <option value="alphabetical">Alphabetical (A-Z)</option>
                            <option value="alphabetical-desc">Alphabetical (Z-A)</option>
                            <option value="blog-count-asc">Blog Count (Low to High)</option>
                            <option value="blog-count-desc">Blog Count (High to Low)</option>
                            <option value="recent">Recently Added</option>
                            <option value="oldest">Oldest First</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
