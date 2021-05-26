/* esLint-disable */

import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {


  let [글제목,글제목변경] = useState(['남자 코트 추천','여자 코트 추천','아기 코트 추천']);
  let [good, setGood] = useState(0);
//  let [버튼, 버튼변경] = useState();
  let [modal, setModal] = useState(false);
  let [modal1,setModal1] = useState(false); 
  let [titleNum,setTitleNum] = useState(0);
  let [input,setInput] = useState('');
  let posts='강남 고기 맛집'

function titleChange(){
  const array =  [...글제목];
  array[0] = '여자 코트 추천';
  글제목변경(array);


}
  function modalChange(){
    if(modal===true){
      <Modal></Modal>
      
    }else if(modal===false){ 
      
    }

  }

  return (
    <div className="App">
      <div className="black-nav">
        개발 Blog
      </div>

      {
        글제목.map(function(props,i){
          return       (
          <div className='list' ket={i}>
          <h3 onClick={() => {setTitleNum(i)}}> {props} <span onClick={()=>{ setGood(good+1)}}>👍</span> {good} </h3>
          <p>2월 17일 발행</p>
          <hr/>       
        </ div>
          )
        })
      }
      <div className="publish">
        <input onChange={ (e) => {setInput(e.target.value)}}/>
        <button onClick={ () => {
            var arrayCopy = [...글제목];
            arrayCopy.unshift(input);
            글제목변경(arrayCopy);
          }}>저장</button>
      </div>

      {/* <button onClick={ () => { setTitleNum(0) }}>버튼1</button>
      <button onClick={ () => { setTitleNum(1) }}>버튼2</button>
      <button onClick={ () => { setTitleNum(2) }}>버튼3</button> */}
      <button onClick={() => {setModal(!modal)}}>열고닫기</button>

      {
        modal === true ? <Modal 글제목={글제목} titleNum={titleNum}></Modal> : null
      }
       
      {
        modal1 === true ? <Modal></Modal> : null
      }


    </div>
  );
}

function Modal(props){
  return(
    <div>
        <div className="modal">
        <h2>제목 {props.글제목[props.titleNum]} </h2>
        <p>날짜 </p>
        <p>상세내용 </p>
      </div>

    </div>
  )
}

export default App;
