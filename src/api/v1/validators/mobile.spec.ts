import { isMobile } from './mobile.validator';

describe('isMobile', () => {
  it('should validate a valid South African mobile phone number', (done) => {
    const validMobile = '0821234567';

    isMobile(validMobile, (error, cleanedMobile) => {
      expect(error).toBeNull();
      expect(cleanedMobile).toEqual(validMobile.replace(/\s/g, ''));

      done();
    });
  });

  it('should handle a mobile number with spaces', (done) => {
    const mobileWithSpaces = '082 123 4567';

    isMobile(mobileWithSpaces, (error, cleanedMobile) => {
      expect(error).toBeNull();
      expect(cleanedMobile).toEqual('0821234567');

      done();
    });
  });

  it('should handle an invalid South African mobile phone number', (done) => {
    const invalidMobile = '1234567890';

    isMobile(invalidMobile, (error, cleanedMobile) => {
      expect(error).not.toBeNull();
      expect(cleanedMobile).toBeNull();

      done();
    });
  });
});
