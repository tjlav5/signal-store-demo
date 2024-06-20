import { Routes } from '@angular/router';
import { EmojiDetailsComponent } from './emoji/details/details.component';
import { EmojiListComponent } from './emoji/list/list.component';

export const routes: Routes = [
  {
    path: ':username',
    component: EmojiDetailsComponent,
  },
  {
    path: '',
    component: EmojiDetailsComponent,
  },
];
