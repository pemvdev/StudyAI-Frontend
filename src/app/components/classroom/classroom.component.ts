import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubjectComponent } from "../subject/subject.component";
import { Subject } from '../subject/subject.model';
import { SubjectService } from '../../services/subject.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-classroom-card',
  standalone: true,
  imports: [
    CommonModule,
    SubjectComponent,
    FormsModule
  ],
  templateUrl: './classroom.component.html',
  styleUrl: './classroom.component.css'
})
export class ClassroomComponent {

  constructor(private subjectService: SubjectService) { }

  subjects: Subject[] = [];
  showCreateSubjectModal = false;
  subjectsLoaded = false;
  expanded = false;
  selectedClassroomId!: number;

  @Input() id!: number;
  @Input() name!: string;
  @Input() description?: string;
  @Input() dateOfCreation!: string;

  @Output() open = new EventEmitter<number>();
  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<number>();

  

  subjectForm = {
    name: ''
  };

  toggleExpand() {
    this.expanded = !this.expanded;

    // Load subjects only when expanded
    if (this.expanded) {
      this.subjectService.getSubjectsByClassroom(this.id).subscribe({
        next: (data) => this.subjects = data,
        error: (err) => console.error('Error loading subjects', err)
      });
    }
  }


  closeSubjectModal() {
    this.showCreateSubjectModal = false;
  }

  saveSubject() {
    this.subjectService
      .createSubject(this.id, this.subjectForm)
      .subscribe({
        next: () => {
          this.showCreateSubjectModal = false;
          this.subjectsLoaded = false;
          this.loadSubjects();
        },
        error: err => console.error('Error creating subject', err)
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
    this.subjectForm = { name: '' };
    this.showCreateSubjectModal = true;
  }

  onEdit(event: Event) {
    event.stopPropagation();
    this.edit.emit({
      id: this.id,
      name: this.name,
      description: this.description
    });
  }

  onDelete(event: Event) {
    event.stopPropagation();
    this.delete.emit(this.id);
  }

  onSubjectOpen(subjectId: number) {
    console.log('Open subject', subjectId);
  }

  onEditSubject(subject: { id: number; name: string }) {
    console.log('Edit subject', subject);
  }

  onDeleteSubject(subjectId: number) {
    console.log('Delete subject', subjectId);
  }

}
