import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Note: Capital 'H'
import { tap } from 'rxjs';
import { provideHttpClient, withFetch } from '@angular/common/http';


interface LoginResponse {
  token: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  apiUrl: string = "http://localhost:8080/auth"

  constructor(private httpClient: HttpClient) { }

  login(email: string, password: string) {
    return this.httpClient.post<LoginResponse>(this.apiUrl + "/login", { email, password }).pipe(
      tap((value) => {
        sessionStorage.setItem("auth-token", value.token);
        sessionStorage.setItem("username", value.name);
      })
    );
  }

  signup(name: string, email: string, password: string) {
    return this.httpClient.post<LoginResponse>(this.apiUrl  + "/register", {name, email, password }).pipe(
      tap((value) => {
        sessionStorage.setItem("auth-token", value.token);
        sessionStorage.setItem("username", value.name);
      })
    );
  }
}