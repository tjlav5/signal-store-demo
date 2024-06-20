import { computed } from '@angular/core';
import { signalStoreFeature, withComputed, withMethods, withState } from '@ngrx/signals';
import { withLoadingState } from './with_loading_state';

export type PaginationState = { nextPageToken: string };

export function withPagination() {
  return signalStoreFeature(
    withLoadingState(),
    withState<PaginationState>({ nextPageToken: '' }),
    withComputed(({ nextPageToken }) => ({
      hasNextPage: computed(() => !!nextPageToken),
    })),
    withMethods(() => ({
      loadNextPage: () => {},
    })),
  );
}