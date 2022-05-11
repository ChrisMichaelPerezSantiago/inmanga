import _ from "lodash";
import cheerio from "cheerio";
import request from "./request";
import Utils from "./Utils";
import type {
  IChapter,
  IChapterContentProps,
  IChapterPages,
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
  FriendlyChapterNumber,
  Identification,
}: IChapterContentProps) => {
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
              const url = `https://pack-yak.intomanga.com/images/manga/Kimetsu-no-Yaiba/chapter/${FriendlyChapterNumber}/page/${page}/${pageId}`;
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

// (async () => {
//   // const pages = await getChapterPages({
//   //   FriendlyChapterNumber: "02",
//   //   Identification: "e3484db3-8a82-452a-ab82-1232cc747db1",
//   // });
//   // pages.map((p) => console.log(p));
//   // const chapter = await getChapterJSON(
//   //   "https://inmanga.com/ver/manga/Kimetsu-no-Yaiba/78352626-0e2c-4b10-9610-28abf57c6881"
//   // );

//   // console.log(chapter[0]);
// })();
