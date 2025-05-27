// app/sign-up/page.tsx or pages/sign-up.tsx

import { SignUp } from '@clerk/nextjs';

export default function Page() {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-gray-50">
      {/* Left Side - Branding */}
      <div className="hidden md:flex flex-col justify-center items-center bg-black text-white p-7">
        <h2 className="text-4xl font-bold mb-4">Create New Acoount</h2>
        <p className="text-lg max-w-md text-center">
          
        </p>
        
      </div>

      {/* Right Side - Sign Up Form */}
      <div className="flex items-center justify-center p-6">
        <div>
          
          <SignUp/>
        </div>
      </div>
    </div>
  );
}
