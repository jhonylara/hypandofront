class CustomEvent {
  constructor(next, step, contents) {
    console.log(contents)
    this.next = next;
    this.step = step;
    this.contents = contents;
  }
}

export default CustomEvent
