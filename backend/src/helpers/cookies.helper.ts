import { Response } from 'express';

export class CookieHelper {
  static readonly ACCESS_TOKEN_COOKIE = 'access_token';

  /**
   * Set HTTP-only cookie with access token
   */
  static setAccessTokenCookie(
    response: Response,
    token: string,
    expiresInSeconds: number = 86400, // 24 hours by default
  ): void {
    response.cookie(this.ACCESS_TOKEN_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // HTTPS in production
      sameSite: 'strict',
      maxAge: expiresInSeconds * 1000, // Convert to milliseconds
      path: '/',
    });
  }

  /**
   * Clear access token cookie
   */
  static clearAccessTokenCookie(response: Response): void {
    response.clearCookie(this.ACCESS_TOKEN_COOKIE, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
    });
  }
}
