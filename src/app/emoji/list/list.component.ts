import { Component, inject } from '@angular/core';
import { EmojiStore } from '../../store/store';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
} from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { MatListItem, MatNavList } from '@angular/material/list';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'emoji-list',
  templateUrl: 'list.component.html',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    MatNavList,
    MatListItem,
    MatCard,
    MatCardActions,
    MatCardContent,
    MatButton,
    MatProgressSpinner,
  ],
})
export class EmojiListComponent {
  protected readonly store = inject(EmojiStore);

  constructor() {
    this.store.list();
  }
}
