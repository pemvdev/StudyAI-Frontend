import { Component } from '@angular/core';
import { UserProfileComponent } from "../user-profile/user-profile.component";
import { RouterModule } from "@angular/router";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [UserProfileComponent, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

}
