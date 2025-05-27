"use client";
import { MockInterview } from '@/utils/schema';
import React, { useEffect, useState } from 'react';
import { db } from '@/utils/db';
import { eq } from 'drizzle-orm';
import Webcam from 'react-webcam';
import { Lightbulb, WebcamIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function Interview({ params }) {
    // Unwrap the params promise using React.use()
    const resolvedParams = React.use(params);
    
    const [interviewData,setInterviewData]=useState();
    const [webCamEnabled, setWebCamEnabled]=useState(false);
    useEffect(() => {
        console.log(resolvedParams.interviewId);
        GetInterviewDetails();
    }, [resolvedParams.interviewId]); // Use resolved params in dependency array

    const GetInterviewDetails = async () => {
        try {
            const result = await db.select()
                .from(MockInterview)
                .where(eq(MockInterview.mockId, resolvedParams.interviewId));
            
            setInterviewData(result[0]);
        } catch (error) {
            console.error('Error fetching interview details:', error);
        }
    };

    return (
        <div className='my-10 '>
            <h2 className='font-bold text-2xl'>Let's Get started</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
          
            <div className='flex flex-col my-5 gap-5 '>
                <div className='flex flex-col p-5 rounded-lg border gap-5'>
                <h2 className='text-lg'><strong>Job Role/Job Position: </strong>{interviewData?.jobPosition || 'Loading...'}</h2>
                <h2 className='text-lg'><strong>Job Description/Tech Stack: </strong>{interviewData?.jobDesc || 'Loading...'}</h2>
                <h2 className='text-lg'><strong>Years of Experience: </strong>{interviewData?.jobExperience || 'Loading...'}</h2>
                </div>
                <div className='p-5 border rounded-lg border-green-300 bg-cyan-100'>
                    <h2 className='flex gap-2 items-center text-blue-700'><Lightbulb/><strong>Information</strong></h2>
                    <h2 className='mt-3 text-blue-700'>{process.env.NEXT_PUBLIC_INFORMATION}</h2>
                </div>
                
            </div>
            <div className=''>
                {webCamEnabled?<Webcam 
                onUserMedia={()=>setWebCamEnabled(true)}
                onUserMediaError={()=>setWebCamEnabled(false)}
                mirrored={true}
                style={{
                    height:300,
                    width:800,
                }}
                />
                :
                <>
                <WebcamIcon  className='h-72 w-full my-7 p-20 bg-secondary rounded-lg border'/>
                <Button variant="ghost"className='w-full' onClick={()=>setWebCamEnabled(true)}>Enable Web Cam and Microphone</Button>
                </>
             }
            </div>
            
        </div>
       <div className='flex justify-end items-end'>
        <Link href={'/dashboard/interview/'+resolvedParams.interviewId+'/start'}>
        <Button className=''>Start Interview</Button>
        </Link>
        </div>
        </div>
    );
}

export default Interview;