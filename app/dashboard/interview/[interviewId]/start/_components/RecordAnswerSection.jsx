"use client";
import React, { useEffect, useState } from 'react';
import Webcam from 'react-webcam'; // Import the actual webcam component
import Image from 'next/image'; // Correct Image import
import { Button } from '@/components/ui/button';
import useSpeechToText from 'react-hook-speech-to-text';
import { Mic } from 'lucide-react';
import { toast } from 'sonner';
import { chatSession } from '@/utils/GeminiAiModel';
import { UserAnswer } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';
import { db } from '@/utils/db'; // Ensure the correct import for your DB instance

function RecordAnswerSection({ mockinterviewQuestion, activeQuestionIndex, interviewData }) {
  const [userAnswer, setUserAnswer] = useState('');
  const { user } = useUser();
  const [loading, setLoading] = useState(false);

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
    useLegacyResults: false,
  });

  useEffect(() => {
    if (results.length > 0) {
      results.forEach((result) => {
        setUserAnswer((prevAns) => prevAns + result?.transcript);
      });
    }
  }, [results]);

  useEffect(() => {
    if (!isRecording && userAnswer.length > 10) {
      UpdateUserAnswer();
    }
  }, [userAnswer]);

  const StartStopRecording = async () => {
    if (isRecording) {
      stopSpeechToText();
    } else {
      startSpeechToText();
    }
  };

  const UpdateUserAnswer = async () => {
    console.log(userAnswer);
    setLoading(true);

    const feedbackPrompt =
      "Question: " +
      mockinterviewQuestion[activeQuestionIndex]?.Question +
      ", User Answer: " +
      userAnswer +
      "Based on the question and user answer, please give a rating between 0-5 and feedback for improvement in just 3-5 lines in JSON format with 'rating' and 'feedback' fields. If the user includes relevant examples in their answer, give a higher rating (above 3). If the answer is based on their experience and lacks specific examples, provide a fair rating considering the context.";

    try {
      const result = await chatSession.sendMessage(feedbackPrompt);
      let rawResponse = await result.response.text();

      const sanitizedResponse = rawResponse
        .replace(/```json/g, '') // Remove the start of code block
        .replace(/```/g, '')     // Remove the end of code block
        .replace(/[^\x20-\x7E]/g, ''); // Remove any non-printable characters

      console.log('Sanitized Response:', sanitizedResponse);
      const JsonFeedbackResp = JSON.parse(sanitizedResponse);

      let correctAnswer = mockinterviewQuestion[activeQuestionIndex]?.answer;

      if (!correctAnswer) {
        const correctAnswerPrompt = 
          "Please provide the correct answer for the following question in 4-5 lines (no bold text or special characters): " +
          mockinterviewQuestion[activeQuestionIndex]?.Question;

        const correctAnswerResult = await chatSession.sendMessage(correctAnswerPrompt);
        const correctAnswerResponse = await correctAnswerResult.response.text();

        correctAnswer = correctAnswerResponse
          .replace(/```/g, '') // Clean up the response from extra code block markers
          .trim();

        console.log('Fetched Correct Answer:', correctAnswer);
      }

      const resp = await db.insert(UserAnswer).values({
        mockIdRef: interviewData?.mockId,
        question: mockinterviewQuestion[activeQuestionIndex]?.Question,
        correctAns: correctAnswer,
        userAns: userAnswer,
        feedback: JsonFeedbackResp?.feedback,
        rating: JsonFeedbackResp?.rating,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        createdAt: moment().format('DD-MM-yyyy'),
      });

      if (resp) {
        toast('User Answer Recorded Successfully!');
        setResults([]); // Clear the transcription after saving
      }

      setUserAnswer('');
    } catch (error) {
      console.error('Error updating user answer:', error);
      toast.error('Failed to record the answer. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex items-center justify-center flex-col'>
      <div className='relative flex flex-col justify-center items-center rounded-lg p-5 mt-20 bg-black'>
        <Webcam
          mirrored={true}
          style={{
            height: 300,
            width: '100%',
            zIndex: 10, // Ensure it's on the proper layer
          }}
        />
        <Image
          src='/cameraa.png'
          width={400}
          height={400}
          alt='Camera Icon'
          className='absolute'
        />
      </div>

      <Button 
        disabled={loading}
        variant='outline'
        className='my-10'
        onClick={StartStopRecording}
      >
        {isRecording ? (
          <h2 className='text-red-600 flex gap-2'>
            <Mic /> Stop Recording...
          </h2>
        ) : (
          <h2 className='text-violet-600 flex gap-2'> {/* Text color is now violet-blue */} 
            <Mic /> Record Answer {/* Added Mic icon to "Record Answer" */}
          </h2>
        )}
      </Button>
    </div>
  );
}

export default RecordAnswerSection;
