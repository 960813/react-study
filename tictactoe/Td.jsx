import React, {useCallback, memo} from 'react';
import {CLICK_CELL} from './TicTacToe';

const Td = memo(({rowIndex, cellIndex, cellData,  dispatch}) => {
    console.log('td rendered');
    const onClickTd = useCallback(() => {
        console.log(rowIndex, cellIndex);
        if (cellData) {
            return;
        }
        dispatch({type: CLICK_CELL, row:rowIndex, cell: cellIndex});
    },[cellData]);
    // 콜백 안에서 참조되는 모든 값은 의조선 값의 배열에 나타나야 한다.(deps)

    return(
        <td onClick={onClickTd}>{cellData}</td>
    )
});

export default Td;