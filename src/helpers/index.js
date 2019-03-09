import { makeStorage, createFileAndDownload } from '@/utils/index';
import { wrapHTML } from './html-template-helper';
import { formReqeust } from '@/utils/request';
let storage = {};
/**
 * 获取存储空间
 * @param {*} key
 */
export function getStorage(key) {
  if (!storage[key]) {
    storage[key] = makeStorage(key);
  }
  return storage[key];
}
/**
 * 获取所有的存储
 */
export function getAllStorage() {
  return storage;
}
/**
 * 下载网站配置文件
 */
export function downloadSiteConfig(
  fileName = window.location.hostname + '-' + Date.now() + '.json'
) {
  const jsonStr = getStorage('document').get(true);
  createFileAndDownload(jsonStr, fileName);
}

/**
 * 下载HTML文件
 * @param {*} html
 * @param {*} name
 */
export function downloadMDHTML(html, name) {
  const content = wrapHTML(html, name);
  createFileAndDownload(content, name + '.html');
}

/**
 * 导出PDF
 */
export function exportPDF(mdStr) {
  // formReqeust('http://public.test/pdf.php', this.props.document);
  formReqeust('https://render.goover.top/pdf.php', mdStr);
}
