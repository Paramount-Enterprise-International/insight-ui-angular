import { IHStateOwner } from './state-core';

describe('IHStateOwner', () => {
  beforeEach(() => sessionStorage.clear());

  it('restores session by default and discards temporary values after refresh', () => {
    const first = new IHStateOwner('angular-state-test');
    first.setIdentity('user');
    first.registerNamespace('scratch', { storage: 'temporary' });
    first.set('filters', 'query', 'saved');
    first.set('scratch', 'query', 'draft');
    const refreshed = new IHStateOwner('angular-state-test');
    refreshed.setIdentity('user');
    refreshed.registerNamespace('scratch', { storage: 'temporary' });
    expect(refreshed.get('filters', 'query', '')).toBe('saved');
    expect(refreshed.get('scratch', 'query', '')).toBe('');
  });

  it('retains project candidates across companies and rejects obsolete results', () => {
    const state = new IHStateOwner('angular-selection-test');
    state.setIdentity('user');
    const selection = state.selection;
    selection.activateMenu('sales');
    selection.validateCompanies('sales', ['a', 'b'], 'ready');
    selection.setCompany('a');
    selection.resolveProjects(selection.beginProjects(), ['shared']);
    selection.setProject('shared');
    const previous = selection.beginProjects();
    selection.setCompany('b');
    expect(selection.resolveProjects(previous, [])).toBeFalse();
    selection.resolveProjects(selection.beginProjects(), ['shared']);
    expect(selection.getSnapshot().projectKey).toBe('shared');
    selection.activateMenu('report');
    selection.validateCompanies('report', [], 'loading');
    expect(selection.getSnapshot().companyId).toBe('b');
    selection.validateCompanies('report', [], 'ready');
    expect(selection.getSnapshot().companyId).toBeNull();
    expect(selection.getSnapshot().projectKey).toBeNull();
  });

  it('clears persistent namespaces on user and impersonation transitions', () => {
    const state = new IHStateOwner('angular-identity-test');
    state.setIdentity('actor');
    state.set('filters', 'query', 'private');
    state.setIdentity('actor-as-user');
    expect(state.get('filters', 'query', '')).toBe('');
    state.setIdentity('actor');
    expect(state.get('filters', 'query', '')).toBe('');
  });
});
