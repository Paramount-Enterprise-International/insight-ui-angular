import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IIcon } from './icon';

@Component({
  standalone: true,
  imports: [IIcon],
  template: `<i-icon icon="add" />`,
})
class IconHost {}

describe('IIcon', () => {
  let fixture: ComponentFixture<IconHost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconHost],
    }).compileComponents();

    fixture = TestBed.createComponent(IconHost);
    fixture.detectChanges();
  });

  it('renders host and inner icon', () => {
    const host = fixture.nativeElement as HTMLElement;
    const inner = host.querySelector('i-icon i') as HTMLElement | null;

    expect(host.querySelector('i-icon')).toBeTruthy();
    expect(inner).toBeTruthy();
    expect(inner?.className).toContain('fa-plus');
  });
});
