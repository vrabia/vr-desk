import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileEditScreenComponent } from './profile-edit-screen.component';

describe('ProfileEditScreenComponent', () => {
  let component: ProfileEditScreenComponent;
  let fixture: ComponentFixture<ProfileEditScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileEditScreenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileEditScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
