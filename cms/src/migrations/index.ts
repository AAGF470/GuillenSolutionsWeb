import * as migration_20260702_020638_initial from './20260702_020638_initial';

export const migrations = [
  {
    up: migration_20260702_020638_initial.up,
    down: migration_20260702_020638_initial.down,
    name: '20260702_020638_initial'
  },
];
