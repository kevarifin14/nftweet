CREATE TABLE "public"."mentions" ("tweetId" text NOT NULL, "createdAt" Timestamp NOT NULL DEFAULT now(), "updatedAt" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY ("tweetId") );
CREATE OR REPLACE FUNCTION "public"."set_current_timestamp_updatedAt"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updatedAt" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_public_mentions_updatedAt"
BEFORE UPDATE ON "public"."mentions"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updatedAt"();
COMMENT ON TRIGGER "set_public_mentions_updatedAt" ON "public"."mentions" 
IS 'trigger to set value of column "updatedAt" to current timestamp on row update';
