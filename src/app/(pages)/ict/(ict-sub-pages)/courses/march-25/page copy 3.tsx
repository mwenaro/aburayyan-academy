'use client';

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import RegistrationForm from './RegistrationForm';

export default function ComputerFundamentals() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen p-6">
      <Card className="relative max-w-3xl w-full bg-gray-800 bg-opacity-90 text-white rounded-xl shadow-lg overflow-hidden">
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

          <h3 className="text-2xl font-bold text-yellow-400 mt-6">Skills You Will Gain:</h3>
          <ul className="mt-4 text-lg text-gray-300 space-y-2">
            <li>💻 Basic Computer Operations – Understand how to efficiently use a computer.</li>
            <li>🖥️ Operating Systems & File Management – Navigate and manage digital files effectively.</li>
            <li>📄 Word Processing – Create professional documents using Microsoft Word or Google Docs.</li>
            <li>📊 Spreadsheets – Learn data organization and analysis using Excel or Google Sheets.</li>
            <li>🎨 Presentation Skills – Create engaging slideshows for business and education.</li>
            <li>🌍 Internet & Digital Communication – Safe and effective use of the web for research and collaboration.</li>
            <li>🔒 Cybersecurity & Online Safety – Protect yourself and your data in the digital world.</li>
          </ul>

          <p className="text-lg text-gray-300 mt-6">
            These skills are crucial for success in today’s tech-driven world, whether you’re looking to 
            advance your studies, start a business, or improve productivity at work.
          </p>

          <div className="text-center text-lg mt-6">
            <span className="text-yellow-300 font-bold">Save up to 15% </span><br />
            <span className="line-through text-gray-400">Fees: 6,000 /=</span> <br />
            <span className="text-green-400 font-bold text-2xl">NOW at 5,100 /=</span>
          </div>

          <Button onClick={() => setOpen(true)} className="w-full mt-6 bg-yellow-500 text-gray-900 font-bold py-3 text-xl rounded-lg">
            Limited Slots Available – Secure Yours Now!
          </Button>

          <Button onClick={() => setOpen(true)} className="w-full mt-6 bg-green-500 text-gray-900 font-bold py-3 text-xl rounded-lg">
            Register Here
          </Button>
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Register for the Course</DialogTitle>
            <DialogDescription>Fill in your details below to enroll.</DialogDescription>
          </DialogHeader>
          <RegistrationForm />
        </DialogContent>
      </Dialog>
    </div>
  );
}
