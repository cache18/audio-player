import {Injectable} from "@angular/core";

@Injectable()
export class ScrollService {

  async scroll(elem: Element) {
    const visible = await this.isVisible(elem);
    if (!visible) {
      elem?.scrollIntoView({block: 'center'});
    }
  }

  private isVisible(domElement: Element) {
    return new Promise(resolve => {
      const o = new IntersectionObserver(([entry]) => {
        resolve(entry.intersectionRatio === 1);
        o.disconnect();
      });
      o.observe(domElement);
    });
  }

}
