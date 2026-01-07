import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-classroom-card',
  standalone: true,
  imports: [ 
    CommonModule
  ],
  templateUrl: './classroom.component.html',
  styleUrl: './classroom.component.css'
})
export class ClassroomComponent {

  @Input() id!: number;
  @Input() name!: string;
  @Input() description?: string;
  @Input() dateOfCreation!: string;

  @Output() open = new EventEmitter<number>();
  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<number>();

  expanded = false;

  toggleExpand() {
    this.expanded = !this.expanded;
    this.open.emit(this.id);
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
