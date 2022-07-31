import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userInfoSchema = new Schema({
    email: {
        type: String,
        unique: true
    },
    username: {
        type: String,
    },
    password: {
        type: String
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    updatedAt: {
        type: Date,
        default: new Date()
    }
});

const Users = mongoose.model('user', userInfoSchema);

module.exports = Users;