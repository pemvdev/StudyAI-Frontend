import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { Classroom } from '../../components/classroom/classrooms.model';
import { Subject } from '../../components/subject/subject.model';
import { SubjectService } from '../../services/subject.service';
import { ClassroomService } from '../../services/classroom.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-classroom-specific-page',
  standalone: true,
  imports: [NavbarComponent, CommonModule, FormsModule],
  templateUrl: './classroom-specific-page.component.html',
  styleUrl: './classroom-specific-page.component.css'
})
export class ClassroomSpecificPageComponent {

  constructor(
    private classroomService: ClassroomService,
    private subjectService: SubjectService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  id!: number;

  classroom?: Classroom;
  subjects: Subject[] = [];
  
  
  showCreateSubjectModal = false;
  subjectsLoaded = false;
  editingSubjectId: number | null = null;
  isEditMode = false;
  isEditModeClass = false;
  showCreateModal = false;
  selectedClassroom: any = null;


  form = {
    name: '',
    description: ''
    };


  ngOnInit() {
   
    this.route.paramMap.subscribe(params => {
    const id = params.get('id');

    if (!id) {
      console.error('Missing id in route');
      return;
    }

    this.id = Number(id);

    console.log('Loaded classroomId:', this.id);

    this.loadClassroom();
    this.loadSubjects();
  });
  }


  subjectForm = {
    name: ''
  };


  closeSubjectModal() {
    this.showCreateSubjectModal = false;
  }

 saveSubject() {
  if (this.editingSubjectId !== null) {
    // UPDATE
    this.subjectService
      .updateSubject(this.id, this.editingSubjectId, this.subjectForm)
      .subscribe({
        next: () => {
          this.resetModal();
          this.loadSubjects();
        },
        error: err => console.error('Error updating subject', err)
      });

  } else {
    // CREATE
    this.subjectService
      .createSubject(this.id, this.subjectForm)
      .subscribe({
        next: () => {
          this.resetModal();
          this.loadSubjects();
        },
        error: err => console.error('Error creating subject', err)
      });
  }
}

resetModal() {
  this.showCreateSubjectModal = false;
  this.editingSubjectId = null;
  this.subjectForm = { name: '' };
}


  loadClassroom() {
    this.classroomService.getById(this.id).subscribe({
      next: (data) => this.classroom = data,
      error: (err) => console.error('Error loading classrooms', err)
    });
  }

  loadSubjects() {
    this.subjectService.getSubjectsByClassroom(this.id).subscribe({
      next: data => {
        this.subjects = data;
        this.subjectsLoaded = true;
      },
      error: err => console.error('Error loading subjects', err)
    });
  }

  addSubject(event: Event) {
  event.stopPropagation();
  this.editingSubjectId = null;
  this.subjectForm = { name: '' };
  this.showCreateSubjectModal = true;
}

  onSubjectOpen(subjectId: number) {
    this.router.navigate(['/classrooms', this.id, 'subjects', subjectId]);
  }

 onEditSubject(subject: Subject) {
  this.editingSubjectId = subject.id;
  this.subjectForm = { name: subject.name };
  this.showCreateSubjectModal = true;
}

  onDeleteSubject(subjectId: number) {
  if (!confirm('Are you sure you want to delete this subject?')) {
    return;
  }

  this.subjectService.deleteSubject(this.id, subjectId).subscribe({
    next: () => this.loadSubjects(),
    error: err => console.error('Error deleting subject', err)
  });
}

openEditModalClassroom(classroom: any) {
    this.isEditModeClass = true;
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
        next: () => this.router.navigate(['/classrooms']),
        error: (err) => console.error('Error deleting classroom:', err)
      });
    }

  }
  hideCreateClassroomModal() {
    this.showCreateModal = false;
  }

  handleSaveClassroom() {
    if (this.isEditModeClass && this.selectedClassroom && this.selectedClassroom.id) {
      this.classroomService.updateClassroom(this.selectedClassroom.id, this.form).subscribe({
        next: () => {
          this.showCreateModal = false;
          this.loadClassroom();
        },
        error: (err) => console.error('Erro no Update:', err)
      });
    } else {
      this.classroomService.createClassroom(this.form).subscribe({
        next: () => {
          this.showCreateModal = false;
          this.loadClassroom();
        },
        error: (err) => console.error('Erro no Create:', err)
      });
    }
  }


}
