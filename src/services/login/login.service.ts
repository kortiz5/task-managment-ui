import { Injectable } from '@angular/core';
import { config } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private validUser = config.validUser;
  private validPassword = config.validPassword;

  constructor() {}

  login(username: string, password: string): boolean {
    if (username === this.validUser && password === this.validPassword) {
      sessionStorage.setItem('authenticated', 'true');
      return true;
    }
    return false;
  }

  logout(): void {
    sessionStorage.removeItem('authenticated');
  }

  isAuthenticated(): boolean {
    return sessionStorage.getItem('authenticated') === 'true';
  }
}
