import { browser, by, element } from 'protractor';

export class Party4weekendPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('p4w-root h1')).getText();
  }
}
