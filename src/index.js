import { createStore } from './core/createStore';
import { rootReducer } from './redux/rootReducer';

import { storage, debounce } from './core/utils';

import Excel from './components/excel/Excel';
import Header from './components/header/Header';
import Toolbar from './components/toolbar/Toolbar';
import Formula from './components/formula/Formula';
import Table from './components/table/Table';

import { initialState } from './redux/initialState';

import './scss/index.scss';

const store = createStore(rootReducer, initialState);

const stateListener = (state) => {
  storage('excel-state', state);
};

store.subscribe(debounce(stateListener, 500));

const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table],
  store,
});

excel.render();
