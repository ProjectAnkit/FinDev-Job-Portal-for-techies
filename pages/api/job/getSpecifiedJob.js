import ConnectDB from '@/DB/connectDB';
import Job from '@/models/Job';
import User from '@/models/User';

export default async (req, res) => {
    await ConnectDB();
    const { method } = req;
    switch (method) {
        case 'GET':
            await getSpecifiedJob(req, res);
            break;
        default:
            res.status(400).json({ success: false, message: 'Invalid Request' });
    }
}

const getSpecifiedJob = async (req, res) => {
    try {
        const { id } = req.query;
        if (!id) {
            return res.status(400).json({ 
                success: false, 
                message: "Job ID is required" 
            });
        }

        const job = await Job.findById(id).populate({
            path: 'user',
            model: User
        });

        if (!job) {
            return res.status(404).json({ 
                success: false, 
                message: "Job not found" 
            });
        }

        return res.status(200).json({ 
            success: true, 
            data: job 
        });
    } catch (error) {
        console.log('Error in getting specified job (server) => ', error);
        return res.status(500).json({ 
            success: false, 
            message: "Something went wrong. Please try again later." 
        });
    }
}