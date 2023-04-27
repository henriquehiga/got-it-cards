CREATE TABLE gotitcards.categories (
    id text PRIMARY KEY,
    name text,
    description text,
    user_id text
);

-- Indices -------------------------------------------------------

CREATE UNIQUE INDEX categories_pkey ON gotitcards.categories(id text_ops)

CREATE TABLE gotitcards.error_log (
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    error_message text NOT NULL,
    error_date date NOT NULL DEFAULT CURRENT_DATE
);

-- Indices -------------------------------------------------------

CREATE UNIQUE INDEX error_log_pkey ON gotitcards.error_log(id int4_ops);

CREATE TABLE gotitcards.flash_cards (
    id text PRIMARY KEY,
    user_id text,
    question text,
    awnser text,
    category text,
    dificulty integer,
    type text,
    created_at text,
    updated_at text,
    last_review text
);

-- Indices -------------------------------------------------------

CREATE UNIQUE INDEX flash_cards_pkey ON gotitcards.flash_cards(id text_ops);

CREATE TABLE gotitcards.users (
    email text PRIMARY KEY,
    name text,
    password text,
    last_login text
);

-- Indices -------------------------------------------------------

CREATE UNIQUE INDEX users_pkey ON gotitcards.users(email text_ops);
