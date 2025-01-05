import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilEtudComponent } from './profil-etud.component';

describe('ProfilEtudComponent', () => {
  let component: ProfilEtudComponent;
  let fixture: ComponentFixture<ProfilEtudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfilEtudComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilEtudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
