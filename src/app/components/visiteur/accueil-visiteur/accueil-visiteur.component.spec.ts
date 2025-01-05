import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccueilVisiteurComponent } from './accueil-visiteur.component';

describe('AccueilVisiteurComponent', () => {
  let component: AccueilVisiteurComponent;
  let fixture: ComponentFixture<AccueilVisiteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccueilVisiteurComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccueilVisiteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
