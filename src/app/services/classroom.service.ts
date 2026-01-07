import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Classroom } from '../components/classroom/classroom.model';

@Injectable({
  providedIn: 'root'
})
export class ClassroomService {

  private apiUrl = 'http://localhost:8080/classrooms';

  constructor(private http: HttpClient) {}

  getClassrooms(): Observable<Classroom[]> {
    return this.http.get<Classroom[]>(this.apiUrl);
  }

  createClassroom(data: any) {
    return this.http.post(this.apiUrl, data);
  }

  updateClassroom(
    id: number,
    data: { name: string; description?: string }
  ) {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  deleteClassroom(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
