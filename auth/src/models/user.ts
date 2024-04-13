import mongoose from 'mongoose'
import { Password } from '../services/password'

interface UserProps {
  email: string
  password: string
}

interface UserModelProps extends mongoose.Model<UserDocProps> {
  build(props: UserProps): UserDocProps
}

interface UserDocProps extends mongoose.Document {
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

userSchema.statics.build = (props: UserProps) => {
  return new User(props)
}

const User = mongoose.model<UserDocProps, UserModelProps>('User', userSchema)

export { User }