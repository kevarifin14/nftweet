import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

import { Button } from "components/Button";
import { Input } from "components/Input";
import { renderNotification } from "components/Notification";

import { classNames } from "lib/tailwind";

type TwitterLinkFormProps = {
  className?: string;
};

type TwitterLinkFormFields = {
  twitterLink: string;
};

export function TwitterLinkForm({ className }: TwitterLinkFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TwitterLinkFormFields>();
  const router = useRouter();

  const twitterLinkFormClassName = classNames(
    "flex space-y-2 sm:space-y-0 sm:space-x-4 sm:flex-row flex-col items-start",
    className
  );

  const handleFormSubmit = async ({ twitterLink }: TwitterLinkFormFields) => {
    const groups = twitterLink.match(
      /^http(s)?:\/\/twitter\.com\/(?:#!\/)?(\w+)\/status(es)?\/(\d+)(.*)$/
    );
    if (!groups) {
      renderNotification({
        title: "There was a problem generating your mint link",
      });
    } else {
      router.push(`?tweetId=${groups[4]}`);
    }
  };

  return (
    <form
      className={twitterLinkFormClassName}
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <Input
        size="xl"
        placeholder="https://twitter.com/MakeNFTweet/status/1531476919580905478"
        {...register("twitterLink", {
          required: true,
          pattern: {
            value:
              /^http(s)?:\/\/twitter\.com\/(?:#!\/)?(\w+)\/status(es)?\/(\d+)(.*)$/,
            message: "Hmm... this doesn't look like a Twitter link",
          },
        })}
        error={errors.twitterLink}
        className="flex-1"
      />
      <Button
        type="primary"
        htmlType="submit"
        size="xl"
        className="flex-shrink-0 w-full sm:w-fit"
      >
        Mint Tweet
      </Button>
    </form>
  );
}
