-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- Link to schema: https://app.quickdatabasediagrams.com/#/d/EvUCgb
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.


DROP DATABASE IF EXISTS roller_test;


CREATE DATABASE roller_test;

DROP TABLE IF EXISTS "users" CASCADE;
DROP TABLE IF EXISTS "rooms" CASCADE;
DROP TABLE IF EXISTS "user_room" CASCADE;
DROP TABLE IF EXISTS "character_room" CASCADE;
DROP TABLE IF EXISTS "characters" CASCADE;
DROP TABLE IF EXISTS "images" CASCADE;
DROP TABLE IF EXISTS "cards" CASCADE;

-- \c roller;

CREATE TABLE "users" (
    "id"  SERIAL  NOT NULL,
    "name" text   NOT NULL,
    "email" text   NOT NULL,
    "password" text   NOT NULL,
    "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "pk_users" PRIMARY KEY (
        "id"
     ),
    CONSTRAINT "uc_users_name" UNIQUE (
        "name"
    ),
    CONSTRAINT "uc_users_email" UNIQUE (
        "email"
    ),
    CONSTRAINT "uc_users_password" UNIQUE (
        "password"
    )
);



CREATE TABLE "rooms" (
    "id" SERIAL   NOT NULL,
    "name" text   NOT NULL,
    "created_by" int   NOT NULL,
    CONSTRAINT "pk_rooms" PRIMARY KEY (
        "id"
     )
);

CREATE TABLE "user_room" (
  "user_id" INT
 ,"room_id" INT
 ,CONSTRAINT user_room_pk PRIMARY KEY (user_id, room_id)
 ,CONSTRAINT FK_user
  FOREIGN KEY (user_id) REFERENCES users (id)
  ON DELETE CASCADE
 ,CONSTRAINT FK_category
  FOREIGN KEY (room_id) REFERENCES rooms (id) ON DELETE CASCADE
);


CREATE TABLE "characters" (
    "id" SERIAL UNIQUE  NOT NULL,
    "name" text,
    "class" text,
    "species" text,
    "created_by" int   NOT NULL,
    "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "conditions" text [] DEFAULT array[]::varchar[],
    "max_hp" int,
    "current_hp" int,
    "ac" int,
    "resistances" text [] DEFAULT array[]::varchar[],
    "strength" int,
    "dexterity" int,
    "constitution" int,
    "intelligence" int,
    "wisdom" int,
    "charisma" int,
    CONSTRAINT "pk_characters" PRIMARY KEY (
        "id","created_by"
     )
);

CREATE TABLE "character_room" (
  "character_id" INT
 ,"room_id" INT
 ,CONSTRAINT character_room_pk PRIMARY KEY (character_id, room_id)
 ,CONSTRAINT FK_character
  FOREIGN KEY (character_id) REFERENCES characters (id)
  ON DELETE CASCADE
 ,CONSTRAINT FK_category
  FOREIGN KEY (room_id) REFERENCES rooms (id) ON DELETE CASCADE
);

CREATE TABLE "images" (
    "id" SERIAL NOT NULL,
    "user_id" int NOT NULL,
    "character_sheet" bytea,
    "portrait" bytea,
    CONSTRAINT "pk_images" PRIMARY KEY (
        "id"
    )
);

CREATE TABLE "cards" (
    "id" SERIAL   NOT NULL,
    "name" TEXT, 
    "category" text   NOT NULL,
    "type" text   NULL,
    "properties" text   NULL,
    "description" text   NULL,
    "damage" text   NULL,
    "bonus" text   NULL,
    "character_id" int NULL, 
    CONSTRAINT "pk_cards" PRIMARY KEY (
        "id"
     )
);

ALTER TABLE "images" ADD CONSTRAINT "fk_images_user_id" FOREIGN KEY("user_id")
REFERENCES "users" ("id") ON DELETE CASCADE;

ALTER TABLE "rooms" ADD CONSTRAINT "fk_rooms_id" FOREIGN KEY("user_id")
REFERENCES "users" ("id");

ALTER TABLE "rooms" ADD CONSTRAINT "fk_rooms_gamemaster_id" FOREIGN KEY("gamemaster_id")
REFERENCES "users" ("id");

ALTER TABLE "characters" ADD CONSTRAINT "fk_characters_user_id" FOREIGN KEY("user_id")
REFERENCES "users" ("id") ON DELETE CASCADE;

ALTER TABLE "abilities" ADD CONSTRAINT "fk_abilities_id" FOREIGN KEY("id")
REFERENCES "characters" ("id");

