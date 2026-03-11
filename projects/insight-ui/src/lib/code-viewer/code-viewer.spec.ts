import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ICodeViewer } from './code-viewer';

@Component({
  standalone: true,
  imports: [ICodeViewer],
  template: `<i-code-viewer [code]="'const x = 1;'" [language]="'typescript'" />`,
})
class CodeViewerHost {}

describe('ICodeViewer', () => {
  let fixture: ComponentFixture<CodeViewerHost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CodeViewerHost, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CodeViewerHost);
    fixture.detectChanges();
  });

  it('renders host', () => {
    const host = fixture.nativeElement as HTMLElement;

    expect(host.querySelector('i-code-viewer')).toBeTruthy();
  });
});
