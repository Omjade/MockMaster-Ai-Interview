"use client";

import { db } from '@/utils/db';
import { MockIntervirew } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react';
import QuestionSection from './_components/QuestionSection';
import RecordAnswerSection from './_components/RecordAnswerSection';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function StartInterview({ params }) {
  const [interviewData, setInterviewData] = useState(); // Keep as is
  const [mockinterviewQuestion, setMockInterviewQuestion] = useState([]); // Empty array as default
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  useEffect(() => {
    GetInterviewDetails();
  }, []); // No change here

  const GetInterviewDetails = async () => {
    try {
      const result = await db
        .select()
        .from(MockIntervirew)
        .where(eq(MockIntervirew.mockId, params.interviewId));

      if (result.length > 0) {
        const jsonMockResp = JSON.parse(result[0].jsonMockResp || '[]'); // Parse with fallback
        setMockInterviewQuestion(jsonMockResp); // Set the parsed response
        setInterviewData(result[0]); // Set interview data
      }
    } catch (error) {
      console.error('Error fetching interview details:', error);
    }
  };

  return (
    <div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
        {/* Question */}
        <QuestionSection
          mockinterviewQuestion={mockinterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
        />

        {/* Video & Audio Recording */}
        <RecordAnswerSection
          mockinterviewQuestion={mockinterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
          interviewData={interviewData}
        />
      </div>

      <div className='flex justify-end gap-6'>
  {activeQuestionIndex > 0 && (
    <Button onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}>
      Previous Question
    </Button>
  )}

  {activeQuestionIndex < mockinterviewQuestion?.length - 1 && (
    <Button onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}>
      Next Question
    </Button>
  )}

  {activeQuestionIndex === mockinterviewQuestion?.length - 1 && interviewData?.mockId && (
    <Link href={'/dashboard/interview/'+interviewData?.mockId+"/feedback"}>
      <Button>End Interview</Button>
    </Link>
  )}
</div>

    </div>
  );
}

export default StartInterview;
