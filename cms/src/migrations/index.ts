import * as migration_20260702_020638_initial from './20260702_020638_initial';
import * as migration_20260702_024418_add_escape_hatch_blocks from './20260702_024418_add_escape_hatch_blocks';
import * as migration_20260702_025623_add_configurator_block from './20260702_025623_add_configurator_block';
import * as migration_20260702_051302_add_checklist_hero_size from './20260702_051302_add_checklist_hero_size';
import * as migration_20260702_052949_audit_parity_fixes from './20260702_052949_audit_parity_fixes';
import * as migration_20260702_203236_add_newsletter_block from './20260702_203236_add_newsletter_block';
import * as migration_20260703_010853_posts_devlog_upgrade from './20260703_010853_posts_devlog_upgrade';
import * as migration_20260703_031845_add_expressions from './20260703_031845_add_expressions';
import * as migration_20260703_052823_full_catalog_blocks from './20260703_052823_full_catalog_blocks';
import * as migration_20260705_180504_add_inquiries from './20260705_180504_add_inquiries';
import * as migration_20260707_190000_add_updates from './20260707_190000_add_updates';
import * as migration_20260707_193000_add_builds from './20260707_193000_add_builds';
import * as migration_20260707_210000_builds_gallery_status from './20260707_210000_builds_gallery_status';
import * as migration_20260709_155659_add_location_contact_blocks from './20260709_155659_add_location_contact_blocks';
import * as migration_20260709_184344_add_voice_sample_block from './20260709_184344_add_voice_sample_block';
import * as migration_20260709_230527_add_voice_demo_global from './20260709_230527_add_voice_demo_global';
import * as migration_20260710_031902_add_localization from './20260710_031902_add_localization';
import * as migration_20260710_043010_add_section_variability from './20260710_043010_add_section_variability';
import * as migration_20260710_190250_add_promise_contract_block from './20260710_190250_add_promise_contract_block';

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
    name: '20260702_051302_add_checklist_hero_size',
  },
  {
    up: migration_20260702_052949_audit_parity_fixes.up,
    down: migration_20260702_052949_audit_parity_fixes.down,
    name: '20260702_052949_audit_parity_fixes',
  },
  {
    up: migration_20260702_203236_add_newsletter_block.up,
    down: migration_20260702_203236_add_newsletter_block.down,
    name: '20260702_203236_add_newsletter_block',
  },
  {
    up: migration_20260703_010853_posts_devlog_upgrade.up,
    down: migration_20260703_010853_posts_devlog_upgrade.down,
    name: '20260703_010853_posts_devlog_upgrade',
  },
  {
    up: migration_20260703_031845_add_expressions.up,
    down: migration_20260703_031845_add_expressions.down,
    name: '20260703_031845_add_expressions',
  },
  {
    up: migration_20260703_052823_full_catalog_blocks.up,
    down: migration_20260703_052823_full_catalog_blocks.down,
    name: '20260703_052823_full_catalog_blocks',
  },
  {
    up: migration_20260705_180504_add_inquiries.up,
    down: migration_20260705_180504_add_inquiries.down,
    name: '20260705_180504_add_inquiries',
  },
  {
    up: migration_20260707_190000_add_updates.up,
    down: migration_20260707_190000_add_updates.down,
    name: '20260707_190000_add_updates',
  },
  {
    up: migration_20260707_193000_add_builds.up,
    down: migration_20260707_193000_add_builds.down,
    name: '20260707_193000_add_builds',
  },
  {
    up: migration_20260707_210000_builds_gallery_status.up,
    down: migration_20260707_210000_builds_gallery_status.down,
    name: '20260707_210000_builds_gallery_status',
  },
  {
    up: migration_20260709_155659_add_location_contact_blocks.up,
    down: migration_20260709_155659_add_location_contact_blocks.down,
    name: '20260709_155659_add_location_contact_blocks',
  },
  {
    up: migration_20260709_184344_add_voice_sample_block.up,
    down: migration_20260709_184344_add_voice_sample_block.down,
    name: '20260709_184344_add_voice_sample_block',
  },
  {
    up: migration_20260709_230527_add_voice_demo_global.up,
    down: migration_20260709_230527_add_voice_demo_global.down,
    name: '20260709_230527_add_voice_demo_global',
  },
  {
    up: migration_20260710_031902_add_localization.up,
    down: migration_20260710_031902_add_localization.down,
    name: '20260710_031902_add_localization',
  },
  {
    up: migration_20260710_043010_add_section_variability.up,
    down: migration_20260710_043010_add_section_variability.down,
    name: '20260710_043010_add_section_variability',
  },
  {
    up: migration_20260710_190250_add_promise_contract_block.up,
    down: migration_20260710_190250_add_promise_contract_block.down,
    name: '20260710_190250_add_promise_contract_block'
  },
];
