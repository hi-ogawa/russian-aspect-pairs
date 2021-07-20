import { JSDOM } from "jsdom";
import { Result, Ok, Err, Option } from "./utils";
import { zip } from "lodash";

const RE_IMPERFECTIVE = / нсв. /;
const RE_PERFECTIVE_PAIR = /\(св. ([а-яА-Я]+)\)/;
const RE_PERFECTIVE = / св. /;
const RE_IMPERFECTIVE_PAIR = /\(нсв. ([а-яА-Я]+)\)/;

const NOT_FOUND = "искомое слово отсутствует";

// imperfective/pefective
type Pair = [Option<string>, Option<string>];

export async function findPair(word: string): Promise<Result<Pair, string>> {
  const url = `http://gramota.ru/slovari/dic/?bts=x&word=${word}`;
  const { window } = await JSDOM.fromURL(url);
  const h2 = window.document.querySelector("h2") as Option<HTMLElement>;
  if (!h2 || h2.textContent !== "Большой толковый словарь") {
    return Err("Entry not found");
  }
  const div = h2?.nextElementSibling as Option<HTMLElement>;
  if (!div || div.tagName !== "DIV") {
    return Err("DIV element not found");
  }
  const text = (div.textContent ?? "").toLowerCase();
  if (text === NOT_FOUND) {
    return Err("BTS entry not found");
  }
  if (!text.startsWith(word)) {
    const found = text.split(",")[0];
    return Err(`Found different word "${found}"`);
  }

  if (text.match(RE_IMPERFECTIVE)) {
    return Ok([word, text.match(RE_PERFECTIVE_PAIR)?.[1]]);
  }

  if (text.match(RE_PERFECTIVE)) {
    return Ok([text.match(RE_IMPERFECTIVE_PAIR)?.[1], word]);
  }

  return Err("No regex match");
}

async function main(words: string[]) {
  const results = await Promise.all(words.map(findPair));
  for (const [word, result] of zip(words, results)) {
    console.log(JSON.stringify({ word, ...result }));
  }
}

if (require.main === module) {
  main(process.argv.slice(2));
}
