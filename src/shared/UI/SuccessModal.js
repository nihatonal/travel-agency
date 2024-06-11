import React from 'react';

import Modal from './Modal';

const SuccessModal = props => {
  return (
    <Modal
      onCancel={props.onClear}
      header="Success"
      show={!!props.success}
    >
      <p>{props.msg}</p>
    </Modal>
  );
};

export default SuccessModal;
