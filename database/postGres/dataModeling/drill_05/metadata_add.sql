
ALTER TABLE tasks
ADD COLUMN IF NOT EXISTS metadata JSONB;


UPDATE tasks
SET metadata = '{
  "priority": "high",
  "source": "migration"
}'::jsonb
WHERE id = 1;
