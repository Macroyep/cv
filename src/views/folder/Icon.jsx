import React from 'react';
import styles from './Folder.module.css';
import PropTypes from 'prop-types';
function Icon(props) {
  return (
    <a
      onClick={e => {
        e.stopPropagation();
        props.onClick();
      }}
      href="javascript:;"
      className={styles.folderEdit}
    >
      <i className={'iconfont icon-' + props.icon} />
    </a>
  );
}
Icon.propTypes = {
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.string.isRequired
};
export default Icon;
