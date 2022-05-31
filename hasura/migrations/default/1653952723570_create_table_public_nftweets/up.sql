CREATE TABLE "public"."nftweets" ("mintKey" text NOT NULL, "userId" uuid NOT NULL, "createdAt" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY ("mintKey") );
