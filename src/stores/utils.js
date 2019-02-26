export function initStorage(key) {
  return {
    get: function() {
      try {
        const r = localStorage.getItem(key);
        return JSON.parse(r);
      } catch (err) {
        return null;
      }
    },
    set: function(state, sync = false) {
      const save = () => {
        localStorage.setItem(key, JSON.stringify(state));
      };
      sync ? save() : setTimeout(save);
    }
  };
}
