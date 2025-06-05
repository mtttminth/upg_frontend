import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import { redirect } from 'next/navigation';

class TokenService {
  setToken (token: string, userType: string) {
    setCookie(userType, token);
  }

  getAccessToken(userType: string) {
    const token = getCookie(userType);
    return token;
  }
  
  resetToken(userType: string) {
    deleteCookie(userType);
  }
}

export default new TokenService();