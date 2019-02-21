import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './Editor.module.css';

import { updateDocument, createDocument } from '../../actions/document';
//render by https://github.com/sparksuite/simplemde-markdown-editor
import './simplemde.css';
import SectionBlock from './section-block/SectionBlock';
import SimpleMDE from './simplemde';
import { updateConfigNav } from '../../actions/config';

import 'github-markdown-css/github-markdown.css';
import { formReqeust } from '../../utils';
import FolderList from './folder/FolderList';
class Editor extends Component {
  constructor(props) {
    super(props);
    this.textArea = React.createRef();
    this.simpleMDE = null;
  }
  getToolbarOption() {
    return [
      {
        name: 'folder',
        action: this.onToggleFolder.bind(this),
        title: 'Folder',
        className: 'text-icon icon-folder-open',
        text: '目录'
      },
      {
        name: 'create',
        action: this.onCreateDoc.bind(this),
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
        action: this.exportPDF.bind(this),
        className: 'icon-file-pdf fr text-icon',
        text: '导出PDF',
        title: 'PDF'
      }
    ];
  }
  exportPDF() {
    formReqeust('https://render.goover.top/pdf.php', this.props.document);
  }
  onCreateDoc() {
    this.props.onCreateDoc('Untitled', '# Readme');
  }
  onToggleFolder() {
    this.props.onUpdateNav('folder', !this.isShowBlock('folder'));
  }
  onToggleBlockSection() {
    this.props.onUpdateNav('section', !this.isShowBlock('section'));
  }
  onGuide() {}

  componentDidMount() {
    this.simpleMDE = new SimpleMDE({
      element: this.textArea.current,
      placeholder: 'Type here...',
      autofocus: true,
      spellChecker: false,
      toolbar: this.getToolbarOption(),
      insertTexts: {}
    });
    this.simpleMDE.codemirror.on('change', () => {
      this.props.update(
        this.props.index,
        this.props.document.name,
        this.simpleMDE.value()
      );
    });
    this.setContent();
    if (this.isShowBlock('preview')) {
      this.simpleMDE.toggleSideBySide();
    }
  }

  setContent() {
    this.simpleMDE.value(this.props.document.text);
  }
  insertBlock(content) {
    this.simpleMDE.drawCustomBlock(content);
  }

  render() {
    return (
      <section className={styles.editor}>
        {this.isShowBlock('folder') && (
          <div className={styles.aside}>
            <div className={styles.folder}>
              <FolderList />
            </div>

            <div className={styles.section}>
              <SectionBlock handleSection={this.insertBlock.bind(this)} />
            </div>
          </div>
        )}
        <div className={styles.textArea}>
          <textarea id="textarea" ref={this.textArea} />
        </div>
      </section>
    );
  }
  isShowBlock(key) {
    const item = this.props.navs.find(item => item.key === key);
    return item.show;
  }
  componentDidUpdate(nextProps) {
    if (this.props.document.id !== nextProps.document.id) {
      this.setContent();
    }
  }
}

export default connect(
  state => {
    const index = state.document.index;
    const document = state.document.list[index];
    return {
      document,
      index,
      navs: state.config.navs
    };
  },
  dispatch => {
    return {
      update: (index, name, text) =>
        dispatch(updateDocument(index, name, text)),
      onCreateDoc: (name, text) => dispatch(createDocument(name, text)),
      onUpdateNav: (key, show) => dispatch(updateConfigNav(key, show))
    };
  }
)(Editor);
