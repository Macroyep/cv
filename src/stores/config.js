import { CONFIG } from './reducer-types';
import cloneDeep from 'lodash/cloneDeep';
import { initStorage } from './utils';

const storage = initStorage('config');
const reducers = {
  [CONFIG.UPDATE_NAV](state, { key, show }) {
    const newState = cloneDeep(state);
    const item = newState.navs.find(item => item.key === key);
    item.show = show;
    return newState;
  }
};

const Types = Object.values(CONFIG);

export default function(state = getDefaultState(), action) {
  const { type } = action;
  if (Types.includes(type)) {
    const f = reducers[type];
    if (typeof f === 'function') {
      state = f(state, action);
      storage.set(state);
    }
  }
  return state;
}

function getDefaultState() {
  const state = storage.get();
  if (state) {
    return state;
  }
  const defaultState = {
    navs: [
      {
        name: '目录',
        key: 'folder',
        show: true
      },
      {
        name: '预览',
        key: 'preview',
        show: true
      }
    ]
  };

  return defaultState;
}
