import { TestBed } from '@angular/core/testing';
import { config } from '../../config/config';
import { AuthService } from './login.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService],
    });
    service = TestBed.inject(AuthService);
  });

  afterEach(() => {
    sessionStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return true and set authenticated if credentials are valid', () => {
    const result = service.login(config.validUser, config.validPassword);
    expect(result).toBeTrue();
    expect(sessionStorage.getItem('authenticated')).toBe('true');
  });

  it('should return false if credentials are invalid', () => {
    const result = service.login('invalidUser', 'invalidPassword');
    expect(result).toBeFalse();
    expect(sessionStorage.getItem('authenticated')).toBeNull();
  });

  it('should logout', () => {
    service.login(config.validUser, config.validPassword);
    service.logout();
    expect(sessionStorage.getItem('authenticated')).toBeNull();
  });

  it('should return true if user is authenticated', () => {
    service.login(config.validUser, config.validPassword);
    const result = service.isAuthenticated();
    expect(result).toBeTrue();
  });
});
