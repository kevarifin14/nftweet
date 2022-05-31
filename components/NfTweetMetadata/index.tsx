import { useTweet } from "hooks/useTweet";
import { generateTweetMetadata } from "lib";
import _ from "lodash";

import { Card } from "components/Card";
import { Header } from "components/Header";

type NfTweetMetadataProps = {
  className?: string;
  tweetId: string;
};

export function NfTweetMetadata({ tweetId }: NfTweetMetadataProps) {
  const { data } = useTweet(tweetId);

  const metadata = generateTweetMetadata(data!);

  return (
    <div className="space-y-8">
      <Header
        title={metadata.name}
        description={metadata.description}
        size="lg"
      />

      <div className="grid gap-4">
        {metadata.attributes.map((attribute) => (
          <Card key={attribute.trait_type} size="xl">
            <Header
              size="sm"
              title={_.startCase(attribute.trait_type)}
              description={attribute.value?.toString().slice(0, 32)}
            />
          </Card>
        ))}
      </div>
    </div>
  );
}
