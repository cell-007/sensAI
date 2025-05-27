"use client";
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { chatSession } from '@/utils/GeminiAIModal';
import { LoaderCircle } from 'lucide-react';
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';
import { useRouter } from 'next/navigation'; // Fixed router import

function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState('');
  const [jobDesc, setJobDesc] = useState('');
  const [jobExperience, setJobExperience] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { user } = useUser();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Validate user authentication
      if (!user?.id) {
        throw new Error('User not authenticated');
      }

      const inputPrompt = `Job Position: ${jobPosition}, Job Description: ${jobDesc}, Years of Experience: ${jobExperience}. Generate ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} interview questions with answers in JSON format.`;

      const result = await chatSession.sendMessage(inputPrompt);
      const response = await result.response;
      const text = response.text();
      
      // Clean and parse response
      const cleanedResponse = text.replace(/```json|```/g, '').trim();
      const parsedData = JSON.parse(cleanedResponse);

      // Database insertion
      const resp = await db.insert(MockInterview)
        .values({
          mockId: uuidv4(),
          jsonMockResp: JSON.stringify(parsedData),
          jobPosition,
          jobDesc,
          jobExperience,
          createdBy: user.primaryEmailAddress.emailAddress,
          createdAt: moment().format('DD-MM-YYYY')
        }).returning({ mockId: MockInterview.mockId });

      if (resp?.[0]?.mockId) {
        setOpenDialog(false);
        router.push(`/dashboard/interview/${resp[0].mockId}`);
      }
    } catch (error) {
      console.error('Error:', error);
      setError(error.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div
        className='p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all'
        onClick={() => setOpenDialog(true)}
        role='button'
        tabIndex={0}
      >
        <h2 className='text-lg text-center'>+ Add New</h2>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Tell us about the job you&apos;re interviewing for</DialogTitle>
            <DialogDescription>
              Add details about your position, description, and experience.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={onSubmit}>
            <div className='mt-4 space-y-4'>
              <div className='space-y-2'>
                <label htmlFor="jobRole" className="text-sm font-medium">
                  Job Role/Position
                </label>
                <Input 
                  id="jobRole"
                  placeholder="Data Scientist" 
                  required
                  value={jobPosition}
                  onChange={(e) => setJobPosition(e.target.value)}
                />
              </div>
              
              <div className='space-y-2'>
                <label htmlFor="jobDesc" className="text-sm font-medium">
                  Job Description/Tech Stack
                </label>
                <Textarea 
                  id="jobDesc"
                  placeholder="React, Next.js, MySQL" 
                  required
                  value={jobDesc}
                  onChange={(e) => setJobDesc(e.target.value)}
                />
              </div>
              
              <div className='space-y-2'>
                <label htmlFor="experience" className="text-sm font-medium">
                  Years of Experience
                </label>
                <Input 
                  id="experience"
                  placeholder="5" 
                  type="number" 
                  min="0"
                  max="30" 
                  required
                  value={jobExperience}
                  onChange={(e) => setJobExperience(e.target.value)}
                />
              </div>
            </div>

            {error && (
              <p className="text-red-500 text-sm mt-4">{error}</p>
            )}

            <div className='flex gap-5 justify-end mt-6'>
              <Button 
                type="button" 
                variant="ghost" 
                onClick={() => setOpenDialog(false)}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                disabled={loading}
                aria-disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <LoaderCircle className="animate-spin h-4 w-4" />
                    Generating...
                  </span>
                ) : 'Start Interview'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;