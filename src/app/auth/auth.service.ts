import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/api/auth`;

  private _isAuthenticated = false;
  private authToken: string | null = null;
  private userId: number | null = null;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.authToken = localStorage.getItem('token');
      this._isAuthenticated = !!this.authToken;
      if (this.authToken) {
        const decodedToken: any = jwtDecode(this.authToken);
        this.userId = decodedToken.sub;
      }
    }
  }

  get isAuthenticated(): boolean {
    return this._isAuthenticated;
  }

  get token(): string | null {
    return (
      this.authToken ||
      (isPlatformBrowser(this.platformId)
        ? localStorage.getItem('token')
        : null)
    );
  }

  get currentUserId(): number | null {
    return this.userId;
  }

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  login(credentials: any): Observable<any> {
    return this.http
      .post<{ token: string }>(`${this.apiUrl}/login`, credentials)
      .pipe(
        tap((response) => {
          this.authToken = response.token;
          if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('token', response.token);
          }
          this._isAuthenticated = true;
          const decodedToken: any = jwtDecode(response.token);
          this.userId = decodedToken.sub;
          console.log('User ID from token:', this.userId);
        })
      );
  }

  logout(): void {
    this.authToken = null;
    this.userId = null;
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
    }
    this._isAuthenticated = false;
  }

  isTokenExpired(): boolean {
    const token = this.token;
    if (!token) {
      return true;
    }
    const decoded: any = jwtDecode(token);
    const expirationDate = decoded.exp * 1000;
    const now = new Date().getTime();
    return expirationDate < now;
  }
}