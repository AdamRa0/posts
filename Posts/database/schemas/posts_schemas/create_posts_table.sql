CREATE TABLE IF NOT EXISTS posts (
    id UUID PRIMARY KEY NOT NULL,
    author_id UUID NOT NULL,
    FOREIGN KEY (author_id) REFERENCES users(id),
    body TEXT NOT NULL,
    approvals INT DEFAULT 0,
    disapprovals INT DEFAULT 0,
    reposts INT DEFAULT 0,
    comments TEXT,
    time_created TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);