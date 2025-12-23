import fs from "fs";
const __dirname = import.meta.dirname;

let fetcher = await fetch(
  "https://fonts.googleapis.com/css2?family=Noto+Sans+JP&display=swap",
  {
    headers: {
      "User-Agent":
        "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.116",
    },
    body: null,
    method: "GET",
  },
);

let text = await fetcher.text();

const match = text.matchAll(/unicode-range:(.*;)$/gm);
const arr = Array.from(match, (m) => m[1]);

let newarr = [];

for (let i = 0; i < arr.length; i++) {
  let inner_arr = arr[i].replaceAll(";", "").split(", ");

  for (let ii = 0; ii < inner_arr.length; ii++) {
    inner_arr[ii] = inner_arr[ii].replaceAll(" ", "");
  }

  newarr.push(inner_arr);
}

fs.writeFileSync(__dirname + "/../jp.json", JSON.stringify(newarr));
