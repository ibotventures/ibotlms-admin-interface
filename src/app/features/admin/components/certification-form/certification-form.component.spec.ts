import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificationFormComponent } from './certification-form.component';

describe('CertificationFormComponent', () => {
  let component: CertificationFormComponent;
  let fixture: ComponentFixture<CertificationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CertificationFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CertificationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
