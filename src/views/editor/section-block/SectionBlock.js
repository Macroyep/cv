import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './SectionBlock.module.css';

class SectionBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [
        {
          name: '标题',
          key: 'title',
          content: '\n### 标题\n'
        },
        {
          name: '个人信息',
          key: 'profile',
          content: '\n### 个人信息\n'
        },
        {
          name: '技能清单',
          key: 'skill',
          content: '\n### 技能清单\n'
        },
        {
          name: '工作经历',
          key: 'experience',
          content: '\n### 工作经历\n'
        },
        {
          name: '项目与作品',
          key: 'project',
          content: '\n### 项目与作品\n'
        },
        {
          name: '致谢',
          key: 'thank',
          content: '\n### 致谢\n'
        }
      ]
    };
  }
  onClickItem(key) {
    const item = this.state.list.find(item => item.key === key);
    if (typeof this.props.handleSection === 'function') {
      this.props.handleSection(item.content);
    }
  }
  render() {
    return (
      <div className={styles.list}>
        <header className={styles.header}>
          <div>常用片段</div>
        </header>
        <ul className={styles.folderList}>
          {this.state.list.map((item, index) => (
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
