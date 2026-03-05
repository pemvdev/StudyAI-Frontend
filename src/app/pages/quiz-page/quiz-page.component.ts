import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { Quizz } from "../../components/quizz/quizz.model";
import { QuizzService } from "../../services/quizz.service";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { QuizSubmission } from "../../components/quizz/quiz-submission.model";
import { CommonModule } from "@angular/common";
import { QuizzComponent } from "../../components/quizz/quizz.component";
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-quiz-page',
  standalone: true,
  imports: [NavbarComponent, CommonModule, FormsModule, RouterModule],
  templateUrl: './quiz-page.component.html',
  styleUrl: './quiz-page.component.css'
})
export class QuizPageComponent implements OnInit {
  quiz: Quizz | null = null;
  quizzes: Quizz[] = [];
  quizId!: number;

  selectedClassId?: number;
  selectedSubjectId?: number;
  selectedTopicId?: number;

  errorMessage: string | null = null;
  loading = false;
  showGenerator = false


  constructor(
    private route: ActivatedRoute,
    private quizService: QuizzService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.quizService.getUserQuizzes().subscribe({
      next: (data) => {
        this.quizzes = data;
      },
      error: (err) => {
        console.error(err);
      }
    });
    const idParam = this.route.snapshot.paramMap.get('id');

    if (idParam) {
      this.quizId = Number(idParam);
      this.loadExistingQuiz(this.quizId);
    }
  }

  loadExistingQuiz(id: number) {
    this.loading = true;

    this.quizService.getQuizById(id).subscribe({
      next: (data) => {
        this.quiz = data;
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Erro ao carregar o quiz.';
        this.loading = false;
      }
    });
  }

}

