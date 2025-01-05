import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationsEtudComponent } from './notifications-etud.component';

describe('NotificationsEtudComponent', () => {
  let component: NotificationsEtudComponent;
  let fixture: ComponentFixture<NotificationsEtudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationsEtudComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificationsEtudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
