import { Component, computed, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EmojiStore } from './store/store';

import { MediaMatcher } from '@angular/cdk/layout';
import { MatCard } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import {
  MatDrawer,
  MatDrawerContainer,
  MatDrawerContent
} from '@angular/material/sidenav';
import { EmojiDetailsComponent } from './emoji/details/details.component';
import { EmojiListComponent } from './emoji/list/list.component';
import {EmojiService} from './backend/slow-backend-service'
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    FormsModule,
    RouterOutlet,
    MatDrawer,
    MatDrawerContainer,
    MatDrawerContent,
    MatCard,
    MatDivider,
    EmojiListComponent,
    EmojiDetailsComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [EmojiStore],
})
export class AppComponent {
  private readonly store = inject(EmojiStore);
  protected readonly isMobile = signal(false);
  protected readonly backend = inject(EmojiService)

  constructor() {    
    const mobileQuery = inject(MediaMatcher).matchMedia('(max-width: 600px)');
    this.isMobile.set(mobileQuery.matches);
    mobileQuery.addEventListener('change', () => {
      this.isMobile.set(mobileQuery.matches);
    });
  }
  // protected readonly mobileQuery = this.media.matchMedia('(max-width: 300px)');

  protected readonly isSelected = computed(() => {
    return this.store.selectedEntity();
  });
}
