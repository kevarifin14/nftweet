/* @ts-ignore */
import MixpanelPlugin from "@analytics/mixpanel";
import Analytics from "analytics";

const events = {
  faq: "faq",
  subscribed: "subscribed",
};

// https://github.com/DavidWells/analytics/issues/220
export const analytics = Analytics({
  plugins: [MixpanelPlugin({ token: process.env.NEXT_PUBLIC_MIXPANEL_TOKEN })],
});

export const trackFaqQuestion = (question: string) => {
  analytics.track(events.faq, { question });
};

export const trackSubscribed = (email: string) => {
  analytics.track(events.subscribed, { email });
};
