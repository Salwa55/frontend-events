import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CauseRefusComponent } from './cause-refus.component';

describe('CauseRefusComponent', () => {
  let component: CauseRefusComponent;
  let fixture: ComponentFixture<CauseRefusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CauseRefusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CauseRefusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
