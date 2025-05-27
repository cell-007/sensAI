"use client"
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'
import { Mic, Mic2, MicIcon, MicVocal, StopCircle } from 'lucide-react'
import { toast, Toaster } from 'sonner'
import { chatSession } from '@/utils/GeminiAIModal'
import { useUser } from '@clerk/nextjs'
import moment from 'moment'
import { db } from '@/utils/db'
import { UserAnswer } from '@/utils/schema' // Import your UserAnswer table

// Import dynamically to avoid SSR issues
const useSpeechToText = typeof window !== 'undefined' 
  ? require('react-hook-speech-to-text').default 
  : () => ({
      error: null,
      interimResult: '',
      isRecording: false,
      results: [],
      startSpeechToText: () => {},
      stopSpeechToText: () => {},
    })

function RecordAnswerSection({mockInterviewQuestion, activeQuestionIndex, interviewData}) {
    const [userAnswer, setUserAnswer]=useState('');
    const {user}=useUser();
    const [loading, setLoading]=useState(false);
    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
        setResults

    } = useSpeechToText({
        continuous: true,
        useLegacyResults: false
    });

    useEffect(()=>{
        results.map((result)=>(
          setUserAnswer(prevAns=>prevAns+result?.transcript)
        ))
    },[results])

    useEffect(()=>{
        if(!isRecording&&userAnswer.length>10)
        {
          UpdateUserAnswer();
        }
        
    },[userAnswer])

    const StartStopRecording=async()=>{
      if(isRecording)
        {
        
        stopSpeechToText()
       
        
      }
      else{
        startSpeechToText();
      }
    }

    const UpdateUserAnswer=async()=>{
      console.log(userAnswer)
      setLoading(true)
      
      try {
        const feedbackPrompt = "Question:"+mockInterviewQuestion[activeQuestionIndex]?.question+
          ", User Answer:"+userAnswer+",Depends on question and user answer for given interview questions"+
          " Please give us rating for answer and feedback as area of improvement if any"+
          "in just 3 to 5 lines to improve it in JSON format with rating field and feedback";

        const result=await chatSession.sendMessage(feedbackPrompt);

        const mockJsonResp=(result.response.text()).replace('```json','').replace('```','');
        console.log(mockJsonResp);
        const JsonFeedbackResp=JSON.parse(mockJsonResp);

        // Fixed: Use your actual table name instead of userAnswer
        const resp=await db.insert(UserAnswer) // Use UserAnswer table from schema
        .values({
          mockIdRef:interviewData?.mockId,
          question:mockInterviewQuestion[activeQuestionIndex]?.question,
          correctAns:mockInterviewQuestion[activeQuestionIndex]?.answer,
          userAns:userAnswer,
          feedback:JsonFeedbackResp?.feedback,
          rating:JsonFeedbackResp?.rating,
          userEmail:user?.primaryEmailAddress?.emailAddress,
          createdAt:moment().format('DD-MM-YYYY')
        })

        if(resp)
        {
          toast('User Answer Recorded Successfully!')
          setResults([]);
        }
        setResults([]);
        setUserAnswer('');
      } catch (error) {
        console.error('Error saving user answer:', error);
        toast('Error saving answer. Please try again.');
      } finally {
        setLoading(false);
      }
    }
      
  return (
    <div className='flex items-center justify-center flex-col'>
    <div className='flex flex-col justify-center items-center rounded-lg p-5 mt-20 bg-black'>
        <Image src={'/webcam.png'} width={350} height={350} alt='webcam'
        className='absolute'/>
      <Webcam
      mirrored={true}
      style={{
        height: 300,
        width: '100%',
        zIndex: 10,
        borderRadius: 10,
      }}
      />
    </div>
    <Button 
    disabled={loading}
    className="my-10 cursor-pointer" onClick={StartStopRecording}>
    {isRecording ?
    <h2 className='text-red-600 animate-pulse items-center flex gap-2'>
        <StopCircle/>Stop Recording
    </h2>
    :
    
    <h2 className='flex gap-2 items-center'><Mic/>Record Answer</h2>}
    </Button>
     
    
    </div>
  )
}

export default RecordAnswerSection