import mongoose from 'mongoose';

const bookMarkSchema = new mongoose.Schema({

    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    job : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
    },


},{timestamps: true});

let bookMarkJob;

try {
    bookMarkJob = mongoose.model('BookMarkJob');
} catch (e) {
    bookMarkJob = mongoose.model('BookMarkJob', bookMarkSchema);
}

export default bookMarkJob;