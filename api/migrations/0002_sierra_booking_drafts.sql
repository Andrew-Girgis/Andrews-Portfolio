CREATE TABLE IF NOT EXISTS booking_drafts (
  id TEXT PRIMARY KEY,
  session_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN (
    'selecting_slot',
    'selected',
    'submitting',
    'confirmed',
    'failed',
    'unknown',
    'expired',
    'cancelled'
  )),
  duration_minutes INTEGER NOT NULL CHECK (duration_minutes IN (15, 30)),
  time_zone TEXT NOT NULL,
  availability_constraints TEXT NOT NULL DEFAULT '{}',
  offered_slots TEXT NOT NULL DEFAULT '[]',
  selected_start TEXT,
  selected_end TEXT,
  idempotency_key TEXT UNIQUE,
  cal_booking_uid TEXT,
  last_error_code TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  expires_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_booking_drafts_owner
ON booking_drafts (session_id, user_id, created_at);

CREATE INDEX IF NOT EXISTS idx_booking_drafts_expiry
ON booking_drafts (expires_at, status);
