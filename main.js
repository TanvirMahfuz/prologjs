import SwiPro from "./swipy.js";
import fs from "node:fs";
let swipy = new SwiPro();
const knowledgeBase = fs.readFileSync("knowledge.txt", "utf8").split("\n");
swipy.train(knowledgeBase);
console.log(swipy.firstOrderKnowledge);
console.log(swipy.secondOrderKnowledge);
console.log(swipy.ask("likes(Tanvir,biri)"));
