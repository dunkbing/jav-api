import { Schema, model } from 'mongoose';
import { hash, verify } from 'argon2';

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: false
    },
})

/**
 * @param {Function} next
 */
userSchema.pre('save', async function(next) {
  const user = this;
  const hashed = await hash(this.password);
  this.password = hashed;
  next();
})

/**
 * 
 * @param {String} password 
 */
userSchema.methods.isValidPassword = async function(password) {
  const user = this;
  return await verify(user.password, password);
}

export const UserModel = model('user', userSchema);
