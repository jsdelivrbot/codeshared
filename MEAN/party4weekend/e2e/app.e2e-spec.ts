import { Party4weekendPage } from './app.po';

describe('party4weekend App', () => {
  let page: Party4weekendPage;

  beforeEach(() => {
    page = new Party4weekendPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to p4w!');
  });
});
