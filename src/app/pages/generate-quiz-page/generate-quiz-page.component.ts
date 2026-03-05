import { Component, OnInit } from '@angular/core';
import { Topic } from '../../components/topic/topic.model';
import { Subject } from '../../components/subject/subject.model';
import { Classroom } from '../../components/classroom/classrooms.model';
import { ClassroomService } from '../../services/classroom.service';
import { TopicService } from '../../services/topic.service';
import { SubjectService } from '../../services/subject.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuizSubmission } from '../../components/quizz/quiz-submission.model';
import { QuizzService } from '../../services/quizz.service';
import { Router } from '@angular/router';
import { QuizzComponent } from '../../components/quizz/quizz.component';
import { Quizz } from '../../components/quizz/quizz.model';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  selector: 'app-generate-quiz-page',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './generate-quiz-page.component.html',
  styleUrl: './generate-quiz-page.component.css'
})
export class GenerateQuizPageComponent implements OnInit {

  classes: Classroom[] = [];
  subjects: Subject[] = [];
  topics: Topic[] = [];
  quiz: Quizz | null = null;
  quizzes: Quizz[] = [];
  quizId!: number;

  loading = false;
  result: any = null;
  errorMessage: string | null = null;

  selectedClassId?: number;
  selectedSubjectId?: number;
  selectedTopicId?: number;

  constructor(
    private classroomService: ClassroomService,
    private subjectService: SubjectService,
    private topicService: TopicService,
    private quizService: QuizzService,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.loadClasses();
  }


  loadClasses() {
    this.classroomService.getClassrooms().subscribe(data => {
      this.classes = data;
    });
  }

  loadSubjects(classId: number) {
    this.subjectService.getSubjectsByClassroom(classId).subscribe(data => {
      this.subjects = data;
    });
  }

  loadTopics() {
    if (!this.selectedClassId || !this.selectedSubjectId) return;

    this.topicService
      .getTopicsBySubject(this.selectedClassId, this.selectedSubjectId)
      .subscribe(data => {
        this.topics = data;
      });
  }

  onClassChange() {
    this.subjects = [];
    this.topics = [];
    this.selectedSubjectId = undefined;
    this.selectedTopicId = undefined;

    if (this.selectedClassId) {
      this.loadSubjects(this.selectedClassId);
    }
  }

  onSubjectChange() {
    this.topics = [];
    this.selectedTopicId = undefined;

    if (this.selectedClassId && this.selectedSubjectId) {
      this.loadTopics();
    }
  }

  generateQuiz() {
    if (!this.selectedTopicId) return;

    this.loading = true;

    this.quizService.generateQuiz([this.selectedTopicId])
      .subscribe({
        next: (quiz) => {
          this.loading = false;
          this.router.navigate(['/quizzes', quiz.id]);
        },
        error: () => {
          this.loading = false;
        }
      });
  }

  onQuizCompleted(submission: QuizSubmission) {
    this.quizService.submitQuiz(submission).subscribe({
      next: (response) => {
        this.result = response;
      },
      error: () => {
        this.errorMessage = 'Erro ao enviar respostas.';
      }
    });
  }

}
