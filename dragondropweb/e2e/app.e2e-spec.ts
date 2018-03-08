/*
 * Copyright (c) 2018. DigiPen Institute of Technology
 */

import { AppPage } from './app.po';

describe('dragondropweb App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
