-- Add category column to posts for per-post classification
ALTER TABLE posts ADD COLUMN IF NOT EXISTS category text;

-- Index for fast category search
CREATE INDEX IF NOT EXISTS posts_category_idx ON posts(category) WHERE deleted_at IS NULL;
