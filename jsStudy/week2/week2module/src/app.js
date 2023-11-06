import { Component } from 'src/component.js';

export class App extends Component {
  constructor($target) {
    super();
    this.$target = $target;
    this.state = { items: ['item1', 'item2'] };
    this.setup();
    this.render();
  }

  setup() {
    this.on('addItem', () => {
      const { items } = this.state;
      this.setState({ items: [...items, `item${items.length + 1}`] });
    });
  }

  render() {
    const { items } = this.state;
    this.$target.innerHTML = `
      <ul>
        ${items.map(item => `<li>${item}</li>`).join('')}
      </ul>
      <button id="addButton">추가</button>
    `;

    const addButton = this.$target.querySelector('#addButton');
    addButton.addEventListener('click', () => {
      this.trigger('addItem');
    });
  }
}