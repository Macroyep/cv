import React from 'react';
import styles from './Folder.module.css';
import PropTypes from 'prop-types';

function InputText({ name, isEditing, onBlur, onChange }) {
  if (!isEditing) {
    return <div className={styles.folderName}>{name}</div>;
  }
  return (
    <input
      className={styles.folderInput}
      value={name}
      autoFocus
      onBlur={onBlur}
      onKeyDown={e => {
        if (e.keyCode !== 13) {
          return;
        }
        onBlur();
      }}
      onChange={ev => onChange(ev.target.value)}
    />
  );
}
InputText.propTypes = {
  name: PropTypes.string.isRequired,
  isEditing: PropTypes.bool.isRequired,
  onBlur: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
};

export default InputText;
