/**
 * 创建一个简单的存储对象，接受一个key
 * @param {*} key
 */
export function makeStorage(key) {
  return {
    get: function(raw = false) {
      try {
        const r = localStorage.getItem(key);
        if (raw) {
          return r;
        }
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
