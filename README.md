# [React로 생각하기](https://ko.reactjs.org/docs/thinking-in-react.html)를 참고하여 웹 애플리케이션 메모장 제작

## Stacks
<p float='left'> 
  <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
  <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black">
  <img src="https://img.shields.io/badge/redux-764abc?style=for-the-badge&logo=redux&logoColor=black">
</p>

### 작업 순서

1.  메모앱의 UI를 노트에 그리기

2.  UI를 컴포넌트 계층 구조로 나누기

3.  데이터를 임의로 생성해 정적인 버전을 만들기

4.  여러 데이터 중 상호작용에 필요한 state를 최소한으로 정하기  

5.  계층구조 상단에 있는 Container에 state 위치를 정하기

6.  이벤트 핸들러로 역방향 데이터 흐름 추가  

7.  scss로 style작업

8. 리팩토링...
---

### Class 컴포넌트

> 함수형 컴포넌트에서 변경 사항은 굵은 글씨로 수정 하였습니다.

#### LandingPage

state 변경 메소드들 정의

- ~~handleInputTextChange~~ **InputBar 컴포넌트로 이동**
  ~~사용자가 입력한 값으로 state 변경~~

- handleAddNewTodoText
  기존 저장된 데이터에 새로운 데이터를 추가, 시간순으로 정렬하여 state 저장
  변경된 데이터를 saveData함수를 호출하여 localStorage에 저장

- handleDeleteTodo
  인수로 전달받은 key값을 찾아서 ~~splice함수~~**filter 함수**로 제거

- handleDoneTodo
  todoDatum 배열에서 완료 항목(handleDeleteTodo 호출)삭제, doneDatum에 추가

- ~~componentDidMount~~ **useEffect hook 사용**
  getTodoDatum 함수를 호출하여 localStorage의 데이터가 저장되어 있다면 불러옵니다.

#### InputBar

사용자에게 텍스트 입력받는 컴포넌트

#### TodoList

미완료된 목록, 연도와 월을 기준으로 내림차순 정렬  
TodoDateRow, Todo 컴포넌트 사용하여 todo목록 구성

#### CompletedList

완료된 목록, 완성된 날짜를 기준으로 내림차순 정렬  
TodoDateRow, Todo 컴포넌트 사용하여 todo목록 구성

#### Todo

todo 텍스트 출력

#### TodoDateRow

입력받은 todo의 년,월을 출력

#### Loader

localStorage에서 데이터를 불러오는동안 로딩 화면 구현

###### _(localStorage.getItem()함수는 100,000개 기준 3ms 수준으로 체감할 수 없었음)_

---

### 추가

**2022-01-06**

- 클래스 필드를 이용하여 이벤트 헨들러 처리

**2022-01-07**

- PureComponent 이용하여 성능 최적화

**🚧 함수형 컴포넌트 변경 및 코드 수정 🚧**

#### 2022.01.11 ~ 2022.01.18

**2022-01-11**

- class 컴포넌트에서 functional 컴포넌트로 변경

**2022-01-13**

- todoData의 id, todoDate key를 startDate로 단일화
- 순수 함수 fs.js 파일로 분리
- handleDelteTodo 코드 수정

**2022-01-14**

- Container 컴포넌트의 newTodoText 상태 -> 하위 컴포넌트 InputBar로 내려서 성능 최적화

**🚧 redux, 함수형 프로그래밍 적용 🚧**

**2022-03-11 ~ 2022-03-13**

- redux로 상태관리

**2022-03-14 ~ 2022-03-21**

- 함수형 프로그래밍 적용(FxJS 라이브러리 사용)
  - redux의 acrion을 put 함수로 추상화
  - 함수 전부 변경
  - 템플릿 변경 

---

### 작업 후기

**Class 컴포넌트**  
- UI는 최대한 심플하게 제작하려고 노력 했습니다. 해야할 목록을 시각적으로 먼저 들어오게 주황색으로, 완료된 목록을 긍정의 의미인 푸른색으로 제작 하였습니다. 리스트는 제작 년도와 월을 기준으로 내림차순 정렬하였고, 완료된 목록은 완료된 기간을 추가하여 소요 기간을 알 수 있도록 제작했습니다.

- TodoList 컴포넌트에 사용한 Todo와 TodoDateRow 컴포넌트를 CompeletedList 컴포넌트에서 재사용하여 중복을 제거 했습니다.
- 생각했던 대로 메모앱을 구현하는데 성공했지만, 제작 후 최근엔 클래스형 컴포넌트가 아닌 함수형 컴포넌트가 많이 사용한다는것을 알게 되었습니다. 다음엔 함수형 컴포넌트로 리팩토링 해봐야겠습니다.

**Functional 컴포넌트**  
- 클래스형 컴포넌트에서 함수형 컴포넌트로 변경 자체는 어렵지 않았습니다. 변경하는 김에 그동안 배운 것들을 바탕으로 코드를 수정 했습니다. 공부한 것을 적용할 수 있어서 재밌는 작업이었습니다.

**redux 적용**
- state와 관련 함수들을 해당 컴포넌트로 내려도 되는 것을 알고 있지만, 막상 적용하려고 하니 명령형으로 작성되어 있어서 내가 작성한 코드임에도 읽기가 어려웠다. 가독성이 좋은 코드로 작성하는 것이 왜 중요한지 알게 되었다.
- 공통 함수들을 외부 파일로 분리하려 했지만, 외부 값들을 참조하고 있어서 분리가 불가능했고 결국엔 상위 컴포넌트에 남겨뒀다. 함수형 프로그래밍을 적용할 때 해결해야겠다.

**Functional 프로그래밍**
- 상위 컴포넌트 LandingPage에서 props로 전달했던 함수들을 최대한 각 컴포넌트로 내렸다. 
- 처음엔 함수 자체에 집중해서 한 줄 한 줄 코드를 변경했는데, 조금 익숙해지다 보니 마지막 템플릿을 변경할 때에는 함수들의 진행을 큰 틀을 잡아놓고 맞춰가는 식으로 하니 작업이 훨씬 수월해졌다. 또한 길게 늘어진 템플릿을 array, different, push 순수 함수를 만들어 표현력과 가독성을 높였다. 