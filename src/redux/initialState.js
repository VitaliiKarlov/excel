import { clone } from '../core/utils';
import { defaultStyles } from '../constants';

const defaultState = {
  colState: {},
  rowState: {},
  currentText: '',
  dataState: {},
  currentStyles: defaultStyles,
  stylesState: {},
  title: 'Новая таблица',
  opendDate: new Date().toJSON(),
};

function normalize(state) {
  return {
    ...state,
    currentStyles: defaultStyles,
    currentText: '',
  };
}

export function normalizeState(state) {
  return state ? normalize(state) : clone(defaultState);
}
