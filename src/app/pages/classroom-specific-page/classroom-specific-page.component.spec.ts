import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassroomSpecificPageComponent } from './classroom-specific-page.component';

describe('ClassroomSpecificPageComponent', () => {
  let component: ClassroomSpecificPageComponent;
  let fixture: ComponentFixture<ClassroomSpecificPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassroomSpecificPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClassroomSpecificPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
