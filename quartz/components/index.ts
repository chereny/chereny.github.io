import { QuartzComponent } from "./types"

// @ts-ignore
import ArticleTitle from "./ArticleTitle"
// @ts-ignore
import Breadcrumbs from "./Breadcrumbs"
// @ts-ignore
import ContentMeta from "./ContentMeta"
// @ts-ignore
import Darkmode from "./Darkmode"
// @ts-ignore
import Explorer from "./Explorer"
// @ts-ignore
import Footer from "./Footer"
// @ts-ignore
import Graph from "./Graph"
// @ts-ignore
import Head from "./Head"
// @ts-ignore
import PageTitle from "./PageTitle"
// @ts-ignore
import ReaderMode from "./ReaderMode"
// @ts-ignore
import Search from "./Search"
// @ts-ignore
import TagList from "./TagList"
// @ts-ignore
import TableOfContents from "./TableOfContents"
// @ts-ignore
import Backlinks from "./Backlinks"
// @ts-ignore
import Comments from "./Comments"

export {
  ArticleTitle,
  Breadcrumbs,
  ContentMeta,
  Darkmode,
  Explorer,
  Footer,
  Graph,
  Head,
  PageTitle,
  ReaderMode,
  Search,
  TagList,
  TableOfContents,
  Backlinks,
  Comments,
}

// 여기서 중복 export 제거 - Comments는 위에서 이미 export했으므로 아래 줄은 삭제
// export { default as Comments } from "./Comments"  // 이 줄 삭제