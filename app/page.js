import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button'; // Assuming you have a reusable Button component

export default function Home() {
  return (
    <div className="relative flex flex-col min-h-screen bg-black text-center">
      {/* Fullscreen Background Image */}
      <div className="absolute inset-0 z-0 h-screen w-full">
          <Image
      src="/bgimage.png" // Use your image asset here
      alt="Mock Interview Background"
      layout="fill" // Ensures the image covers the full screen
      objectFit="cover" // Ensures the image covers without distortion
      quality={100} // Optional: Set image quality for better clarity
      className="brightness-80 filter contrast-125" // Increase contrast for sharpness
    />

      </div>

      {/* Hero Section moved lower */}
      <div className="relative z-10 flex flex-col items-center justify-center h-screen" style={{ marginTop: '150px' }}> {/* Custom margin here */}
        <div className="bg-white bg-opacity-90 rounded-lg shadow-lg p-8 max-w-lg mx-auto">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Welcome to Your Interview Prep Platform
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-gray-600 mb-6">
            Enhance your interview skills with mock interviews, real-time feedback, and expert guidance.
            Sign in to take your career to the next level.
          </p>

          {/* Sign In Button */}
          <Link href="/dashboard">
            <Button className="bg-violet-600 text-white px-4 py-2 rounded-md shadow-lg hover:bg-violet-700 transition-all duration-300">
              Sign In
            </Button>
          </Link>
        </div>
      </div>

      {/* Footer Section (Scroll down to reveal) */}
      <div className="relative z-10 bg-black w-full py-12">
        <footer className="w-full bg-gray-900 text-white py-6">
          <div className="text-center">
            <p className="text-sm">
              &copy; {new Date().getFullYear()} Interview Prep Platform. All rights reserved to Om Jade & Teams.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
