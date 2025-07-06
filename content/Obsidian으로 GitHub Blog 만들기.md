

# 1. 기본 세팅

### GitHub 
0. 너무 기본적이지만 계정 만들기/로그인을 해야 한다.
   
1. Quartz를 복제한다.
   
   [template 링크](https://github.com/jackyzha0/quartz)
   ![[Pasted image 20250704170930.png]]
   Include all branches는 체크하지말고 이름만 짓고 생성하면 된다.
   cf. 저장소 이름은 `username.github.io` 로 대부분 이름짓는 것 같다.

3. Pages를 활성화한다.
   ![[Pasted image 20250704175341.png]]
   GitHub Actions로 바꾼다.

### Obsidian
1. 옵시디언을 설치한다
	
	https://obsidian.md/download 여기서 설치하면 된다.

2. 깃헙과 연동할 새로운 vault를 생성한다. vault는 쉽게 생각해 저장소라고 생각하면 된다. 
	![[Pasted image 20250704134415.png]]

3. 옵시디언 플러그인을 설치한다.
   ![[Pasted image 20250704135436.png]]
   설정>커뮤니티 플러그인>탐색>Git 다운
   그 외 Dataview, Excalidraw 등 다양한 플러그인이 있는데 각자 필요에 맞게 다운받으면 된다.
	 ![[Pasted image 20250704140057.png]]
	 설치만 하면 되는 게 아니고 Enable을 해야한다.
	 ![[Pasted image 20250704140418.png]]
	 설정에서 10분마다 자동으로 Commit하게 할 수도 있다.


### 기타 - Git, Node.js
기본 설정대로 설치하면 된다.
[Git 링크](https://git-scm.com/), [Node.js 링크](https://nodejs.org/en)

# 2. 연동
1. clone
   앞으로의 코드는 cmd에서 다 이루어진다 생각하면 된다. 
    ```
   git clone https://github.com/username/저장소이름.git 
   cd 저장소이름
   ```

2. 초기 설정
   ``` 
   # Node.js 의존성 설치
   npm install
   
   # Quartz 초기 설정 진행
   npx quartz create
	``` 
	마지막 코드에서 질문이 나오는데 그냥 엔터쳐서 바로 넘어가면 된다.
	- **"Choose how to initialize the content in your new vault"** → "Empty Quartz"
	- **"Choose how you'd like to set this up"** → "Treat links as shortest path"

3.  블로그 생성
	 ``` 
	# content 폴더 확인
	dir content
	   
	# 첫 번째 노트 작성
	notepad content\index.md
	 ```
    이 코드를 치면 메모장이 뜨는데 여기에 
    ![[Pasted image 20250706133341.png]]
	 이런 식으로 글을 넣으면 된다. 저장은 그냥 Ctrl S 누르면 된다.
	
	
	
	
	
	3. **GitHub 저장소** → **Settings**
4. **Features** 섹션에서 **"Discussions"** 체크
5. **Set up discussions** 클릭


### 2단계: Giscus 설정



6. [giscus.app](https://giscus.app) 방문
7. **저장소**: `chereny/chereny.github.io` 입력
8. **페이지 ↔ discussions 매핑**: "pathname" 선택
9. **Discussion 카테고리**: "General" 선택
10. **테마**: "preferred_color_scheme" (자동 다크모드)


``` 여기에 코드 넣기 ```