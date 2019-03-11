import { DOCUMENT } from '../stores/reducer-types';
export function createDocument(name, text) {
  return {
    name,
    text,
    type: DOCUMENT.CREATE
  };
}

export function setCurrentDocument(index) {
  return {
    index,
    type: DOCUMENT.SET_CURRENT
  };
}

export function updateDocument(index, name, text) {
  return {
    index,
    name,
    text,
    type: DOCUMENT.UPDATE
  };
}

export function deleteDocument(index) {
  return {
    index,
    type: DOCUMENT.DELETE
  };
}

export function init(lastState) {
  return {
    lastState,
    type: DOCUMENT.INIT
  };
}

export function appendList(list) {
  return {
    list,
    type: DOCUMENT.APPEND
  };
}
