import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsEventrespoComponent } from './details-eventrespo.component';

describe('DetailsEventrespoComponent', () => {
  let component: DetailsEventrespoComponent;
  let fixture: ComponentFixture<DetailsEventrespoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsEventrespoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsEventrespoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
