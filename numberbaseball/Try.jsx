import React from 'react';

const Try = React.memo(({ tryInfo }) =>{
    return (
        <li>
            <div>{tryInfo.try}</div>
            <div>{tryInfo.result}</div>
        </li>
    );
});
module.exports = Try;
//export default Try;