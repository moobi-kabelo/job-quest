/**
 * @fileoverviewThis module provides functions for validating email addresses
 * @version 1.0.0
 * @since 2023-12-31
 * @module emailValidator
 */
import validator from 'validator';

/**
 * Validates if a string is an email address.
 *
 * @param {string} email The email address to validate.
 * @param {function(Error?, string?)} callback The callback function to call with the result of the validation.
 * @returns {undefined}
 */
export const isEmail = (
  email: string,
  callback: (error: Error | null, result: string | null) => void
): void => {
  if (typeof email !== 'string') {
    callback(new Error('Please enter a valid email address.'), null);
    return;
  }

  const trimmedEmail = email.trim();

  if (validator.isEmail(trimmedEmail)) {
    callback(null, trimmedEmail);
  } else {
    callback(new Error('Please enter a valid email address.'), null);
  }
};
