import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './SectionBlock.module.css';
import SECTION_LIST from './config';
class SectionBlock extends Component {
  constructor(props) {
    super(props);
  }
  onClickItem(key) {
    const item = SECTION_LIST.find(item => item.key === key);
    if (typeof this.props.handleSection === 'function') {
      this.props.handleSection(item.content);
    }
  }
  render() {
    return (
      <div className={styles.list}>
        <header className={styles.header}>
          <span>常用片段</span>
          <a
            href="https://github.com/geekcompany/ResumeSample"
            title="更多"
            target="_blank"
            className="fr"
          >
            <i className="icon-question" />
          </a>
        </header>
        <ul className={styles.folderList}>
          {SECTION_LIST.map((item, index) => (
            <li onClick={() => this.onClickItem(item.key)} key={index}>
              {item.name}
            </li>
          ))}
        </ul>
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
)(SectionBlock);
