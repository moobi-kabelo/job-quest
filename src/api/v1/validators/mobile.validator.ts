/**
 * @fileoverview This module provides functions for validating mobile phone number.
 * @version 1.0.0
 * @since 2023-12-31
 * @module mobileValidator
 */
import validator from 'validator';

/**
 * Validates if a string is a South African mobile phone number.
 *
 * @param {string} mobile The mobile phone number to validate.
 * @param {function(Error?, string?)} callback The callback function to call with the result of the validation.
 * @returns {undefined}
 */
export const isMobile = (
  mobile: string,
  callback: (error: Error | null, mobilePhone: string | null) => void
) => {
  const mobilePhone = mobile.replace(/\s/g, '');

  if (validator.isMobilePhone(mobilePhone, ['en-ZA'])) {
    callback(null, mobilePhone);
  } else {
    callback(
      new Error('Please enter a valid South African phone number.'),
      null
    );
  }
};
