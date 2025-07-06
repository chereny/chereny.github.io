

# 1. 기본 세팅

### GitHub 
0. 너무 기본적이지만 **계정 만들기/로그인**을 해야 한다.
   이정도는 너무 쉬우니까 설명은 생략한다.
   
1. **Quartz**를 복제한다.
   
   [template 링크](https://github.com/jackyzha0/quartz)
   ![[Pasted image 20250704170930.png]]
   Include all branches는 체크하지말고 이름만 짓고 생성하면 된다.
   cf. 저장소 이름은 `username.github.io` 로 대부분 이름짓는 것 같다.

2. **Pages**를 활성화한다.
   ![[Pasted image 20250704175341.png]]
   GitHub Actions로 바꾼다.

### 그 외 설치
1. **[옵시디언 링크](https://obsidian.md/download)**
2. **[Git 링크](https://git-scm.com/)**
3. **[Node.js 링크](https://nodejs.org/en)**

# 2. 연동
### 깃헙
1. **clone**
   앞으로의 코드는 cmd에서 다 이루어진다. 
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
    이 코드를 치면 메모장이 뜨는데 여기에 있는 글들을 지우고 
    ![[Pasted image 20250706133341.png]]
    
	 이런 식으로 글을 넣으면 된다. Ctrl S 눌러서 저장하는 것을 잊지 말자.

	
4. 저장한 내용 반영하기
   ```
   # 변경사항 스테이징
   git add . 
   
   # 커밋
   git commit -m "수정사항(ex. Add index.md content)"
   
   # GitHub에 푸시
   git push origin v4
   ```


5.   사용자 정보 입력
	사실 위의 과정만 했다면 제대로 되지 않았을 것이다. 
	이름과 이메일을 입력해두지 않았다면 제대로 실행되지 못하기 때문에 아래의 코드를 입력해준다. 
	참고로 4번의 내용은 변경사항이 있을 때마다 사용해야하니 기억해두도록 하자.
	```
	git config --global user.name "여기에 이름 넣기"
	git config --global user.email "여기에 이메일 넣기"
	```


6. workflows 생성
   ```
    # .github/workflows 폴더 확인
    dir .github\workflows
    
    # 만약 파일이 없거나 문제가 있다면
    mkdir .github
    mkdir .github\workflows
	notepad .github\workflows\deploy.yml
	```
	생성된 메모장에는 다음 내용을 넣도록 한다.
	
	```
	name: Deploy Quartz site to GitHub Pages
	
	on:
		push:
			branches:
			  - v4
		workflow_dispatch:
	permissions:
		contents: read
		pages: write
		id-token: write

	concurrency:
		group: "pages"
		cancel-in-progress: false

	jobs:
		build:
			runs-on: ubuntu-22.04
			steps:
		      - uses: actions/checkout@v4
		        with:
		          fetch-depth: 0 # Fetch all history for git info
		      - uses: actions/setup-node@v4
		        with:
		          node-version: 22
		      - name: Install Dependencies
		        run: npm ci
		      - name: Build Quartz
		        run: npx quartz build
		      - name: Upload artifact
		        uses: actions/upload-pages-artifact@v3
		        with:
		          path: public
		
		deploy:
			needs: build
			environment:
				name: github-pages
				url: ${{ steps.deployment.outputs.page_url }}
			runs-on: ubuntu-22.04
			steps:
		      - name: Deploy to GitHub Pages
		        id: deployment
		        uses: actions/deploy-pages@v4
	```
	이제 다시 4번을 해보자.
	
	![[Pasted image 20250706215741.png]]
	이전에는 빨간색 X 표시가 뜨며 실패하거나 스킵을 의미하는 회색 사선 아이콘이 떴는데 이제 초록색 체크가 뜨면서 성공적으로 배포했다.
	
	![[Pasted image 20250706232945.png]]
	설정의 Pages에도 이전에 없던 링크가 생긴 것을 확인할 수 있다.
	
	![[Pasted image 20250706215641.png]]
	홈화면이 이렇게 잘 뜬 것을 확인할 수 있다.

### 옵시디언
1. 깃헙과 연동된 vault를 연다. 레포지토리 이름\content 폴더를 선택하면 된다. 
	![[Pasted image 20250706221817.png]]

2. 옵시디언 플러그인을 설치한다.
   ![[Pasted image 20250704135436.png]]
   설정>커뮤니티 플러그인>탐색>Git 다운
   그 외 Dataview, Excalidraw 등 다양한 플러그인이 있는데 각자 필요에 맞게 내려받으면 된다.
	 ![[Pasted image 20250704140057.png]]
	 설치만 하면 되는 게 아니고 Enable을 해야한다.
	 ![[Pasted image 20250704140418.png]]
	 설정에서 10분마다 자동으로 Commit하게 할 수도 있다.

# 3. 댓글기능 추가
추가적으로 댓글 기능도 도입할 수 있다. 
1. **GitHub Discussions 활성화**
   Settings>General에서 "Discussion"에 체크한다.
	![[Pasted image 20250706222652.png]]
	Set up discussions까지 하면 된다.

2.  **Giscus 설정**
	[giscus.app](https://giscus.app) 에 방문한다.
	- 저장소: `chereny/chereny.github.io` 입력
	- 페이지 ↔ discussions 매핑: "pathname" 선택
	- Discussion 카테고리: "General" 선택
	- 테마: "preferred_color_scheme"(원하는 대로) 선택
	  쭉 선택하고 나면
	 ```
	 <script src="https://giscus.app/client.js"
        data-repo="[ENTER REPO HERE]"
        data-repo-id="[ENTER REPO ID HERE]"
        data-category="[ENTER CATEGORY NAME HERE]"
        data-category-id="[ENTER CATEGORY ID HERE]"
        data-mapping="pathname"
        data-strict="0"
        data-reactions-enabled="1"
        data-emit-metadata="0"
        data-input-position="bottom"
        data-theme="preferred_color_scheme"
        data-lang="en"
        crossorigin="anonymous"
        async>
	</script>
	```
	이렇게 뜨는 코드를 notepad **quartz.layout.ts**로 열리는 메모장 파일에 넣어주면 된다. 
	아래는 파일 안의 내용이다. 스크롤하면 목차부분 진해지는 기능과 폴더 접기 펴기 기능도 추가했다.
	```
	import { PageLayout, SharedLayout } from "./quartz/cfg"
	import * as Component from "./quartz/components"
	
	// components shared across all pages
	export const sharedPageComponents: SharedLayout = {
	  head: Component.Head(),
	  header: [],
	  afterBody: [],
	  footer: Component.Footer({
	    links: {
	      GitHub: "https://github.com/chereny/chereny.github.io",
	      Blog: "https://chereny.github.io",
	    },
	  }),
	}
	
	// components for pages that display a single page (e.g. a single note)
	export const defaultContentPageLayout: PageLayout = {
	  beforeBody: [
	    Component.ConditionalRender({
	      component: Component.Breadcrumbs(),
	      condition: (page) => page.fileData.slug !== "index",
	    }),
	    Component.ArticleTitle(),
	    Component.ContentMeta(),
	    Component.TagList(),
	  ],
	  left: [
	    Component.PageTitle(),
	    Component.MobileOnly(Component.Spacer()),
	    Component.Flex({
	      components: [
	        {
	          Component: Component.Search(),
	          grow: true,
	        },
	        { Component: Component.Darkmode() },
	        { Component: Component.ReaderMode() },
	      ],
	    }),
	    // 탐색기 개선 옵션들
	    Component.Explorer({
	      title: "📁 블로그 탐색",
	      folderClickBehavior: "collapse", // 폴더 클릭 시 접기/펼치기
	      folderDefaultState: "collapsed", // 기본적으로 폴더 접혀있음
	      useSavedState: true, // 사용자의 폴더 상태 기억
	      mapFn: (node) => {
	        // 파일명에서 날짜 제거하고 카테고리별 그룹핑
	        if (node.file) {
	          node.displayName = node.file.frontmatter?.title || node.displayName
	        }
	        return node
	      },
	      filterFn: (node) => {
	        // draft 파일들 숨기기
	        if (node.file?.frontmatter?.draft) return false
	        return true
	      },
	      order: ["filter", "map", "sort"] // 정렬 순서
	    }),
	  ],
	  right: [
	    Component.Graph(),
	    // 목차 개선
	    Component.DesktopOnly(
	      Component.TableOfContents({
	        maxDepth: 4, // 최대 4단계까지
	        minEntries: 1, // 최소 1개 항목부터 표시
	        showByDefault: true, // 기본적으로 표시
	        collapseByDefault: false // 기본적으로 펼쳐진 상태
	      })
	    ),
	    Component.Backlinks(),
	  ],
	  afterBody: [
	    Component.ConditionalRender({
	      component: Component.Comments({
	        provider: "giscus",
	        options: {
	          repo: "chereny/chereny.github.io",
	          repoId: "R_kgDOPErJ5w",                    
	          category: "General",
	          categoryId: "DIC_kwDOPErJ584CsTQn",        
	          mapping: "pathname",
	          strict: false,
	          reactionsEnabled: true,
	          inputPosition: "top",                               
		  lang: "ko",
	          lightTheme: "noborder_light",              
	          darkTheme: "noborder_dark"          }
	      }),
	      condition: (page) => page.fileData.slug !== "index",
	    })
	  ],
	}
	
	// components for pages that display lists of pages (e.g. tags or folders)
	export const defaultListPageLayout: PageLayout = {
	  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
	  left: [
	    Component.PageTitle(),
	    Component.MobileOnly(Component.Spacer()),
	    Component.Flex({
	      components: [
	        {
	          Component: Component.Search(),
	          grow: true,
	        },
	        { Component: Component.Darkmode() },
	      ],
	    }),
	    Component.Explorer({
	      title: "📁 블로그 탐색",
	      folderClickBehavior: "collapse",
	      folderDefaultState: "collapsed",
	      useSavedState: true,
	    }),
	  ],
	  right: [],
	}
	```

이건 **quartz.config.ts** 파일이다.
``` 
import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Chereny's Tech Blog",
    pageTitleSuffix: " | Chereny",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "ko-KR",
    baseUrl: "quartz.jzhao.xyz",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Schibsted Grotesk",
        body: "Source Sans Pro",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#faf8f8",
          lightgray: "#e5e5e5",
          gray: "#b8b8b8",
          darkgray: "#4e4e4e",
          dark: "#2b2b2b",
          secondary: "#284b63",
          tertiary: "#84a59d",
          highlight: "rgba(143, 159, 169, 0.15)",
          textHighlight: "#fff23688",
        },
        darkMode: {
          light: "#161618",
          lightgray: "#393639",
          gray: "#646464",
          darkgray: "#d4d4d4",
          dark: "#ebebec",
          secondary: "#7b97aa",
          tertiary: "#84a59d",
          highlight: "rgba(143, 159, 169, 0.15)",
          textHighlight: "#b3aa0288",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
``` 

이건 **Comments.tsx**
```
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
// @ts-ignore
import script from "./scripts/comments.inline"

type Options = {
  provider: "giscus"
  options: {
    repo: `${string}/${string}`
    repoId: string
    category: string
    categoryId: string
    themeUrl?: string
    lightTheme?: string
    darkTheme?: string
    mapping?: "url" | "title" | "og:title" | "specific" | "number" | "pathname"
    strict?: boolean
    reactionsEnabled?: boolean
    inputPosition?: "top" | "bottom"
    lang?: string
  }
}

function boolToStringBool(b: boolean): string {
  return b ? "1" : "0"
}

export default ((opts: Options) => {
  const Comments: QuartzComponent = ({ displayClass, fileData, cfg }: QuartzComponentProps) => {
    // check if comments should be displayed according to frontmatter
    const disableComment: boolean =
      typeof fileData.frontmatter?.comments !== "undefined" &&
      (!fileData.frontmatter?.comments || fileData.frontmatter?.comments === "false")
    if (disableComment) {
      return <></>
    }
    return (
      <div
        class={classNames(displayClass, "giscus")}
        data-repo={opts.options.repo}
        data-repo-id={opts.options.repoId}
        data-category={opts.options.category}
        data-category-id={opts.options.categoryId}
        data-mapping={opts.options.mapping ?? "url"}
        data-strict={boolToStringBool(opts.options.strict ?? true)}
        data-reactions-enabled={boolToStringBool(opts.options.reactionsEnabled ?? true)}
        data-input-position={opts.options.inputPosition ?? "bottom"}
        data-light-theme={opts.options.lightTheme ?? "light"}
        data-dark-theme={opts.options.darkTheme ?? "dark"}
        data-theme-url={
          opts.options.themeUrl ?? `https://${cfg.baseUrl ?? "example.com"}/static/giscus`
        }
        data-lang={opts.options.lang ?? "en"}
      ></div>
    )
  }
  Comments.afterDOMLoaded = script
  return Comments
}) satisfies QuartzComponentConstructor<Options>
```

마지막으로 **index.ts**
```
import { QuartzComponent } from "./types"

// @ts-ignore
import ArticleTitle from "./ArticleTitle"
// @ts-ignore
import Backlinks from "./Backlinks"
// @ts-ignore
import Body from "./Body"
// @ts-ignore
import Breadcrumbs from "./Breadcrumbs"
// @ts-ignore
import Comments from "./Comments"
// @ts-ignore
import ConditionalRender from "./ConditionalRender"
// @ts-ignore
import ContentMeta from "./ContentMeta"
// @ts-ignore
import Darkmode from "./Darkmode"
// @ts-ignore
import Date from "./Date"
// @ts-ignore
import DesktopOnly from "./DesktopOnly"
// @ts-ignore
import Explorer from "./Explorer"
// @ts-ignore
import Flex from "./Flex"
// @ts-ignore
import Footer from "./Footer"
// @ts-ignore
import Graph from "./Graph"
// @ts-ignore
import Head from "./Head"
// @ts-ignore
import Header from "./Header"
// @ts-ignore
import MobileOnly from "./MobileOnly"
// @ts-ignore
import OverflowList from "./OverflowList"
// @ts-ignore
import PageList from "./PageList"
// @ts-ignore
import PageTitle from "./PageTitle"
// @ts-ignore
import ReaderMode from "./ReaderMode"
// @ts-ignore
import RecentNotes from "./RecentNotes"
// @ts-ignore
import Search from "./Search"
// @ts-ignore
import Spacer from "./Spacer"
// @ts-ignore
import TableOfContents from "./TableOfContents"
// @ts-ignore
import TagList from "./TagList"

// Page components from pages/ folder
// @ts-ignore
import Content from "./pages/Content"
// @ts-ignore
import FolderContent from "./pages/FolderContent"
// @ts-ignore
import NotFound from "./pages/404"
// @ts-ignore
import TagContent from "./pages/TagContent"

export {
  ArticleTitle,
  Backlinks,
  Body,
  Breadcrumbs,
  Comments,
  ConditionalRender,
  Content,
  ContentMeta,
  Darkmode,
  Date,
  DesktopOnly,
  Explorer,
  Flex,
  FolderContent,
  Footer,
  Graph,
  Head,
  Header,
  MobileOnly,
  NotFound,
  OverflowList,
  PageList,
  PageTitle,
  ReaderMode,
  RecentNotes,
  Search,
  Spacer,
  TableOfContents,
  TagContent,
  TagList,
}
```

![[Pasted image 20250706225526.png]]
이렇게 최종적으로 잘 된 것을 확인할 수 있다.


### 느낀 점
아직 GitHub 사용이 낯선데 블로그를 만들면서 좀 친해질 수 있었다. 처음 GitHub를 써봤던 자료구조 수업에서는 간단하게 배포하는 것도 너무 어려웠는데 이제는 조금 익숙해졌다. 특히 오류여부와 그 이유까지 알 수 있는 GitHub Actions를 알게 되어서 좋았다. 옵시디언이 마크다운 언어를 사용하는데 제목, 굵게하기 정도 위주만 쓸 줄 아는 정도이다보니 ``` 여기에 코드 넣기 ``` 이 기능을 처음 써보게 되었다. 앞으로 블로그를 쓰면서 마크다운 언어에 좀 더 익숙해질 것 같다.
그리고 사실 처음에는 요즘 핫하다는 MCP를 이용해 옵시디언과 깃헙을 연결하고 싶었다. 하지만 MCP 자체도 공부해야 하고 이제 기술 블로그에 입문해서 글이 많지 않기 때문에 MCP가 지금 당장 필요하나? 라는 생각도 들어서 기술 블로그에 글이 많이 쌓이고 난 이후에 다시 시도해보고자 한다. 기술 블로그는 처음 쓰는 만큼 글을 쓰는 데 더 집중하면서 새로운 시도를 하기 위해서는 이 방법을 선택했는데 생각보다 헤매기도 했지만 성공해내서 뿌듯하다.

### 앞으로의 계획
1. 옵시디언 Sync 기능을 이용해 다른 기기에서도 블로그를 올릴 수 있는 방법을 찾아보고자 한다.
2. 색상이나 디자인을 좀 더 내 취향대로 바꾸고자 한다.