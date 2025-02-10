'use client';

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';


export default function ComputerFundamentals() {
  return (
    <div className="flex items-center justify-center min-h-screen p-6">
      <Card className="relative max-w-3xl w-full bg-gray-800 bg-opacity-90 text-white rounded-xl shadow-lg overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image 
            src="/courses/coumputer-user-image.png" 
            alt="Background" 
            layout="fill" 
            objectFit="cover" 
            className="opacity-80"
          />
        </div>

        <CardContent className="relative z-10 p-8">
          <div className="pb-8 relative flex flex-col items-center">
            <Image src="/courses/aburayyan-logo.webp" alt="logo" width={64} height={64} />
            <h1 className="text-5xl font-bold text-gray-300 text-center">Abu-Rayyan Academy</h1>
            <p className="text-lg font-semibold text-gray-400 text-center mb-4">
              The center of ICT and Artificial Intelligence(AI)
            </p>
          </div>

          <h2 className="text-3xl font-bold text-yellow-400 text-center">
            Learn Computer Fundamentals <br />&<br />Kickstart Your ICT Journey!
          </h2>

          <ul className="mt-4 text-lg text-gray-300 space-y-2">
            <li>✅ Are you preparing for tertiary studies?</li>
            <li>✅ Dreaming of starting a cyber café or ICT business?</li>
            <li>✅ Want to gain essential digital skills for work or daily life?</li>
          </ul>

          <div className="text-center mt-6 bg-yellow-500 text-gray-900 font-bold py-3 rounded-lg text-xl">
            Join Our Comprehensive 2-Month Training!
          </div>

          <div className="text-center text-lg mt-6">
            <span className="text-yellow-300 font-bold">Save up to 15% </span><br />
            <span className="line-through text-gray-400">Fees: 6,000 /=</span> <br />
            <span className="text-green-400 font-bold text-2xl">NOW at 5,100 /=</span>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-bold text-yellow-400">What You'll Learn:</h2>
            <ul className="mt-4 space-y-2 text-gray-300">
              <li>✅ Introduction to Computers & Hardware</li>
              <li>✅ Microsoft Office Suite (Word, Excel, PowerPoint, Publisher)</li>
              <li>✅ Basic Computer Repair & Maintenance</li>
              <li>✅ Internet & Browsing</li>
              <li>✅ Google Tools (Gmail, Drive, Docs, Sheets, Meet)</li>
              <li>✅ Online Cyber Café Services (KRA, eCitizen, etc.)</li>
              <li>✅ Graphic Design Using Canva</li>
              <li>✅ Introduction to AI/LLM Tools - ChatGPT, Deepseek, etc.</li>
            </ul>
          </div>

          <div className="mt-8 text-lg text-gray-300">
            <p>📅 <b>Start Date:</b> 3rd March 2025</p>
            <p>⏰ <b>Time:</b> 4:00 PM - 5:30 PM (Mon - Fri)</p>
            <p>📍 <b>Location:</b> Abu-Rayyan Academy, Sabasaba, Mombasa</p>
          </div>

          <div className="text-center mt-8 text-lg font-bold">
            📞 Register Today! Call/WhatsApp:
            <span className="text-green-400"> 0722 299 287</span>
          </div>

          <Button className="w-full mt-6 bg-yellow-500 text-gray-900 font-bold py-3 text-xl rounded-lg">
            Limited Slots Available – Secure Yours Now!
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
