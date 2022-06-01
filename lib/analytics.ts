/* @ts-ignore */
import MixpanelPlugin from "@analytics/mixpanel";
import Analytics from "analytics";
import { Users } from "generated";

const events = {
  makeAnOfferInterest: "makeAnOfferInterest",
};

export const IS_PRODUCTION = process.env.NODE_ENV === "production";

// https://github.com/DavidWells/analytics/issues/220
export const analytics = Analytics({
  plugins: [
    MixpanelPlugin({
      token: process.env.NEXT_PUBLIC_MIXPANEL_TOKEN,
    }),
  ],
});

export const trackMakeAnOfferInterest = () => {
  trackEvent(events.makeAnOfferInterest);
};

export const trackEvent = (event: string) => {
  if (IS_PRODUCTION) {
    analytics.track(event);
  }
};

export const identify = (user: Users) => {
  if (IS_PRODUCTION) {
    analytics.identify(user.id, { name: user.name });
  }
};
