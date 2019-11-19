import React from 'react';
import { useDispatch } from 'react-redux';
import { ManagerType } from '../services/staticdataLoader';
import { hireManager } from 'modules/managers';

export type ManagerItemProps = {
    info: ManagerType
}

const ManagerItem: React.FC<ManagerItemProps> = (props: ManagerItemProps) => {
    let dispatch = useDispatch();
    let handleHire = () => {
        dispatch(hireManager(props.info.id))
    }

    return (
        <div className="manager-item-root">
            <div className="manager-item-thumb"></div>
            <div className="manager-item-name">
                {props.info.name}
            </div>
            <div className="manager-item-description">
                {props.info.description}
            </div>
            <div className="manager-item-cost">
                $ {props.info.salary}
            </div>
            <div className="manager-item-hire-button" onClick={handleHire}>
                Hire!
            </div>
        </div>
    );
}

export default ManagerItem;