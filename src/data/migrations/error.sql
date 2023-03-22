-- DDL generated by Postico 2.0
-- Not all database features are supported. Do not use for backup.

-- Table Definition ----------------------------------------------

CREATE TABLE gotitcards.error_log (
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    error_message text NOT NULL,
    error_date date NOT NULL DEFAULT CURRENT_DATE
);

-- Indices -------------------------------------------------------

CREATE UNIQUE INDEX error_log_pkey ON gotitcards.error_log(id int4_ops);
