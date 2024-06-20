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
  ],
})
export class EmojiListComponent {
  protected readonly store = inject(EmojiStore);

  constructor() {
    this.store.loadList();
  }
}