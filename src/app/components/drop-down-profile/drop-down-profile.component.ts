import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-drop-down-profile',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './drop-down-profile.component.html',
styleUrls: ['./drop-down-profile.component.css']})
export class DropDownProfileComponent {

  isOpen = false;

  constructor(private router: Router) {}

  toggleDropdown() {
  console.log('clicou');
  this.isOpen = !this.isOpen;
}

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.profile-container')) {
      this.isOpen = false;
    }
  }

}
