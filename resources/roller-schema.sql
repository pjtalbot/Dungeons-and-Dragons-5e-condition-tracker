-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- Link to schema: https://app.quickdatabasediagrams.com/#/d/EvUCgb
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.


CREATE TABLE "users" (
    "id"  SERIAL  NOT NULL,
    "name" text   NOT NULL,
    "email" text   NOT NULL,
    "password" text   NOT NULL,
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

CREATE TABLE user_room (
  user_id INT
 ,room_id INT
 ,CONSTRAINT user_room_pk PRIMARY KEY (user_id, room_id)
 ,CONSTRAINT FK_user
  FOREIGN KEY (user_id) REFERENCES users (id)
 ,CONSTRAINT FK_category
  FOREIGN KEY (room_id) REFERENCES rooms (id)
);


CREATE TABLE "characters" (
    "id" SERIAL   NOT NULL,
    "name" text,
    "class" text,
    "species" text,
    "created_by" int   NOT NULL,
    CONSTRAINT "pk_characters" PRIMARY KEY (
        "id","created_by"
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
REFERENCES "users" ("id") ON DELETE CASCADE;

ALTER TABLE "abilities" ADD CONSTRAINT "fk_abilities_id" FOREIGN KEY("id")
REFERENCES "characters" ("id");

