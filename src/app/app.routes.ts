import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup';
import { HomeComponent } from './pages/home/home.component';
import { authGuard } from './guards/auth.guard';
import { ClassroomComponent } from './components/classroom/classrooms.component';
import { ClassroomsPageComponent } from './pages/classroom-page/classroom-page.component';
import { ClassroomSpecificPageComponent } from './pages/classroom-specific-page/classroom-specific-page.component';
import { Component } from '@angular/core';
import { SubjectPageComponent } from './pages/subject-page/subject-page.component';
import { QuizPageComponent } from './pages/quiz-page/quiz-page.component';
import { GenerateQuizPageComponent } from './pages/generate-quiz-page/generate-quiz-page.component';
import { QuizzComponent } from './components/quizz/quizz.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login'
        //Criar authRedirectGuard dps
    },

    {
        path: "login",
        component: LoginComponent
    },
    {
        path: "signup",
        component: SignupComponent
    }
    ,

    {
        path: "home",
        component: HomeComponent,
        canActivate: [authGuard]
    },
    {
        path: "classrooms",
        component: ClassroomsPageComponent,
        canActivate: [authGuard] 
        //Where all the classrooms are listed
    },
    {
        path: "classrooms/:id",
        component: ClassroomSpecificPageComponent,
        canActivate: [authGuard] 
        //Page specifi to the classroom selected (Subjects and Topics listed here)
    },
    {

        path: "classrooms/:id/subjects/:subjectId",
        component: SubjectPageComponent,
        canActivate: [authGuard] 
        //Page specific to the subject selected (Topics listed here)
    },
    {
        path: "quizzes",
        component:QuizPageComponent,
        canActivate: [authGuard]
    },
    {
        path: "quizzes/new",
        component: GenerateQuizPageComponent,
        canActivate: [authGuard]
    },
    {
        path: "quizzes/:id",
        component:QuizzComponent,
        canActivate: [authGuard]
    },
    
];
