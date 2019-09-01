import React, {useContext, useCallback, memo} from 'react';
import {CLICK_MINE, CODE, FLAG_CELL, NORMALIZE_CELL, OPEN_CELL, QUESTION_CELL, TableContext} from "./MinSearch";

const getTdStyles = (code) => {
    switch(code){
        case CODE.NORMAL:
        case CODE.MINE:
            return {
                background: '#444'
            };
        case CODE.OPENED:
            return {
                background: 'white'
            };
        case CODE.FLAG:
        case CODE.FLAG_MINE:
            return {
                background: 'red'
            };
        case CODE.QUESTION:
        case CODE.QUESTION_MINE:
            return {
                background: 'yellow'
            };
        default:
            return {
                background: 'white'
            };
    }
};

const getTdText = (code) => {
    switch(code) {
        case CODE.NORMAL:
            return '';
        case CODE.MINE:
            return '';
        case CODE.CLICKED_MINE:
            return '펑';
        case CODE.FLAG:
        case CODE.FLAG_MINE:
            return '!';
        case CODE.QUESTION:
        case CODE.QUESTION_MINE:
            return '?';
        default:
            return code || '';
    }

};


const Td = memo(({rowIndex, cellIndex}) =>{
    const { tableData, dispatch, halted } = useContext(TableContext);

    const onClickTd = useCallback(()=>{
        if (halted){
            return;
        }
        switch(tableData[rowIndex][cellIndex]){
            case CODE.OPENED:
            case CODE.FLAG:
            case CODE.FLAG_MINE:
            case CODE.QUESTION:
            case CODE.QUESTION_MINE:
                return;
            case CODE.NORMAL:
                dispatch({type: OPEN_CELL, row:rowIndex, cell:cellIndex});
                return;
            case CODE.MINE:
                dispatch({type: CLICK_MINE, row: rowIndex, cell: cellIndex });
                return;
            default:
                return;
        }
    },[tableData[rowIndex][cellIndex],halted]);

    const onRightClickTd = useCallback((e)=>{
        e.preventDefault();
        if (halted){
            return;
        }
        switch(tableData[rowIndex][cellIndex]){
            case CODE.NORMAL:
            case CODE.MINE:
                dispatch({type:FLAG_CELL, row: rowIndex, cell: cellIndex});
                return;
            case CODE.FLAG_MINE:
            case CODE.FLAG:
                dispatch({type:QUESTION_CELL, row:rowIndex, cell: cellIndex});
                return;
            case CODE.QUESTION_MINE:
            case CODE.QUESTION:
                dispatch({type:NORMALIZE_CELL, row:rowIndex, cell: cellIndex});
                return;

            default:
                return;
        }
    },[tableData[rowIndex][cellIndex],halted]);

    return <RealTd onClickTd={onClickTd} onRightClickTd={onRightClickTd} data={tableData[rowIndex][cellIndex]} />
});

const RealTd = memo(({onClickTd, onRightClickTd, data})=> {
    return (
        <>
            <td
                style={getTdStyles(data)}
                onClick={onClickTd}
                onContextMenu={onRightClickTd}
            >
                {getTdText(data)}
            </td>
        </>
    );
});

export default Td;