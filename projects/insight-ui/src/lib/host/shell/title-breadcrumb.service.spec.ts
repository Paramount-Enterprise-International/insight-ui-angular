import { IHTitleBreadcrumbService } from './title-breadcrumb.service';

describe('breadcrumb contribution ownership', () => {
  it('retains full error overrides while remote contributions change or clear', () => {
    const shell = new IHTitleBreadcrumbService();
    shell.setBreadcrumbs([{ label: 'Unauthorized Access' }]);
    shell.setRemoteBreadcrumbs([{ label: 'Details' }]);
    shell.clearRemote();
    expect(shell.remoteBreadcrumbs()).toEqual([]);
    expect(shell.breadcrumbsOverride()).toEqual([{ label: 'Unauthorized Access' }]);
    shell.clear();
    expect(shell.breadcrumbsOverride()).toBeNull();
  });
});
