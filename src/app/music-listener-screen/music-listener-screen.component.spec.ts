import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicListenerScreenComponent } from './music-listener-screen.component';

describe('MusicListenerScreenComponent', () => {
  let component: MusicListenerScreenComponent;
  let fixture: ComponentFixture<MusicListenerScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MusicListenerScreenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MusicListenerScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
