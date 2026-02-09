import { Component } from '@angular/core';
import { IUI } from '../../../ui';

@Component({
  selector: 'ir-icon',
  imports: [IUI],
  templateUrl: './icon.html',
  styleUrl: './icon.scss',
})
export class IRIcon {
  icons = `<i-icon icon="add" />
<i-icon icon="back" />
<i-icon icon="cancel" />
<i-icon icon="calendar" />
<i-icon icon="check" />
<i-icon icon="delete" />
<i-icon icon="edit" />
<i-icon icon="ellipsis" />
<i-icon icon="file-excel" />
<i-icon icon="file-pdf" />
<i-icon icon="hashtag" />
<i-icon icon="maximize" />
<i-icon icon="map-marker" />
<i-icon icon="save" />
<i-icon icon="signature" />
<i-icon icon="sync" />
<i-icon icon="tags" />
<i-icon icon="user" />
<i-icon icon="users" />
<i-icon icon="unlock" />
<i-icon icon="upload" />
<i-icon icon="view" />`;

  iconSizes = `<i-icon size="xs" icon="save" />
<i-icon size="sm" icon="save" />
<i-icon size="md" icon="save" />
<i-icon size="lg" icon="save" />
<i-icon size="xl" icon="save" />
<i-icon size="2xl" icon="save" />`;
}
