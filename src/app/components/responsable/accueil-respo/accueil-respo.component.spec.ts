import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccueilRespoComponent } from './accueil-respo.component';

describe('AccueilRespoComponent', () => {
  let component: AccueilRespoComponent;
  let fixture: ComponentFixture<AccueilRespoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccueilRespoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccueilRespoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
