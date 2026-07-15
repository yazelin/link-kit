# 行銷連結工具 link-kit

UTM 加 QR 一條龍:填一次活動資訊,勾選通路,一次產出全部通路的追蹤連結與 QR code。

**線上使用:https://yazelin.github.io/link-kit/**

免費、免註冊、零後端——連結在你的瀏覽器內組好,不經過任何伺服器。

## 為什麼不用 Google Campaign URL Builder 就好

| | Google 原版 | 這個工具 |
|--|--|--|
| 介面 | 英文 | 繁體中文 |
| 多通路 | 一次一組 source/medium | 勾選 FB/IG/LINE/電子報/YouTube/Threads,一次產全部 |
| QR code | 無,要再開別的工具 | 每條連結直接附 QR,可調尺寸/容錯/顏色 |
| 歷史紀錄 | 無 | 最近 20 筆(localStorage) |
| 匯出 | 手動複製 | 一鍵複製全部、下載 CSV |
| 追蹤 | 頁面掛 Google 分析 | 零追蹤 |

## 功能細節

- 通路 preset 附建議值(如 FB 貼文 = `facebook/social`、FB 廣告 = `facebook/cpc`),進階可自訂 source/medium、utm_term、utm_content
- 原網址已有 utm_ 參數會自動覆蓋(有提示),沒打 `https://` 自動補
- QR 由 repo 內建引擎產生(離線可用):容錯率 L/M/Q/H、尺寸 256/512/1024、自訂顏色;印刷建議 Q/H + 1024
- 歷史紀錄只存在你的瀏覽器,可一鍵回填、複製全部、清空

## 開發

零框架、零 build:

```bash
python3 -m http.server 8001   # 開 http://localhost:8001/
NODE_PATH=$(npm root -g) node verify/check.cjs http://localhost:8001/   # 功能+RWD 驗證
```

QR 引擎 vendor 在 `vendor/qrcode-generator.js`([kazuhikoarase/qrcode-generator](https://github.com/kazuhikoarase/qrcode-generator) v1.5.0,MIT)。

## 更多工具

這是[行銷工具箱](https://yazelin.github.io/marketing-toolbox/)的自製工具之一——免費、免註冊、開瀏覽器就能用的行銷小工具書籤站。

## 關於作者

林亞澤(Yaze Lin)——工業自動化 SI 轉 AI 應用。

- Blog:https://yazelin.github.io/
- Facebook:https://www.facebook.com/yaze.lin.gm
- Buy Me a Coffee:https://buymeacoffee.com/yazelin

## License

MIT © 2026 林亞澤 (Yaze Lin)
