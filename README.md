# 2019_embedded_final_project

## 시스템 구성도

1. 서비스 이용자는 모바일 애플리케이션을 통해 서버에 정해진 회원가입 양식(이름 / 아이디 / 비밀번호 / 비밀번호 확인 / 전화번호 / 비밀번호 찾기 질문 및 대답)에 따라 회원가입을 요청한다. 회원 정보 및 투표관리 서버에서 회원가입이 승인되면 사용자는 애플리케이션에 로그인할 수 있게 된다.
2. 서비스 이용자 중 투표 관리자는 회원 정보 및 투표관리 서버에 투표 등록을 요청할 수 있다. 투표 등록 요청 시 회원 정보 및 투표관리 서버에서 투표 등록 템플릿을 넘겨준다.
3. 투표 관리자는 회원 정보 및 투표관리 서버에 투표 개시를 요청할 수 있다. 투표 개시 요청 시 회원 정보 및 투표관리 서버는 투표 관리자가 선택한 유권자에게 해당 투표의 투표지를 넘겨준다.
4. 유권자는 해당 투표의 투표지에 투표한다. 유권자가 투표하면 해당 투표지를 유효성 검증 서버로 전송한다.
5. 유효성 검증 서버는 전송받은 투표지에 대한 유효성 검증을 한다. 유효한 투표지라 판단될 경우 투표지를 분산원장에 저장하며 해당 투표에 대한 중간 결과를 유효성 검증 서버 DB에 저장한다.
6. 투표가 종료되면 유효성 검증 서버 DB의 최종 투표결과를 회원 정보 및 투표관리 서버로 전송한다. 그 후 해당 투표의 분산원장을 삭제하며 회원 정보 및 투표관리 서버의 최종결과를 변경하지 못하도록 설정한다.
7. 투표 관리자가 최종결과 열람 요청 시 회원 정보 및 투표관리 서버에서 최종결과를 받아온다.
8. 투표 관리자가 해당 투표 유권자들의 최종결과 열람 권한 승인을 회원 정보 및 투표관리 서버로 요청한다.
9. 해당 투표의 유권자들이 투표의 최종결과를 열람한다.

![Feature 1](/images/그림1.png)

## 프로젝트 개발 결과

- 앱 다운로드

![Feature 2](/images/그림2.png)

- 앱 로그인 화면

![Feature 3](/images/그림3.png)

- 웹 로그인 화면

![Feature 4](/images/그림4.png)
