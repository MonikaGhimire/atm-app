import React from 'react';
import './Notification.css';
import { connect } from 'react-redux';

const Notification = (props) => {
    if (props.display) {
        return (
            <div className="Notification">
                <label style={{ color: 'red', fontSize: '15px' }}>{props.error}</label>
            </div>
        );
    };
    return null;
};

const mapStateToProps = state => {
    return {
        error: state.error,
        display: state.display
    };
};

export default connect(mapStateToProps)(Notification);