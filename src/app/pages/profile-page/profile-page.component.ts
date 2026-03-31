import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  user: any;
  editUser: any = {};
  isEditing = false;

  
   stats = {
    quizzes: 42,
    accuracy: 85,
    trophies: 12
  };

  constructor(private userService: UserService,
    private location: Location

  ) {}

  async ngOnInit() {
    this.user = await this.userService.getCurrentUser();
      console.log("User:", this.user);

    console.log(this.user.profilePicture);
  }

  goBack() {
  this.location.back();
}

  startEdit() {
    this.isEditing = true;
    this.editUser = { ...this.user };
  }

  cancel() {
    this.isEditing = false;
  }

  async save() {
    this.user = await this.userService.updateUser(this.editUser);
    this.isEditing = false;
  }

  async onFileSelected(event: any) {
  const file = event.target.files[0];
  if (!file) return;

  try {
    const updatedUser = await this.userService.uploadProfilePicture(file);

    this.user = updatedUser;

  } catch (err) {
    console.error(err);
  }
}

}