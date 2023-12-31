/**
 * @fileoverview A module that provides various validation and comparison functions.
 * @version 1.0.0
 * @since 2023-12-31
 * @module validator
 */

/**
 * Exported function for email validation.
 * @type {isEmail}
 */
export { isEmail } from './email.validator';

/**
 * Exported function for mobile phone validation.
 * @type {isMobile}
 */
export { isMobile } from './mobile.validator';

/**
 * Exported function for comparing strings in a timing-safe manner and  password validation.
 * @type {compareStrings}
 * @type {isPassword}
 */
export { compareStrings, isPassword } from './password.validator';
