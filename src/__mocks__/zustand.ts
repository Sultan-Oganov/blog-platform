import { StateCreator, StoreApi } from "zustand";
import { createStore } from "zustand/vanilla";

const storeResetFns = new Set<() => void>();

export function createMock<T extends object>(
  stateCreator: StateCreator<T, [], []>
): StoreApi<T> {
  const store = createStore<T>(stateCreator);
  const initialState = store.getState();

  storeResetFns.add(() => store.setState(initialState, true));

  return {
    ...store,
    subscribe: store.subscribe,
  };
}

jest.mock("zustand", () => ({
  __esModule: true,
  create: <T extends object>(stateCreator: StateCreator<T, [], []>) =>
    createMock(stateCreator),
}));

afterEach(() => {
  storeResetFns.forEach((resetFn) => resetFn());
});
