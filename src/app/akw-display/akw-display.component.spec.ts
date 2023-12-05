import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AkwDisplayComponent } from './akw-display.component';

describe('AkwDisplayComponent', () => {
  let component: AkwDisplayComponent;
  let fixture: ComponentFixture<AkwDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AkwDisplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AkwDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
