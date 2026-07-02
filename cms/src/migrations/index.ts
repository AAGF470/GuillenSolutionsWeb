import * as migration_20260702_020638_initial from './20260702_020638_initial';
import * as migration_20260702_024418_add_escape_hatch_blocks from './20260702_024418_add_escape_hatch_blocks';

export const migrations = [
  {
    up: migration_20260702_020638_initial.up,
    down: migration_20260702_020638_initial.down,
    name: '20260702_020638_initial',
  },
  {
    up: migration_20260702_024418_add_escape_hatch_blocks.up,
    down: migration_20260702_024418_add_escape_hatch_blocks.down,
    name: '20260702_024418_add_escape_hatch_blocks'
  },
];
