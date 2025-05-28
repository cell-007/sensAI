import { UserButton } from '@clerk/nextjs'
import AddNewInterview from './_components/AddNewInterview'
import React from 'react'
import InterviewList from './_components/InterviewList'
import { FaRocket, FaChartLine, FaUserTie, FaComments } from 'react-icons/fa'

function Dashboard() {
  // Mock data for dashboard stats
  const stats = [
    { title: "Total Interviews", value: "24", icon: <FaComments className="text-blue-500" />, change: "+12%", bg: "bg-blue-50" },
    { title: "Success Rate", value: "87%", icon: <FaRocket className="text-green-500" />, change: "+8%", bg: "bg-green-50" },
    { title: "Avg. Score", value: "8.2/10", icon: <FaChartLine className="text-purple-500" />, change: "+1.4", bg: "bg-purple-50" },
    { title: "Active Users", value: "128", icon: <FaUserTie className="text-amber-500" />, change: "+23", bg: "bg-amber-50" }
  ]

  return (

    
      
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8 mt-10 mb-20 rounded-lg'>
      {/* Header */}
      <div className='flex justify-between items-center'>
        
      </div>

      {/* Stats Cards */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8'>
        {stats.map((stat, index) => (
          <div key={index} className={`${stat.bg} rounded-2xl p-5 shadow-sm border border-gray-100 transition-all hover:shadow-md`}>
            <div className='flex justify-between items-start'>
              <div>
                <p className='text-gray-600 text-sm'>{stat.title}</p>
                <p className='font-bold text-2xl mt-1'>{stat.value}</p>
              </div>
              <div className='bg-white p-3 rounded-lg'>
                {stat.icon}
              </div>
            </div>
            <p className='text-xs text-green-600 mt-3 font-medium'>{stat.change} from last week</p>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className='flex flex-col lg:flex-row gap-6'>
        {/* Left Column */}
        <div className='lg:w-7/12 '>
          <div className='bg-white rounded-2xl p-6 shadow-sm border border-gray-100 pb-12'>
            <div className='flex justify-between items-center mb-6'>
              <div>
                <h2 className='font-bold text-xl text-gray-900 '>Create New Interview</h2>
                <p className='text-gray-500 text-sm'>Start a personalized mock interview</p>
              </div>
            </div>
            
            <div className='grid grid-cols-1'>
              <AddNewInterview />
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className='lg:w-5/12'>
          <div className='bg-gradient-to-br from-indigo-50 to-blue-100 rounded-2xl p-6 shadow-sm border border-indigo-100 mb-6'>
            <h3 className='font-bold text-lg text-indigo-900 mb-3'>Quick Tips</h3>
            <ul className='space-y-3'>
              <li className='flex items-start'>
                <div className='bg-white p-1 rounded-lg mr-1'>
                  <span className='text-indigo-600 font-bold'>1</span>
                </div>
                <p className='text-gray-700'>Prepare answers for common behavioral questions</p>
              </li>
              <li className='flex items-start'>
                <div className='bg-white p-1 rounded-lg mr-1'>
                  <span className='text-indigo-600 font-bold'>2</span>
                </div>
                <p className='text-gray-700'>Review technical concepts related to your field</p>
              </li>
              <li className='flex items-start'>
                <div className='bg-white p-1 rounded-lg mr-1'>
                  <span className='text-indigo-600 font-bold'>3</span>
                </div>
                <p className='text-gray-700'>Practice speaking clearly and confidently</p>
              </li>
              <li className='flex items-start'>
                <div className='bg-white p-1 rounded-lg mr-1'>
                  <span className='text-indigo-600 font-bold'>4</span>
                </div>
                <p className='text-gray-700'>Use our AI feedback to identify improvement areas</p>
              </li>
            </ul>
          </div>

          
        </div>
      </div>

      {/* Interview List */}
      <div className='bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mt-6'>
        <div className='flex justify-between items-center mb-6'>
          <div>
            <h2 className='font-bold text-xl text-gray-900'>Previous Interviews</h2>
            <p className='text-gray-500 text-sm'>Review your past performance and feedback</p>
          </div>
          <button className='text-sm bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors'>
            View All
          </button>
        </div>
        <InterviewList />
      </div>
    </div>
  )
}

export default Dashboard