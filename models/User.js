import mongoose from 'mongoose';
export const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    registrationDate: {
        type: Date,
        required: true
    },
    lastLoginDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        require: true
    }
});

const User = mongoose.model('User', UserSchema);