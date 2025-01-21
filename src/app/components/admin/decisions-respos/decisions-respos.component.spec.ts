import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecisionsResposComponent } from './decisions-respos.component';

describe('DecisionsResposComponent', () => {
  let component: DecisionsResposComponent;
  let fixture: ComponentFixture<DecisionsResposComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DecisionsResposComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DecisionsResposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
