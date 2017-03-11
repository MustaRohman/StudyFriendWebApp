class Period {
  const type =  {
    TOPIC: 0,
    BREAK: 1
  }

  constructor(name, type, sessionSize, breakSize) {
    this.name = name;
    this.type = type;
    if (type === this.type.TOPIC) {
      this.duration = sessionSize;
    } else {
      this.duration = breakSize;
    }
  }
}

module.exports = Period;
