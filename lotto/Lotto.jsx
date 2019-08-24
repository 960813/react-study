const React = require('react');
const {useState, useRef, useEffect, useMemo, useCallback} = React;
const Ball = require('./Ball');

function getWinNumbers() {
    console.log('getWinNumbers');
    const candidate = Array(45).fill().map((v, i) => i + 1);
    const shuffle = [];
    while (candidate.length > 0 ){
        shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
    }
    const bonusNumber = shuffle[shuffle.length - 1];
    const winNumbers = shuffle.slice(0, 6).sort((p, c)=> p - c );
    return [...winNumbers, bonusNumber];
}

const Lotto = () => {
    const lottoNumbers = useMemo(() => getWinNumbers(),[])
    const [winNumbers,setWinNumbers] = useState(lottoNumbers); // 당첨 숫자들
    const [winBalls,setWinBalls] = useState([]); // 당첨 숫자 중 앞에 6개
    const [bonus,setBonus] = useState(null); // 보너스공
    const [redo, setRedo] = useState(false);
    const timeout = useRef([]);

    const runTimeouts = () => {
        console.log('useEffect');
        for (let i = 0; i < winNumbers.length - 1; i++) {
            timeout[i] = setTimeout(() => {
                setWinBalls((prevWinBalls) => [...prevWinBalls, winNumbers[i]]);
            }, (i + 1) * 1000);
        }
        timeout[6] = setTimeout(() => {
            setBonus(winNumbers[6]);
            setRedo(true);
        }, 7000);
    };

    useEffect(()=> {
        console.log('didUpdate',winBalls);
        if ( winBalls.length === 0 ) {
            runTimeouts();
        }
        return () => {
            timeout.current.forEach((v)=>{
                clearTimeout(v);
            });
        }
    },[timeout.current/*winBalls,bonus,redo*/]);
    // 빈 배열이면 componentDidMount와 동일
    // 배열에 요소가 있으면 componentDidMount랑 componentDidUpdate 둘다 수행

    const onClickRedo = useCallback(() =>{
        console.log(winNumbers);
        setWinNumbers(getWinNumbers());
        setWinBalls([]);
        setBonus(null);
        setRedo(false);
        timeout.current = [];
    },[winNumbers]);
    // useCallback은 함수 자체를 기억함.(함수가 재생성되지 않음)

    return(
        <>
            <div>당첨 숫자</div>
            <div id="결과창">
                {winBalls.map((v) => <Ball key={v} number={v} />)}
            </div>
            <div>보너스!</div>
            {bonus && <Ball number={bonus} />}
            {redo && <button onClick={onClickRedo}>한 번 더!</button>}
        </>
    );
}

module.exports = Lotto;