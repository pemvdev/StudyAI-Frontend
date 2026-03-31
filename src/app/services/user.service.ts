import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8080/user';

  constructor(private http: HttpClient) {}

  private getHeaders() {
    const token = localStorage.getItem('token');

    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  async getCurrentUser() {
    const headers = this.getHeaders();

    return await firstValueFrom(
      this.http.get(`${this.apiUrl}/me`, { headers })
    );
  }

  async updateUser(data: any) {
  const headers = this.getHeaders();

  return await firstValueFrom(
    this.http.put(`${this.apiUrl}/me`, data, { headers })
  );
}

  async uploadProfilePicture(file: File) {
    const headers = this.getHeaders();
    const formData = new FormData();
    formData.append('file', file);

    return await firstValueFrom(
      this.http.post(`${this.apiUrl}/me/profile-picture`, formData, { headers })
    );
  }

}