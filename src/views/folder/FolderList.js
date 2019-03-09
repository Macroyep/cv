import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './Folder.module.css';
import Item from './Item';
import PropTypes from 'prop-types';

import {
  setCurrentDocument,
  deleteDocument,
  updateDocument
} from '@/actions/document';
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

  onBlur() {
    this.setState({
      editTitleIndex: 0,
      isEditing: false
    });
  }

  isEditingCurrent(index) {
    return this.state.isEditing && index === this.state.editTitleIndex;
  }
  render() {
    return (
      <div className={styles.list}>
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
            <Item
              key={index + item.name}
              name={item.name}
              active={index === this.props.index}
              isEditing={this.isEditingCurrent(index)}
              onBlur={this.onBlur.bind(this)}
              onClick={() => this.props.setCurrent(index)}
              onChange={value => this.props.onUpdate(index, value, item.text)}
              onEdit={() => this.onEdit(index)}
              onDelete={() => this.onDelete(index)}
            />
          ))}
        </ul>
      </div>
    );
  }
}
FolderList.propTypes = {
  list: PropTypes.array.isRequired
};
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
