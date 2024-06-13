import { CountersStore } from '@/entities/counters/model/slices/counterSlice';
import { Instance, types } from 'mobx-state-tree';
import { createContext, useContext } from 'react';

const RootModel = types.model({
  counter: CountersStore,
});

const initialState = RootModel.create({
  counter: {
    count: 0,
    counters: [],
  },
});

export const rootStore = initialState;

export type RootInstance = Instance<typeof RootModel>;
const RootStoreContext = createContext<null | RootInstance>(null);

export const Provider = RootStoreContext.Provider;

export function useMst() {
  const store = useContext(RootStoreContext);
  if (store === null) {
    throw new Error('Store cannot be null, please add a context provider');
  }
  return store;
}
