import { Page } from '../core/Page';
import { createStore } from '../core/store/createStore';
import { rootReducer } from '../redux/rootReducer';

import { storage, debounce } from '../core/utils';

import Excel from '../components/excel/Excel';
import Header from '../components/header/Header';
import Toolbar from '../components/toolbar/Toolbar';
import Formula from '../components/formula/Formula';
import Table from '../components/table/Table';

import { normalizeState } from '../redux/initialState';

export class ExcelPage extends Page {
  getRoot() {
    const params = this.params ? this.params : Date.now().toString();
    const state1 = storage(`excel:${params}`);
    const store = createStore(rootReducer, normalizeState(state1));

    const stateListener = debounce((state) => {
      storage(`excel:${params}`, state);
    }, 500);

    store.subscribe(stateListener);

    this.excel = new Excel({
      components: [Header, Toolbar, Formula, Table],
      store,
    });

    return this.excel.getRoot();
  }

  afterRender() {
    this.excel.init();
  }

  destroy() {
    this.excel.destroy();
  }
}
