import { Component, Signal, computed, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EmojiStore } from './store/store';
import { MatButton } from '@angular/material/button';
import {
  MatDrawer,
  MatDrawerContainer,
  MatDrawerContent,
  MatSidenav,
  MatSidenavContainer,
  MatSidenavContent,
} from '@angular/material/sidenav';
import { MatNavList } from '@angular/material/list';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatDivider } from '@angular/material/divider';
import { EmojiListComponent } from './emoji/list/list.component';
import { EmojiDetailsComponent } from './emoji/details/details.component';
import { MatCard } from '@angular/material/card';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
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
