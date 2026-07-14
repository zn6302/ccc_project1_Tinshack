# Tin Shack Generative Study｜台灣鐵皮屋生成練習

以台灣街景常見的鐵皮屋為視覺靈感，使用 p5.js 將浪板的規律摺痕、斑駁缺口與鏽蝕色彩轉化為一幅逐層生成的數位畫面。

[觀看 GitHub Pages](https://zn6302.github.io/ccc_project1_Tinshack/)

## 作品概念

鐵皮屋同時帶有人工秩序與時間侵蝕的痕跡。作品以密集排列的圓點模擬浪板表面，再透過不同間距、亮部條紋、缺損率與配色，產生介於建築立面、抽象織物與城市記憶之間的畫面。

每次生成時，程式會隨機選擇一組色彩主題，先建立大面積底層，再疊加不同尺寸與密度的鐵皮片段，因此每次觀看都會得到不同結果。

## 操作方式

- 開啟頁面後，作品會逐層生成。
- 點擊畫布可重新生成一幅新的鐵皮屋構圖。
- 重新整理頁面也會產生新的配色與排列。

## 技術

- JavaScript
- [p5.js 2.2.3](https://p5js.org/)
- GitHub Pages
- 純靜態網站，不需要建置工具

## 專案結構

```text
.
├── .github/workflows/static.yml  # GitHub Pages 部署
├── index.html                    # 頁面入口
├── sketch.js                     # 生成邏輯
├── style.css                     # 全螢幕畫布樣式
└── README.md
```

## 本機執行

由於專案透過 CDN 載入 p5.js，使用任一靜態伺服器即可：

```bash
python3 -m http.server 8000
```

接著開啟 `http://localhost:8000`。

## 整理說明

此版本移除了未使用的 `p5.sound`、本機綁定的 VS Code 型別路徑，以及可以由 CDN 取代的第三方函式庫副本，讓 repo 僅保留作品本身需要維護的內容。
