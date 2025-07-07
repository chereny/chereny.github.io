import { Date, getDate } from "./Date"
import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import readingTime from "reading-time"
import { classNames } from "../util/lang"
import { i18n } from "../i18n"
import { JSX } from "preact"
import style from "./styles/contentMeta.scss"

interface ContentMetaOptions {
  showReadingTime: boolean
  showComma: boolean
  showViews: boolean  // 👈 방문자 수 옵션 추가
}

const defaultOptions: ContentMetaOptions = {
  showReadingTime: true,
  showComma: false,  // 👈 쉼표 비활성화
  showViews: true,
}

export default ((opts?: Partial<ContentMetaOptions>) => {
  const options: ContentMetaOptions = { ...defaultOptions, ...opts }
  
  function ContentMetadata({ cfg, fileData, displayClass }: QuartzComponentProps) {
    const text = fileData.text
    if (text) {
      const dateSegments: JSX.Element[] = []
      const metaSegments: JSX.Element[] = []
      
      // 날짜 정보
      const created = fileData.frontmatter?.created
      const modified = fileData.frontmatter?.modified
      
      if (created) {
  	const createdDate = getDate(cfg, fileData) // getDate 함수 사용
  	if (createdDate) {
   	 dateSegments.push(<Date date={createdDate} locale={cfg.locale} prefix="Created: " />)
  	}
      }

      if (modified && modified !== created) {
  	const modifiedDate = fileData.dates?.modified
  	if (modifiedDate) {
    	  dateSegments.push(<Date date={modifiedDate} locale={cfg.locale} prefix="Updated: " />)
  	}
      }
             
      // 읽기 시간
      if (options.showReadingTime) {
        const { minutes } = readingTime(text)
        const displayedTime = i18n(cfg.locale).components.contentMeta.readingTime({
          minutes: Math.ceil(minutes),
        })
        metaSegments.push(
          <span class="reading-time">
            📖 {displayedTime}
          </span>
        )
      }
      
      // 방문자 수 (예시 - 실제로는 analytics 연동 필요)
      if (options.showViews) {
        metaSegments.push(
          <span class="page-views" id={`views-${fileData.slug}`}>
            👓 -- views
          </span>
        )
      }

      return (
        <div class={classNames(displayClass, "content-meta")}>
          {/* 날짜 정보 */}
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
          
          {/* 메타 정보 */}
          {metaSegments.length > 0 && (
            <div class="meta-info">
              {metaSegments.map((segment, index) => (
                <>
                  {segment}
                  {index < metaSegments.length - 1 && <span class="dot"> • </span>}
                </>
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