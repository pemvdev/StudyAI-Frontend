import { Component } from '@angular/core';
import { DefaultLoginLayoutComponent } from '../../components/default-login-layout/default-login-layout.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    DefaultLoginLayoutComponent,
    ReactiveFormsModule,
    PrimaryInputComponent
  ],
  // Note: You usually don't need to provide Router here; it's provided globally.
  // Only provide LoginService if you want a fresh instance for this component.
  providers: [LoginService], 
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  // Use the 'new' keyword here or in ngOnInit
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  // Constructor must use parentheses () and then curly braces {}
  constructor(
    private router: Router,
    private loginService: LoginService,
    private toastrService: ToastrService
  ) {}

  submit() {
    this.loginService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe({
      next: () => {
        this.toastrService.success("You're now logged in!"),
        this.navigate(); // Navigate on success
      },
      error: (err) => this.toastrService.error("Try again later...")
    });
  }

  navigate() {
    this.router.navigate(["signup"]);
  }
}