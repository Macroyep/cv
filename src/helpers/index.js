import {
  makeStorage,
  createFileAndDownload,
  getFileContent,
  getLocalFile
} from '@/utils/index';
import { wrapHTML } from './html-template-helper';
import { formReqeust } from '@/utils/request';
import store from '@/stores/index';
import { appendList } from '@/actions/document';
let storage = {};
/**
 * 获取存储空间
 * @param {*} key
 */
export function getStorage(key) {
  !storage && (storage = {});

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
export function downloadDocuments(
  fileName = window.location.hostname + '-' + Date.now() + '.json'
) {
  const doc = getStorage('document').get();
  const jsonStr = JSON.stringify(doc.list);
  createFileAndDownload(jsonStr, fileName);
}

/**
 * 导入文档s
 */
export async function importDocuments() {
  const [file] = await getLocalFile();
  if (file && file.type === 'application/json') {
    const content = await getFileContent(file);
    const list = JSON.parse(content);
    store.dispatch(appendList(list));
  }
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
