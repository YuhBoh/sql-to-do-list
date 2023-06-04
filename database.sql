CREATE TABLE "toDoList" (
  "id" SERIAL PRIMARY KEY,
  "tasks" VARCHAR (200),
  "completion" BOOLEAN NOT NULL
);

INSERT INTO "toDoList"
( "tasks", "completion" )
VALUES
( 'Appease thy lordship with offerings', FALSE);