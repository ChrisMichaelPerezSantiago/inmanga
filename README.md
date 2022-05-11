# ✓ INMANGA (PoC)

> [inmanga](https://inmanga.com/) content in spanish

## ⚠️ work in progress ...

# 📚 Documentation

## `getChapterJSON(url: string)`

List of chapters with their **identification** property.

```ts
const chapter = await getChapterJSON(
  "https://inmanga.com/ver/manga/Kimetsu-no-Yaiba/78352626-0e2c-4b10-9610-28abf57c6881"
);
```

<details>
<summary>Chapter JSON</summary>

```json
[
  {
    "PagesCount": 55,
    "Watched": false,
    "MangaIdentification": "",
    "MangaName": "",
    "FriendlyMangaName": "",
    "Id": 22108,
    "MangaId": 116,
    "Number": 1,
    "RegistrationDate": "2019-05-01T00:00:00",
    "Description": "",
    "Pages": [],
    "Identification": "41a7ef61-a911-428d-ba28-f53e2bc6c44f",
    "FeaturedChapter": false,
    "FriendlyChapterNumber": "01",
    "FriendlyChapterNumberUrl": "1"
  } // more ...
]
```

</details>

## `getChapterPages({mangaName: string, FriendlyChapterNumber: string, Identification: string})`

List of **images as url** representing the page.

```ts
const pages = await getChapterPages({
  mangaName: "Kimetsu-no-Yaiba",
  FriendlyChapterNumber: "01",
  Identification: "41a7ef61-a911-428d-ba28-f53e2bc6c44f",
});
```

<details>
<summary>Pages JSON </summary>

```json
[
  {
    "pageId": "f44cb8fd-2e46-4b97-8c31-b931775df4ae",
    "page": "1",
    "url": "https://pack-yak.intomanga.com/images/manga/Kimetsu-no-Yaiba/chapter/01/page/1/f44cb8fd-2e46-4b97-8c31-b931775df4ae"
  },
  {
    "pageId": "f8d6a68c-f15e-4aae-a6cf-c5d3030aaa24",
    "page": "2",
    "url": "https://pack-yak.intomanga.com/images/manga/Kimetsu-no-Yaiba/chapter/01/page/2/f8d6a68c-f15e-4aae-a6cf-c5d3030aaa24"
  },
  {
    "pageId": "0e98448f-a0f3-4190-ba8e-eb1b7d2a8905",
    "page": "3",
    "url": "https://pack-yak.intomanga.com/images/manga/Kimetsu-no-Yaiba/chapter/01/page/3/0e98448f-a0f3-4190-ba8e-eb1b7d2a8905"
  },
  {
    "pageId": "38705140-2b02-4688-a3d0-1c714c36fee0",
    "page": "4",
    "url": "https://pack-yak.intomanga.com/images/manga/Kimetsu-no-Yaiba/chapter/01/page/4/38705140-2b02-4688-a3d0-1c714c36fee0"
  },
  {
    "pageId": "44d83985-7299-4be5-87e4-9b6040f056cc",
    "page": "5",
    "url": "https://pack-yak.intomanga.com/images/manga/Kimetsu-no-Yaiba/chapter/01/page/5/44d83985-7299-4be5-87e4-9b6040f056cc"
  } // more ...
]
```

</details>

## `getMostViewedMangas()`

```ts
const mangas = await getMostViewedMangas();
```

<details>
<summary>Manga JSON</summary>

```json
{
  "mangaName": "Shingeki-no-Kyojin",
  "chapter": [
    {
      "PagesCount": 55,
      "Watched": false,
      "MangaIdentification": "",
      "MangaName": "",
      "FriendlyMangaName": "",
      "Id": 22108,
      "MangaId": 116,
      "Number": 1,
      "RegistrationDate": "2019-05-01T00:00:00",
      "Description": "",
      "Pages": [],
      "Identification": "41a7ef61-a911-428d-ba28-f53e2bc6c44f",
      "FeaturedChapter": false,
      "FriendlyChapterNumber": "01",
      "FriendlyChapterNumberUrl": "1"
    } // more ...
  ]
}
```

</details>

## **:handshake: Contributing**

- Fork it!
- Create your feature branch: `git checkout -b my-new-feature`
- Commit your changes: `git commit -am 'Add some feature'`
- Push to the branch: `git push origin my-new-feature`
- Submit a pull request

---

### **:busts_in_silhouette: Credits**

- [Chris Michael](https://github.com/ChrisMichaelPerezSantiago) (Project Leader, and Developer)

---

### **:anger: Troubleshootings**

This is just a personal project created for study / demonstration purpose and to simplify my working life, it may or may
not be a good fit for your project(s).

---

### **:heart: Show your support**

Please :star: this repository if you like it or this project helped you!\
Feel free to open issues or submit pull-requests to help me improving my work.

---

### **:robot: Author**

_*Chris M. Perez*_

> You can follow me on
> [github](https://github.com/ChrisMichaelPerezSantiago)&nbsp;&middot;&nbsp;[twitter](https://twitter.com/Chris5855M)

---

Copyright ©2022 [inmanga](https://github.com/ChrisMichaelPerezSantiago/inmanga).
