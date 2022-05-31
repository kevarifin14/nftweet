import chromium from "chrome-aws-lambda";
import { NextApiRequest, NextApiResponse } from "next";
import playwright from "playwright-core";

const generateImage = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const browser = await playwright.chromium.launch({
      args: chromium.args,
      executablePath:
        process.env.NODE_ENV !== "development"
          ? await chromium.executablePath
          : "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
      headless:
        process.env.NODE_ENV !== "development" ? chromium.headless : true,
    });

    const page = await browser.newPage();
    const tweetId = req.query.tweetId;

    await page.goto(
      `https://platform.twitter.com/embed/index.html?dnt=true&embedId=twitter-widget-0&frame=false&hideCard=falsen&hideThread=true&id=${tweetId}&theme=dark&widgetsVersion=ed20a2b%3A1601588405575`,
      { waitUntil: "networkidle" }
    );

    const embedDefaultWidth = 550;
    const percent = 1000 / embedDefaultWidth;
    const pageWidth = embedDefaultWidth * percent;
    const pageHeight = 100;
    await page.setViewportSize({ width: pageWidth, height: pageHeight });

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

    const data = await page.screenshot({
      type: "png",
      fullPage: true,
    });

    await browser.close();

    res.setHeader("Content-Type", "image/png");
    res.end(data);
  } catch (e) {
    res.status(400).json(e);
    console.log(e);
  }
};

export default generateImage;
