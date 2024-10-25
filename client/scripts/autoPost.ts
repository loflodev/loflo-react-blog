import { chromium, Page } from "playwright";
import * as dotenv from "dotenv";
import { promises as fs } from "fs";
import axios from "axios";
import https from 'https';
// import cron from "node-cron";

dotenv.config();

const DEV_TO_URL = "https://dev.to/";
const BACKEND_URL = process.env.BACKEND_URL;
const EMAIL = process.env.EMAIL;
const PASSWORD = process.env.PASSWORD;
const SCRAPED_URLS_FILE = "scraped_urls.json";

const MAX_ARTICLES_TO_SCRAPE = 5;

const axiosInstance = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,
});

interface Post {
  title: string;
  content: string;
  author: string | undefined;
  url: string;
}

async function loadScrapedUrls(): Promise<Set<string>> {
  try {
    const data = await fs.readFile(SCRAPED_URLS_FILE, "utf-8");
    return new Set(JSON.parse(data));
  } catch (error) {
    return new Set();
  }
}

async function saveScrapedUrls(urls: Set<string>): Promise<void> {
  await fs.writeFile(SCRAPED_URLS_FILE, JSON.stringify(Array.from(urls)));
}

const authenticate = async () => {
  try {
    const response = await axiosInstance.post("/auth/login", {
      email: EMAIL,
      password: PASSWORD,
    });

    const cookies = response.headers["set-cookie"];

    if (cookies) {
      const tokenCookie = cookies.find((cookie) =>
        cookie.startsWith("LOFLODEV-AUTH=")
      );
      if (tokenCookie) {
        const token = tokenCookie.split("=")[1].split(";")[0];
        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${token}`;
        return token;
      }
    }

    console.warn("No token found in cookies");
    return null;
  } catch (error) {
    console.error("Authentication error", error);
    return null;
  }
};

const createPost = async (post: Omit<Post, "url">) => {
  try {
    const response = await axiosInstance.post("/post", post);

    return response;
  } catch (error) {
    console.error(error);
  }
};

async function scrapeDevTo(
  page: Page,
  scrapedUrls: Set<string>
): Promise<Omit<Post, "url">[]> {
  await page.goto(DEV_TO_URL);

  const posts = await page.$$eval(
    "div.crayons-story",
    (articles, maxArticles) => {
      return articles
        .slice(0, maxArticles)
        .map((article) => {
          const titleElement = article.querySelector("h2.crayons-story__title");
          const linkElement = article.querySelector(
            "h2.crayons-story__title a"
          );

          return {
            title: titleElement?.textContent?.trim() ?? "",
            url: linkElement?.getAttribute("href") ?? "",
          };
        })
        .filter(
          (post): post is { title: string; url: string } => post !== null
        );
    },

    MAX_ARTICLES_TO_SCRAPE
  );

  const scrapedPosts: Omit<Post, "url">[] = [];

  for (const post of posts) {
    if (!scrapedUrls.has(post.url)) {
      await page.goto(`https://dev.to${post.url}`);
      const content = await page.evaluate(() => {
        const articleBody = document.querySelector(".crayons-article__body");

        if (!articleBody) return "";

        const paragraphs = articleBody.querySelectorAll("p");
        const firstSixParagraphs = Array.from(paragraphs).slice(0, 6);
        return firstSixParagraphs
          .map((p) => p?.textContent?.trim())
          .join("\n\n");
      });

      scrapedPosts.push({
        title: post.title,
        content: content,
        author: EMAIL,
      });
      scrapedUrls.add(post.url);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Rate limiting
    }
  }

  return scrapedPosts;
}

async function main() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  try {
    const token = await authenticate();
    const scrapedUrls = await loadScrapedUrls();
    const scrapedPosts = await scrapeDevTo(page, scrapedUrls);

    if (token) {
      for (const post of scrapedPosts) {
        await createPost({
          title: post.title,
          content: post.content,
          author: post.author,
        });
      }
    }

    await saveScrapedUrls(scrapedUrls);
  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    await browser.close();
  }
}

// // Run the script every day at midnight
// cron.schedule("0 0 * * *", () => {
//   console.log("Running daily scrape job");
//   main();
// });

// Run once immediately
main();
