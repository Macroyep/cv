/**
 * 创建下载一个文件
 * @param {*} content
 * @param {*} fileName
 */
export function createFileAndDownload(content, fileName = '未命名') {
  var $a = document.createElement('a');
  var blob = new Blob([content]);
  $a.download = fileName;
  $a.href = URL.createObjectURL(blob);
  document.body.appendChild($a);
  $a.click();
  setTimeout(() => {
    document.body.removeChild($a);
  });
}

/**
 * 获取本地文件对象
 */
export function getLocalFile() {
  return new Promise(resolve => {
    const input = document.createElement('input');
    input.type = 'file';
    input.onchange = event => {
      resolve(input.files);
      setTimeout(() => {
        document.body.removeChild(input);
      });
    };
    document.body.append(input);
    input.click();
  });
}

/**
 * 获取文件内容
 * @param {*} file
 */
export function getFileContent(file) {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.onload = function(e) {
      resolve(e.target.result);
    };
    reader.readAsText(file);
  });
}
