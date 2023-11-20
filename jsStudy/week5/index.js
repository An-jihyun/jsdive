// counter-component.js
class SimpleCounter extends HTMLElement {
    constructor() {
        super();

        // Shadow DOM 생성
        const shadow = this.attachShadow({ mode: 'open' });

        // 컴포넌트의 초기 상태 설정
        this._count = 0;

        // 컴포넌트에 표시될 내용을 담은 요소 생성
        const content = document.createElement('div');
        content.innerHTML = `
            <p>Count: <span id="count">${this._count}</span></p>
            <button id="increment">Increment</button>
        `;

        // 스타일 지정
        const style = document.createElement('style');
        style.textContent = `
            p {
                font-size: 18px;
            }

            button {
                padding: 8px 16px;
                font-size: 16px;
                cursor: pointer;
            }
        `;

        // 내부 요소를 Shadow DOM에 추가
        shadow.appendChild(style);
        shadow.appendChild(content);

        // 버튼 클릭 이벤트 핸들러 등록
        const incrementButton = shadow.getElementById('increment');
        incrementButton.addEventListener('click', () => this._increment());
    }

    // 카운터를 증가시키는 메서드
    _increment() {
        this._count++;
        // 변경된 카운터 값 업데이트
        this.shadowRoot.getElementById('count').textContent = this._count;
    }
}

// 커스텀 엘리먼트 등록
customElements.define('simple-counter', SimpleCounter);