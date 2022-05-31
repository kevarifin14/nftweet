CREATE TABLE "public"."wallets" ("key" text NOT NULL, "userId" uuid NOT NULL, PRIMARY KEY ("key") , FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON UPDATE restrict ON DELETE restrict);
