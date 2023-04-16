CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY NOT NULL,
    email_address TEXT UNIQUE NOT NULL,
    username TEXT NOT NULL,
    handle TEXT UNIQUE NOT NULL,
    password TEXT UNIQUE NOT NULL,
    bio TEXT,
    followers INT DEFAULT 0,
    following INT DEFAULT 0,
    img_url TEXT,
    banner_img_url TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    date_created DATE DEFAULT CURRENT_DATE
);