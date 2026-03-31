import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from "@angular/router";
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { environment } from '../../../environments/env';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  isDark = false
  user: any = null;

  constructor(private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {

    const savedTheme = localStorage.getItem("theme") || "light"

    document.documentElement.setAttribute("data-bs-theme", savedTheme)

    this.isDark = savedTheme === "dark"

    this.loadUser();
  }

  toggleTheme() {
    const html = document.documentElement;
    if (html.getAttribute('data-bs-theme') === 'dark') {
      html.setAttribute('data-bs-theme', 'light');
    } else {
      html.setAttribute('data-bs-theme', 'dark');
    }
    localStorage.setItem("theme", html.getAttribute('data-bs-theme') || "light")
    this.isDark = html.getAttribute('data-bs-theme') === 'dark'
  }

  async loadUser() {
  try {
    this.user = await this.userService.getCurrentUser();
  } catch (err) {
    console.error('Erro ao carregar usuário', err);
    this.user = null;
  }
}

  getProfileImageUrl() {
    return this.user?.profilePicture
      ? environment.apiUrl + this.user.profilePicture
      : '/assets/default-profile-picture.svg';
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

}
