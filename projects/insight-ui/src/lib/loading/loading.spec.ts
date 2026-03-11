import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ILoading } from './loading';

@Component({
  standalone: true,
  imports: [ILoading],
  template: `<i-loading label="Loading.." />`,
})
class LoadingHost {}

describe('ILoading', () => {
  let fixture: ComponentFixture<LoadingHost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingHost],
    }).compileComponents();

    fixture = TestBed.createComponent(LoadingHost);
    fixture.detectChanges();
  });

  it('renders host and label', () => {
    const host = fixture.nativeElement as HTMLElement;

    expect(host.querySelector('i-loading')).toBeTruthy();
    expect(host.textContent).toContain('Loading..');
  });
});
