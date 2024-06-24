


import {
  patchState,
  signalStore,
  withMethods,
  signalStoreFeature,
} from '@ngrx/signals';
import { addEntities, addEntity, removeEntities, removeEntity, withEntities } from '@ngrx/signals/entities';
import { EmojiEntry, EmojiService } from '../backend/slow-backend-service';
import { withLoadingState } from './with_loading_state';
import { withPagination } from './with_pagination';
import { withSelection } from './with_selection';
import { inject } from '@angular/core';

export interface EntityThingy<T> {
  list: (nextPageToken?: string) => Promise<{ data: T[] }>;
  add: (entry: T) => Promise<T>;
  delete: (entryId: string) => Promise<void>;
}

export function withEntityThingy(thingy: EntityThingy<EmojiEntry>) {
  return signalStoreFeature(
    withEntities<EmojiEntry>(),
    withLoadingState(),
    withMethods((store, service = inject(EmojiService)) => ({
      list: async (token?: string) => {    
        startLoading(token? 'local': 'gloabl');
        patchState(store, { requestStatus: 'pending' });
        try {
          const emojis = await thingy.list(token);
          patchState(store, addEntities(emojis.data, { idKey: 'username' }), {
            requestStatus: 'fulfilled',
          });
        } catch {
          patchState(store, { requestStatus: { error: 'nah!' } });
        }
      },
      add: async (entity: EmojiEntry) => {
        patchState(store, { requestStatus: 'pending' });
        patchState(store, addEntities([entity], { idKey: 'username' }));
        startLoading('local');
        try {
          await service.add(entity);
          patchState(store, {
            requestStatus: 'fulfilled',
          });
        } catch {
          patchState(store, removeEntity(entity.username));
          patchState(store, {
            requestStatus: 'fulfilled',
          });
        }
      }, 
      remove: async (entity: EmojiEntry) => {
        startLoading('local');
        patchState(store, { requestStatus: 'pending' });
        try {
          await service.add(entity);
          patchState(store, {
            requestStatus: 'fulfilled',
          });
        } catch {
          patchState(store, { requestStatus: { error: 'nah!' } });
        }
      },
    }))
  );
}

export const EmojiStore = signalStore(
  withEntities<EmojiEntry>(),
  withEntityThingy({
    list(nextPageToken?: string) {
      const service = inject(EmojiService);
      return service.list(nextPageToken);
    },
    add(entity: EmojiEntry) {
      const service = inject(EmojiService);
      return service.add(entity);
    },
    delete(entity: string) {
      const service = inject(EmojiService);
      return service.delete(entity);
    },
  }),
  withLoadingState(),
  withPagination(),
  withSelection()
);

export const EmojiStoreOld = signalStore(
  withEntities<EmojiEntry>(),
  withLoadingState(),
  withPagination(),
  withSelection(), 
);

/** 
 * 
 * export const EmojiStore = signalStore(
  // Provide the store globally
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, emojiService = inject(EmojiService)) => ({
    async loadEmojis(): Promise<void> {
      patchState(store, { isLoading: true, error: null });

      try {
        const emojis = await emojiService.list();
        patchState(store, { emojis, isLoading: false });
      } catch (error) {
        patchState(store, { isLoading: false, error });
      }
    },
    async addEmoji(entry: EmojiEntry): Promise<void> {
      patchState(store, { isLoading: true, error: null });

      try {
        await emojiService.add(entry);
        const emojis = await emojiService.list();
        patchState(store, { emojis, isLoading: false });
      } catch (error) {
        patchState(store, { isLoading: false, error });
      }
    },
    async deleteEmoji(entry: EmojiEntry): Promise<void> {
      patchState(store, { isLoading: true, error: null });

      try {
        await emojiService.delete(entry);
        const emojis = await emojiService.list();
        patchState(store, { emojis, isLoading: false });
      } catch (error) {
        patchState(store, { isLoading: false, error });
      }
    }
  }))
);

 */
