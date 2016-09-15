import {
  TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS, TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS,
}                               from '@angular/platform-browser-dynamic/testing';
import { setBaseTestProviders } from '@angular/core/testing';
import { MyApp }           from './app';
import {Welcome} from './pages/welcome/welcome';
//import { Page2 }                from './pages/page2/page2';

setBaseTestProviders(TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS, TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS);

let appCatavento: MyApp = null;

class MockClass {
  public ready(): any {
    return new Promise((resolve: Function) => {
      resolve();
    });
  }

  public close(): any {
    return true;
  }

  public setRoot(): any {
    return true;
  }
}

describe('Catavento App', () => {

  beforeEach(() => {
    let mockClass: any = (<any>new MockClass());
    appCatavento = new MyApp(mockClass, mockClass, mockClass, mockClass, mockClass);
  });

  xit('initialises with ONE logged out page', () => {
    expect(appCatavento['loggedOutPages'].length).toEqual(1);
  });

  it('initialises with a root page', () => {
    expect(appCatavento['rootPage']).not.toBe(null);
  });

  it('initialises with the Welcome page', () => {
    expect(appCatavento['rootPage']).toBe(Welcome);
  });

  it('initialises with an app', () => {
    expect(appCatavento['app']).not.toBe(null);
  });

  //it('opens a page', () => {
  //  spyOn(appCatavento['menu'], 'close');
  //  // cant be bothered to set up DOM testing for app.ts to get access to @ViewChild (Nav)
  //  appCatavento['nav'] = (<any>appCatavento['menu']);
  //  spyOn(appCatavento['nav'], 'setRoot');
  //  appCatavento.openPage(appCatavento['pages'][1]);
  //  expect(appCatavento['menu']['close']).toHaveBeenCalled();
  //  expect(appCatavento['nav'].setRoot).toHaveBeenCalledWith(Page2);
  //});
});
