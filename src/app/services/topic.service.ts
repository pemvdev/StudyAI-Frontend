import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Topic } from '../components/topic/topic.model';

@Injectable({
    providedIn: 'root'
})
export class TopicService {

    private baseUrl = 'http://localhost:8080/classrooms';

    constructor(private http: HttpClient) { }

    getTopicsBySubject(classroomId: number, subjectId: number): Observable<Topic[]> {
        return this.http.get<Topic[]>(`${this.baseUrl}/${classroomId}/subjects/${subjectId}/topics`);
    }

    createTopic(classroomId: number, subjectId: number, data: { name: string, content: string }) {
        return this.http.post(
            `${this.baseUrl}/${classroomId}/subjects/${subjectId}/topics`,
            data
        );
    }


    updateTopic(classroomId: number, subjectId: number, topicId: number, data: { name: string }) {
        return this.http.put(
            `${this.baseUrl}/${classroomId}/subjects/${subjectId}/topics/${topicId}`,
            data
        );
    }

    deleteTopic(classroomId: number, subjectId: number, topicId: number) {
        return this.http.delete(
            `${this.baseUrl}/${classroomId}/subjects/${subjectId}/topics/${topicId}`
        );
    }
}
