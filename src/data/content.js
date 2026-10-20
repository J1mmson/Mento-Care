// Treści + zdjęcia. Same teksty i ceny edytujesz w ./business.js
import * as img from "../assets/img";
import { SERVICE_TEXTS } from "./business";

export * from "./business";

const SERVICE_IMAGES = {
  "konsultacja-kosmetologiczna": img.uslugiKonsultacja,
  "terapia-tradzikowa": img.uslugiTradzik,
  "stymulatory-tkankowe": img.uslugiStymulatory,
  "mezoterapia-iglowa": img.uslugiMezoIglowa,
  "mezoterapia-mikroiglowa": img.uslugiMezoMikroiglowa,
  "btx": img.uslugiBtx,
  "peeling-medyczny": img.uslugiPeeling,
  "lampa-led": img.uslugiLed,
  "zabiegi-dla-mezczyzn": img.uslugiDlaNiego,
  "masaz-kobido": img.uslugiKobido,
  "head-spa": img.uslugiHeadSpa,
  "rytualy-pielegnacyjne": img.uslugiRytualy,
};

export const SERVICES = SERVICE_TEXTS.map((s) => ({ ...s, image: SERVICE_IMAGES[s.slug] }));

export const METAMORPHOSES = [
  { before: img.przed1, after: img.po1 },
  { before: img.przed2, after: img.po2 },
  { before: img.przed3, after: img.po3 },
  { before: img.przed4, after: img.po4 },
  { before: img.przed5, after: img.po5 },
  { before: img.przed6, after: img.po6 },
];
