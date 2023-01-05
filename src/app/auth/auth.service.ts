import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, Subject, tap, throwError } from 'rxjs';
import { User } from './user.model';

export interface AuthResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  user = new BehaviorSubject<User>(null);

  timeoutLogout: any = null;

  signup(email: string, password: string) {
    return this.http
      .post<AuthResponse>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDZ5b0aa6VNeFItohtPBFUVpShXEsFwvCs',
        {
          email,
          password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthorization(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  signin(email: string, password: string) {
    return this.http
      .post<AuthResponse>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDZ5b0aa6VNeFItohtPBFUVpShXEsFwvCs',
        {
          email,
          password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthorization(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    clearTimeout(this.timeoutLogout);
    this.timeoutLogout = null;
  }

  autoLogout(expiresTime: number = 2000) {
    this.timeoutLogout = setTimeout(() => {
      this.logout();
    }, expiresTime);
  }

  private handleAuthorization(
    email: string,
    id: string,
    token: string,
    expirationDate: number
  ) {
    const expDate = new Date(new Date().getTime() + expirationDate * 1000);
    const newUser = new User(email, id, token, expDate);
    this.user.next(newUser);
    localStorage.setItem('userData', JSON.stringify(newUser));
    this.autoLogout(expirationDate * 1000);
  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: Date;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) return;
    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );
    if (loadedUser.token) {
      this.autoLogout(
        new Date(userData._tokenExpirationDate).getTime() - new Date().getTime()
      );
      return this.user.next(loadedUser);
    }
    return;
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage: string = 'Unknown Error';
    if (!errorRes.error || !errorRes.error.error) return throwError(errorRes);
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage =
          'The email address is already in use by another account.';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage =
          'There is no user record corresponding to this identifier. The user may have been deleted.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage =
          'The password is invalid or the user does not have a password.';
        break;
      case 'USER_DISABLED':
        errorMessage =
          'The user account has been disabled by an administrator.';
        break;
    }
    return throwError(errorMessage);
  }
}
