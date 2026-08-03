CREATE TABLE IF NOT EXISTS ai_usage_daily (
  usage_date TEXT NOT NULL,
  operation TEXT NOT NULL,
  request_count INTEGER NOT NULL DEFAULT 0,
  updated_at TEXT NOT NULL,
  PRIMARY KEY (usage_date, operation)
);
