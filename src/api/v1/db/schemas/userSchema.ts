/**
 * @fileoverview
 * @version 1.0.0
 * @since 2023-12-31
 * @module userSchema
 */

import mongoose from 'mongoose';

/**
 * Represents a User schema.
 */

const UserSchema = new mongoose.Schema(
  {
    /**
     * The email address of the user.
     */
    email: {
      type: String,
      lowercase: true,
      trim: true,
      unique: true,
      required: true,
    },
    /**
     * The phone number of the user.
     */
    mobile: {
      type: String,
      unique: true,
      trim: true,
      required: true,
    },
    /**
     * The password of the user.
     */
    password: {
      type: String,
      required: true,
    },
    /**
     * The role of the user.
     * Possible values:  'admin', 'candidate', 'recruiter'.
     */
    role: {
      type: String,
      enum: ['Admin', 'Candidate', 'Recruiter'],
      default: 'Candidate',
      required: true,
    },
    /**
     * The verification status of the user.
     */
    isVerified: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('User', UserSchema);
