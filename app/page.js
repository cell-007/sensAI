"use client"
import { SparklesIcon, UserCircleIcon, ChartBarIcon, ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import Image from 'next/image'
import Footer from "@/components/ui/Footer";

export default function Home() {
  const router = useRouter();

  const getStarted=()=>{
        router.push('dashboard')
    }

    const start=()=>{
        router.push('upgrade')
    }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navigation */}
      <nav className="px-6 py-4 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <SparklesIcon className="h-10 w-10 text-blue-600" />
            <Image src={'/logo.svg'}  width={160} height={100} alt='logo'/>
          </div>
          <button onClick={getStarted} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Ace Your Next Interview with AI
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Practice with realistic AI-powered interviews, get instant feedback, and land your dream job with confidence.
          </p>
          <button onClick={start} className="px-8 py-4 bg-blue-600 text-white rounded-xl text-lg font-semibold hover:bg-blue-700 transition-all transform hover:scale-105">
            Click here to Start
          </button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: UserCircleIcon, title: "Realistic Practice", text: "AI interviewers across various industries" },
            { icon: SparklesIcon, title: "Instant Feedback", text: "Detailed analysis of your performance" },
            { icon: ChatBubbleLeftRightIcon, title: "Custom Questions", text: "Tailor interviews to your target job" },
            { icon: ChartBarIcon, title: "Progress Tracking", text: "Monitor your improvement over time" },
          ].map((feature, idx) => (
            <div key={idx} className="p-6 bg-white rounded-2xl border border-gray-100 hover:shadow-lg transition-all">
              <feature.icon className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="px-6 py-16 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">How It Works</h2>
          <div className="flex flex-col md:flex-row justify-center gap-8">
            {[
              { step: "1", title: "Choose Your Track", text: "Select your industry and role" },
              { step: "2", title: "Practice Interview", text: "Conduct mock interviews with AI" },
              { step: "3", title: "Get Feedback", text: "Receive detailed performance analysis" },
            ].map((item, idx) => (
              <div key={idx} className="p-6 bg-blue-50 rounded-xl w-full md:w-64">
                <div className="h-12 w-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4 mx-auto">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { name: "Sarah Johnson", role: "Software Engineer", text: "The AI feedback helped me identify weaknesses I didn't even know I had!" },
              { name: "Michael Chen", role: "Product Manager", text: "Incredibly realistic practice interviews. Landed my FAANG offer!" },
            ].map((testimonial, idx) => (
              <div key={idx} className="p-8 bg-white rounded-2xl border border-gray-100">
                <p className="text-gray-600 mb-4">"{testimonial.text}"</p>
                <div className="flex items-center">
                  <div className="h-12 w-12 bg-blue-100 rounded-full mr-4"></div>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  );
}