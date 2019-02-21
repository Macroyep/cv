import React, { Component } from 'react';
import Editor from './views/editor/Editor';
import styles from './App.module.css';
import { connect } from 'react-redux';
class App extends Component {
  render() {
    return (
      <div className={styles.app}>
        <div className={styles.content}>
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
    return {};
  },
  dispatch => {
    return {};
  }
)(App);
