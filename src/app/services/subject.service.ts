import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subject } from '../components/subject/subject.model';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  private baseUrl = 'http://localhost:8080/classrooms';

  constructor(private http: HttpClient) {}

  getSubjectsByClassroom(classroomId: number): Observable<Subject[]> {
    return this.http.get<Subject[]>(`${this.baseUrl}/${classroomId}/subjects`);
  }

  createSubject(classroomId: number, data: { name: string }) {
    return this.http.post(
      `${this.baseUrl}/${classroomId}/subjects`,
      data
    );
  }

  updateSubject(
  classroomId: number,
  subjectId: number,
  data: { name: string }
) {
  return this.http.put(
    `${this.baseUrl}/${classroomId}/subjects/${subjectId}`,
    data
  );
}

  deleteSubject(classroomId: number, subjectId: number) {
  return this.http.delete(
    `${this.baseUrl}/${classroomId}/subjects/${subjectId}`
  );
}
}
