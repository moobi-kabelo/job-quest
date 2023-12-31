/**
 * @fileoverview
 * @version 1.0.0
 * @since 2023-12-31
 * @module authenticationTemplate
 */
import { mailConfig } from '../configs';
import { Mail } from '../libs';
import { compareStrings } from '../validators';

export default class Authentication {
  private _mail: Mail;

  constructor() {
    this._mail = new Mail();
  }

  /**
   * Generates the activation URL based on the user role and activation token.
   *
   * @param {string} activationToken - The activation token associated with the account.
   * @returns {string} - The generated activation URL.
   * @private
   */
  private generateActivationUrl = (activationToken: string): string => {
    return `https://api.${mailConfig.mailgen.product.link}/account/activate?activation_token=${activationToken}`;
  };

  /**
   * Generates the password reset URL based on the user role and token.
   *
   * @param {string} role - The user role (e.g., 'Admin', 'Candidate', 'Recruiter').
   * @param {string} token - The password reset token associated with the account.
   * @returns {string} - The generated password reset URL.
   * @private
   */
  private generatePasswordResetUrl = (role: string, token: string): string => {
    const subdomain = compareStrings(role, 'Admin')
      ? 'admin'
      : compareStrings(role, 'Candidate')
      ? 'www'
      : compareStrings(role, 'Recruiter')
      ? 'recruiter'
      : null;

    return `https://${subdomain}.${mailConfig.mailgen.product.link}/auth/password/edit?password_token=${token}`;
  };

  /**
   * Generate an activate account email template.
   * @param {string} email - The user's email address.
   * @param {string} activationToken - The account activation token.
   * @returns {string} - The generated email content.
   */
  public activateAccount = (email: string, activationToken: string): string => {
    const activationUrl = this.generateActivationUrl(activationToken);

    return this._mail.createMailgenInstance().generate({
      body: {
        title: `Activate your ${mailConfig.mailgen.product.name} account`,
        intro: `You just signed up for a new ${mailConfig.mailgen.product.name} account with the username: ${email}.`,
        action: {
          instructions:
            'To finish creating your account, click on the link below within the next 15 minutes.',
          button: {
            text: 'Activate Account',
            color: '#003650',
            link: activationUrl,
          },
        },
        outro: `Having troubles? Copy this link into your browser instead: ${activationUrl}`,
      },
    });
  };

  /**
   * Sends a password reset email with a link to reset the password.
   *
   * @param {string} email - The email address of the user.
   * @param {string} token - The password reset token.
   * @param {string} role - The role of the user (e.g., 'Admin', 'Candidate', 'Recruiter').
   * @returns {string} - The generated password reset email content.
   */
  public forgotPassword = (
    email: string,
    token: string,
    role: string
  ): string => {
    const resetUrl = this.generatePasswordResetUrl(role, token);

    return this._mail.createMailgenInstance().generate({
      body: {
        title: `Hello, ${email}.`,
        intro: 'Someone has requested a link to change your password.',
        action: {
          instructions:
            'To reset your password, click the button below within the next 30 minutes. If you ignore this message, your password will not be changed.',
          button: {
            text: 'Reset Password',
            color: '#003650',
            link: resetUrl,
          },
        },
        outro: `Having troubles? Copy this link into your browser instead: ${resetUrl}`,
      },
    });
  };

  /**
   * Generate a password update email template.
   * @param {string} email - The user's email address.
   * @param {object} device - Information about the device.
   * @returns {string} - The generated email content.
   */
  public passwordUpdate = (
    email: string,
    device: {
      device?: string;
      browser?: string;
      ip?: string;
      timestamp?: string;
    }
  ): string => {
    return this._mail.createMailgenInstance().generate({
      body: {
        title: `Hi, ${email}.`,
        intro: `Your ${mailConfig.mailgen.product.name} account password has been successfully updated.`,
        table: {
          data: [
            {
              item: 'Device',
              description: device.device,
            },
            {
              item: 'Browser',
              description: device.browser,
            },
            {
              item: 'IP',
              description: device.ip,
            },
            {
              item: 'Timestamp',
              description: device.timestamp,
            },
          ],
          columns: {
            customWidth: {
              item: '20%',
              description: '80%',
            },
            customAlignment: {
              item: 'left',
              description: 'left',
            },
          },
        },
        outro: `If you did not make this change or need further assistance, please contact our support team at support@${mailConfig.mailgen.product.link}.`,
      },
    });
  };
}
