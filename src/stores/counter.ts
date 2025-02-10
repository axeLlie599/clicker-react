import { create } from "zustand";

const InitialState = {
  count: 0,
  echo: false,
  writeToLS: true,
};

const LOCAL_STORAGE_KEY = "counterState";

function loadStateFromLocalStorage(): Partial<CounterState> {
  const storedState = localStorage.getItem(LOCAL_STORAGE_KEY);
  return storedState ? JSON.parse(storedState) : {};
}

function saveStateToLocalStorage(state: CounterState) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
}

/**
 * The state of the counter.
 */
interface CounterState {
  /**
   * The current count.
   */
  count: number;
  /**
   * Whether or not to echo the actions to the console.
   */
  echo: boolean;
  /**
   * Whether or not to write the state to local storage.
   */
  writeToLS: boolean;
  /**
   * Increment the count by the given amount.
   * @param amount The amount to increment by. Defaults to 1.
   */
  increment: (amount?: number) => void;
  /**
   * Decrement the count by the given amount.
   * @param amount The amount to decrement by. Defaults to 1.
   */
  decrement: (amount?: number) => void;
  /**
   * Set the count to the given value.
   * @param count The new count.
   */
  setCount: (count: number) => void;
  /**
   * Reset the count to 0.
   */
  reset: () => void;
  /**
   * Toggle whether or not to echo the actions to the console.
   */
  toggleEcho: () => void;
  /**
   * Toggle whether or not to save the state to local storage.
   */
  toggleWriteToLS: () => void;
  /**
   * Wipe state to its initial values.
   */
  wipe: () => void;

  /**
   * Clean up local storage.
   *
   */
  cleanUpLocalStorage: () => void;
}

/**
 * A hook that returns the counter state and its methods.
 */
const useCounterStore = create<CounterState>((set) => {
  const loadedState = loadStateFromLocalStorage();

  const updateState = (
    updateFn: (state: CounterState) => Partial<CounterState>
  ) => {
    set((state) => {
      const newState = updateFn(state);
      if (state.writeToLS) {
        saveStateToLocalStorage({ ...state, ...newState });
      }
      return newState;
    });
  };

  return {
    count: loadedState.count ?? InitialState.count,
    echo: loadedState.echo ?? InitialState.echo,
    writeToLS: loadedState.writeToLS ?? InitialState.writeToLS,
    increment: (amount = 1) => {
      updateState((state) => {
        const newCount = state.count + amount;
        if (state.echo) {
          console.log(`Incremented by ${amount} to ${newCount}`);
        }
        return { count: newCount };
      });
    },
    decrement: (amount = 1) => {
      updateState((state) => {
        const newCount = Math.max(0, state.count - amount);
        if (state.echo) {
          console.log(`Decremented by ${amount} to ${newCount}`);
        }
        return { count: newCount };
      });
    },
    setCount: (count) => {
      updateState((state) => {
        if (state.echo) {
          console.log(`Set to ${count}`);
        }
        return { count };
      });
    },
    reset: () => {
      updateState((state) => {
        if (state.echo) {
          console.log("Reset to 0");
        }
        return { count: 0 };
      });
    },
    toggleEcho: () => updateState((state) => ({ echo: !state.echo })),
    toggleWriteToLS: () =>
      updateState((state) => ({ writeToLS: !state.writeToLS })),
    wipe: () => updateState(() => InitialState),
    cleanUpLocalStorage: () => {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    },
  };
});

export default useCounterStore;

export type { CounterState };

export { InitialState as DefaultCounterState };