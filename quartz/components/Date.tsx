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
  // 디버깅: 어떤 값이 들어오는지 확인
  console.log("Date component received:", date, typeof date)
  
  if (!date) {
    return null
  }
  
  try {
    let dateObj: Date
    
    if (date instanceof Date) {
      dateObj = date
    } else {
      dateObj = new Date(date)
    }
    
    // Date 객체 유효성 재확인
    if (!dateObj || isNaN(dateObj.getTime())) {
      console.log("Invalid date object:", dateObj)
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