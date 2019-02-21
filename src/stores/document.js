import { DOCUMENT } from './reducer-types';
import { cloneDeep } from 'lodash';
import { build } from '../section';
const reducers = {
  [DOCUMENT.INIT](state, { lastState }) {
    return cloneDeep(lastState);
  },
  [DOCUMENT.CREATE](state, { name, text }) {
    const document = buildDocument(name, text);
    const list = [...state.list, document].sort((a, b) => {
      return b.createdAt - a.createdAt;
    });
    return {
      index: 0,
      list
    };
  },
  [DOCUMENT.SET_CURRENT](state, { index }) {
    return {
      index,
      list: [...state.list]
    };
  },
  [DOCUMENT.UPDATE](state, { index, name, text }) {
    const list = cloneDeep(state.list);
    list[index].name = name;
    list[index].text = text;
    return {
      ...state,
      list
    };
  },
  [DOCUMENT.DELETE](state, { index }) {
    let list = cloneDeep(state.list);

    list.splice(index, 1);
    if (list.length === 0) {
      const document = buildDocument('Untitled', '# ReadMe');
      list = [document];
      index = 0;
    } else {
      if (index >= list.length) {
        index = list.length - 1;
      }
    }

    return {
      index,
      list
    };
  }
};

const Types = Object.values(DOCUMENT);

function buildDocument(name, text) {
  const now = Date.now();
  return { id: now, name, text, createdAt: now, updatedAt: now };
}

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
  let state = localStorage.getItem('document');
  try {
    if (state) {
      return JSON.parse(state);
    }
  } catch (err) {
    console.error(err);
  }
  return {
    index: 0,
    list: [buildDocument('刘德华-Web高级前端开发工程师', build())]
  };
}

function saveToLocal(state) {
  setTimeout(() => {
    localStorage.setItem('document', JSON.stringify(state));
  });
}
