import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationsRespoComponent } from './notifications-respo.component';

describe('NotificationsRespoComponent', () => {
  let component: NotificationsRespoComponent;
  let fixture: ComponentFixture<NotificationsRespoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationsRespoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificationsRespoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
