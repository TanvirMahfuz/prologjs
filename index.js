import express from "express";
import path from "path";
import SwiPro from "./swipy.js";
import {fileURLToPath} from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use((req, res, next) => {
  console.log(req.url);
  console.log(req.method);
  next();
});

let swiPro = new SwiPro();
let knowledgeBase = [];
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views/index.html"));
});

app.post("/knowledge", async (req, res) => {
  const {knowledge} = req.body;
  knowledgeBase = knowledge.split("\n");
  knowledgeBase = knowledgeBase.filter((knowledge) => knowledge !== "");
  knowledgeBase = knowledgeBase.map((knowledge) => knowledge.trim());
  swiPro.train(knowledgeBase);
  knowledgeBase = knowledgeBase.join("\r\n");
  console.log(swiPro.firstOrderKnowledge);
  console.log(swiPro.secondOrderKnowledge);
  res.json({knowledgeBase});
});

app.post("/ask", async (req, res) => {
  const {ask} = req.body;
  const query = ask.split("\n")[0];
  console.log(query);
  const result = swiPro.ask(query);
  console.log(result);
  res.json({ask: result});
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
