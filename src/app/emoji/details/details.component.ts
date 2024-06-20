import { Component, inject } from '@angular/core';
import { EmojiStore } from '../../store/store';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { map } from 'rxjs';
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
  imports: [MatCard, MatCardHeader, MatCardTitle, MatCardContent],
})
export class EmojiDetailsComponent {
  protected readonly store = inject(EmojiStore);

  constructor() {
    const route = inject(ActivatedRoute);

    this.store.selectEntity(route.params.pipe(map((p) => p['username'])));
  }
}
