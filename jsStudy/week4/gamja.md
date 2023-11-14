## 4주차 JS DIVE

### 이벤트 버블링

웹 페이지에서 이벤트가 발생했을 때, 해당 이벤트가 최상위 요소에서부터 시작하여 하위 요소로 전파되는 현상
이벤트 버블링은 HTML 문서의 요소 구조를 따라 이벤트가 전파되는 방식을 설명

===================================================================

<div id="outer">
  <div id="inner">
    <button id="btn">버튼</button>
  </div>
</div>

버튼 요소(#btn)에서 클릭 이벤트가 발생
부모 요소인 #inner 요소로 이벤트가 전파
#inner 요소의 부모인 #outer 요소로 이벤트가 전파
이벤트는 문서의 최상위 요소인 <html> 요소까지 전파

이벤트 버블링은 이벤트 핸들러를 등록할 때 유용하게 활용될 수 있으며, 상위 요소에서 하위 요소로 이벤트가 전파되므로, 이벤트를 상위 요소에서 처리하거나 중첩된 요소 간의 이벤트 처리를 관리하기 용이

====================================================================

### 라이프 사이클

 웹 애플리케이션 또는 라이브러리의 컴포넌트 또는 객체가 생성되고 업데이트되며 소멸하는 과정을 설명하는 개념

=====================================================================

1. 생성 (Initialization)
: 객체나 컴포넌트가 생성될 때 초기화 단계가 진행
이때 필요한 리소스를 할당하고 초기 설정을 수행

2. 업데이트 (Update)
: 객체나 컴포넌트가 데이터나 상태를 변경할 때 업데이트 단계가 발생
이 단계에서는 UI 갱신, 상태 업데이트, 이벤트 처리 등 수행

3. 제거 (Destruction)
: 객체나 컴포넌트가 사용이 끝나면 라이프사이클의 종료 단계 진행
이때 할당된 리소스를 해제하고 정리 작업을 수행


+ 
라이프사이클 이벤트 또는 훅 (hook)은 주로 프레임워크나 라이브러리에서 제공되며, 이러한 단계에서 추가적인 로직을 실행하거나 사용자 정의 동작을 추가할 수 있게 도와줍니다.

예를 들어, 리액트 (React) 라이브러리에서는 컴포넌트의 라이프사이클 메서드 (예: componentDidMount, componentDidUpdate, componentWillUnmount 등)를 통해 컴포넌트의 생명주기를 관리하고 컴포넌트가 생성, 업데이트 및 제거될 때 추가 작업을 수행

==================================================================

### 이벤트 버블링 추상화

이벤트 버블링을 통한 등록 과정을 메소드로 만들어서 사용하면 코드가 더 깔끔해진다

html
<div id="container">
  <button id="button1">버튼 1</button>
  <button id="button2">버튼 2</button>
  <button id="button3">버튼 3</button>
</div>

JS
// 이벤트 핸들러를 등록하는 메소드
function addEventToContainer(eventType, selector, handler) {
  const container = document.querySelector('#container');
  container.addEventListener(eventType, function (event) {
    if (event.target.matches(selector)) {
      handler(event);
    }
  });
}

// 버튼 클릭 이벤트를 처리하는 함수
function handleButtonClick(event) {
  console.log('클릭된 버튼의 ID:', event.target.id);
}

// 이벤트 핸들러를 등록
addEventToContainer('click', '#button1', handleButtonClick);
addEventToContainer('click', '#button2', handleButtonClick);
addEventToContainer('click', '#button3', handleButtonClick);

### addEventToContainer라는 메소드가 수행하는 일
1. container 요소를 선택
2. container에 대해 이벤트 핸들러를 등록
3. 이벤트가 발생하면, 이벤트 객체의 target을 확인하여 지정된 selector와 일치하는 요소가 클릭되었는지를 검사
4. 일치하는 경우, 지정된 handler 함수를 호출

===================================================================

### 이렇게 할 시 장점으로 알맞은 것을 모두 고르시오 (5점)

A. 중복 코드를 줄일 수 있다.
B. 여러 요소에 대한 이벤트 핸들러를 간단하게 등록할 수 있다.
C. 코드가 더 깔끔해진다.
D. 유지보수가 더 쉬워진다.

정답: ABCD

====================================================================

### event를 각각의 하위 요소가 아니라 component의 target 자체에 등록하는 것이다.
### 따라서 component가 생성되는 시점에만 이벤트 등록을 해놓으면 추가로 등록할 필요가 없어진다.

<div id="container">
  <button id="button1">버튼 1</button>
  <button id="button2">버튼 2</button>
  <button id="button3">버튼 3</button>
</div>

+ 각 버튼에 이벤트 핸들러를 등록

const button1 = document.getElementById('button1');
const button2 = document.getElementById('button2');
const button3 = document.getElementById('button3');

button1.addEventListener('click', () => {
  console.log('버튼 1이 클릭되었습니다.');
});

button2.addEventListener('click', () => {
  console.log('버튼 2가 클릭되었습니다.');
});

button3.addEventListener('click', () => {
  console.log('버튼 3이 클릭되었습니다.');
});

-------------------------------------------

const container = document.getElementById('container');

container.addEventListener('click', (event) => {
  if (event.target.id === 'button1') {
    console.log('버튼 1이 클릭되었습니다.');
  } else if (event.target.id === 'button2') {
    console.log('버튼 2가 클릭되었습니다.');
  } else if (event.target.id === 'button3') {
    console.log('버튼 3이 클릭되었습니다.');
  }
});

### 컴포넌트의 대표 요소에 이벤트를 등록

컨테이너(container) 요소에 클릭 이벤트 핸들러를 등록
이벤트 객체의 target 속성을 사용하여 어떤 버튼이 클릭되었는지 확인

이렇게 하면 버튼을 추가하거나 제거할 때마다 추가적인 이벤트 핸들러를 등록할 필요X

=============================================================