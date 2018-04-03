DROP TABLE IF EXISTS key_storage;

CREATE TABLE key_storage (
    name TEXT NOT NUll,
    address TEXT NOT NULL,
    pubkey TEXT NOT NULL,
    prikey TEXT NOT NULL
);