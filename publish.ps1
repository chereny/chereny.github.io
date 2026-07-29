# Obsidian 볼트 -> Quartz 발행
#
#   .\publish.ps1            글 동기화 + 빌드
#   .\publish.ps1 -Serve     동기화 + 빌드 + 로컬 미리보기 (http://localhost:8080)
#   .\publish.ps1 -Push      동기화 + 빌드 + GitHub 배포
#
# frontmatter 에 publish: true 가 있는 글만 발행됩니다.

param(
  [switch]$Serve,
  [switch]$Push
)

$ErrorActionPreference = 'Stop'

$vault   = Join-Path $env:USERPROFILE 'OneDrive\문서\eunhee'
$blogDir = Join-Path $vault '60-Make\Blog'
$attDir  = Join-Path $vault '90-attachments'
$quartz  = 'C:\dev\chereny.github.io'   # 실제 블로그 저장소 (v4 브랜치)
$content = Join-Path $quartz 'content'

if (-not (Test-Path -LiteralPath $blogDir)) { Write-Host "볼트 블로그 폴더 없음: $blogDir" -ForegroundColor Red; exit 1 }

# --- 1. content 비우기 (.gitkeep 은 유지) ---
Get-ChildItem -LiteralPath $content -Force -EA SilentlyContinue |
  Where-Object { $_.Name -ne '.gitkeep' } |
  ForEach-Object { Remove-Item -LiteralPath $_.FullName -Recurse -Force }

# --- 2. 글 복사 (private 폴더 제외) ---
$notes = Get-ChildItem -LiteralPath $blogDir -Recurse -File -Force |
  Where-Object { $_.Extension -eq '.md' -and $_.FullName -notmatch '\\private\\' }

$published = @()
foreach ($n in $notes) {
  $text = [IO.File]::ReadAllText($n.FullName, [Text.UTF8Encoding]::new($false))
  if ($text -notmatch '(?m)^publish:\s*true\s*$') { continue }
  Copy-Item -LiteralPath $n.FullName -Destination (Join-Path $content $n.Name) -Force
  $published += $n.Name
}

if ($published.Count -eq 0) {
  Write-Host "발행할 글이 없습니다. frontmatter 에 'publish: true' 를 넣어주세요." -ForegroundColor Yellow
  Write-Host "  대상 폴더: $blogDir"
  exit 0
}

# --- 3. 참조된 이미지 복사 ---
$refs = @{}
foreach ($f in (Get-ChildItem -LiteralPath $content -File -Filter *.md)) {
  $t = [IO.File]::ReadAllText($f.FullName, [Text.UTF8Encoding]::new($false))
  foreach ($m in [regex]::Matches($t, '!\[\[([^\]|#]+)\]?')) { $refs[$m.Groups[1].Value.Trim()] = 1 }
  foreach ($m in [regex]::Matches($t, '!\[[^\]]*\]\(([^)]+)\)')) { $refs[[uri]::UnescapeDataString($m.Groups[1].Value.Trim())] = 1 }
}
$imgCount = 0
foreach ($r in $refs.Keys) {
  $name = Split-Path $r -Leaf
  if ($name -notmatch '\.(png|jpg|jpeg|gif|webp|svg)$') { continue }
  $src = Join-Path $attDir $name
  if (Test-Path -LiteralPath $src) {
    Copy-Item -LiteralPath $src -Destination (Join-Path $content $name) -Force
    $imgCount++
  } else {
    Write-Host "  [이미지 없음] $name" -ForegroundColor Yellow
  }
}

Write-Host ""
Write-Host "동기화 완료: 글 $($published.Count)개, 이미지 $($imgCount)개" -ForegroundColor Green
$published | ForEach-Object { Write-Host "  - $_" }
Write-Host ""

# --- 4. 빌드 ---
Push-Location $quartz
try {
  if ($Serve) {
    Write-Host "미리보기: http://localhost:8080  (Ctrl+C 로 종료)" -ForegroundColor Cyan
    & npx quartz build --serve
  } else {
    & npx quartz build
    if ($LASTEXITCODE -ne 0) { throw "빌드 실패" }

    if ($Push) {
      Write-Host ""
      Write-Host "GitHub 배포 중..." -ForegroundColor Cyan
      & git add -A
      $stamp = Get-Date -Format 'yyyy-MM-dd HH:mm'
      & git commit -m "글 발행 ($stamp): $($published -join ', ')"
      & git push
      Write-Host "배포 완료. 1~2분 뒤 https://chereny.github.io 에 반영됩니다." -ForegroundColor Green
    }
  }
} finally { Pop-Location }
