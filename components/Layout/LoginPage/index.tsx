import { signIn } from "next-auth/react";

import { Button } from "components/Button";
import { Card } from "components/Card";
import { Container } from "components/Container";
import { Header } from "components/Header";

export function LoginPage() {
  return (
    <Container
      size="lg"
      className="flex justify-center items-center min-h-screen"
    >
      <Card className="w-full space-y-8" size="7xl">
        <Header centered vertical title="NFTweet" />

        <Button
          type="primary"
          block
          size="lg"
          onClick={() => signIn("twitter")}
        >
          Login with Twitter
        </Button>
      </Card>
    </Container>
  );
}
