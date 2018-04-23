import React from 'react';
import PropTypes from 'prop-types';

function Modal({ title, body, onClose, onSave }) {
    return (
        <div className="modal is-active">
            <div className="modal-background" />
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">{title}</p>
                    <button className="delete" aria-label="close" />
                </header>
                <section className="modal-card-body">{body}</section>
                <footer className="modal-card-foot">
                    <button onClick={onSave} className="button is-success">
                        Save changes
                    </button>
                    <button onClick={onClose} className="button">
                        Cancel
                    </button>
                </footer>
            </div>
        </div>
    );
}

Modal.propTypes = {
    id: PropTypes.string.isRequired,
    body: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func
};

export default Modal;
