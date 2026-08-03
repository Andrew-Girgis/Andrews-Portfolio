CREATE TABLE IF NOT EXISTS knowledge_documents (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  source TEXT NOT NULL,
  source_path TEXT,
  metadata TEXT NOT NULL DEFAULT '{}',
  content_hash TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_knowledge_documents_source
ON knowledge_documents (source, source_path);

CREATE INDEX IF NOT EXISTS idx_knowledge_documents_hash
ON knowledge_documents (content_hash);

ALTER TABLE document_chunks ADD COLUMN document_id TEXT;

CREATE INDEX IF NOT EXISTS idx_document_chunks_document_id
ON document_chunks (document_id);
