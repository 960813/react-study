const React = require('react');
const {useState, useRef, useEffect} = React;

const rspCoords = {
    rock: '0',
    scissor: '-142px',
    paper: '-284px',

};

const scores = {
    rock: 1,
    scissor: 0,
    paper: -1
};

const computerChoice = (imgCoord) => {
    return Object.entries(rspCoords).find(function(v) {
        return v[1] === imgCoord;
    })[0];
};

const RSP = () => {
    const [result, setResult] = useState('');
    const [score, setScore] = useState(0);
    const [imgCoord, setImgCoord] = useState(rspCoords.rock);

    const interval = useRef(null);

    useEffect(()=>{ // componentDidMount, componentDidUpdate 역할(1대1 대응은 아님)
        interval.current = setInterval(changeHand,100);
        return  () => { // componentWillUnmount 역할
            clearInterval(interval.current);
        }
    },[imgCoord]);

    const changeHand = () =>{
       if(imgCoord === rspCoords.rock){
           setImgCoord(rspCoords.scissor);
       } else if (imgCoord === rspCoords.scissor){
           setImgCoord(rspCoords.paper);
       } else if (imgCoord === rspCoords.paper){
           setImgCoord(rspCoords.rock);
       }
    };
    const onClickBtn = (choice) => () => {
        clearInterval(interval.current);
        const myScore = scores[choice];
        const cpuScore = scores[computerChoice(imgCoord)];
        const diff = myScore - cpuScore;
        if (diff === 0) {
            setResult('비겼습니다.');
        } else if ([-2,1].includes(diff)) {
            setResult('이겼습니다.');
            setScore((prevScore)=>{
                return prevScore + 1;
            });
        } else {
            setResult('패배하였습니다..');
            setScore((prevScore)=>{
                return prevScore - 1;
            });
        }
        setTimeout(()=>{
            interval.current = setInterval(changeHand,100);
        },1000);
    };
    
/*  컴포넌트 라이프사이클
    // 클래스의 경우 -> constructor(state같은 부분) -> 최초 render -> ref 설정 -> componentDidMount
    // -> (setState/props가 변경=> shouldComponentUpdate(true) -> render -> componentDidUpdate)
    // 부모가 나를 없앴을 때( componentWillUnmount ) -> 소멸
    
    // 컴포넌트가 첫 렌더링된 직후, 비동기 요청을 많이 함(setInterval 등)
    // componentDidMount(){
    //
    // }

    // 리렌더링 후
    // componentDidUpdate() {
    //
    // }

    // 컴포넌트가 제거되기 직전, 비동기 요청 정리
    // componentWillUnmount(){
    //
    // }
*/


/* Hooks 라이프사이클

 */
    return(
        <>
            <div id="computer" style={{background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0 ` }} />
            <div>
                <button id="rock" className="btn" onClick={onClickBtn('rock')}>바위</button>
                <button id="scissor" className="btn" onClick={onClickBtn('scissor')}>가위</button>
                <button id="paper" className="btn" onClick={onClickBtn('paper')}>보</button>
            </div>
            <div>{result}</div>
            <div>현재 {score}점</div>
        </>
    );
};

module.exports = RSP;