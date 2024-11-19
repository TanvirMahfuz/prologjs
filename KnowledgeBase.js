class KnowledgeBase {
  constructor() {
    this.firstOrderKnowledge = {};
    this.secondOrderKnowledge = {};
    this.thirdOrderKnowledge = [];
  }
  addToFirstOrder(key, value) {
    if (!this.firstOrderKnowledge[key]) {
      this.firstOrderKnowledge[key] = [];
    }
    this.firstOrderKnowledge[key].push(value);
  }
  addToSecondOrder(key, value1, value2) {
    if (!this.secondOrderKnowledge[key]) {
      this.secondOrderKnowledge[key] = {};
    }
    if (!this.secondOrderKnowledge[key][value1]) {
      this.secondOrderKnowledge[key][value1] = [];
    }
    this.secondOrderKnowledge[key][value1].push(value2);
  }

  firstOrderCondition(key, value) {
    if (this.firstOrderKnowledge[key]) {
      if (this.firstOrderKnowledge[key].includes(value)) return true;
      return false;
    }
    return false;
  }
}
export default KnowledgeBase;
