const puppeteer = require("puppeteer");
const urlModule = require("url");
const fs = require("fs");
const axios = require("axios");
const url = require("url");

const URL_FILE_NAME = "urls.txt";
const CONTENT_FILE_NAME = "content.txt";

let CONCURRENCY = 5;

let TARGET_URL = "https://www.betimeful.com"; // Replace with your URL
const FILE_NAME = "scraped_urls.txt";

function extractDomainName(fullURL) {
  const hostname = new url.URL(fullURL).hostname;
  const parts = hostname.split(".").reverse();
  if (parts.length >= 2) {
    return parts[1];
  }
  return hostname;
}

async function fetchFavicon(url) {
  const browser = await puppeteer.launch({
    executablePath: "/usr/bin/google-chrome-stable",
  });
  const page = await browser.newPage();

  await page.goto(url, {
    waitUntil: "domcontentloaded",
  });

  const favicon = await page
    .$eval(
      'head > link[rel="icon"], head > link[rel="shortcut icon"]',
      (element) => element.href
    )
    .catch(() => {
      // If no favicon found, return a default message
      return "No favicon found!";
    });

  await browser.close();

  return favicon;
}
/////////////////////////////////////////////////////////////////////////////////////////

// Helper function to get the domain from a URL
function getDomain(url) {
  const parsedUrl = urlModule.parse(url);
  return parsedUrl.host;
}

// Helper function to determine if two URLs have the same domain
function isSameDomain(url1, url2) {
  return getDomain(url1) === getDomain(url2);
}

async function getLinksFromPage(url, browser) {
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle2" });

  const data = await page.evaluate(() => {
    const anchors = Array.from(document.querySelectorAll("a"));
    const links = anchors.map((a) => a.href);
    const textContent = document.body.innerText;
    return { links, textContent };
  });

  await page.close();

  return {
    links: [...new Set(data.links)].filter(
      (link) =>
        !link.startsWith("mailto:") &&
        !link.startsWith("javascript:") &&
        isSameDomain(link, TARGET_URL)
    ),
    textContent: data.textContent.trim(),
  };
}

// Helper function to process URLs in chunks
// async function processUrlsInParallel(urls, browser, concurrency) {
//   let index = 0;
//   let results = [];

//   while (index < urls.length) {
//     let promises = [];
//     for (let i = 0; i < concurrency && index < urls.length; i++) {
//       const url = urls[index];
//       promises.push(getLinksFromPage(url, browser));
//       index++;
//     }
//     const newLinksArray = await Promise.all(promises);
//     results = results.concat(...newLinksArray);
//   }

//   return results;
// }
async function processUrlsInParallel(urls, browser, concurrency) {
  let index = 0;
  let results = [];

  while (index < urls.length) {
    let promises = [];
    for (let i = 0; i < concurrency && index < urls.length; i++) {
      const currentUrl = urls[index];

      // Wrap the scraping process for the current URL in a promise
      const promise = (async () => {
        try {
          const pageData = await getLinksFromPage(currentUrl, browser);
          pageData.url = currentUrl; // Add the URL to the returned data
          return pageData;
        } catch (error) {
          console.error(`Error scraping ${currentUrl}:`, error.message);
          return { links: [], textContent: "" }; // Return empty data in case of an error
        }
      })();

      promises.push(promise);
      index++;
    }

    const newLinksDataArray = await Promise.all(promises);
    results = results.concat(newLinksDataArray);
  }

  return results;
}
async function getContentAndUrl(url, concurrency, url_level) {
  TARGET_URL = url; // Replace with your URL
  CONCURRENCY = concurrency;

  const browser = await puppeteer.launch({
    headless: true,
    executablePath: "/usr/bin/google-chrome-stable",
  });

  // Read existing URLs from the file into a set
  let existingURLs = new Set();
  if (fs.existsSync(URL_FILE_NAME)) {
    const fileContent = fs.readFileSync(URL_FILE_NAME, "utf-8");
    fileContent.split("\n").forEach((url) => existingURLs.add(url.trim()));
  }

  let currentLevelUrls = [TARGET_URL];
  let allURLs = new Set([TARGET_URL]);

  let allAccumulatedUrls = ""; // Initialize URL accumulator
  let allAccumulatedContents = ""; // Initialize content accumulator

  for (let level = 0; level < url_level; level++) {
    const nextLevelData = await processUrlsInParallel(
      currentLevelUrls,
      browser,
      CONCURRENCY
    );

    // Separate links and text content
    const nextLevelUrls = nextLevelData.flatMap((data) => data.links);
    const levelTextContents = nextLevelData
      .map((data) => `URL: ${data.url}\nContent:\n${data.textContent}\n`)
      .join("\n\n");

    // Append URLs and content to accumulators
    allAccumulatedUrls += nextLevelUrls.join("\n") + "\n";
    allAccumulatedContents += levelTextContents + "\n\n";

    // Filter URLs we've already processed or have encountered
    currentLevelUrls = [...new Set(nextLevelUrls)].filter(
      (url) => !allURLs.has(url)
    );
    currentLevelUrls.forEach((url) => allURLs.add(url));

    console.log(`Level ${level + 1} URLs:`, currentLevelUrls);
  }

  // After the loop, write accumulators to their respective files
  //   fs.writeFileSync(URL_FILE_NAME, allAccumulatedUrls);
  //   fs.writeFileSync(CONTENT_FILE_NAME, allAccumulatedContents);

  await browser.close();
  return { allAccumulatedUrls, allAccumulatedContents };
}

////////////////////////////////////////////////////////////////////////////
// Check Url
////////////////////////////////////////////////////////////////////////////

function cleanURL(inputURL) {
  let domain;
  try {
    const parsedURL = new URL(inputURL);
    domain = parsedURL.hostname;
  } catch (e) {
    domain = inputURL; // If URL constructor fails, assume input is already a domain
  }

  // Extract only the main domain and its extension (e.g., "domain.com" from "sub.domain.com")
  const domainParts = domain.split(".");
  const mainDomainWithExtension = domainParts.slice(-2).join(".");
  console.log("Cleaned Domain: ", mainDomainWithExtension);
  return mainDomainWithExtension;
}

async function checkURLAccessibility(url, browser) {
  const page = await browser.newPage();
  try {
    const response = await page.goto(url, {
      waitUntil: "domcontentloaded",
      timeout: 10000,
    });
    await page.close();
    return response.url();
  } catch (error) {
    await page.close();
    return null;
  }
}

async function determineURLFormat(inputURL) {
  const cleanDomain = cleanURL(inputURL);
  const combinations = [
    `http://${cleanDomain}`,
    `https://${cleanDomain}`,
    `http://www.${cleanDomain}`,
    `https://www.${cleanDomain}`,
  ];

  const browser = await puppeteer.launch({
    executablePath: "/usr/bin/google-chrome-stable",
  });
  const promises = combinations.map((url) =>
    checkURLAccessibility(url, browser)
  );
  const results = await Promise.allSettled(promises);
  await browser.close();

  const finalURLs = results
    .map((result) => (result.status === "fulfilled" ? result.value : null))
    .filter(Boolean);

  return finalURLs.length ? finalURLs[0] : null; // Return the URL or null if none found
}
////////////////////////////////////////////////////////////////////////////
// End Check Url
////////////////////////////////////////////////////////////////////////////
// // Invoke the function
// functionX().catch((error) => {
//   console.error("An error occurred in functionX:", error);
// });
module.exports = {
  extractDomainName,
  fetchFavicon,
  getContentAndUrl,
  determineURLFormat,
};
