import chromium from "chrome-aws-lambda";
import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import puppeteer from "puppeteer-core";

const handler = nextConnect<NextApiRequest, NextApiResponse>();

handler.get(async (req, res, next) => {
  try {
    const browser =
      process.env.NODE_ENV === "development"
        ? await puppeteer.launch({
            headless: true,
            args: ["--no-sandbox", "--disable-setuid-sandbox"],
          })
        : await chromium.puppeteer.launch({
            args: [
              ...chromium.args,
              "--hide-scrollbars",
              "--disable-web-security",
            ],
            defaultViewport: chromium.defaultViewport,
            executablePath: await chromium.executablePath,
            headless: true,
            ignoreHTTPSErrors: true,
          });
    const page = await browser.newPage();
    const tweetId = req.query.tweetId;

    await page.goto(
      `https://platform.twitter.com/embed/index.html?dnt=true&embedId=twitter-widget-0&frame=false&hideCard=falsen&hideThread=true&id=${tweetId}&theme=dark&widgetsVersion=ed20a2b%3A1601588405575`,
      { waitUntil: "networkidle0" }
    );

    const embedDefaultWidth = 550;
    const percent = 1000 / embedDefaultWidth;
    const pageWidth = embedDefaultWidth * percent;
    const pageHeight = 100;
    await page.setViewport({ width: pageWidth, height: pageHeight });

    await page.evaluate(
      (props) => {
        const { percent } = props;

        const style = document.createElement("style");
        style.innerHTML =
          "* { font-family: -apple-system, BlinkMacSystemFont, Ubuntu, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol' !important; }";
        document.getElementsByTagName("head")[0].appendChild(style);

        const body = document.querySelector("body");
        body.style.padding = `25px`;
        body.style.backgroundColor = "#000";
        body.style.zoom = `${100 * percent}%`;
        const articleWrapper = document.querySelector("#app > div");
        articleWrapper.style.border = "none";
      },
      { percent }
    );

    const imageBuffer = await page.screenshot({
      type: "png",
      fullPage: true,
      encoding: "base64",
    });

    await browser.close();

    res.status(200).json({ test: imageBuffer });
  } catch (e) {
    res.status(400).json(e);
    console.log(e);
  }
  return next;
});

export default handler;
