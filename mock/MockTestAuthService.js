import { TestBed, inject } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { User } from '../models/user';

describe('AuthService', () => {
  beforeEach(() => {
//...
//Replace this by the mock

//  const httpClient = new HttpClient();
//  const authService = new AuthService(httpClient);


//...

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
  });

  it(
    'should be initialized',
    inject([AuthService], (authService: AuthService) => {
      expect(authService).toBeTruthy();
    })
  );

  it(
    'should perform login correctly',
    fakeAsync(
      inject(
        [AuthService, HttpTestingController],
        (authService: AuthService, backend: HttpTestingController) => {

          // Set up
          const url = 'https://example.com/login';
          const responseObject = {
            success: true,
            message: 'login was successful'
          };
          const user = new User('test@example.com', 'testpassword');
          let response = null;
          // End Setup

          authService.onLogin(user).subscribe(
            (receivedResponse: any) => {
              response = receivedResponse;
            },
            (error: any) => {}
          );

          const requestWrapper = backend.expectOne({url: 'https://example.com/login'});
          requestWrapper.flush(responseObject);

          tick();

          expect(requestWrapper.request.method).toEqual('POST');
          expect(response.body).toEqual(responseObject);
          expect(response.status).toBe(200);
        }
      )
    )
  );

  it(
    'should fail login correctly',
    fakeAsync(
      inject(
        [AuthService, HttpTestingController],
        (authService: AuthService, backend: HttpTestingController) => {

          // Set up
          const url = 'https://example.com/login';
          const responseObject = {
            success: false,
            message: 'email and password combination is wrong'
          };
          const user = new User('test@example.com', 'wrongPassword');
          let response = null;
          // End Setup

          authService.onLogin(user).subscribe(
            (receivedResponse: any) => {
              response = receivedResponse;
            },
            (error: any) => {}
          );

          const requestWrapper = backend.expectOne({url: 'https://example.com/login'});
          requestWrapper.flush(responseObject);

          tick();

          expect(requestWrapper.request.method).toEqual('POST');
          expect(response.body).toEqual(responseObject);
          expect(response.status).toBe(200);
        }
      )
    )
  );
});
