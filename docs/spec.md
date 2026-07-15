# link-kit 行銷連結工具 — spec

2026-07-16。行銷工具箱「一一替換外部工具」計畫第 1 案,替換對象:Google Campaign URL Builder(部分吸收 QR 產生器場景)。

## 定位

UTM 加 QR 一條龍:填一次活動資訊,勾選通路,一次產出全部通路的追蹤連結與 QR code。純前端 GitHub Pages,資料不離開瀏覽器。

## 比原版好在哪(替換理由)

- 繁中介面(原版英文)
- **批次多通路**:FB/IG/LINE/電子報/YouTube/Threads 勾選即產多列(原版一次只能填一組 source/medium)
- 產出直接附 QR(原版無;省去再開一個 QR 工具)
- 歷史紀錄(localStorage,原版沒有)
- 一鍵複製全部 / 下載 CSV(交給投放同事)
- 隱私:零後端、零追蹤(諷刺的是原版自己掛了一堆)

## 功能

1. 輸入:活動網址、campaign 名稱;進階摺疊:term、content、自訂 source/medium 一組。
2. 通路 preset(可複選,預設勾 FB/IG/LINE):FB 貼文 facebook/social、FB 廣告 facebook/cpc、IG instagram/social、LINE line/social、電子報 newsletter/email、YouTube youtube/video、Threads threads/social、部落格 blog/referral。
3. 產出表:通路|完整網址|複製|QR 預覽+下載 PNG。網址用 URL API 組裝,自動覆蓋原有 utm_*(有提示)、無 scheme 自動補 https://、保留原 query 與 hash。
4. QR 選項(全域):尺寸 256/512/1024、容錯 L/M/Q/H(預設 M)、前景/背景色。vendor qrcode-generator(MIT)離線運作。
5. 歷史:最近 20 次,一鍵回填/複製全部/清空。
6. 一鍵複製全部、下載 CSV(通路,網址)。

## 慣例

單檔 index.html + vendor/、深淺色、RWD、OG/SEO 齊、favicon;footer 三件套(GitHub/FB/BMC)+ 回連行銷工具箱;MIT 林亞澤;文案不用 emoji;正體中文。

## 不做(v1)

短網址(之後可接 shorturl-worker)、QR logo 置中、PWA 離線、批次貼多個網址。

## 驗收

- verify/check.cjs:桌機填表→預設 3 通路成列、QR canvas 非空白、複製鈕存在;iPhone 13 無橫向捲動。
- 對比驗收:同輸入(url+facebook/social/campaign)與 Google 原版產出參數一致,再加上原版沒有的批次/QR/歷史。
- 行銷工具箱 tools.json 替換 Campaign URL Builder;antfu QR 工具保留(樣式/藝術 QR 我們沒做,誠實並存)。
