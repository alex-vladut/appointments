ALTER TABLE appointment ADD COLUMN dtype VARCHAR (100) NOT NULL;
ALTER TABLE appointment DROP COLUMN status;