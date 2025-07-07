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
  // console.log 제거 (배포 시 불필요)
  
  if (!date) {
    return null
  }
  
  // 간단하고 안전한 처리
  let dateObj: Date
  
  try {
    if (typeof date === 'string') {
      dateObj = new Date(date)
    } else if (date instanceof Date) {
      dateObj = date
    } else {
      // 다른 형태면 문자열로 변환 후 Date 생성
      dateObj = new Date(String(date))
    }
    
    // 유효한 날짜인지만 간단히 확인
    if (isNaN(dateObj.getTime())) {
      return null
    }
    
  } catch {
    return null
  }
  
  return (
    <time dateTime={dateObj.toISOString()}>
      {prefix && <span className="date-prefix">{prefix}</span>}
      {formatDate(dateObj, locale)}
    </time>
  )
}