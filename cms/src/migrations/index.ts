import * as migration_20260702_020638_initial from './20260702_020638_initial';
import * as migration_20260702_024418_add_escape_hatch_blocks from './20260702_024418_add_escape_hatch_blocks';
import * as migration_20260702_025623_add_configurator_block from './20260702_025623_add_configurator_block';
import * as migration_20260702_051302_add_checklist_hero_size from './20260702_051302_add_checklist_hero_size';

export const migrations = [
  {
    up: migration_20260702_020638_initial.up,
    down: migration_20260702_020638_initial.down,
    name: '20260702_020638_initial',
  },
  {
    up: migration_20260702_024418_add_escape_hatch_blocks.up,
    down: migration_20260702_024418_add_escape_hatch_blocks.down,
    name: '20260702_024418_add_escape_hatch_blocks',
  },
  {
    up: migration_20260702_025623_add_configurator_block.up,
    down: migration_20260702_025623_add_configurator_block.down,
    name: '20260702_025623_add_configurator_block',
  },
  {
    up: migration_20260702_051302_add_checklist_hero_size.up,
    down: migration_20260702_051302_add_checklist_hero_size.down,
    name: '20260702_051302_add_checklist_hero_size'
  },
];
