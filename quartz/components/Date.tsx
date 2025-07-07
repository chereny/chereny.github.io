import { GlobalConfiguration } from "../cfg"
import { ValidLocale } from "../i18n"
import { QuartzPluginData } from "../plugins/vfile"

interface Props {
  date: Date | string | undefined
  locale?: ValidLocale
  prefix?: string
}

export type ValidDateType = keyof Required<QuartzPluginData>["dates"]

export function getDate(cfg: GlobalConfiguration, data: QuartzPluginData): Date | undefined {
  if (!cfg.defaultDateType) {
    throw new Error(
      `Field 'defaultDateType' was not set in the configuration object of quartz.config.ts. See https://quartz.jzhao.xyz/configuration#general-configuration for more details.`,
    )
  }
  return data.dates?.[cfg.defaultDateType]
}

export function formatDate(d: Date, locale: ValidLocale = "en-US"): string {
  return d.toLocaleDateString(locale, {
    year: "numeric",
    month: "short",
    day: "2-digit",
  })
}

export function Date({ date, locale, prefix }: Props) {
  console.log("Date component received:", date, typeof date)
  
  if (!date) {
    return null
  }
  
  try {
    let dateObj: Date
    
    // 더 엄격한 Date 객체 검증
    if (date instanceof Date && !isNaN(date.getTime())) {
      dateObj = date
    } else if (typeof date === 'string') {
      dateObj = new Date(date)
    } else {
      // Date 객체처럼 보이지만 실제로는 아닌 경우
      console.log("Invalid date format, converting to string first")
      dateObj = new Date(String(date))
    }
    
    // 최종 검증: getTime 메서드 존재 및 유효성 확인
    if (!dateObj || typeof dateObj.getTime !== 'function' || isNaN(dateObj.getTime())) {
      console.log("Final validation failed:", dateObj)
      return null
    }
    
    return (
      <time dateTime={dateObj.toISOString()}>
        {prefix && <span className="date-prefix">{prefix}</span>}
        {formatDate(dateObj, locale)}
      </time>
    )
  } catch (error) {
    console.log("Date conversion error:", error)
    return null
  }
}