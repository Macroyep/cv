import SimpleMDE from './editor/simplemde';
import { exportPDF } from '@/helpers';

/**
 * 需要绑定this
 */
export function buildToolbar() {
  return [
    {
      name: 'folder',
      action: () => {
        this.props.onUpdateNav('folder', !this.isShowBlock('folder'));
      },
      title: 'Folder',
      className: 'text-icon icon-folder-open',
      text: '目录'
    },
    {
      name: 'create',
      action: () => {
        this.props.onCreateDoc('Untitled', '# Readme');
      },
      title: 'Create',
      className: 'text-icon icon-folder-plus',
      text: '创建'
    },
    {
      name: 'bold',
      action: SimpleMDE.toggleBold,
      className: 'icon-bold',
      title: 'Bold'
    },
    {
      name: 'italic',
      action: SimpleMDE.toggleItalic,
      className: 'icon-italic',
      title: 'Italic'
    },
    {
      name: 'strikethrough',
      action: SimpleMDE.toggleStrikethrough,
      className: 'icon-strikethrough',
      title: 'Strikethrough'
    },
    {
      name: 'heading-1',
      action: SimpleMDE.toggleHeading1,
      className: 'icon-header fa-header-x fa-header-1',
      title: 'Big Heading'
    },
    {
      name: 'heading-2',
      action: SimpleMDE.toggleHeading2,
      className: 'icon-header fa-header-x fa-header-2',
      title: 'Medium Heading'
    },
    {
      name: 'heading-3',
      action: SimpleMDE.toggleHeading3,
      className: 'icon-header fa-header-x fa-header-3',
      title: 'Small Heading'
    },
    {
      name: 'code',
      action: SimpleMDE.toggleCodeBlock,
      className: 'icon-embed2',
      title: 'Code'
    },

    {
      name: 'quote',
      action: SimpleMDE.toggleBlockquote,
      className: 'icon-quotes-left',
      title: 'Quote'
    },
    {
      name: 'unordered-list',
      action: SimpleMDE.toggleUnorderedList,
      className: 'icon-list2',
      title: 'Generic List'
    },
    {
      name: 'ordered-list',
      action: SimpleMDE.toggleOrderedList,
      className: 'icon-list-numbered',
      title: 'Numbered List'
    },
    {
      name: 'link',
      action: SimpleMDE.drawLink,
      className: 'icon-link',
      title: 'Create Link'
    },
    {
      name: 'image',
      action: SimpleMDE.drawImage,
      className: 'icon-image',
      title: 'Insert Image'
    },
    {
      name: 'table',
      action: SimpleMDE.drawTable,
      className: 'icon-table2',
      title: 'Insert Table'
    },
    {
      name: 'horizontal-rule',
      action: SimpleMDE.drawHorizontalRule,
      className: 'icon-minus',
      title: 'Insert Horizontal Line'
    },
    {
      name: 'preview',
      action: editor => {
        SimpleMDE.togglePreview(editor);
        this.props.onUpdateNav('preview', false);
      },
      className: 'icon-eye no-disable',
      title: 'Toggle Preview'
    },
    {
      name: 'side-by-side',
      // action: SimpleMDE.toggleSideBySide,
      action: editor => {
        const show = SimpleMDE.toggleSideBySide(editor);
        this.props.onUpdateNav('preview', show);
      },
      className: 'icon-columns no-disable no-mobile hide-on-small',
      title: 'Toggle Side by Side'
    },
    {
      name: 'guide',
      action: 'https://coding.net/help/doc/project/markdown.html#Markdown',
      className: 'icon-question fr',
      title: 'Guide'
    },
    {
      name: 'github',
      action: 'https://github.com/md-cv',
      className: 'icon-github fr',
      title: 'GitHub'
    },
    {
      name: 'pdf',
      action: () => {
        exportPDF(this.props.document);
      },
      hover: el => {
        this.state.dropdownName = 'export';
        if (el) {
          this.onPDFBtnHover(el);
        } else {
          this.dropdownHoverTimeout = setTimeout(() => {
            this.onPDFBtnHover(el);
          }, 500);
        }
      },
      className: 'icon-file-pdf fr text-icon',
      text: '导出PDF',
      title: 'PDF'
    }
  ];
}
