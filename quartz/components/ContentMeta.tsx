import readingTime from "reading-time"
import { classNames } from "../util/lang"
import { i18n } from "../i18n"
import { JSX } from "preact"
import style from "./styles/contentMeta.scss"
import { QuartzComponentConstructor, QuartzComponentProps } from "./types"

interface ContentMetaOptions {
  showReadingTime: boolean
  showComma: boolean
}

const defaultOptions: ContentMetaOptions = {
  showReadingTime: true,
  showComma: false,
}

export default ((opts?: Partial<ContentMetaOptions>) => {
  const options: ContentMetaOptions = { ...defaultOptions, ...opts }
  
  function ContentMetadata({ cfg, fileData, displayClass }: QuartzComponentProps) {
    const text = fileData.text
    if (text) {
      const dateSegments: JSX.Element[] = []
      const metaSegments: JSX.Element[] = []
      
      // 날짜 정보 - Date 컴포넌트 사용 안 함!
      const created = fileData.frontmatter?.created
      const modified = fileData.frontmatter?.modified
      
      if (created) {
        dateSegments.push(
          <span class="date-created">
            Created: {new Date(created).toLocaleDateString('ko-KR')}
          </span>
        )
      }
      
      if (modified && modified !== created) {
        dateSegments.push(
          <span class="date-modified">
            Updated: {new Date(modified).toLocaleDateString('ko-KR')}
          </span>
        )
      }
      
      // 읽기 시간
      if (options.showReadingTime) {
        const { minutes } = readingTime(text)
        const displayedTime = i18n(cfg.locale).components.contentMeta.readingTime({
          minutes: Math.ceil(minutes),
        })
        metaSegments.push(
          <span class="reading-time">
            📖 {Math.ceil(minutes)} min to read
          </span>
        )
      }
      
      return (
        <div class={classNames(displayClass, "content-meta")}>
          {dateSegments.length > 0 && (
            <div class="date-info">
              {dateSegments.map((segment, index) => (
                <>
                  {segment}
                  {index < dateSegments.length - 1 && <span class="separator"> | </span>}
                </>
              ))}
            </div>
          )}
          
          {metaSegments.length > 0 && (
            <div class="meta-info">
              {metaSegments.map((segment, index) => (
                <>{segment}</>
              ))}
            </div>
          )}
        </div>
      )
    } else {
      return null
    }
  }
  
  ContentMetadata.css = style
  return ContentMetadata
}) satisfies QuartzComponentConstructor