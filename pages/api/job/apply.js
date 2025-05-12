import { getSession } from 'next-auth/react';
import AppliedJob from '../../../models/ApplyJob';
import connectDB from '../../../DB/connectDB';
import { uploadFile } from '../../../lib/utils';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  await connectDB();
  
  try {
    const session = await getSession({ req });
    if (!session) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { name, email, about, job } = req.body;
    let cvPath = '';
    
    if (req.files?.cv) {
      cvPath = await uploadFile(req.files.cv[0], 'resumes');
    }

    const application = new AppliedJob({
      user: session.user.id,
      job,
      name,
      email,
      about,
      cv: cvPath,
      status: 'pending'
    });

    await application.save();
    
    res.status(201).json({ message: 'Application submitted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message || 'Server error' });
  }
}