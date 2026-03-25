import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from "@angular/router";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  isDark = false

  constructor(private router: Router) {}

  ngOnInit() {

    const savedTheme = localStorage.getItem("theme") || "light"

    document.documentElement.setAttribute("data-bs-theme", savedTheme)

    this.isDark = savedTheme === "dark"
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

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

}
