import { CONFIG } from './reducer-types';
import cloneDeep from 'lodash/cloneDeep';
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
      saveToLocal(state);
    }
  }
  return state;
}

function getDefaultState() {
  let state = localStorage.getItem('config');
  try {
    if (state) {
      return JSON.parse(state);
    }
  } catch (err) {
    console.error(err);
  }

  const defaultState = {
    navs: [
      {
        name: '目录',
        key: 'folder',
        show: true
      },
      {
        name: '格式片段',
        key: 'section',
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

function saveToLocal(state) {
  setTimeout(() => {
    localStorage.setItem('config', JSON.stringify(state));
  });
}
