import SwiPro from "./swipy.js";
import fs from "node:fs";
let swipy = new SwiPro();
const knowledgeBase = fs.readFileSync("knowledge.txt", "utf8").split("\n");
swipy.train(knowledgeBase);
swipy.ask("delicious(cakes)");
