CREATE TABLE "public"."scraps" ("id" serial NOT NULL, "title" text NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY ("id") );
