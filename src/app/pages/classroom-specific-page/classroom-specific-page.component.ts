import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { SubjectComponent } from '../../components/subject/subject.component';
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
    private route: ActivatedRoute
  ) { }

  id!: number;

  classroom?: Classroom;
  subjects: Subject[] = [];
  
  showCreateSubjectModal = false;
  subjectsLoaded = false;
  editingSubjectId: number | null = null;
  isEditMode = false;

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadClassroom();
    this.loadSubjects();
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
    next: data => {
      console.log('SINGLE CLASSROOM:', data);
      this.classroom = data;
    },
    error: err => console.error(err)
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
    console.log('Open subject', subjectId);
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


}
