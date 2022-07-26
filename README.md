![](https://velog.velcdn.com/images/colagom/post/5dbc8734-10a0-42cc-b9be-9d5b72a67c35/image.gif)

## Webpack

https://medium.com/@woody_dev/js-webpack-1-%EC%9B%B9%ED%8C%A9%EC%9D%B4%EB%9E%80-%EB%AC%B4%EC%97%87%EC%9D%B8%EA%B0%80-f29ebca31da4<<webpack관련<br/>
웹개발에 필요한 html, css ,js를 하나로 압축해줌
npm i -D webpack webpack-cli webpack-dev-server 웹팩설치
-D라는건 dev dependency에 패키지를 설치해주겠다는 뜻이다 로컬개발이나 테스트에만 필요한 패키지를 의미
-D를 지우면 그냥 dependency에 설치되는데 이거는 production 환경에 필요한 dependent를 의미

npm i -D html-webpack-plugin
npm i -D mini-css-extract-plugin css-loader css-minimizer-webpack-plugin
css와 html 합쳐줄 모듈

npm i -D eslint =>eslint 설치
npm install --save-dev --save-exact prettier =>prettier 설치
npm i -D eslint-config-prettier eslint-plugin-prettier=> config는 포맷팅 겹치는부분 비활성화, plugin은 eslint에 prettier의 포맷팅을 추가

html과 css파일을 만들어놓고 실행해보려면 npm run dev 입력하면 됨

## Dark Theme(다크 테마)

```html
<html theme=""></html>
```

```css
html[theme="dark-mode"] {
  /* ! */
  filter: invert(100%) hue-rotate(180deg); /*invert는 색상반전, hue-rotate는 색띠에서 반대편의 색깔을 나타냄*/
}
```

그리고 js파일은 keyboard.js파일을 참조할 것

## Slider 부분

input의 형제요소로 slider가 있는데 이 부분을 어떤식으로 control하는지 잘 볼것

```css
.slider::before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: 0.5s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: black;
}

input:checked + .slider::before {
  /* ! */
  transform: translateX(26px);
}
```

em과 rem 차이점
em,rem 둘다 상대적 크기인데 em은 현재의 태그내에서의 크기 기준이고 rem은 root 기준이다.

## Font 변경

keyboard.js 의 font select부분 참조

## Event에 대한 이해

특정 element를 클릭해서 event가 발생할 때 모든 상위 element 및 document까지 event가 발생한다. (event bubbling이라고 함)
target은 실제로 이벤트가 발생한 대상. currentTarget은 event를 걸어놓은 대상.
event를 콘솔을 찍어보면 event.bubbles라는 속성이 있는것을 볼 수 있다. document에 bubbling이 일어나는것으로 모든 키보드의 키들에 event를 지정하지 않고 설정할 수 있다
keyboard 이벤트를 input에 걸면 focus out 될 때 어디에서 걸렸는지 알 수 없기 때문에 document에 건다.

key를 누를때 event를 보면 event의 속성으로 code:"KeyA"와 key:"a"를 볼 수 있다

Event가 발생할 때 classList.add 와 classList.remove를 통해 css속성을 부여하고 제거
?.classList.add <<이런식으로 앞에 물음표를 붙여주는걸 optional chaining이라고 한다. error가 발생하지않고 undefined를 리턴하고 함수를 실행하지 않는다

### 입력값이 한글인가? 이 부분은 판별해서 클래스이름에 error를 토글로 넣어주거나 빼거나 한다.(toggle 검색)

/[ㄱ-ㅎ/ㅏ-ㅣ/가-힣]/.test()
<br>
<br>

### 바인딩개념

```javascript
document.addEventListener("keydown", this.#onKeyDown.bind(this)); //이 두개를 bind 하는 이유는 함수에서 this를 쓰고 있는데 전역객체의 this는 윈도우다. 윈도우에 #inputEl같은 요소가 없기 때문에 bind해주는 것
document.addEventListener("keyup", this.#onKeyUp.bind(this));
```

마우스 입력 UI
보통 마우스로 클릭했다가 떼지 않은채로 쭉 빼는 경우는 입력하고 싶지 않을때이다. 그렇기 때문에 onMouseUp과 onMouseDown의 요소가 같을 때
그 입력을 전달하면 된다.

타입캐스팅
!!을 붙여 확실하게 Boolean 값으로 형변환 해준다.

마우스와 키보드 동시입력 방지
