import { Lightbulb, Volume2 } from 'lucide-react';
import React from 'react';

function QuestionSection({ mockinterviewQuestion, activeQuestionIndex }) {
  
  const textToSpeech = (text) => {
    if ('speechSynthesis' in window) {
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    } else {
      alert('Sorry! Your browser does not support text to speech');
    }
  };
  
  return (
    mockinterviewQuestion && (
      <div className='p-5 border rounded-lg mg-10 mt-10'>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
          {mockinterviewQuestion.map((question, index) => (
            <h2
              key={index}
              className={`p-2 rounded-full text-xs md:text-sm text-center cursor-pointer 
                ${activeQuestionIndex === index ? 'bg-primary text-white' : 'bg-secondary'}`}
            >
              Question #{index + 1}
            </h2>
          ))}
        </div>
        
        {/* Display the active question */}
        <h2 className='my-5 text-sm md:text-lg'>
          {mockinterviewQuestion[activeQuestionIndex]?.Question}
        </h2>

        {/* Volume2 Icon to trigger text-to-speech */}
        <Volume2
          className="cursor-pointer"
          onClick={() => textToSpeech(mockinterviewQuestion[activeQuestionIndex]?.Question)}
        />

        {/* Note section */}
        <div className='border rounded-lg p-5 bg-blue-100 mt-10'>
          <h2 className='flex gap-2 items-center text-primary'>
            <Lightbulb />
            <strong>Note:</strong>
          </h2>
          <h2 className='text-sm text-primary my-2'>
            {process.env.NEXT_PUBLIC_QUESTION_NOTE}
          </h2>
        </div>
      </div>
    )
  );
}

export default QuestionSection;
