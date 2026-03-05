import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateQuizPageComponent } from './generate-quiz-page.component';

describe('GenerateQuizPageComponent', () => {
  let component: GenerateQuizPageComponent;
  let fixture: ComponentFixture<GenerateQuizPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenerateQuizPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GenerateQuizPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
