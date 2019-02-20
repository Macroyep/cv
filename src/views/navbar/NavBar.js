import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './NavBar.module.css';
import { createDocument } from '../../actions/document';
import { updateConfigNav } from '../../actions/config';

class NavBar extends Component {
  constructor(props) {
    super(props);
  }
  onClickNav(key, show) {
    this.props.onUpdateNav(key, show);
  }
  onCreateDoc() {
    this.props.onCreateDoc('Untitled', '# Readme');
  }
  render() {
    return (
      <div className={styles.navbar}>
        <a
          onClick={this.onCreateDoc.bind(this)}
          className={[styles.button, styles.createButton].join(' ')}
          href="javascript:;"
        >
          <i className="iconfont icon-add" />
          创建
        </a>
        <div className={styles.panels}>
          {this.props.navs.map(nav => (
            <a
              onClick={() => this.onClickNav(nav.key, !nav.show)}
              className={[
                styles.button,
                nav.show ? styles.buttonActive : ''
              ].join(' ')}
              key={nav.key}
              href="javascript:;"
            >
              {nav.name}
            </a>
          ))}
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
    return {
      onCreateDoc: (name, text) => dispatch(createDocument(name, text)),
      onUpdateNav: (key, show) => dispatch(updateConfigNav(key, show))
    };
  }
)(NavBar);
