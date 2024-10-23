import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { Router } from '@angular/router';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [{ provide: Router, useValue: routerSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should login and navigate to /tasks-list', () => {
    component.username = 'admin';
    component.password = 'admin';
    component.login();

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/tasks-list']);
    expect(component.errorMessage).toEqual('');
  });

  it('should show error message when username or password is incorrect', () => {
    component.username = '';
    component.password = '';
    component.login();

    expect(component.errorMessage).toEqual('User or password incorrect');
  });
});
