export interface QuizSubmission {
    quizId: number;
    answers: {
        questionId: number;
        selectedIndex: number;
    }[];
}