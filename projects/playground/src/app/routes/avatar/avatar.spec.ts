import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { Avatar } from './avatar';

describe('Avatar (playground)', () => {
  let component: Avatar;
  let fixture: ComponentFixture<Avatar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Avatar, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(Avatar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render multiple i-avatar elements', () => {
    const avatars = fixture.debugElement.queryAll(By.css('i-avatar'));
    expect(avatars.length).toBeGreaterThan(0);
  });
});
