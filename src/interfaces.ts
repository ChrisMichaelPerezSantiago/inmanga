export interface IChapter {
  PagesCount: number;
  Watched: boolean;
  MangaIdentification: string;
  MangaName: string;
  FriendlyMangaName: string;
  Id: number;
  MangaId: number;
  Number: number;
  RegistrationDate: Date;
  Description: string;
  Pages?: [] | null;
  Identification: string;
  FeaturedChapter: boolean;
  FriendlyChapterNumber: string;
  FriendlyChapterNumberUrl: string;
}

export interface IChapterContentProps {
  mangaName: string;
  FriendlyChapterNumber: string;
  Identification: string;
}

export interface IChapterPages {
  pageId: string | null;
  page: string;
  url: string;
}

export interface IMostViewedMangas {
  mangaName: string;
  url: string;
  poster: string | null;
  views: string;
}

export interface IMostViewedMangasRoot {
  mangaName: string;
  chapter: IChapter;
}
