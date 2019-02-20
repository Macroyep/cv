import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './Editor.module.css';

import { updateDocument, createDocument } from '../../actions/document';

//render by https://github.com/sparksuite/simplemde-markdown-editor
import './simplemde.css';
import './github-light.css';
import SectionBlock from './section-block/SectionBlock';
import SimpleMDE from './simplemde';
import { updateConfigNav } from '../../actions/config';

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
        className: 'text-icon fa fa-folder',
        text: '目录'
      },
      {
        name: 'block-section',
        action: this.onToggleBlockSection.bind(this),
        title: 'Folder',
        className: 'text-icon fa fa-paragraph',
        text: '片段'
      },
      {
        name: 'create',
        action: this.onCreateDoc.bind(this),
        title: 'Create',
        className: 'text-icon fa fa-plus',
        text: '创建'
      },
      {
        name: 'bold',
        action: SimpleMDE.toggleBold,
        className: 'fa fa-bold',
        title: 'Bold'
      },
      {
        name: 'italic',
        action: SimpleMDE.toggleItalic,
        className: 'fa fa-italic',
        title: 'Italic'
      },
      {
        name: 'strikethrough',
        action: SimpleMDE.toggleStrikethrough,
        className: 'fa fa-strikethrough',
        title: 'Strikethrough'
      },
      {
        name: 'heading-1',
        action: SimpleMDE.toggleHeading1,
        className: 'fa fa-header fa-header-x fa-header-1',
        title: 'Big Heading'
      },
      {
        name: 'heading-2',
        action: SimpleMDE.toggleHeading2,
        className: 'fa fa-header fa-header-x fa-header-2',
        title: 'Medium Heading'
      },
      {
        name: 'heading-3',
        action: SimpleMDE.toggleHeading3,
        className: 'fa fa-header fa-header-x fa-header-3',
        title: 'Small Heading'
      },
      {
        name: 'code',
        action: SimpleMDE.toggleCodeBlock,
        className: 'fa fa-code',
        title: 'Code'
      },

      {
        name: 'quote',
        action: SimpleMDE.toggleBlockquote,
        className: 'fa fa-quote-left',
        title: 'Quote'
      },
      {
        name: 'unordered-list',
        action: SimpleMDE.toggleUnorderedList,
        className: 'fa fa-list-ul',
        title: 'Generic List'
      },
      {
        name: 'ordered-list',
        action: SimpleMDE.toggleOrderedList,
        className: 'fa fa-list-ol',
        title: 'Numbered List'
      },
      {
        name: 'clean-block',
        action: SimpleMDE.cleanBlock,
        className: 'fa fa-eraser fa-clean-block',
        title: 'Clean block'
      },
      {
        name: 'link',
        action: SimpleMDE.drawLink,
        className: 'fa fa-link',
        title: 'Create Link'
      },
      {
        name: 'image',
        action: SimpleMDE.drawImage,
        className: 'fa fa-picture-o',
        title: 'Insert Image'
      },
      {
        name: 'table',
        action: SimpleMDE.drawTable,
        className: 'fa fa-table',
        title: 'Insert Table'
      },
      {
        name: 'horizontal-rule',
        action: SimpleMDE.drawHorizontalRule,
        className: 'fa fa-minus',
        title: 'Insert Horizontal Line'
      },
      {
        name: 'preview',
        action: editor => {
          SimpleMDE.togglePreview(editor);
          this.props.onUpdateNav('preview', false);
        },
        className: 'fa fa-eye no-disable',
        title: 'Toggle Preview'
      },
      {
        name: 'side-by-side',
        // action: SimpleMDE.toggleSideBySide,
        action: editor => {
          const show = SimpleMDE.toggleSideBySide(editor);
          this.props.onUpdateNav('preview', show);
        },
        className: 'fa fa-columns no-disable no-mobile',
        title: 'Toggle Side by Side'
      },
      {
        name: 'guide',
        action: 'https://coding.net/help/doc/project/markdown.html#Markdown',
        className: 'fa fa-question-circle fr',
        title: 'Guide'
      },
      {
        name: 'github',
        action: 'https://github.com/macroyep/cv',
        className: 'fa fa-github fr',
        title: 'GitHub'
      }
    ];
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
        {this.isShowBlock('section') && (
          <div className={styles.sectionBlock}>
            <SectionBlock handleSection={this.insertBlock.bind(this)} />
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
