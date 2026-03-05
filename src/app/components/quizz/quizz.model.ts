import { QuizQuestion } from "./quiz-question.model";

export interface Quizz {
    totalQuestions: number;
    score: number;
    id: number;
    userId: number;
    createdAt: string;
    questions: QuizQuestion[];

}