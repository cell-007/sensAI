// app/sign-in/page.tsx or pages/sign-in.tsx

import { SignIn } from '@clerk/nextjs';

export default function Page() {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-gray-50">
      {/* Left Side - Branding */}
      <div className="hidden md:flex flex-col justify-center items-center bg-black text-white p-10">
        <h2 className="text-4xl font-bold mb-4">SensAI</h2>
        <p className="text-lg max-w-md text-center">
          Welcome back! Please sign in to access your dashboard and manage your content.
        </p>
      </div>

      {/* Right Side - Sign In Form */}
      <div className="flex items-center justify-center p-1">
        <div>
          
          <SignIn/>
        </div>
      </div>
    </div>
  );
}
