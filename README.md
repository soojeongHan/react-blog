# Blog Project

### 프로젝트 목적

- 개인적으로 개발하면서 겪은 경험들을 포스트로 작성하여, 경험을 공유하는 블로그를 개발한다.

### 프로젝트 구조

- 프로젝트 생성 : `CRA` 기반으로 `react`, `typescript` 적용

    ```bash
    yarn create react-app react-blog --template typescript
    ```

- 디렉터리 구조
    - `components` : 리덕스 상태에 연결되지 않은 프레젠테이셔널 컴포넌트들이 있는 디렉터리.
    각 컴포넌트의 스타일도 이 디렉터리에 넣는다.
        - `common` : 페이지 두 개 이상에서 사용하는 컴포넌트를 넣는다.
            - `Header`
                - 로고와 (로그인) 새 포스트, 수정, 삭제 버튼이 있는 컴포넌트
            - `Footer`
                - 관리자 로그인과 루트 디렉터리로 가는 링크가 있는 컴포넌트
            - `Button`
                - 컴포넌트에 들어오는 변수에 따라, Link와 Div를 만들어 공통적으로 사용하는 버튼 컴포넌트
            - `PageTamplate`
                - `HeaderContainer`를 상단에,  `FooterContainer`를 하단에 두고,
                중앙에 `main` 태그로 `children` 감싸는 컴포넌트
            - `base` : 로그인 상태를 확인하는 컴포넌트
        - `editor` :  새로운 포스트를 만들거나, 기존의 포스트를 수정하는 컴포넌트
            - Markdown Editor 라이브러리를 기반으로 왼쪽에 마크다운 에디터, 오른쪽에 마크다운 미리보기를 통하여 포스트를 작성하는 컴포넌트
        - `list` : 작성한 포스트들을 리스트로 보여주는 컴포넌트
            - `pagenation` : 페이지네이션을 위한 컴포넌트.
        - `modal` : 로그인, 삭제를 처리하기 전 한번 더 확인해주는 컴포넌트
            - `AskRemoveModal` : 삭제하기 전 확인하는 컴포넌트
            - `LoginModal` : 로그인을 위한 패스워드를 입력하는 컴포넌트
            - `ModalWrapper` : 모달이 나타나고, 사라지는 애니메이션 적용을 위한 컴포넌트
        - `post` : 포스트를 보여주기 위한 컴포넌트
            - 제목과, 태그, 날짜 그리고 내용을 보여주는 컴포넌트
    - `containers` : 리덕스 상태와 연결된 컨테이너 컴포넌트들이 있는 디렉터리.
        - `ListContainer`
            1. 컴포넌트가 마운트될 때, Redux 액션을 통하여 서버로부터 List 데이터를 가져온다.
            2. List 데이터를 List 컴포넌트와 Pagenation 컴포넌트에 넘겨 렌더링한다.
        - `PostContainer`
            1. 컴포넌트가 마운트될 때, Id를 기반으로 서버로부터 Post 데이터를 가져온다.
            2. Post 데이터를 Post 컴포넌트에 넘기고, `AskRemoveModalContainer` 와 함께 렌더링한다.
        - `EditorContainer`
            1. 컴포넌트가 마운트될 때, 새로운 포스트를 작성하는 것이면 그대로 렌더링하고, 기존 포스트를 수정하는 것이면 서버로부터 Post 데이터를 가져온다.
            2. 에디터와 미리보기의 크기를 조정할 수 있도록 함수를 구현하였다.
        - `HeaderContainer`
            1. 관리자로 로그인되어있는지 redux에서 값을 가져와, `삭제`, `수정`, `새 포스트` 버튼을 활성화/비활성화한다.
            2. 로고를 누르면 루트 디렉터리로 돌아가는 함수를 구현하였다.
            루트 디렉터리에서 로고를 누르면, 새로고침 처리된다.
        - `FooterContainer`
            1. 관리자 로그인/로그아웃 할 수 있는 버튼
            2. 루트 디렉터리로 돌아가는 버튼
        - `AskRemoveModalContainer`
            - `PostPage` 에서 `삭제` 버튼을 누르면 디스패치를 통해서 redux의 modal 상태를 변화시키고, 해당 값을 이용하여 modal 창을 활성화/비활성화한다.
            - modal 창에서 `삭제` 버튼을 누르면, 서버에 `axios.delete` 와 `ID`를 보내서 포스트를 삭제시킨다.
        - `LoginModalContainer`
            - `ListPage` 또는 `PostPage` 에서 관리자 로그인 버튼을 누르면, 해당 컴포넌트가 활성화된다.
            - 서버로 비밀번호를 보내 일치하면 로그인 처리를 하고, 불일치하면 경고 메세지를 출력한다.
    - `files` : 이미지와 같은 파일들을 모아놓은 디렉터리.
    - `service` : 백엔드 API 함수들이 있는 디렉터리.
        - `Axios.ts`
            - 공통적으로 사용할 axios 객체를 만들어내서, AuthService, BlogService에서 사용할 객체를 export시킨다.
            - axios 설정으로는 쿠키를 허용하고, CORS 관련 설정을 한다.
        - `AuthService.ts`
            - 로그인 / 로그아웃 / 로그인 상태를 체크하는 API 함수
        - `BlogService.ts`
            - 포스트를 [작성 / 수정 / 삭제 / 조회] 하는 API 함수
            - 리스트를 조회하는 API 함수
    - `pages` : 라우터에서 사용할 각 페이지 컴포넌트들이 있는 디렉터리.
        - `location`이나 `match` 를 props로 가져와 필요한 데이터를 컨테이너 컴포넌트를 넘겨준다.
        - `EditorPage`
        - `ListPage`
        - `PostPage`
        - `NotFoundPage` : 404 : Not Found를 나타낼 페이지
    - `redux` : Ducks 구조를 적용시킨 리덕스 모듈들과 스토어 생성 함수가 들어있는 디렉터리.
        - `create.ts`
            - `redux`, `redux-saga`, `history`, `redux-devtools-extension`, `connected-react-router` 를 기반으로 modules 디렉터리 안에 있는 리덕스 모듈로 스토어 생성함수를 만들어 내보낸다.
        - `modules`
            - `base.ts` : 로그인 / 로그아웃 / 로그인 체크를 실행하는 액션, 리듀서, 스토어가 있는 파일이다.
            - `blog.ts` : 포스트를 [작성 / 수정 / 삭제 / 조회]하고, 리스트를 조회하는 액션, 리듀서, 스토어가 있는 파일이다.
            - `rootReducer.ts` : 여러 리듀서를 결합하여 모듈을 내보낸다.
            - `rootSaga.ts` : 여러 사가 모두 실행시킬 수 있는 `all()` 함수를 사용하고, 모듈화하여 내보낸다.
    - `styles` : 폰트, 색상, 반응형 디자인 도구, 그림자 생성 함수 등 프로젝트에서 전역적으로 필요한 스타일 관련 코드들이 들어있는 디렉터리
        - `base.scss` : 프로젝트의 폰트 및 글로벌 스타일, 스타일 유틸을 설정한다.
        - `lib/`
            - `utils.scss` : 반응형 디자인을 위한 변수와 `_all.scss` 로딩
            - `_all.scss` : 스타일 파일 로딩
            - `_mixins.scss` : 그림자를 쉽게 설정할 수 있는 marterial-shadow 믹스인
    - `types.ts` : 전역적으로 사용할 `type` 을 선언한 파일

1. List Page

![list-page](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/3ec862d1-1d89-44c4-979c-79da12532907/list.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210304%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210304T070626Z&X-Amz-Expires=86400&X-Amz-Signature=88fe99f121b0f774f061d6eee2df742151b9a45e31d9190437f724e0d37101b5&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22list.png%22)

2. Post Page

![post-page](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/78bbc342-1cc8-4348-93c9-ce87b3208efb/post.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210304%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210304T070708Z&X-Amz-Expires=86400&X-Amz-Signature=f88f7ec344c7ea20680fa78bbff5b5e07d2d20ff93d8b4cc66ebb6ddd1113657&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22post.png%22)

3. Editor Page

![editor-page](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/2f8b1c66-b9bb-47c3-8973-4d1be17bb537/editor.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210304%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210304T070734Z&X-Amz-Expires=86400&X-Amz-Signature=eefd276d4fef9a04245dc6c7993048f4bb12a2191eeff3a368ef1e1e0df82c3e&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22editor.png%22)

4. List Page - Tag

![list-page-tag](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/4c5d0a2d-2095-4c1e-be95-64b81581ab5c/list_tag.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210304%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210304T070744Z&X-Amz-Expires=86400&X-Amz-Signature=b9b1781adc59fef1d754f00af9bf0c57efba2806dd20205c3ad5b4b3a7265fbf&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22list_tag.png%22)

5. Login Modal

![login-modal](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/b482c4b5-c22f-44a3-b4d4-521146fe5b7a/loginModal_2.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210304%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210304T070804Z&X-Amz-Expires=86400&X-Amz-Signature=508cab7879d93f7cc5b280cee46693564f737419cca5edae41fb1f5be804b9e6&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22loginModal_2.png%22)

6. Delete Modal

![delete-modal](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/1ed16954-af87-4c33-a3c7-6222be5fc5c6/deleteModal.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210304%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210304T070821Z&X-Amz-Expires=86400&X-Amz-Signature=d7c248e2ba7a78d785ee7f955eeb5fff493fe14a7204d52994f73ac55b443e10&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22deleteModal.png%22)


### 프로젝트 및 블로그 링크

[**BLOG Link**](https://soojeonghan.com)

[**Github Link**](https://github.com/soojeongHan/react-blog)

[**Notion Link**](https://www.notion.so/soojeonghan/Blog-Project-fdb5cacba0e34a319ba447b16e086a4d)

### 라이브러리와 프레임워크

- Frontend
    - `react^17.0.1` `@types/react^17.0.0` : react 라이브러리
    - `react-router-dom^5.2.0` `@types/react-router-dom^5.1.7` : 라우터 라이브러리
    - `react-redux^7.2.2`  `@types/react-redux^7.1.15` `@types/redux^3.6.0` : 전역 상태 관리 라이브러리
    - `redux-actions^2.6.5` `@types/redux-actions^2.6.1` : 리덕스 액션 관리 라이브러리
    - `redux-saga^1.1.3` `@types/redux-saga^0.10.5` : 리덕스 미들웨어 라이브러리
    - `typescript^4.0.3` : 프로그래밍 언어
    - `classnames` : CSS 모듈을 좀 더 편하게 사용할 수 있는 라이브러리
    - `open-color` : 색상을 쉽게 선택할 수 있는 라이브러리
    - `include-media` : 반응형 디자인을 쉽게 적용할 수 있는 라이브러리
    - `javascript-time-ago` : 시간을 계산해주는 라이브러리
    - `remove-markdown`  `@types/remove-markdown` : 텍스트 안에서의 마크다운을 제거해주는 라이브러리
    - `@uiw/react-md-editor` : 마크다운 에디터 및 미리보기 라이브러리
- Backend
    - `koa^2.13.0` : 서버 프레임워크
    - `koa-router^10.0.0` : 라우터 라이브러리
    - `koa-bodyparser^4.3.0` : bodyparser 라이브러리 → POST/PUT/PATCH 같은 HTTP METHOD들의 Request body에 JSON 형식으로 데이터를 넣어 주면, 이를 파싱해서 사용
    - `koa-session^6.1.0` : cookie를 기반으로 세션을 지원하는 미들웨어
    - `joi^17.3.0` : 구조를 정하는 스키마와 데이터 유효 검사를 위한 자바스크립트 라이브러리
    - `@koa/cors^3.1.0` : Cross-Origin Resource Sharing(CORS) 라이브러리
    - `dotenv^8.2.0` : 환경 변수 관리 라이브러리