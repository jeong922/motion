import { BaseComponent, Component } from '../component.js';
import { Composable } from '../page/page.js';

type CloseListner = () => void;
type SubmitListner = () => void;

export interface MediaData {
  readonly title: string;
  readonly url: string;
}

export interface TextData {
  readonly title: string;
  readonly body: string;
}

export class InputDialog
  extends BaseComponent<HTMLElement>
  implements Composable
{
  closeListner?: CloseListner;
  submitListner?: SubmitListner;
  constructor() {
    super(`<dialog class="dialog">
          <div class="dialog__container">
            <button class="close">&times</button>
            <div id="dialog__body"></div>
            <button class="dialog__submit">ADD</button>
          </div>
        </dialog>`);
    const closeBtn = this.element.querySelector('.close')! as HTMLButtonElement;
    closeBtn.addEventListener('click', () => {
      this.closeListner && this.closeListner();
    });

    const submitBtn = this.element.querySelector(
      '.dialog__submit'
    )! as HTMLButtonElement;
    submitBtn.addEventListener('click', () => {
      this.submitListner && this.submitListner();
    });
  }
  setCloseListenr(listener: CloseListner) {
    this.closeListner = listener;
  }
  setSubmitListenr(listener: SubmitListner) {
    this.submitListner = listener;
  }
  addChild(child: Component) {
    const body = this.element.querySelector('#dialog__body')! as HTMLElement;
    child.attachTo(body);
  }
}
