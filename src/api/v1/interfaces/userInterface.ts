/**
 * @fileoverview
 * @version 1.0.0
 * @since 2023-12-31
 * @module userInterface
 */
export interface User {
  _id: string;
  email: string;
  mobile: string;
  password: string;
  role: string;
  isVerified: boolean;
}
