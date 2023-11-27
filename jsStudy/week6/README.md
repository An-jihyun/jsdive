# 바닐라 JS로 웹 컴포넌트 만들기
독님
====================================

## 웹 컴포넌트란?

: 웹 애플리케이션에서 재사용 가능한 독립적인 부분을 나타내는데 사용되는 코드 모듈, 코드 조각

-  특정한 기능이나 UI 요소를 캡슐화
-  독립적으로 개발 및 유지보수 용이
-  특히 큰 규모의 프로젝트에서 유용
-  프레임워크나 라이브러리에 의존하지 않고 사용
  
=====================================

 1. Custom Elements
   - 사용자가 정의한 HTML 태그를 생성할 수 있게 해주는 기능
   - ex) <my-custom-element> 컴포넌트 기능 구현 </my-custom-element>

 2. Shadow DOM
   - 컴포넌트의 스타일과 구조를 외부에서 영향을 받지 않도록 캡슐화하는 데 사용
   - 스타일, 스크립트 및 마크업이 다른 부분과 격리되어 있어서 충돌을 방지 -> 더 나은 모듈화 제공

 3. HTML Templates
   - 클라이언트 측에서 재사용 가능한 마크업을 정의하는 데 사용
   - 템플릿을 클론하여 동적으로 삽입하거나 렌더링 가능

 4. HTML Imports
   - 외부 파일에서 HTML을 가져와 현재 문서에 포함시키는 데 사용
   - 그러나! HTML 현재로서는 더 이상 권장되지 않고, 대신 다양한 모듈 시스템을 사용하는 것을 권장 (왜?)

=====================================

### 웹 컴포넌트와 함께 도입된 HTML Imports가 찬밥이 된 이유

< 우선 알고 갈 것! >
 HTML Imports와 ES Modules
 둘 다 자바스크립트 모듈을 사용하는 방식 중의 하나


1. ES Modules의 표준화
   - HTML Imports는 ECMAScript (JavaScript) 모듈 시스템이 표준으로 채택되기 전에 도입 (웹 컴포넌트를 만들때 사용됨)
   - 그러나 현재는 ES Modules가 표준으로 채택

2. 브라우저 지원
   - HTML Imports는 모든 주요 브라우저에서 지원X
   - ES Modules는 정적 및 동적 로딩, 브라우저간 호환성 등에 있어서 더 강력하고 표준화된 방식을 제공

3. 웹 컴포넌트 및 자바스크립트 생태계의 통합
   - HTML Imports는 JavaScript와의 통합이 덜되어 기존의 자바스크립트 생태계와의 호환성 낮음
   - ES Modules는 자바스크립트 생태계와 통합이 잘 되어 있으며, 다양한 도구 및 라이브러리와 잘 작동

따라서!
### 현재는 ES Modules를 사용하여 JavaScript 모듈을 로드하는 것이 권장

- HTML Imports는 곧 대체될 예정
- ES Modules(현대 웹 개발에서 표준으로 사용)는 모듈화된 코드의 효율적인 로딩 및 실행 지원

=================================================

### 프로젝트 구조

project-root/
│
├── ImageGalleryComponent.js
│   ├── ImageGalleryComponent class
│   │   ├── constructor
│   │   ├── connectedCallback method
│   │   ├── renderImageGallery method
│   │   └── handleImageUpload method
│   │
│   └── custom element registration
│
├── main.js
│   └── Container selection and component addition
│
└── index.html
    ├── Basic HTML structure
    ├── Container div with id="gallery-container"
    ├── Script tag to load ImageGalleryComponent.js
    └── Script tag to load main.js

============================================

### ImageGalleryComponent.js

이미지 갤러리를 표현하는 웹 컴포넌트인 ImageGalleryComponent 클래스 정의

- 웹 컴포넌트의 주된 기능
- ImageGalleryComponent 클래스는 이미지를 업로드하고 갤러리로 보여주는 역할
- 클래스 내부에는 초기화를 담당하는 생성자
- DOM에 연결되었을 때 실행되는 connectedCallback 메서드
- 갤러리를 렌더링하는 renderImageGallery 메서드
- 이미지를 업로드하고 갤러리를 갱신하는 handleImageUpload 메서드 포함
- 또한, 파일 업로드를 위한 파일 입력(input[type="file"])의 변경 이벤트에 대한 핸들러도 여기에서 등록

### main.js

ImageGalleryComponent를 생성하고 웹 페이지에 추가

- 웹 페이지에서 사용할 ImageGalleryComponent를 생성
- 그것을 특정한 컨테이너에 추가
- gallery-container라는 아이디를 가진 div 엘리먼트가 컨테이너 역할
- 간단하게 컴포넌트를 생성하고 페이지에 추가하는 역할

### index.html

웹 페이지의 메인 HTML 파일로, 각 파일을 로드하여 웹 페이지를 구성

- 기본 HTML 구조
-  <div id="gallery-container"></div>는 웹 컴포넌트를 담을 컨테이너로 사용
-  <script> 태그를 사용하여 ImageGalleryComponent.js와 main.js 파일을 로드하고, 이를 통해 이미지 갤러리 컴포넌트를 페이지에 추가

======================================

### 이렇게 파일을 나누면

(이미지 갤러리 컴포넌트의 동작과 화면 표시, 그리고 웹 페이지에 추가하는 부분이 각각 파일로 분리되어 관리)

코드의 역할이 더 명확해지고 각 부분을 독립적으로 수정 가능

========================================