import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Quizz } from '../components/quizz/quizz.model';
import { QuizSubmission } from '../components/quizz/quiz-submission.model';
import { map } from 'rxjs/operators';
import { QuizResult } from '../components/quizz/quiz-result.model';

@Injectable({
  providedIn: 'root'
})
export class QuizzService {
  private apiUrl = 'http://localhost:8080/quizzes';

  constructor(private http: HttpClient) { }

  getUserQuizzes(): Observable<Quizz[]> {
    return this.http.get<Quizz[]>(this.apiUrl);
  }

  getQuizById(id: number): Observable<Quizz> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map(response => ({
        id: response.id,
        userId: response.userId,
        createdAt: response.createdAt,
        questions: response.questions.map((q: any) => ({
          id: q.questionId,
          questionText: q.question,
          options: q.options
        })),
        totalQuestions: response.totalQuestions || response.questions.length,
        score: response.score || 0
      }))
    );
  }
  generateQuiz(topicIds: number[]): Observable<Quizz> {
    return this.http.post<Quizz>(`${this.apiUrl}`, {
      topicIds: topicIds
    });
  }

  submitQuiz(quizId: number, submission: QuizSubmission): Observable<QuizResult> {
  return this.http.post<QuizResult>(
    `${this.apiUrl}/${quizId}/submit`,
    submission
  );
}
}

