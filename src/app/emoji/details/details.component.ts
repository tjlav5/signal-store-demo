import { Component, inject, model } from '@angular/core';
import { EmojiStore } from '../../store/store';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { map } from 'rxjs';
import { FormsModule } from '@angular/forms';

import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardTitle,
} from '@angular/material/card';

@Component({
  selector: 'emoji-details',
  templateUrl: 'details.component.html',
  styleUrl: 'details.component.css',
  standalone: true,
  imports: [FormsModule, MatCard, MatCardHeader, MatCardTitle, MatCardContent],
})
export class EmojiDetailsComponent {
  protected readonly store = inject(EmojiStore);
  protected readonly username = model('');
  protected readonly emoji = model('');

  constructor() {
    const route = inject(ActivatedRoute);

    this.store.selectEntity(route.params.pipe(map((p) => p['username'])));
  }

  addUser() {
    this.store.add({
      username: this.username(),
      emoji: this.emoji(),
    });
  }
}
