import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificationQuestionFormComponent } from './certification-question-form.component';

describe('CertificationQuestionFormComponent', () => {
  let component: CertificationQuestionFormComponent;
  let fixture: ComponentFixture<CertificationQuestionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CertificationQuestionFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CertificationQuestionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
