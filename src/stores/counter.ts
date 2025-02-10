import { create } from "zustand";

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
}

/**
 * A hook that returns the counter state and its methods.
 */
const useCounterStore = create<CounterState>((set) => ({
  /**
   * The initial count.
   */
  count: 0,
  /**
   * The initial echo state.
   */
  echo: false,
  /**
   * Increment the count by the given amount.
   * @param amount The amount to increment by. Defaults to 1.
   */
  increment: (amount = 1) => {
    set((state) => {
      const newCount = state.count + amount;
      if (state.echo) {
        console.log(`Incremented by ${amount} to ${newCount}`);
      }
      return { count: newCount };
    });
  },
  /**
   * Decrement the count by the given amount.
   * @param amount The amount to decrement by. Defaults to 1.
   */
  decrement: (amount = 1) => {
    set((state) => {
      const newCount = Math.max(0, state.count - amount);
      if (state.echo) {
        console.log(`Decremented by ${amount} to ${newCount}`);
      }
      return { count: newCount };
    });
  },
  /**
   * Set the count to the given value.
   * @param count The new count.
   */
  setCount: (count) => {
    set((state) => {
      if (state.echo) {
        console.log(`Set to ${count}`);
      }
      return { count };
    });
  },
  /**
   * Reset the count to 0.
   */
  reset: () => {
    set((state) => {
      if (state.echo) {
        console.log("Reset to 0");
      }
      return { count: 0 };
    });
  },
  /**
   * Toggle whether or not to echo the actions to the console.
   */
  toggleEcho: () => set((state) => ({ echo: !state.echo })),
}));

export default useCounterStore;

