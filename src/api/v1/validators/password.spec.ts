/* eslint-disable @typescript-eslint/no-explicit-any */
import { isPassword } from './password.validator';

describe('isPassword', () => {
  it('should validate a strong password', (done) => {
    const validPassword = 'StrongP@ss123';
    const confirmPassword = 'StrongP@ss123';

    isPassword(validPassword, confirmPassword, (error, result) => {
      expect(error).toBeNull();
      expect(result).toEqual(confirmPassword);

      done();
    });
  });

  it('should handle invalid input', (done) => {
    const invalidPassword = 'invalid-password';
    const confirmPassword = 'StrongP@ss123';

    isPassword(invalidPassword as any, confirmPassword, (error, result) => {
      expect(error).not.toBeNull();
      expect(result).toBeNull();

      done();
    });
  });

  it('should handle mismatched passwords', (done) => {
    const password = 'StrongP@ss123';
    const confirmPassword = 'MismatchedPassword';

    isPassword(password, confirmPassword, (error, result) => {
      expect(error).not.toBeNull();
      expect(result).toBeNull();

      done();
    });
  });

  it('should require at least one lowercase letter', (done) => {
    const password = 'STRONGPASS123';
    const confirmPassword = 'STRONGPASS123';

    isPassword(password, confirmPassword, (error, result) => {
      expect(error).not.toBeNull();
      expect(result).toBeNull();

      done();
    });
  });

  it('should require at least one uppercase letter', (done) => {
    const password = 'strongpass123';
    const confirmPassword = 'strongpass123';

    isPassword(password, confirmPassword, (error, result) => {
      expect(error).not.toBeNull();
      expect(result).toBeNull();

      done();
    });
  });

  it('should require at least one digit', (done) => {
    const password = 'StrongPassword';
    const confirmPassword = 'StrongPassword';

    isPassword(password, confirmPassword, (error, result) => {
      expect(error).not.toBeNull();
      expect(result).toBeNull();

      done();
    });
  });

  it('should require a minimum length of 8 characters', (done) => {
    const shortPassword = 'Short1';
    const confirmPassword = 'Short1';

    isPassword(shortPassword, confirmPassword, (error, result) => {
      expect(error).not.toBeNull();
      expect(result).toBeNull();

      done();
    });
  });
});
