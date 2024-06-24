import { computed } from '@angular/core';
import {
  patchState,
  signalStoreFeature,
  type,
  withComputed,
  withMethods,
  withState,
  PartialStateUpdater,
} from '@ngrx/signals';
import { EntityId, EntityState } from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, tap } from 'rxjs';

export type SelectedState = { selectedEntityId: EntityId };

export function withSelection<Entity>() {
  return signalStoreFeature(
    { state: type<EntityState<Entity>>() },
    withState<SelectedState>({ selectedEntityId: '' }),
    withMethods((store) => ({
      selectEntity: rxMethod<EntityId>(
        pipe(
          tap((selectedEntityId) => {
            patchState(store, { selectedEntityId });
          })
        )
      ),
    })),
    withComputed(({ entityMap, selectedEntityId }) => ({
      selectedEntity: computed(() => {
        const selectedId = selectedEntityId();
        return selectedId ? entityMap()[selectedId] : null;
      }),
    }))
  );
}

export function setSelection(
  selectedEntityId: EntityId
): PartialStateUpdater<{ selectedEntityId: EntityId }> {
  return (state) => ({ selectedEntityId });
}
