import { types } from 'mobx-state-tree';
import { CounterSchema } from '../types/counter';

const Counter = types.model('Counter', {
  id: types.identifier,
  _type: types.array(types.string),
  installation_date: types.string,
  is_automatic: types.maybeNull(types.boolean),
  initial_values: types.array(types.number),
  area: types.string,
  description: types.string,
});

export const CountersStore = types
  .model('CountersStore', {
    count: types.number,
    counters: types.optional(types.array(Counter), []),
  })
  .actions((self) => ({
    setCounters(counters: CounterSchema) {
      self.count = counters.count;

      self.counters.replace(
        counters.results.map((result) => {
          if (!result || typeof result !== 'object') {
            throw new Error('Result should be a non-null object');
          }
          return Counter.create(result);
        })
      );
    },
  }));
