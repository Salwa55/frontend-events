import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderRespoComponent } from './header-respo.component';

describe('HeaderRespoComponent', () => {
  let component: HeaderRespoComponent;
  let fixture: ComponentFixture<HeaderRespoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderRespoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderRespoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
