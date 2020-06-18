import { storage } from '../core/utils';
import { defaultStyles } from '../constants';

const defaultState = {
  colState: {},
  rowState: {},
  currentText: '',
  dataState: {},
  currentStyles: defaultStyles,
  stylesState: {},
  title: 'Новая таблица',
};

function normalize(state) {
  return {
    ...state,
    currentStyles: defaultStyles,
    currentText: '',
  };
}

export const initialState = storage('excel-state')
  ? normalize(storage('excel-state'))
  : defaultState;
