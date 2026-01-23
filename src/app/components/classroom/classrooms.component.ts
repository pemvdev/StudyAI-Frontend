import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubjectComponent } from "../subject/subject.component";
import { Subject } from '../subject/subject.model';
import { SubjectService } from '../../services/subject.service';
import { FormsModule } from '@angular/forms';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-classroom-card',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './classrooms.component.html',
  styleUrl: './classrooms.component.css'
})
export class ClassroomComponent {

  constructor(private router: Router) { }
 
   selectedClassroomId!: number;

  @Input() id!: number;
  @Input() name!: string;
  @Input() description?: string;
  @Input() dateOfCreation!: string;

  @Output() open = new EventEmitter<number>();
  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<number>();


  goToClassroom() {
    this.router.navigate(['/classrooms', this.id]);
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

}
