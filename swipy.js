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
    console.log(condition);
    if (condition.includes("),")) {
      let flag = true;
      const conditions = condition.split("),");
      for (let con of conditions) {
        console.log(con + " <-----");
        const [key, value] = con.split("(");
        console.log(key);
        console.log(value);
        const [value1, value2] = value.split(",");
        flag = flag && this.firstOrderCondition(key, value1, value2);
        if (!flag) break;
      }
      if (flag) {
        this.know(knowledge);
      }
    } else {
      const [key, value] = condition.slice(0, -1).split("(");
      if (value.includes(",")) {
        const [value1, value2] = value.split(",");
        this.addToSecondOrder(key, value1, value2);
      }
      if (!this.firstOrderCondition(key, value)) {
        this.know(knowledge);
      }
    }
  }
  ask(s) {
    if (s.includes(":-")) {
      const [key, value] = s.split(":-");
      if (this.ask(value)) {
        this.know(key);
      }
      return this.ask(key);
    } else {
      const [key, value] = s.slice(0, -1).split("(");
      console.log(key, value);
      if (value.includes(",")) {
        let [value1, value2] = value.split(",");
        return this.secondOrderCondition(key, value1, value2);
      }
      return this.firstOrderCondition(key, value);
    }
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
