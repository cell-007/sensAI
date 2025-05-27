"use client"
import { db } from '@/utils/db'
import { UserAnswer } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import React, { useEffect, useState, use } from 'react'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronsUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'


function Feedback({params}) {
    const resolvedParams = use(params); // Unwrap the params Promise
    const [feedbackList,setFeedbackList]=useState([]);
    const router=useRouter();
    
    useEffect(()=>{
        GetFeedback();
    },[])
    
    const GetFeedback = async()=>{
        const result=await db.select()
        .from(UserAnswer)
        .where(eq(UserAnswer.mockIdRef,resolvedParams.interviewId)) // Use resolvedParams
        .orderBy(UserAnswer.id);
        console.log(result);
        setFeedbackList(result);
    }
    
  return (
    <div className='p-10'>
      {feedbackList?.length==0?
      <h2 className='font-bold text-xl text-gray-500'>No Interview Feedback Record found</h2>  
      :
      <>
      <h2 className='text-3xl font-bold text-green-500'>Congratulations!</h2>
      <h2 className='font-bold text-2xl'>Here is your Interview Feedback</h2>

      <h2 className='text-blue-800 text-lg my-3'>Your Overall Interview Rating: <strong>6/10</strong></h2>
      <h2 className='text-sm text-gray-500 '>Find below Interview Question with correct answer, your answer and feedback for improvement</h2>
      {feedbackList&&feedbackList.map((item,index)=>(
        <Collapsible key={index} className='mt-7'>
          <CollapsibleTrigger className=' flex justify-between p-2 bg-secondary rounded-lg my-2 text-left gap-10 w-full'>
          {item.question} <ChevronsUpDown className='h-5 w-5'/>
          </CollapsibleTrigger>
           <CollapsibleContent>
              <div className='flex flex-col gap-2'>
                <h2 className='text-red-700 p-2 border rounded-lg'><strong>Rating: </strong>{item.rating}</h2>
                <h2 className='p-2 border rounder-lg bg-red-50 text-sm text-red-700'><strong>Your Answer: </strong>{item.userAns}</h2>
                <h2 className='p-2 border rounder-lg bg-green-50 text-sm text-green-700'><strong>Expected Answer: </strong>{item.correctAns}</h2>
                <h2 className='p-2 border rounder-lg bg-blue-50 text-sm text-blue-800'><strong>Feedback: </strong>{item.feedback}</h2>
              </div>
           </CollapsibleContent>    
        </Collapsible>
      ))}
    </>}
      <Button onClick={()=>router.replace('/dashboard')} className='w-full mt-10'>Go to Dashboard</Button>
    </div>
  )
}

export default Feedback