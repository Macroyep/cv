export function formReqeust(path, params, method = 'post') {
  const form = document.createElement('form');
  form.setAttribute('method', method);
  form.setAttribute('action', path);
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

export function downloadFile(data, fileName = '未命名') {
  var $a = document.createElement('a');
  var blob = new Blob([content]);
  $a.download = fileName;
  $a.href = URL.createObjectURL(blob);
  document.body.appendChild($a);
  $a.click();
  document.body.removeChild($a);
}
