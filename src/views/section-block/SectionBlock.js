import React, { Component } from 'react';
import styles from './SectionBlock.module.css';
import SECTION_LIST from './config';
import PropTypes from 'prop-types';
class SectionBlock extends Component {
  constructor(props) {
    super(props);
  }
  onClickItem(key) {
    const { content } = SECTION_LIST.find(item => item.key === key);
    this.props.handleSection(content);
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
SectionBlock.propTypes = {
  handleSection: PropTypes.func.isRequired
};
export default SectionBlock;
