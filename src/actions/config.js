import { CONFIG } from '../stores/reducer-types';
export function updateConfigNav(key, show) {
  return {
    key,
    show,
    type: CONFIG.UPDATE_NAV
  };
}
