import { patchState, signalStore, withMethods } from "@ngrx/signals";
import { addEntities, addEntity, withEntities } from "@ngrx/signals/entities";
import { EmojiEntry, EmojiService } from "../backend/slow-backend-service";
import { withLoadingState } from "./with_loading_state";
import { withPagination } from "./with_pagination";
import { withSelection } from "./with_selection";
import { inject } from "@angular/core";

export const EmojiStore = signalStore(
  withEntities<EmojiEntry>(),
  withLoadingState(),
  withPagination(),
  withSelection(),
  withMethods((store, service = inject(EmojiService)) => ({
    loadList: () => {
      patchState(store, { requestStatus: 'pending' });
      service.list().then((r) => {
        patchState(store, addEntities(r, { idKey: 'username' }), { requestStatus: 'fulfilled' })
      }).catch(() => {
        patchState(store, { requestStatus: { error: 'nah!' } })
      })
    },
    addEmoji: (emoji: EmojiEntry) => {
      service.add(emoji);
      patchState(store, addEntity(emoji, { idKey: 'username' }));
    }
  })),
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