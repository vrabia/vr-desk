import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticationScreenComponent } from './authentication-screen.component';

describe('AuthenticationScreenComponent', () => {
  let component: AuthenticationScreenComponent;
  let fixture: ComponentFixture<AuthenticationScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthenticationScreenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthenticationScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
