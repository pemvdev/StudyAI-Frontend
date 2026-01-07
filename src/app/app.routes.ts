import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup';
import { HomeComponent } from './pages/home/home.component';
import { authGuard } from './guards/auth.guard';
import { ClassroomComponent } from './components/classroom/classroom.component';
import { ClassroomPageComponent } from './pages/classroom-page/classroom-page.component';

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
        component: ClassroomPageComponent,
        canActivate: [authGuard] 
    },

    // {
    //     path: "quizz",
    //     //component:,
    //     canActivate: [authGuard]
    // },



    //  {
    //     path: "classrooms",
    //     component: 
    //     canActivate: [authGuard]
    // },

    //  {
    //     path: "study",
    //     component: 
    //     canActivate: [authGuard]    
    // }
];
