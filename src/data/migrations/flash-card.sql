-- DDL generated by Postico 2.0
-- Not all database features are supported. Do not use for backup.

-- Table Definition ----------------------------------------------

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