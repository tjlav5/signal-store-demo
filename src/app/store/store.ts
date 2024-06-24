import { patchState, signalStore, withMethods } from '@ngrx/signals';
import {
  addEntities,
  addEntity,
  removeEntity,
  withEntities,
} from '@ngrx/signals/entities';
import { EmojiEntry, EmojiService } from '../backend/slow-backend-service';
import { inject } from '@angular/core';
import {
  setError,
  setFulfilled,
  setPending,
  withLoadingState,
} from './with_loading_state';
import { withSelection } from './with_selection';

/**
 *
 */
export const EmojiStore = signalStore(
  // Provide the store globally
  { providedIn: 'root' },
  withEntities<EmojiEntry>(),
  withLoadingState(),
  withSelection(),
  withMethods((store, service = inject(EmojiService)) => ({
    async list(nextPageToken?: string) {
      patchState(store, setPending());

      try {
        const emojis = await service.list(nextPageToken);

        patchState(
          store,
          addEntities(emojis.data, { idKey: 'username' }),
          setFulfilled()
        );
      } catch (error) {
        patchState(store, setError('nah!'));
      }
    },
    async add(entity: EmojiEntry) {
      try {
        const emoji = await service.add(entity);
        patchState(store, addEntity(emoji, { idKey: 'username' }));
      } catch (error) {
        patchState(store, setError('nah!'));
      }
    },
    async delete(username: string) {
      try {
        await service.delete(username);
        patchState(store, removeEntity(username));
      } catch (error) {
        patchState(store, setError('nah!'));
      }
    },
  }))
);
