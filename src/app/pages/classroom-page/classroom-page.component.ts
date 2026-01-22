import { Component, OnInit } from '@angular/core';
import { ClassroomService } from '../../services/classroom.service';
import { ClassroomComponent } from "../../components/classroom/classroom.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { SubjectComponent } from '../../components/subject/subject.component';
import { SubjectService } from '../../services/subject.service';

@Component({
  selector: 'app-classroom-page',
  standalone: true,
  imports: [ClassroomComponent, CommonModule, FormsModule, NavbarComponent],
  templateUrl: './classroom-page.component.html',
  styleUrls: ['./classroom-page.component.css']
})
export class ClassroomPageComponent implements OnInit {

  classrooms: any[] = [];
  subjects: any[] = [];
  showCreateModal = false;
  isEditMode = false;
  selectedClassroom: any = null;
  isAddSubjectModalOpen = false;

  form = {
    name: '',
    description: ''
  };

  constructor(private classroomService: ClassroomService,
    private subjectService: SubjectService
  ) { }

  ngOnInit() {
    this.loadClassrooms();
  }

  loadClassrooms() {
    this.classroomService.getClassrooms().subscribe({
      next: (data) => this.classrooms = data,
      error: (err) => console.error('Error loading classrooms', err)
    });
  }

  loadSubjects(classroomId: number) {
  this.subjectService.getSubjectsByClassroom(classroomId).subscribe({
    next: data => this.subjects = data,
    error: err => console.error('Error loading subjects', err)
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
  openAddSubjectModal() {
  this.isAddSubjectModalOpen = true;
}

closeAddSubjectModal() {
  this.isAddSubjectModalOpen = false;
}

}
