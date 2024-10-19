'use client'; // Ensure this is a client component

import { Button } from '@/components/ui/button';
import { db } from '@/utils/db';
import { UserAnswer } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

function Feedback({ params }) {
  const [feedbackList, setFeedbackList] = useState([]);
  const router = useRouter();

  useEffect(() => {
    GetFeedback();
  }, []); // Runs once on component mount

  const GetFeedback = async () => {
    try {
      const result = await db
        .select()
        .from(UserAnswer)
        .where(eq(UserAnswer.mockIdRef, params.interviewId)) // Fetch all questions for this mockIdRef
        .orderBy(UserAnswer.id);

      console.log('Feedback results:', result); // Log the entire result array to ensure it contains all questions

      if (result.length === 0) {
        console.warn('No feedback found for this interview ID:', params.interviewId);
      }

      setFeedbackList(result); // Set all fetched feedback into the state
    } catch (error) {
      console.error('Error fetching feedback:', error); // Error handling
    }
  };

  // Calculate overall rating and determine the rating message
  const calculateRating = () => {
    if (feedbackList.length === 0) return { average: 0, message: '' };

    const totalRating = feedbackList.reduce((acc, feedback) => acc + parseInt(feedback.rating), 0);
    const maxPossibleScore = feedbackList.length * 5; // 5 is the max rating per question
    const average = ((totalRating / maxPossibleScore) * 10).toFixed(1); // Average rating out of 10

    let message = '';
    if (average >= 8) {
      message = 'Excellent';
    } else if (average >= 6) {
      message = 'Good';
    } else if (average >= 4) {
      message = 'Good Luck';
    } else {
      message = 'Work Hard';
    }

    return { average, message };
  };

  const { average, message } = calculateRating();

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold text-green-500">Congratulations!</h2>
      <h2 className="font-bold text-2xl">Here is Your Interview Feedback</h2>
      <h2 className="text-primary text-lg my-3">
        Your overall interview rating: <strong>{average}/10</strong> - <span className={average >= 6 ? 'text-green-500' : 'text-red-500'}>{message}</span>
      </h2>

      <h2 className="text-sm text-gray-500">
        Below are the interview questions with the correct answers, your answers, and feedback for improvement:
      </h2>

      {/* Display feedback data for all questions */}
      <div className="mt-5">
        {feedbackList.length > 0 ? (
          feedbackList.map((feedback, index) => {
            const feedbackColor = parseInt(feedback.rating) <= 2 ? 'text-red-500' : 'text-green-500'; // Color based on rating

            return (
              <div key={feedback.id} className="mb-4 p-4 border rounded-lg">
                <h3 className={`font-bold ${feedbackColor}`}>Question {index + 1}: {feedback.question}</h3>
                <p><strong>Your Answer:</strong> {feedback.userAns}</p>
                <p><strong>Correct Answer:</strong> {feedback.correctAns}</p>
                <p><strong>Feedback:</strong> <span className={feedbackColor}>{feedback.feedback}</span></p>
                <p><strong>Rating:</strong> <span className={feedbackColor}>{feedback.rating}/5</span></p>
              </div>
            );
          })
        ) : (
          <p>No feedback available for this interview.</p>
        )}
      </div>

      {/* Button to go home, applicable in both conditions */}
      <Button className='mt-10' onClick={() => router.replace('/dashboard')}>Go Home</Button>
    </div>
  );
}

export default Feedback;
