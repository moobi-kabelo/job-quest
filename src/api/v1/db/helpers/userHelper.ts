/**
 * @fileoverview User Helper module for managing user-related operations.
 * @version 1.0.0
 * @since 2023-12-31
 * @module userHelper
 */
import UserSchema from '../schemas/userSchema';

/**
 * Helper class for user-related database operations.
 */
export class UserHelper {
  private _userSchema: typeof UserSchema;

  constructor() {
    this._userSchema = UserSchema;
  }

  /**
   * Saves a user to the database.
   * @param {string} email - The email address of the user.
   * @param {string} mobile - The mobile number of the user.
   * @param {string} password - The password of the user.
   * @param {string} role - The role of the user.
   * @returns {Promise<unknown>} A promise that resolves to a user object or rejects with an error.
   */
  public createUser = (
    email: string,
    mobile: string,
    password: string,
    role: string
  ): Promise<unknown> => {
    return new this._userSchema({ email, mobile, password, role }).save();
  };

  /**
   * Retrieves a user from the database using email or ID.
   * @param {Object} query - The query object.
   * @param {string} [query.email] - The email address to search for.
   * @param {string} [query.id] - The ID to search for.
   * @returns {Promise<unknown>} A promise that resolves to a user object or null if not found.
   */
  public getUserByEmailOrId = (query: {
    email?: string;
    id?: string;
  }): Promise<unknown> =>
    this._userSchema.findOne({
      $or: [{ _id: { $eq: query.id } }, { email: { $eq: query.email } }],
    });

  /**
   * Retrieves a user from the database using user id.
   * @param {string} userId - The user id to search for.
   * @returns {Promise<unknown>} A promise that resolves to a user object or null if not found.
   */
  public getUserById = (userId: string): Promise<unknown> =>
    this._userSchema.findOne({ _id: { $eq: userId } });

  /**
   * Updates a user in the database using user id.
   * @param {string} userId - The user id.
   * @param {Object} query - The data to update.
   * @param {string} query.email - The new email address.
   * @param {string} query.email - The new mobile number.
   * @param {string} query.password - The new password.
   * @param {string} query.role - The new role.
   * @param {boolean} query.isVerified - The new verification status.
   * @returns {Promise<unknown>} A promise that resolves to the updated user object or null if not found.
   */
  public updateUser = (
    userId: string,
    query: {
      email?: string;
      mobile?: string;
      password?: string;
      role?: string;
      isVerified?: boolean;
    }
  ): Promise<unknown> =>
    this._userSchema.findOneAndUpdate(
      {
        _id: { $eq: userId },
      },
      {
        $set: {
          email: query.email,
          mobile: query.mobile,
          password: query.password,
          role: query.role,
          isVerified: query.isVerified,
        },
      },
      {
        new: true,
      }
    );

  /**
   * Removes a user document from the database using user id.
   * @param {string} userId - The user id.
   * @returns {Promise<unknown>} A promise that resolves to a string message or rejects with an error.
   */
  public removeUser = (userId: string): Promise<unknown> =>
    this._userSchema.findOneAndDelete({
      _id: { $eq: userId },
    });
}
