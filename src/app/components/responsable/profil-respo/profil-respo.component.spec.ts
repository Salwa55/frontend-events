import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilRespoComponent } from './profil-respo.component';

describe('ProfilRespoComponent', () => {
  let component: ProfilRespoComponent;
  let fixture: ComponentFixture<ProfilRespoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfilRespoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilRespoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
