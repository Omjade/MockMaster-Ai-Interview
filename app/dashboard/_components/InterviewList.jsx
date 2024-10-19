"use client";

import { db } from '@/utils/db';
import { MockIntervirew } from '@/utils/schema'; // Consider renaming to MockInterview for clarity
import { useUser } from '@clerk/nextjs';
import { eq, desc } from 'drizzle-orm';
import React, { useEffect, useState } from 'react';
import InterviewItemCard from './InterviewItemCard';

function InterviewList() {
    const { user } = useUser();
    const [interviewList, setInterviewList] = useState([]); // Corrected position of useState

    useEffect(() => {
        if (user) {
            GetInterviewList(); // Call function only if user exists
        }
    }, [user]);

    const GetInterviewList = async () => {
        const result = await db.select()
            .from(MockIntervirew)
            .where(eq(MockIntervirew.createdBy, user?.primaryEmailAddress?.emailAddress))
            .orderBy(desc(MockIntervirew.id));

        console.log(result);
        setInterviewList(result); // Corrected function name from 'steInterviewList' to 'setInterviewList'
    };

    return (
        <div>
            <div className='font-medium text-xl mt-10'>Previous Mock Interviews</div>

            {interviewList.length === 0 ? ( // Check if there are no interviews
                <div className='mt-5 text-center'>
                    <h2 className='text-lg font-semibold'>No Previous Interviews</h2>
                    <p>Add new to create your first Mock Interview.</p>
                </div>
            ) : (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3'>
                    {interviewList.map((interview, index) => (
                        <InterviewItemCard key={index} interview={interview} /> // Added the interview prop
                    ))}
                </div>
            )}
        </div>
    );
}

export default InterviewList;
