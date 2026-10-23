import { TestBed } from '@angular/core/testing';
import { highlightSearchParts, IHighlightSearch } from './highlight-search';
import { IHighlightSearchPipe } from './highlight-search.pipe';
describe('IHighlightSearch', () => {
  it('renders HTML as text and highlights literal regex characters', () => {
    TestBed.configureTestingModule({ imports: [IHighlightSearch] });
    const f = TestBed.createComponent(IHighlightSearch);
    f.componentRef.setInput('value', '<b>A.B a.b</b>');
    f.componentRef.setInput('search', 'a.b');
    f.detectChanges();
    expect(f.nativeElement.querySelector('b')).toBeNull();
    expect(f.nativeElement.querySelectorAll('.highlight-search').length).toBe(2);
    expect(f.nativeElement.textContent).toBe('<b>A.B a.b</b>');
  });
  it('handles zero, null and empty search without losing data', () => {
    expect(highlightSearchParts(0, '0')).toEqual([{ text: '0', matched: true }]);
    expect(highlightSearchParts(null, 'x')).toEqual([{ text: '', matched: false }]);
    expect(highlightSearchParts('text', '')).toEqual([{ text: 'text', matched: false }]);
  });
  it('keeps pipe compatibility', () => {
    expect(new IHighlightSearchPipe().transform('A.B a.b', 'a.b')).toBe(
      '<span class="highlight-search">A.B</span> <span class="highlight-search">a.b</span>',
    );
  });
});
