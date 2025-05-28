"use client"
import React, { useState } from 'react';
import { Star, MessageCircle, TrendingUp, User, Plus, X } from 'lucide-react';
import { BiSolidShow } from "react-icons/bi";

// Date formatting utility
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const initialReviews = [
  {
    id: 1,
    user: 'Emily Rodriguez',
    role: 'Software Developer',
    rating: 5,
    date: '2025-05-15',
    interviewType: 'Technical Interview',
    metrics: { pacing: 92, clarity: 88, confidence: 95 },
    comment: 'The AI analysis helped me identify my filler word usage and improve my technical explanations. The mock interviews feel incredibly realistic!',
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg'
  },
  {
    id: 2,
    user: 'Raj Patel',
    role: 'Recent Graduate',
    rating: 4,
    date: '2025-04-14',
    interviewType: 'Behavioral Interview',
    metrics: { pacing: 85, clarity: 90, confidence: 82 },
    comment: 'Fantastic for practicing STAR responses. The feedback on my body language and answer structure was eye-opening.',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
  },
  {
    id: 3,
    user: 'Sophie Müller',
    role: 'Product Manager',
    rating: 5,
    date: '2025-04-12',
    interviewType: 'Case Study Interview',
    metrics: { pacing: 89, clarity: 94, confidence: 91 },
    comment: 'The case study simulations with real-time feedback helped me land my dream job. Love the performance tracking over time!',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg'
  },
  {
    id: 4,
    user: 'Alex Thompson',
    role: 'Data Scientist',
    rating: 5,
    date: '2025-04-11',
    interviewType: 'Technical Interview',
    metrics: { pacing: 88, clarity: 91, confidence: 89 },
    comment: 'The coding challenge simulations are top-notch. Real-time feedback helped me optimize my problem-solving approach.',
    avatar: 'https://randomuser.me/api/portraits/men/2.jpg'
  },
  {
    id: 5,
    user: 'Lila Chen',
    role: 'UX Designer',
    rating: 4,
    date: '2025-03-10',
    interviewType: 'Portfolio Review',
    metrics: { pacing: 90, clarity: 85, confidence: 88 },
    comment: 'Incredible platform for practicing design thinking interviews. The AI caught subtle communication issues I wasn\'t aware of.',
    avatar: 'https://randomuser.me/api/portraits/women/3.jpg'
  },
  {
    id: 6,
    user: 'Diego Morales',
    role: 'Engineering Manager',
    rating: 5,
    date: '2025-03-09',
    interviewType: 'Leadership Interview',
    metrics: { pacing: 87, clarity: 92, confidence: 94 },
    comment: 'Essential preparation for leadership roles. The behavioral analysis helped me refine my management philosophy presentation.',
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg'
  },
];

const interviewTypes = [
  'Technical Interview',
  'Behavioral Interview',
  'Case Study Interview',
  'Portfolio Review',
  'Leadership Interview',
  'Phone Screening',
  'System Design',
  'Culture Fit'
];

function Page() {
  const [allReviews, setAllReviews] = useState(initialReviews);
  const [visibleReviews, setVisibleReviews] = useState(3);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    user: '',
    role: '',
    rating: 5,
    interviewType: 'Technical Interview',
    metrics: { pacing: 80, clarity: 80, confidence: 80 },
    comment: ''
  });

  const loadMoreReviews = () => {
    setVisibleReviews(prev => prev + 3);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleMetricChange = (metric, value) => {
    setFormData(prev => ({
      ...prev,
      metrics: {
        ...prev.metrics,
        [metric]: parseInt(value)
      }
    }));
  };

  const handleRatingClick = (rating) => {
    setFormData(prev => ({
      ...prev,
      rating
    }));
  };

  const handleSubmitReview = () => {
    
    if (!formData.user.trim() || !formData.role.trim() || !formData.comment.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    const newReview = {
      id: allReviews.length + 1,
      ...formData,
      date: new Date().toISOString().split('T')[0],
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.user)}&background=random`
    };

    setAllReviews(prev => [newReview, ...prev]);
    setVisibleReviews(prev => Math.max(prev, 3));
    
    // Reset form
    setFormData({
      user: '',
      role: '',
      rating: 5,
      interviewType: 'Technical Interview',
      metrics: { pacing: 80, clarity: 80, confidence: 80 },
      comment: ''
    });
    
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 mt-5 mb-10 rounded-lg">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-2">
            <User className="text-blue-600" /> Interview Success Stories
          </h1>
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 bg-white p-4 rounded-lg shadow">
                <Star className="w-6 h-6 text-yellow-400" />
                <span className="text-2xl font-bold">4.9/5</span>
              </div>
              <div className="flex items-center space-x-2 bg-white p-4 rounded-lg shadow">
                <MessageCircle className="w-6 h-6 text-green-500" />
                <span className="text-2xl font-bold">{allReviews.length}</span>
                <span className="text-gray-600">Reviews</span>
              </div>
              <div className="flex items-center space-x-2 bg-white p-4 rounded-lg shadow">
                <TrendingUp className="w-6 h-6 text-purple-500" />
                <span className="text-2xl font-bold">87%</span>
                <span className="text-gray-600">Success Rate</span>
              </div>
            </div>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              See how our AI-powered mock interviews have helped professionals improve their technical communication, behavioral responses, and interview confidence.
            </p>
            
            <button
              onClick={() => setShowForm(true)}
              className="mt-6 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors duration-300 font-medium flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Share Your Experience
            </button>
          </div>
        </div>

        {/* Review Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Share Your Review</h2>
                  <button
                    onClick={() => setShowForm(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        name="user"
                        value={formData.user}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your Role *
                      </label>
                      <input
                        type="text"
                        name="role"
                        value={formData.role}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g. Software Engineer, Product Manager"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Interview Type
                    </label>
                    <select
                      name="interviewType"
                      value={formData.interviewType}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {interviewTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Overall Rating
                    </label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map(star => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => handleRatingClick(star)}
                          className="focus:outline-none"
                        >
                          <Star
                            className={`w-8 h-8 ${star <= formData.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'} hover:text-yellow-400 transition-colors`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-4">
                      Performance Metrics
                    </label>
                    <div className="grid grid-cols-3 gap-4">
                      {Object.entries(formData.metrics).map(([metric, value]) => (
                        <div key={metric}>
                          <label className="block text-sm text-gray-600 mb-2 capitalize">
                            {metric}: {value}%
                          </label>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={value}
                            onChange={(e) => handleMetricChange(metric, e.target.value)}
                            className="w-full"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Review *
                    </label>
                    <textarea
                      name="comment"
                      value={formData.comment}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Share your experience with the mock interview platform..."
                      required
                    />
                  </div>

                  <div className="flex gap-4 justify-end">
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleSubmitReview}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Submit Review
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allReviews.slice(0, visibleReviews).map((review) => (
            <div key={review.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <img 
                  src={review.avatar} 
                  alt={review.user}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">{review.user}</h3>
                  <p className="text-gray-500 text-sm">{review.role}</p>
                </div>
              </div>
              
              <div className="mb-4 flex justify-between items-center">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  {review.interviewType}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center p-2 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">Pacing</p>
                  <p className="font-bold text-blue-600">{review.metrics.pacing}%</p>
                </div>
                <div className="text-center p-2 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">Clarity</p>
                  <p className="font-bold text-green-600">{review.metrics.clarity}%</p>
                </div>
                <div className="text-center p-2 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">Confidence</p>
                  <p className="font-bold text-purple-600">{review.metrics.confidence}%</p>
                </div>
              </div>

              <p className="text-gray-600 leading-relaxed mb-4">{review.comment}</p>
              <p className="text-sm text-gray-500">
                {formatDate(review.date)}
              </p>
            </div>
          ))}
        </div>

        {visibleReviews < allReviews.length && (
          <div className="mt-12 text-center">
            <button 
              onClick={loadMoreReviews}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 font-medium flex items-center justify-center gap-2 mx-auto"
            >
              <BiSolidShow className="w-5 h-5" />
              Show more Reviews
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Page;