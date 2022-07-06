import { BaseComponent } from '../../component.js';

export class VideoComponent extends BaseComponent<HTMLElement> {
  constructor(title: string, url: string) {
    super(`<section class="video">
						<h2 class="video__title"></h2>
						<div class="video__container">
							<iframe class="video__iframe"></iframe>
						</div>
        </section>`);

    const titleElement = this.element.querySelector(
      '.video__title'
    )! as HTMLHeadingElement;
    titleElement.textContent = title;

    const videoElement = this.element.querySelector(
      '.video__iframe'
    )! as HTMLIFrameElement;
    videoElement.src = this.conoverURL(url);
    console.log(url);
  }

  private conoverURL(url: string): string {
    const regExp =
      /^(?:https?:\/\/)?(?:www\.)?(?:(?:youtube.com\/(?:(?:watch\?v=)|(?:embed\/))([a-zA-Z0-9(-|_)]{11}))|(?:youtu.be\/([a-zA-Z0-9-]{11})))/;
    const match = url.match(regExp);
    //console.log(match);
    const videoId = match ? match[1] || match[2] : undefined;
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return url;
  }
}
