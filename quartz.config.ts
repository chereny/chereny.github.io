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
	  light: "#faf8f8",           // 배경 (기존 유지)
    	  lightgray: "#e5e5e5",       // 연한 회색 (기존 유지)
    	  gray: "#b8b8b8",            // 회색 (기존 유지)
    	  darkgray: "#4e4e4e",        // 텍스트 (기존 유지)
    	  dark: "#2b2b2b",            // 제목 (기존 유지)
    	  secondary: "#00462A",        // 메인 컬러! 🎯
    	  tertiary: "#00663D",        // 호버 (조금 더 밝은 초록)
    	  highlight: "rgba(0, 70, 42, 0.15)",  // 하이라이트
    	  textHighlight: "#00462A88",  // 텍스트 하이라이트        
	},
        darkMode: {
          light: "#161618",
    	  lightgray: "#393639", 
    	  gray: "#646464",
    	  darkgray: "#d4d4d4",
    	  dark: "#ebebec",
    	  secondary: "#4CAF50",        // 다크모드용 밝은 초록
    	  tertiary: "#66BB6A",        // 다크모드 호버
    	  highlight: "rgba(76, 175, 80, 0.15)",
    	  textHighlight: "#4CAF5088",
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
