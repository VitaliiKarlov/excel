import {
  TABLE_RESIZE,
  CHANGE_TEXT,
  CHANGE_STYLES,
  APPLY_STYLE,
  CHANGE_TITLE,
} from './types';

export function rootReducer(state, action) {
  switch (action.type) {
    case TABLE_RESIZE: {
      const field = action.payload.type === 'col' ? 'colState' : 'rowState';
      const newState = state[field] || {};
      newState[action.payload.id] = action.payload.value;
      return {
        ...state,
        [field]: newState,
      };
    }
    case CHANGE_TEXT: {
      const newState = state.dataState || {};
      newState[action.payload.id] = action.payload.text;
      return {
        ...state,
        currentText: action.payload.text,
        dataState: newState,
      };
    }
    case CHANGE_STYLES: {
      return {
        ...state,
        currentStyles: action.payload,
      };
    }
    case APPLY_STYLE: {
      const newState = state.stylesState || {};
      action.payload.ids.forEach((id) => {
        newState[id] = { ...newState[id], ...action.payload.value };
      });
      return {
        ...state,
        stylesState: newState,
        currentStyles: { ...state.currentStyles, ...action.payload.value },
      };
    }
    case CHANGE_TITLE: {
      return {
        ...state,
        title: action.payload,
      };
    }
    default:
      return state;
  }
}
