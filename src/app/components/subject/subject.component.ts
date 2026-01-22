import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-subject',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './subject.component.html',
  styleUrl: './subject.component.css'
})
export class SubjectComponent {
  @Input() id!: number;
  @Input() name!: string;

  @Output() open = new EventEmitter<number>();
  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<number>();
  
   expanded = false;

  toggleExpand() {
    this.expanded = !this.expanded;
    this.open.emit(this.id);
  }

  onEditSubject(event: Event) {
    event.stopPropagation();
    this.edit.emit({
      id: this.id,
      name: this.name
    });
  }

  onDeleteSubject(event: Event) {
    event.stopPropagation();
    this.delete.emit(this.id);
  }
}
