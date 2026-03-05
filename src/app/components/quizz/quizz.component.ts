import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Quizz } from "./quizz.model";
import { QuizSubmission } from "./quiz-submission.model";
import { CommonModule } from '@angular/common';
import { QuizzService } from '../../services/quizz.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-quizz',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quizz.component.html',
  styleUrl: './quizz.component.css'
})
export class QuizzComponent implements OnInit {

  quiz: Quizz | null = null;

  loading = false;
  errorMessage: string | null = null;

  @Output() quizCompleted = new EventEmitter<QuizSubmission>();

  constructor(
    private route: ActivatedRoute,
    private quizService: QuizzService
  ) {}

  ngOnInit(): void {

    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.loading = true;

    this.quizService.getQuizById(id).subscribe({
      next: quiz => {
        this.quiz = quiz;
        this.loading = false;
      },
      error: () => {
        this.errorMessage = "Error loading quiz";
        this.loading = false;
      }
    });

  }

  currentQuestionIndex = 0;

  selectedAnswers: { [questionId: number]: number } = {};

  quizFinished = false;

  get currentQuestion() {
    if (!this.quiz) return null;
    return this.quiz.questions[this.currentQuestionIndex];
  }

  selectOption(index: number) {
    if (!this.quiz) return;

    const questionId = this.currentQuestion!.id;
    this.selectedAnswers[questionId] = index;
  }

  isSelected(index: number): boolean {
    if (!this.quiz) return false;

    const questionId = this.currentQuestion!.id;
    return this.selectedAnswers[questionId] === index;
  }

  nextQuestion() {
    if (!this.quiz) return;

    if (this.currentQuestionIndex < this.quiz.questions.length - 1) {
      this.currentQuestionIndex++;
    }
  }

  previousQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
    }
  }

  allAnswered(): boolean {
    if (!this.quiz) return false;

    return Object.keys(this.selectedAnswers).length === this.quiz.questions.length;
  }

  finishQuiz() {

    if (!this.quiz) return;

    if (!this.allAnswered()) {

      const unanswered = this.quiz.questions.find(
        q => this.selectedAnswers[q.id] === undefined
      );

      if (unanswered) {
        const index = this.quiz.questions.findIndex(q => q.id === unanswered.id);
        this.currentQuestionIndex = index;
      }

      return;
    }

    const submission: QuizSubmission = {
      quizId: this.quiz.id,
      answers: this.quiz.questions.map(q => ({
        questionId: q.id,
        selectedIndex: this.selectedAnswers[q.id]
      }))
    };

    this.quizCompleted.emit(submission);
    this.quizFinished = true;
  }

}