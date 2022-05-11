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
  FriendlyChapterNumber: string;
  Identification: string;
}

export interface IChapterPages {
  pageId: string | null;
  page: string;
  url: string;
}
