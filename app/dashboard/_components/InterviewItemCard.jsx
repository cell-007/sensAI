import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React from 'react'

function InterviewItemCard({interview}) {
    const router = useRouter();

    const onStart=()=>{
        router.push('/dashboard/interview/'+interview?.mockId)
    }

    const onFeedbackPress=()=>{
        router.push('/dashboard/interview/'+interview.mockId+"/feedback")
    }
    
  return (
    <div className='border shadow-sm rounded-lg p-3'>
      <h2 className='font-bold text-blue-800 '>{interview?.jobPosition}</h2>
      <h2 className='text-md text-gray-700'>{interview?.jobExperience} Years of Experience</h2>
      <h2 className='text-sm text-gray-500'><strong>Created At: </strong>{interview.createdAt}</h2>
      
      <div className='flex justify-between mt-2 gap-5'>
        
        <Button size="sm" variant="outline" className="w-half" onClick={onFeedbackPress}>Feedback</Button>
        <Button size="sm" className="w-half" onClick={onStart}>Start</Button>
      </div>
      
    </div>
  )
}

export default InterviewItemCard
