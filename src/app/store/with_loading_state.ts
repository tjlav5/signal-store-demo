import { computed } from '@angular/core';
import {
  PartialStateUpdater,
  signalStoreFeature,
  withComputed,
  withState,
} from '@ngrx/signals';

export type RequestStatus =
  | 'idle'
  | 'pending'
  | 'fulfilled'
  | { error: string };
export type RequestStatusState = { requestStatus: RequestStatus };

export function withLoadingState() {
  return signalStoreFeature(
    withState<RequestStatusState>({ requestStatus: 'idle' }),
    withComputed(({ requestStatus }) => ({
      isPending: computed(() => requestStatus() === 'pending'),
      isFulfilled: computed(() => requestStatus() === 'fulfilled'),
      error: computed(() => {
        const status = requestStatus();
        return typeof status === 'object' ? status.error : null;
      }),
    }))
  );
}

export function setPending(): PartialStateUpdater<RequestStatusState> {
  return () => ({ requestStatus: 'pending' });
}

export function setFulfilled(): PartialStateUpdater<RequestStatusState> {
  return () => ({ requestStatus: 'fulfilled' });
}

export function setError(
  error: string
): PartialStateUpdater<RequestStatusState> {
  return () => ({ requestStatus: { error } });
}
