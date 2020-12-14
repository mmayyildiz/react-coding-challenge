import React from 'react'
import './style.css';

export default function Popup({ content, onClose }) {
    return (
        <div className="popup">
            <button onClick={onClose}
                className="popup__close"
            >
                x
          </button>
            <div className="popup__content">
                {content}
            </div>
        </div>
    )
}
