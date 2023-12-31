import { isEmail } from './email.validator';

describe('isEmail', () => {
  it('should validate a valid email address', (done) => {
    const validEmail = 'test@example.com';

    isEmail(validEmail, (error, result) => {
      expect(error).toBeNull();
      expect(result).toEqual(validEmail);

      done();
    });
  });

  it('should handle an email address with leading and trailing spaces', (done) => {
    const emailWithSpaces = '   test@example.com   ';

    isEmail(emailWithSpaces, (error, result) => {
      expect(error).toBeNull();
      expect(result).toEqual(emailWithSpaces.trim());

      done();
    });
  });

  it('should handle an invalid email address', (done) => {
    const invalidEmail = 'invalid-email';

    isEmail(invalidEmail, (error, result) => {
      expect(error).not.toBeNull();
      expect(result).toBeNull();

      done();
    });
  });

  it('should handle a non-string input', (done) => {
    const nonStringInput = 123; // valid non-string value

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    isEmail(nonStringInput as any, (error, result) => {
      expect(error).not.toBeNull();
      expect(result).toBeNull();

      done();
    });
  });
});
