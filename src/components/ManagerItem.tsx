import React from 'react';
import { useDispatch } from 'react-redux';
import { hireManagerAction, ManagerType } from 'modules/managers';
import { bizActions } from 'modules/business';

export type ManagerItemProps = {
    info: ManagerType
}

/**
 * ManagerItem Functional Component
 * @param {ManagerType} props Manager item's data 
 */
const ManagerItem: React.FC<ManagerItemProps> = (props: ManagerItemProps) => {
    const dispatch = useDispatch();
    const manager = props.info;
    // click handler when click hire button
    const handleHire = () => {
        let { bizHireMgrAction } = bizActions.get(manager.part);
        dispatch(hireManagerAction(manager.id)); // register to manager store, prevent hire already hired manager
        // handling business action within type of each manager
        bizHireMgrAction && dispatch(bizHireMgrAction(manager)); 
    }

    return (
        <div className="manager-item-root">
            <div className="manager-item-thumb"></div>
            <div className="manager-item-name">
                {manager.name}
            </div>
            <div className="manager-item-description">
                {manager.description}
            </div>
            <div className="manager-item-cost">
                $ {manager.salary}
            </div>
            <div className="manager-item-hire-button" onClick={handleHire}>
                Hire!
            </div>
        </div>
    );
}

export default ManagerItem;