import React, { Component } from 'react';
import Icon from './Icon';
import InputText from './InputText';
import styles from './Folder.module.css';
import PropTypes from 'prop-types';

class Item extends Component {
  render() {
    return (
      <li
        className={[
          this.props.active ? styles.active : '',
          styles.folderItem
        ].join(' ')}
        onClick={this.props.onClick}
      >
        <InputText
          name={this.props.name}
          isEditing={this.props.isEditing}
          onBlur={this.props.onBlur}
          onChange={this.props.onChange}
        />
        {!this.props.isEditing && [
          <Icon key="edit" icon="pencil" onClick={this.props.onEdit} />,
          <Icon key="delete" icon="bin" onClick={this.props.onDelete} />
        ]}
      </li>
    );
  }
}
Item.propTypes = {
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  isEditing: PropTypes.bool.isRequired,
  onBlur: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};
export default Item;
