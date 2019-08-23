import React, {useState} from 'react';

const ResponseCheck = () => {
    const [state, setState] = useState('waiting');
    const [message, setMessage] = useState('클릭해서 시작하세요.');
    const [result, setResult] = useState([]);

    const onClickScreen = () => {

    };

    const renderAverage = () => {
        return result.length === 0
            ? null
            : < div > 평균 시간: {result.reduce((a,c)=>a+c) / result.length}ms</div>
    };

    return (
        <>
            <div
                id="screen"
                className={state}
                onClick={onClickScreen}
            >
                {message}

            </div>
            {renderAverage}
            {/*reduce => 합계구하는 함수*/}
        </>
    );
};

export default ResponseCheck;