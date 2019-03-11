import React, { Component } from 'react';
import { connect } from 'react-redux';
import marked from 'marked';

import { updateDocument, createDocument } from '../actions/document';
import SectionBlock from './section-block/SectionBlock';
import SimpleMDE from './editor/simplemde';
import { updateConfigNav } from '../actions/config';
import { downloadMDHTML, downloadDocuments, importDocuments } from '@/helpers';
import { createFileAndDownload } from '@/utils';
import FolderList from './folder/FolderList';
import Dropdown from './export/Dropdown';
import styles from './index.module.css';
import 'github-markdown-css/github-markdown.css';
import { buildToolbar } from './helper';

class Editor extends Component {
  constructor(props) {
    super(props);
    this.getToolbarOption = buildToolbar.bind(this);
    this.textArea = React.createRef();
    this.simpleMDE = null;
    // for dropdown
    this.state = {
      hoverEl: null,
      dropdownName: 'export'
    };
    this.dropdownHoverTimeout = null;
  }

  onPDFBtnHover(hoverEl) {
    clearTimeout(this.dropdownHoverTimeout);
    this.setState({
      hoverEl
    });
  }

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
  getDropdownItems() {
    if (this.state.dropdownName === 'export') {
      return [
        {
          key: 'md',
          title: '导出MD文件'
        },
        {
          key: 'html',
          title: '导出HTML'
        },
        {
          key: 'export',
          title: '导出列表'
        },
        {
          key: 'import',
          title: '导入列表'
        }
      ];
    }
    return [];
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
          {this.state.hoverEl && (
            <Dropdown
              items={this.getDropdownItems()}
              onClickItem={key => this.onClickDropItem(key)}
              mouseIn={this.onDropdownMoveIn.bind(this)}
              mouseOut={this.moDropdownMoveOut.bind(this)}
              hoverEl={this.state.hoverEl}
            />
          )}
          <textarea id="textarea" ref={this.textArea} />
        </div>
      </section>
    );
  }
  onClickDropItem(key) {
    const { text, name } = this.props.document;

    switch (key) {
      case 'md':
        createFileAndDownload(text, name + '.md');
        break;

      case 'html':
        downloadMDHTML(marked(text), name);
        break;

      case 'export':
        downloadDocuments();
        break;

      case 'import':
        importDocuments();
        break;
    }
  }
  onDropdownMoveIn() {
    setTimeout(() => {
      clearTimeout(this.dropdownHoverTimeout);
    });
  }
  moDropdownMoveOut() {
    this.setState({ hoverEl: null });
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
