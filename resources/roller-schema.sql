-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- Link to schema: https://app.quickdatabasediagrams.com/#/d/EvUCgb
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.


CREATE TABLE "users" (
    "id"  SERIAL  NOT NULL,
    "username" text   NOT NULL,
    "email" email   NOT NULL,
    "password" text   NOT NULL,
    CONSTRAINT "pk_users" PRIMARY KEY (
        "id"
     ),
    CONSTRAINT "uc_users_username" UNIQUE (
        "username"
    ),
    CONSTRAINT "uc_users_email" UNIQUE (
        "email"
    ),
    CONSTRAINT "uc_users_password" UNIQUE (
        "password"
    )
);

CREATE TABLE "rooms" (
    "id" int   NOT NULL,
    "name" text   NOT NULL,
    "gamemaster_id" int   NOT NULL,
    CONSTRAINT "pk_rooms" PRIMARY KEY (
        "id"
     )
);

CREATE TABLE "characters" (
    "id" int   NOT NULL,
    "user_id" int   NOT NULL,
    "stats" json   NOT NULL,
    CONSTRAINT "pk_characters" PRIMARY KEY (
        "id","user_id"
     )
);

CREATE TABLE "abilities" (
    "id" int   NOT NULL,
    "type" text   NULL,
    "description" text   NULL,
    "damage" json   NULL,
    "effects" json   NULL,
    CONSTRAINT "pk_abilities" PRIMARY KEY (
        "id"
     )
);

ALTER TABLE "rooms" ADD CONSTRAINT "fk_rooms_id" FOREIGN KEY("id")
REFERENCES "users" ("id");

ALTER TABLE "rooms" ADD CONSTRAINT "fk_rooms_gamemaster_id" FOREIGN KEY("gamemaster_id")
REFERENCES "users" ("id");

ALTER TABLE "characters" ADD CONSTRAINT "fk_characters_user_id" FOREIGN KEY("user_id")
REFERENCES "users" ("id");

ALTER TABLE "abilities" ADD CONSTRAINT "fk_abilities_id" FOREIGN KEY("id")
REFERENCES "characters" ("id");

