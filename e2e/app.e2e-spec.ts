import { AttendrPage } from './app.po';

describe('attendr App', () => {
  let page: AttendrPage;

  beforeEach(() => {
    page = new AttendrPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
