import KnowledgeBase from "./KnowledgeBase.js";
class SwiPro extends KnowledgeBase {
  constructor() {
    super();
  }
  know(s) {
    const [key, value] = s.slice(0, -1).split("(");
    if (value.includes(",")) {
      let [value1, value2] = value.split(",");
      this.addToSecondOrder(key, value1, value2);
    } else {
      this.addToFirstOrder(key, value);
    }
  }
  conditionalKnow(s) {
    const [knowledge, condition] = s.split(":-");

    if (condition.includes(",")) {
      let flag = true;
      const conditions = condition.split(",");
      for (let con of conditions) {
        const [key, value] = con.slice(0, -1).split("(");
        flag = flag && this.firstOrderCondition(key, value);
        if (!flag) break;
      }
      if (flag) {
        this.know(knowledge);
      }
    } else {
      const [key, value] = condition.slice(0, -1).split("(");
      if (this.firstOrderCondition(key, value)) {
        this.know(knowledge);
      }
    }
  }
  ask(s) {
    const [key, value] = s.slice(0, -1).split("(");
    return this.firstOrderCondition(key, value);
  }
  train(knowledgeBase) {
    console.log(knowledgeBase);
    for (let knowledge of knowledgeBase) {
      if (knowledge.includes(":-")) {
        this.conditionalKnow(knowledge);
      } else {
        this.know(knowledge);
      }
    }
  }
}

export default SwiPro;
