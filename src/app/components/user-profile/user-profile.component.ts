import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {

  user: any;
  editUser: any = {};
  isEditing = false;
  
  constructor(private userService: UserService) { }

  async ngOnInit() {
    try {
      this.user = await this.userService.getCurrentUser();
    } catch (err) {
      console.error('Erro ao buscar usuário', err);
    }
  }

  startEdit() {
  this.isEditing = true;

  // copia os dados (evita editar direto)
  this.editUser = { ...this.user };
}

cancel() {
  this.isEditing = false;
}

async save() {
  try {
    this.user = await this.userService.updateUser(this.editUser);
    this.isEditing = false;
  } catch (err) {
    console.error('Erro ao atualizar', err);
  }
}


}