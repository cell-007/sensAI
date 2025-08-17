// app/sign-in/page.tsx or pages/sign-in.tsx

import { SignIn } from '@clerk/nextjs';

export default function Page() {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-gradient-to-br from-gray-50 to-white">
      {/* Left Side - Branding */}
      <div className="hidden md:flex flex-col justify-center items-center p-10 bg-gradient-to-br from-gray-900 to-black text-white">
        <div className="max-w-md text-center">
          <h2 className="text-5xl font-bold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            SensAI
          </h2>
          <p className="text-xl mb-8 font-light">
            Advanced content intelligence platform
          </p>
          <div className="space-y-4">
            <div className="flex items-center justify-center">
              <CheckIcon />
              <span className="ml-2">Smart content analysis</span>
            </div>
            <div className="flex items-center justify-center">
              <CheckIcon />
              <span className="ml-2">Real-time collaboration</span>
            </div>
            <div className="flex items-center justify-center">
              <CheckIcon />
              <span className="ml-2">AI-powered insights</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Sign In Form */}
      <div className="flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 md:p-8 border border-gray-100">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-800">Sign in to SensAI</h3>
            <p className="text-gray-500 mt-2">
              Welcome back! Please enter your credentials
            </p>
          </div>
          <SignIn 
            appearance={{
              elements: {
                card: 'shadow-none bg-transparent',
                headerTitle: 'text-gray-800 font-bold',
                headerSubtitle: 'text-gray-500',
                socialButtonsBlockButton: 'border-gray-300 hover:bg-gray-50',
                dividerLine: 'bg-gray-200',
                formFieldLabel: 'text-gray-700 font-medium',
                formButtonPrimary: 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-sm transition-all duration-200',
                footerActionText: 'text-gray-600',
                footerActionLink: 'text-blue-600 hover:text-blue-800 font-medium',
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
  );
}
