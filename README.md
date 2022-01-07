## [React로 생각하기](https://ko.reactjs.org/docs/thinking-in-react.html)를 참고하여 웹 애플리케이션 메모장 제작

### 작업 순서

1.  메모앱의 UI를 노트에 그리기

2.  UI를 컴포넌트 계층 구조로 나눴습니다.
    Container, CompletedList, InputBar, TodoList, Todo

3.  데이터를 임의로 생성해 정적인 버전을 만들었습니다.

4.  여러 데이터 중 상호작용에 필요한 state를 최소한으로 정했습니다.
    newTodoText, todoDatum, doneDatum, isLoading

5.  계층구조 상단에 있는 Container에 state 위치를 정했습니다.

6.  이벤트 핸들러로 역방향 데이터 흐름 추가 했습니다.

7.  scss로 style작업

---

### 컴포넌트

#### Container

제일 상단의 컴포넌트로 다른 컴포넌트들을 반환

state 변경 메소드들 정의

- handleInputTextChange
  사용자가 입력한 값으로 state 변경

- handleAddNewTodoText
  기존 저장된 데이터에 새로운 데이터를 추가, 시간순으로 정렬하여 state 저장
  변경된 데이터를 saveData함수를 호출하여 localStorage에 저장

- handleDeleteTodo
  인수로 전달받은 key값을 찾아서 splice함수로 제거

- handleDoneTodo
  todoDatum 데이터 목록에서 (handleDeleteTodo 호출)삭제, doneDatum에 추가

- componentDidMount
  getTodoDaum 함수를 호출하여 localStorage의 데이터가 저장되어 있다면 불러옵니다.

#### InputBar

사용자에게 텍스트 입력받는 컴포넌트

#### TodoList

미완료된 목록, 연도와 월을 기준으로 정렬
TodoDateRow, Todo 컴포넌트 사용하여 todo목록 구성

#### CompletedList

완료된 목록, 완성된 날짜를 기준으로 정렬
TodoDateRow, Todo 컴포넌트 사용하여 todo목록 구성

#### Todo

todo 텍스트 출력

#### TodoDateRow

입력받은 todo의 년월을 출력

---

### 작업 후기

UI는 최대한 심플하게 제작하려고 노력 했습니다. 해야할 목록을 시각적으로 눈에 먼저 들어오게 주황색으로, 완료된 목록을 긍정의 의미인 푸른색으로 제작 하였습니다. 또 메모 제작 년도와 월을 기준으로 내림차순 정렬하였고, 완료된 목록은 완료된 기간을 추가하여 소요 기간을 알 수 있도록 제작했습니다.

코드작성은 코드의 중복을 제거하고자 TodoList 컴포넌트에 사용한 Todo와 TodoDateRow 컴포넌트를 Compeleted 컴포넌트에서 재사용 했습니다.
생각했던 대로 메모앱을 구현하는데 성공했지만, 제작 후 최근엔 클래스형 컴포넌트가 아닌 함수형 컴포넌트가 많이 사용한다는것을 알게 되었습니다. 다음엔 함수형 컴포넌트를 사용해 제작해봐야 겠습니다.

---

### 추가

2022-01-06

- 클래스 필드를 이용하여 이벤트 헨들러 처리

2022-01-07

- PureComponent 이용하여 성능 최적화
