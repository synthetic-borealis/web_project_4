class Section {
  constructor( { items, renderer }, sectionSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(sectionSelector);
  }

  addItem(item) {
    this._container.prepend(item);
  }

  _clear() {
    this._container.innerHTML = "";
  }

  renderItems() {
    this._clear();
    this._items.forEach(this._renderer);
  }
}

export default Section;
