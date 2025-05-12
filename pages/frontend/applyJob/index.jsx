import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function ApplyJob() {
  const router = useRouter();
  const { jobId } = router.query;
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    about: '',
    cv: null
  });

  const handleChange = (e) => {
    if (e.target.name === 'cv') {
      setFormData({...formData, cv: e.target.files[0]});
    } else {
      setFormData({...formData, [e.target.name]: e.target.value});
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('about', formData.about);
      formDataToSend.append('cv', formData.cv);
      formDataToSend.append('job', jobId);
      
      const res = await axios.post('/api/job/apply', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      toast.success('Application submitted successfully!');
      router.push('/frontend/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to submit application');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Apply for Job</h1>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">About You</label>
          <textarea
            name="about"
            value={formData.about}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            rows="4"
            required
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Upload CV (PDF)</label>
          <input
            type="file"
            name="cv"
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            accept=".pdf"
            required
          />
        </div>
        
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
}