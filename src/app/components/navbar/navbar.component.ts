import { Component } from '@angular/core';
import { UserProfileComponent } from "../user-profile/user-profile.component";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [UserProfileComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

}
