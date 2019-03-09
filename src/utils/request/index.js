/**
 * 构建一个表单请求
 * @param {*} action
 * @param {*} params { key: value}
 * @param {*} method
 */
export function formReqeust(action, params, method = 'post') {
  const form = document.createElement('form');
  form.setAttribute('method', method);
  form.setAttribute('action', action);
  form.setAttribute('target', '_blank');
  Object.keys(params).forEach(key => {
    const input = document.createElement('input');
    input.setAttribute('type', 'hidden');
    input.setAttribute('name', key);
    input.setAttribute('value', params[key]);
    form.appendChild(input);
  });
  document.body.appendChild(form);
  form.submit();
  setTimeout(() => {
    document.body.removeChild(form);
  });
}
