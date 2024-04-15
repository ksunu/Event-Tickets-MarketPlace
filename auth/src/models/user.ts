import mongoose from 'mongoose'
import { Password } from '../services/password'

interface User {
  email: string
  password: string
}

interface UserModel extends mongoose.Model<UserDoc> {
  build(props: User): UserDoc
}

interface UserDoc extends mongoose.Document {
  email: string,
  password: string
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
}, {
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id
      delete ret._id
      delete ret.password
      delete ret.__v
    }
  }
})

userSchema.pre('save', async function(done) {
  if (this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'))
    this.set('password', hashed)
  }
})

userSchema.statics.build = (props: User) => {
  return new User(props)
}

const User = mongoose.model<UserDoc, UserModel>('User', userSchema)

export { User }