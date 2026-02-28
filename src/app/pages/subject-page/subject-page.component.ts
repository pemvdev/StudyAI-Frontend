import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { SubjectService } from '../../services/subject.service';
import { Subject } from '../../components/subject/subject.model';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TopicService } from '../../services/topic.service';
import { TopicComponent } from '../../components/topic/topic.component';


@Component({
  selector: 'app-subject-page',
  standalone: true,
  imports: [NavbarComponent, CommonModule, FormsModule],
  templateUrl: './subject-page.component.html',
  styleUrl: './subject-page.component.css'
})
export class SubjectPageComponent {

  constructor(private subjectService: SubjectService, private route: ActivatedRoute, private topicService: TopicService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.classroomId = Number(params.get('id'));
      this.subjectId = Number(params.get('subjectId'));

      this.loadSubject();
      this.loadTopics();
    });
  }

  subject: Subject | null = null;
  subjectLoaded = false;
  classroomId!: number;
  subjectId!: number;
  topics: any[] = [];
  topicsLoaded = false;
  showCreateTopicModal = false;
  editingTopicId: number | null = null;
  topicForm = { name: '', content: '' };

  loadSubject() {
    this.subjectService.getSubjectByClassroom(this.classroomId, this.subjectId).subscribe({
      next: data => {
        this.subject = data;
        this.subjectLoaded = true;
      },
      error: err => console.error('Error loading subject', err)
    });
  }

  loadTopics() {
    this.topicService
      .getTopicsBySubject(this.classroomId, this.subjectId)
      .subscribe({
        next: data => {
          this.topics = data;
          this.topicsLoaded = true;
        },
        error: err => console.error('Error loading topics', err)
      });
  }

  resetTopicModal() {
    this.showCreateTopicModal = false;
    this.editingTopicId = null;
    this.topicForm = { name: '', content: '' };
  }

  saveTopic() {
    if (this.editingTopicId !== null) {

      // UPDATE
      this.topicService
        .updateTopic(
          this.classroomId,
          this.subjectId,
          this.editingTopicId,
          this.topicForm
        )
        .subscribe({
          next: () => {
            this.resetTopicModal();
            this.loadTopics();
          },
          error: err => console.error('Error updating topic', err)
        });

    } else {

      // CREATE
      this.topicService.createTopic(this.classroomId, this.subjectId, this.topicForm)
        .subscribe({
          next: () => {
            this.resetTopicModal();
            this.loadTopics();
          },
          error: err => console.error('Error creating topic', err)
        });
    }
  }

  onEditTopic(topic: any) {
  this.editingTopicId = topic.id;
  this.topicForm = {
    name: topic.name,
    content: topic.content
  };
  this.showCreateTopicModal = true;
}



  addTopic(event: Event) {
    event.stopPropagation();
    this.editingTopicId = null;
    this.topicForm = { name: '', content: '' };
    this.showCreateTopicModal = true;
  }

  closeTopicModal() {
    this.resetTopicModal();
  }

  onDeleteTopic(topicId: number) {
  if (!confirm('Are you sure you want to delete this topic?')) return;

  this.topicService.deleteTopic(this.classroomId, this.subjectId, topicId)
    .subscribe({
      next: () => this.loadTopics(),
      error: err => console.error('Error deleting topic', err)
    });
}


} 
