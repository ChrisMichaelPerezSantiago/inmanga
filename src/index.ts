import _ from "lodash";
import cheerio from "cheerio";
import { PromisePool } from "@supercharge/promise-pool";
import request from "./request";
import Utils from "./Utils";
import type {
  IChapter,
  IChapterContentProps,
  IChapterPages,
  IMostViewedMangas,
  IMostViewedMangasRoot,
} from "./interfaces";

const utils = new Utils();

const { load } = cheerio;

export const getChapterJSON = async (url: string): Promise<IChapter> => {
  // eslint-disable-next-line antfu/if-newline
  if (!url) throw new Error("Provide the id parameter");

  const id = url.substring(url.lastIndexOf("/") + 1);

  const buildURL = `https://inmanga.com/chapter/getall?${utils.buildQuery({
    mangaIdentification: id,
  })}`;

  const response = await request({
    method: "get",
    url: buildURL,
  });

  let json = JSON.parse(response.data);
  json = _.sortBy(json.result, ["FriendlyChapterNumber"]);

  return json;
};

export const getChapterPages = async ({
  mangaName,
  FriendlyChapterNumber,
  Identification,
}: IChapterContentProps) => {
  if (!FriendlyChapterNumber)
    throw new Error("Provide the mangaName parameter");

  if (!FriendlyChapterNumber)
    throw new Error("Provide the FriendlyChapterNumber parameter");

  // eslint-disable-next-line antfu/if-newline
  if (!Identification) throw new Error("Provide the Identification parameter");

  const response = await request({
    method: "get",
    url: `https://inmanga.com/chapter/chapterIndexControls?${utils.buildQuery({
      identification: Identification,
    })}`,
  });

  const $ = load(response);

  const pages: IChapterPages[] = await Promise.all(
    $("div.col-md-12.chapterControlsContainer div.panel-body div:nth(2)")
      .find("option")
      .map(
        (_, element) =>
          new Promise<IChapterPages>((resolve, reject) => {
            try {
              const $el = $(element);
              const pageId = $el.attr("value");
              const page = $el.text();
              const url = `https://pack-yak.intomanga.com/images/manga/${mangaName}/chapter/${FriendlyChapterNumber}/page/${page}/${pageId}`;
              resolve({ pageId: pageId || null, page, url });
            } catch (error) {
              reject(error);
            }
          })
      )
      .get()
  );

  return pages;
};

export const getMostViewedMangas = async (): Promise<
  IMostViewedMangasRoot[]
> => {
  const response = await request({
    method: "get",
    url: "https://inmanga.com/manga/getMostViewedMangas",
  });

  const $ = load(response);

  const data: IMostViewedMangas[] = await Promise.all(
    $("a.list-group-item")
      .map(
        (_, element) =>
          new Promise<IMostViewedMangas>((resolve, reject) => {
            try {
              const $el = $(element);
              const url = `https://inmanga.com${$el.attr("href")}`;
              const poster = $el.find("div.media-box img").attr("src");
              // const mangaName = $el
              //   .find(
              //     "div.media-box div.media-box-body strong.media-box-heading"
              //   )
              //   .text()
              //   .trim();
              const mangaName = url.split("/").filter(Boolean)[4];
              const views = $el
                .find("div.media-box div.media-box-body span.pull-right")
                .text()
                .trim();

              resolve({ mangaName, url, poster: poster || null, views });
            } catch (error) {
              reject(error);
            }
          })
      )
      .get()
  );

  const { results } = await PromisePool.withConcurrency(10)
    .for(data)
    .process(async (prop: IMostViewedMangas) => {
      const mangaName = prop.mangaName;

      return {
        mangaName,
        chapter: await getChapterJSON(prop.url),
      };
    });

  return results;
};

// (async () => {
//   const pages = await getChapterPages({
//     mangaName: "Kimetsu-no-Yaiba",
//     FriendlyChapterNumber: "01",
//     Identification: "41a7ef61-a911-428d-ba28-f53e2bc6c44f",
//   });
//   pages.map((p) => console.log(p));
//   // const chapter = await getChapterJSON(
//   //   "https://inmanga.com/ver/manga/Kimetsu-no-Yaiba/78352626-0e2c-4b10-9610-28abf57c6881"
//   // );
//   // console.log(chapter[0]);
// })();
