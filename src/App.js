import React, { Component } from 'react';
import Editor from './views/editor/Editor';
import FolderList from './views/folder/FolderList';
import styles from './App.module.css';
import { connect } from 'react-redux';
class App extends Component {
  componentDidMount() {}

  isShowBlock(key) {
    const item = this.props.navs.find(item => item.key === key);
    return item.show;
  }
  render() {
    return (
      <div className={styles.app}>
        <div className={styles.content}>
          {this.isShowBlock('folder') && (
            <div className={styles.folder}>
              <FolderList />
            </div>
          )}
          <div className={styles.editor}>
            <Editor />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  state => {
    return {
      navs: state.config.navs
    };
  },
  dispatch => {
    return {};
  }
)(App);
