import { Component } from '@angular/core';
import { DefaultLoginLayoutComponent } from '../../components/default-login-layout/default-login-layout.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';

interface signupForm {
  name: FormControl,
  email: FormControl,
  password: FormControl,
  passwordConfirm: FormControl
}




@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    DefaultLoginLayoutComponent,
    ReactiveFormsModule,
    PrimaryInputComponent
  ],
  providers: [LoginService], 
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  signupForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    passwordConfirm: new FormControl('', [Validators.required, Validators.minLength(6)])

  });

  // Constructor must use parentheses () and then curly braces {}
  constructor(
    private router: Router,
    private loginService: LoginService,
    private toastrService: ToastrService
  ) {}

  submit() {
    this.loginService.signup(this.signupForm.value.email, this.signupForm.value.email, this.signupForm.value.password).subscribe({
      next: () => {
        this.toastrService.success("You're now logged in!"),
        this.navigate();
      },
      error: (err) => this.toastrService.error("Try again later...")
    });
  }

  navigate() {
    this.router.navigate(["login"]);
  }
}