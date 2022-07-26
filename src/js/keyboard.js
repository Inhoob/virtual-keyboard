export class Keyboard {
  #switchEl; //private field 사용 Keyboard 클래스를 생성하면 switchEl이 발생한다
  #fontSelectEl;
  #containerEl;
  #keyboardEl;
  #inputGroupEl;
  #inputEl;
  #keyPress = false; //마우스와 키보드가 눌려있는 상태인지 확인. 이것은 마우스와 키보드의 동시입력을 막으려고 지정
  #mouseDown = false;
  constructor() {
    this.#assignElement();
    this.#addEvent();
  }

  #assignElement() {
    this.#containerEl = document.getElementById("container");
    this.#switchEl = this.#containerEl.querySelector("#switch");
    this.#fontSelectEl = this.#containerEl.querySelector("#font");
    this.#keyboardEl = this.#containerEl.querySelector("#keyboard");
    this.#inputGroupEl = this.#containerEl.querySelector("#input-group");
    this.#inputEl = this.#inputGroupEl.querySelector("#input");
  }
  #addEvent() {
    this.#switchEl.addEventListener("change", this.#onChangeTheme);
    this.#fontSelectEl.addEventListener("change", this.#onChangeFont);
    document.addEventListener("keydown", this.#onKeyDown.bind(this)); //이 두개를 bind 하는 이유는 함수에서 this를 쓰고 있는데 전역객체의 this는 윈도우다. 윈도우에 #inputEl같은 요소가 없기 때문에 bind해주는 것
    document.addEventListener("keyup", this.#onKeyUp.bind(this));
    this.#inputEl.addEventListener("input", this.#onInput);
    this.#keyboardEl.addEventListener(
      "mousedown",
      this.#onMouseDown.bind(this)
    );
    document.addEventListener("mouseup", this.#onMouseUp.bind(this)); //mouseup을 keyboardEl에서 하지 않은 이유는 꼭 해당 키보드요소 위에서 마우스를 뗀다는 보장이 없다.
  }
  #onMouseUp(event) {
    if (this.#keyPress) return;
    this.#mouseDown = false;
    const keyEl = event.target.closest("div.key");
    // const keyEl = event.target;
    const isActive = !!keyEl?.classList.contains("active");
    const val = keyEl?.dataset.val; //data-val:'1' 인 경우 dataset.val으로 불러올 수 있다
    if (isActive && !!val && val !== "Space" && val !== "Backspace") {
      this.#inputEl.value += val;
    }
    if (isActive && val === "Space") {
      this.#inputEl.value += " ";
    }
    if (isActive && val === "Backspace") {
      this.#inputEl.value = this.#inputEl.value.slice(0, -1);
    }
    this.#keyboardEl.querySelector(".active")?.classList.remove("active");
  }
  #onMouseDown(event) {
    if (this.#keyPress) return;
    this.#mouseDown = true;
    event.target.closest("div.key")?.classList.add("active"); //closest는 div.key라는 css 선택자를 찾을때까지 root방향으로 탐색
    // event.target?.classList.add("active"); //closest는 div.key라는 css 선택자를 찾을때까지 root방향으로 탐색
  }
  #onInput(event) {
    console.log(event.target.value);
    event.target.value = event.target.value.replace(/[ㄱ-ㅎ/ㅏ-ㅣ/가-힣]/, "");
  }
  #onKeyDown(event) {
    if (this.#mouseDown) return;
    this.#keyPress = true;
    this.#inputGroupEl.classList.toggle(
      "error",
      /[ㄱ-ㅎ/ㅏ-ㅣ/가-힣]/.test(event.key)
    );

    this.#keyboardEl
      .querySelector(`[data-code=${event.code}]`) //이 attribute를 가진 dom을 찾아라
      ?.classList.add("active"); //key를 눌렀을 때 css의 active 속성 추가
  }
  #onKeyUp(event) {
    if (this.#mouseDown) return;
    this.#keyPress = false;
    this.#keyboardEl
      .querySelector(`[data-code=${event.code}]`) //이 attribute를 가진 dom을 찾아라
      ?.classList.remove("active"); //key를 눌렀을 때 css의 active 속성 추가
  }
  #onChangeTheme(event) {
    document.documentElement.setAttribute(
      "theme",
      event.target.checked ? "dark-mode" : ""
    );
  }
  #onChangeFont(event) {
    document.body.style.fontFamily = event.target.value;
  }
}
