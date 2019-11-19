import React from 'react';

const ManagerItem: React.FC = (props) => {
    return (
        <div>
            <div className="manager-item-thumb"/>
            <div className="manager-item-description"/>
            <div className="manager-item-cost"/>
            <div className="manager-item-hire-button"/>
        </div>
    );
}

export default ManagerItem;