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
