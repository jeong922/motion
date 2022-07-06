import { BaseComponent, Component } from '../component.js';

export interface Composable {
  addChild(child: Component): void;
}

type CloseListener = () => void;

class PageItemComponent
  extends BaseComponent<HTMLElement>
  implements Composable
{
  private closeListener?: CloseListener;
  constructor() {
    super(`<li class="page-item">
            <div class="page-item__controls">
              <button class="close"><i class="fas fa-times-circle"></i></button>
            </div>
            <section class="page-item__body"></section>
          </li>`);
    const closeBtn = this.element.querySelector('.close')! as HTMLButtonElement;
    // closeBtn.onclick = () => {
    //   this.closeListener && this.closeListener();
    // };
    closeBtn.addEventListener('click', () => {
      this.closeListener && this.closeListener();
    });
  }
  addChild(child: Component) {
    const container = this.element.querySelector(
      '.page-item__body'
    )! as HTMLElement;
    child.attachTo(container);
  }

  setCloseListener(listener: CloseListener) {
    this.closeListener = listener;
  }
}

export class Page
  extends BaseComponent<HTMLUListElement>
  implements Composable
{
  constructor() {
    super('<ul class="page"></ul>');
  }

  addChild(section: Component) {
    const item = new PageItemComponent();
    item.addChild(section);
    item.attachTo(this.element, 'beforeend');
    item.setCloseListener(() => {
      item.removeFrom(this.element);
    });
  }
}
