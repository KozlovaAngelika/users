import mongoose from 'mongoose';
export const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: false
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
        type: String,
        required: true
    },
    lastLoginDate: {
        type: String,
        required: false
    },
    status: {
        type: String,
        require: false
    }
});

const User = mongoose.model('User', UserSchema);
export default User;