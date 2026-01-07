import { Component, OnInit } from '@angular/core';
import { ClassroomService } from '../../services/classroom.service';
import { ClassroomComponent } from "../../components/classroom/classroom.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from "../../components/navbar/navbar.component";

@Component({
  selector: 'app-classroom-page',
  standalone: true,
  imports: [ClassroomComponent, CommonModule, FormsModule, NavbarComponent],
  templateUrl: './classroom-page.component.html',
  styleUrls: ['./classroom-page.component.css']
})
export class ClassroomPageComponent implements OnInit {

  classrooms: any[] = [];
  showCreateModal = false;
  isEditMode = false;
  selectedClassroom: any = null;

  form = {
    name: '',
    description: ''
  };

  constructor(private classroomService: ClassroomService) { }

  ngOnInit() {
    this.loadClassrooms();
  }

  loadClassrooms() {
    this.classroomService.getClassrooms().subscribe({
      next: (data) => this.classrooms = data,
      error: (err) => console.error('Error loading classrooms', err)
    });
  }

  openCreateModal() {
    this.isEditMode = false;
    this.selectedClassroom = null;
    this.form = { name: '', description: '' };
    this.showCreateModal = true;

  }

  handleCreateClassroom(formValue: any) {
    this.classroomService.createClassroom(formValue).subscribe({
      next: () => {
        this.showCreateModal = false;
        this.loadClassrooms();
      },
      error: (err) => console.error('Error creating classroom', err)
    });
  }

  hideCreateClassroomModal() {
    this.showCreateModal = false;
  }

  openEditModal(classroom: any) {
    this.isEditMode = true;
    this.selectedClassroom = classroom;
    this.form = {
      name: classroom.name,
      description: classroom.description
    };
    this.showCreateModal = true;
  }

  handleDelete(id: number) {
    if (confirm('Are you sure?')) {
      this.classroomService.deleteClassroom(id).subscribe({
        next: () => this.loadClassrooms(),
        error: (err) => console.error('Error deleting', err)
      });
    }
  }

  handleSaveClassroom() {
    if (this.isEditMode && this.selectedClassroom && this.selectedClassroom.id) {
      this.classroomService.updateClassroom(this.selectedClassroom.id, this.form).subscribe({
        next: () => {
          this.showCreateModal = false;
          this.loadClassrooms();
        },
        error: (err) => console.error('Erro no Update:', err)
      });
    } else {
      this.classroomService.createClassroom(this.form).subscribe({
        next: () => {
          this.showCreateModal = false;
          this.loadClassrooms();
        },
        error: (err) => console.error('Erro no Create:', err)
      });
    }
  }
}
