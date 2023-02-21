import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileHistoryScreenComponent } from './profile-history-screen.component';

describe('ProfileHistoryScreenComponent', () => {
  let component: ProfileHistoryScreenComponent;
  let fixture: ComponentFixture<ProfileHistoryScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileHistoryScreenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileHistoryScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
