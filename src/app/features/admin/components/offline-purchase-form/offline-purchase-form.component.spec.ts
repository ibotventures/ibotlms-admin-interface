import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfflinePurchaseFormComponent } from './offline-purchase-form.component';

describe('OfflinePurchaseFormComponent', () => {
  let component: OfflinePurchaseFormComponent;
  let fixture: ComponentFixture<OfflinePurchaseFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OfflinePurchaseFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfflinePurchaseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
