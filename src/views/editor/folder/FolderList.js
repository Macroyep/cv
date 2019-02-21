import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './Folder.module.css';
import {
  setCurrentDocument,
  deleteDocument,
  updateDocument
} from '../../../actions/document';
class FolderList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: '',
      editTitleIndex: 0,
      isEditing: false
    };
  }
  onChangeKeyword(e) {
    this.setState({ keyword: e.target.value });
  }

  getListByKeyword() {
    return this.props.list.filter(
      item => item.name.indexOf(this.state.keyword) > -1
    );
  }
  onCreate() {}
  onDelete(index) {
    if (window.confirm('确定删除吗？不能恢复的哦')) {
      this.props.onDelete(index);
    }
  }
  onEdit(index) {
    this.setState({
      editTitleIndex: index,
      isEditing: true
    });
  }
  onKeyDown(e) {
    if (e.keyCode !== 13) {
      return;
    }
    this.onBlur();
  }
  onBlur() {
    this.setState({
      editTitleIndex: 0,
      isEditing: false
    });
  }

  isEditingCurrent(index) {
    return this.state.isEditing && index === this.state.editTitleIndex;
  }
  renderFolderName(index, name, text) {
    if (this.isEditingCurrent(index)) {
      return (
        <input
          className={styles.folderInput}
          value={name}
          autoFocus
          onBlur={this.onBlur.bind(this)}
          onKeyDown={this.onKeyDown.bind(this)}
          onChange={ev => this.props.onUpdate(index, ev.target.value, text)}
        />
      );
    }
    return <div className={styles.folderName}>{name}</div>;
  }
  renderDeleteBtn(index) {
    if (this.isEditingCurrent(index)) {
      return '';
    }
    return (
      <a
        onClick={e => {
          e.stopPropagation();
          this.onDelete(index);
        }}
        href="javascript:;"
        className={styles.folderEdit}
      >
        <i className="iconfont icon-bin" />
      </a>
    );
  }

  renderEditBtn(index) {
    if (this.isEditingCurrent(index)) {
      return '';
    }
    return (
      <a
        onClick={() => this.onEdit(index)}
        href="javascript:;"
        className={styles.folderEdit}
      >
        <i className="iconfont icon-pencil" />
      </a>
    );
  }

  render() {
    return (
      <div className={styles.list}>
        {/* <header className={styles.header}>
          <img className={styles.logo} src={logo} />
        </header> */}
        <section className={styles.searchBox}>
          <input
            type="search"
            value={this.state.keyword}
            placeholder="搜索..."
            onChange={this.onChangeKeyword.bind(this)}
          />
        </section>
        <ul className={styles.folderList}>
          {this.getListByKeyword().map((item, index) => (
            <li
              className={[
                index === this.props.index ? styles.active : '',
                styles.folderItem
              ].join(' ')}
              onClick={() => this.props.setCurrent(index)}
              key={index}
            >
              {this.renderFolderName(index, item.name, item.text)}
              {this.renderEditBtn(index)}
              {this.renderDeleteBtn(index)}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default connect(
  state => {
    return {
      list: state.document.list,
      index: state.document.index
    };
  },
  dispatch => {
    return {
      setCurrent: index => dispatch(setCurrentDocument(index)),
      onDelete: index => dispatch(deleteDocument(index)),
      onUpdate: (index, name, text) =>
        dispatch(updateDocument(index, name, text))
    };
  }
)(FolderList);
