CREATE TABLE IF NOT EXISTS verified_sessions (
  session_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  verified_until TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  PRIMARY KEY (session_id, user_id)
);

CREATE INDEX IF NOT EXISTS idx_verified_sessions_verified_until ON verified_sessions (verified_until);
