import { Component } from './components/component.js';
import { ImageComponent } from './components/page/items/image.js';
import { NoteComponent } from './components/page/items/note.js';
import { TodoComponent } from './components/page/items/todo.js';
import { VideoComponent } from './components/page/items/video.js';
import { Composable, Page } from './components/page/page.js';

class App {
  private readonly page: Component & Composable;
  constructor(root: HTMLElement) {
    this.page = new Page();
    this.page.attachTo(root);

    const image = new ImageComponent(
      'image title',
      'https://picsum.photos/600/300'
    );
    this.page.addChild(image);

    const note = new NoteComponent('note title', 'note text');
    this.page.addChild(note);

    const todo = new TodoComponent('todo title', 'todo text');
    this.page.addChild(todo);

    const video = new VideoComponent(
      'video title',
      'https://www.youtube.com/embed/YrUvgQPRhZA'
    );
    this.page.addChild(video);
  }
}

new App(document.querySelector('.document')! as HTMLElement);
