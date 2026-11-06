# Gear Ratio Simulator

開発仕様書 Ver.1.0 ｜ React + Vite

BRZ専用ではなく、将来いろいろな車種のギア比やエンジン回転数を比較できるアプリとして育てていこう。

今回の仕様書は、Jeep Garageで学んだReactの知識を活かしつつ、もう一段レベルアップできるように設計してみたよ。

プロジェクトの基本方針

| 項目          | 仕様                   |
| ----------- | -------------------- |
| アプリ名        | Gear Ratio Simulator |
| 開発環境        | Vite + React         |
| 初期対応車種      | SUBARU BRZ（ZD8）      |
| 初期トランスミッション | 6速MT                 |
| 主要機能        | 速度・ギアからエンジン回転数を算出    |
| メーター        | NORMAL / TRACK の2種類  |
| 将来の拡張       | 複数車種、AT、ギア比カスタマイズ    |
| 公開想定        | GitHub Pages         |

## 1. アプリの目的

このアプリは、実在する車のギア比・最終減速比・タイヤサイズを利用して、指定した走行速度におけるエンジン回転数をシミュレーションするもの。

車の変速機の仕組みを、数値とアニメーションの両方から理解できることを目指す。

最初はBRZ ZD8の6MTで完成させ、その後に他の車種を追加できる構成にする。

## 2. 画面構成

PC版は3つのエリアを基本とする。

GEAR RATIO SIMULATOR

SUBARU BRZ / ZD8

NORMAL / TRACK

6MT

メーター表示エリア

SPEED

## 60 km/h

速度入力

GEAR

## 3 速

1

2

3

4

5

6

CALCULATED ENGINE SPEED

# 2,500 rpm

計算結果・各ギア比較

画面構成イメージ。メーターは簡略表示、回転数は仮表示。実装時に参考画像のデザインへ近づける。

このように、画面を3つに分けると管理しやすい。

A. メーター表示エリア

- NORMAL / TRACKの切り替え
- エンジン回転数に応じた針・バーの動き
- 速度と現在のギアの表示

B. 操作エリア

- 走行速度をスライダー・数値入力で変更
- 1〜6速をボタンで選択
- 車種やグレードの選択（初期はBRZのみ）

C. 計算結果エリア

- エンジン回転数をrpmで表示
- 各ギアでの回転数比較
- 計算条件（タイヤサイズ、変速比など）の確認

スマホでは、この3つのエリアを縦に並べるレスポンシブデザインにする。

## 3. BRZ ZD8の車両データ

ここはアプリの計算精度を左右する大事な部分だね。

SUBARU公式の諸元表で確認したところ、BRZ ZD8のR・S・STI Sportは、6MTの変速比と最終減速比が共通になっている。

[image](https://www.google.com/s2/favicons?domain=https://www.subaru.jp\&sz=32)

SUBARU オフィシャルWebサイト+1



| 項目    | 値       |
| ----- | ------- |
| 車両型式  | 3BA-ZD8 |
| エンジン  | FA24    |
| 排気量   | 2,387cc |
| 1速    | 3.626   |
| 2速    | 2.188   |
| 3速    | 1.541   |
| 4速    | 1.213   |
| 5速    | 1.000   |
| 6速    | 0.767   |
| 最終減速比 | 4.100   |

出典：[SUBARU公式 主要諸元表（PDF）](https://www.subaru.jp/brz/specification/docs/specifications.pdf?utm_source=chatgpt.com)

このような一次情報を車種データと一緒に保存しておけば、車種が増えたときにもデータの出典を追跡できるね。

### タイヤサイズとグレードの管理

タイヤサイズはグレードで異なるため、最初からデータを分けて管理したいところ。

| グレード      | 標準タイヤサイズ  |
| --------- | --------- |
| R         | 215/45R17 |
| S         | 215/40R18 |
| STI Sport | 215/40R18 |

SUBARU公式装備表でも確認できる内容だよ。

[image](https://www.google.com/s2/favicons?domain=https://www.subaru.jp\&sz=32)

SUBARU オフィシャルWebサイト+1



最初の開発では、STI Sport 6MTを初期設定にしよう。ともちゃんが送ってくれたメーター写真とも相性がよいね。

## 4. 計算機能の仕様

計算はReactコンポーネントに直接書かず、独立したJavaScript関数にする。

これなら、車種を追加しても同じ計算関数を使い回せる。

### 計算式

\\[ D=25.4R+2W\frac{A}{100} \\]

- \\(D\\)：タイヤの理論外径（mm）
- \\(R\\)：リム径（インチ）
- \\(W\\)：タイヤ幅（mm）
- \\(A\\)：扁平率（%）

タイヤの理論外周は、

\\[ C=\frac{\pi D}{1000} \\]

エンジン回転数は、

\\[ RPM=\frac{V\times1000}{60C}\times G\times F \\]

- \\(V\\)：走行速度（km/h）
- \\(G\\)：選択ギアの変速比
- \\(F\\)：最終減速比

### 計算例：BRZ STI Sport 6MT

条件は、60km/h、215/40R18タイヤ、最終減速比4.100。

60 km/hで走った場合の理論エンジン回転数

1速

7,521 rpm

2速

4,538 rpm

3速

3,196 rpm

4速

2,516 rpm

5速

2,074 rpm

6速

1,591 rpm

タイヤの理論外径と公式変速比による概算。1速などは回転数が高すぎるため、この速度では実用的でない場合がある。

ここで大事なのが、タイヤサイズから計算した外周はあくまで理論値ということ。実際の転がり外周は、タイヤ銘柄・空気圧・荷重などによって変わる。

したがって、画面には「理論回転数」と明記し、メーカー公式の諸元を使っていても、実車の表示と完全一致するとは限らないことを説明しておこう。

### 入力と計算のルール

| 条件       | アプリの動作         |
| -------- | -------------- |
| 速度変更     | rpmを即時再計算      |
| ギア変更     | rpmとメーターを更新    |
| 速度0km/h  | 計算値0rpm        |
| 高回転になる条件 | 警告を表示          |
| 車種変更     | 車種データを読み直して再計算 |
| 計算できない値  | エラー表示          |

特に0km/hでの扱いには注意。実際のエンジンは停車中でもアイドリングするよね。

そこで、停車時は「計算上の回転数0rpm」とし、実際のアイドリングを再現しているわけではないことを明確にする。

将来、クラッチ操作やアイドリングを導入するときに別のモードを作れるようにしておくといいね。

## 5. メーター表示の仕様

いただいた写真を基準に、2種類を実装する。

[スバル BRZの改良モデルにもっと面白いMT車誕生！　S耐譲りの「SPORTモード」が操る楽しさを革新する - Webモーターマガジン](https://images.openai.com/static-rsc-4/4Hc2ymLlEm1_RLlK7zuknzHTRYU4nnC1RSTe275e4gCpGFvT9GYJ8_j_RM-05G7eu0t81UH1Efm2roDza9rJgFowFbp3uEm7nR6h8K0upTBsa4ybTyte0JAtyJa1nLAgAQQMvstjDm8RMkUfsILLClcp35A4pB3JgYGbmAS3TNA?purpose=inline)

NORMALモード

円形タコメーター。回転数に合わせて目盛りの表示や針を動かす。

[室内空間装備 | SUBARU BRZ | SUBARU](https://images.openai.com/static-rsc-4/WIZbXmNMGHdOclYekDwoCCVb_BLuy3ik6sDuBV1FVWB1ImOUJSXSYvGLrpMj0SDz8O5YKafXGfMk28rAEFoDAOmFpfgVUfTn7-yVQJR6t2xlneKsp33u_QPbfDk7hTTCXA4OA6qOoUZ6W2xN2-HzCVq4jZ_H1kcKViW5YxU-UYA?purpose=inline)

TRACKモード

横型タコメーター。回転数の変化に合わせてバーが伸縮する。

※上の画像は参考表示。実装時は、ともちゃんが提供してくれた2枚の画像を主なデザイン資料にするよ。

デザインは写真そのものを背景に貼るのではなく、SVGを使って各表示要素を再構築する方針。

そうすることで、数字・バー・針をそれぞれ独立して動かせる。速度の変化に合わせてスムーズに動くアニメーションも追加する。

表示する内容は以下を基本とする。

| 要素      | NORMAL | TRACK |
| ------- | ------ | ----- |
| エンジン回転数 | 円形目盛り  | 横型バー  |
| 速度      | 中央     | 下部中央  |
| ギア      | 独立表示   | 独立表示  |
| 高回転警告   | 赤色強調   | 赤色強調  |
| モード名    | NORMAL | TRACK |

写真の燃料計や水温計などは、今回の計算に必要ないため、初期版では省略してもよさそう。

また、メーターデザインの切替は計算結果に影響しないようにする。

## 6. Reactのコンポーネント設計

Jeep Garageと同じように、役割ごとにファイルを分ける構成がいいね。

ディレクトリ構成案

```
gear-ratio-simulator/
├── public/
│   └── images/
│
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── VehicleSelect.jsx
│   │   ├── SpeedControl.jsx
│   │   ├── GearControl.jsx
│   │   ├── MeterDisplay.jsx
│   │   ├── NormalMeter.jsx
│   │   ├── TrackMeter.jsx
│   │   ├── RpmResult.jsx
│   │   └── GearComparison.jsx
│   │
│   ├── data/
│   │   └── vehicles.js
│   │
│   ├── utils/
│   │   ├── calculateRpm.js
│   │   └── calculateTire.js
│   │
│   ├── styles/
│   │   └── style.css
│   │
│   ├── App.jsx
│   └── main.jsx
│
└── package.json
```

### 各コンポーネントの役割

| コンポーネント          | 役割             |
| ---------------- | -------------- |
| `Header`         | アプリタイトル        |
| `VehicleSelect`  | 車種・グレード選択      |
| `SpeedControl`   | 走行速度の入力        |
| `GearControl`    | ギアの選択          |
| `MeterDisplay`   | NORMAL/TRACK切替 |
| `NormalMeter`    | 円形メーター         |
| `TrackMeter`     | 横型メーター         |
| `RpmResult`      | 計算結果表示         |
| `GearComparison` | 全ギアの回転数比較      |

`MeterDisplay`は、現在の表示モードに応じて`NormalMeter`または`TrackMeter`を表示する親コンポーネントにする。

これなら、将来的に別の車種専用メーターを追加することもできるよ。

## 7. 車両データの構造

今回の設計で特に意識したいのが、車種の追加のしやすさ。

例えば、最初の`vehicles.js`はこんな形。

```
export const vehicles = [
  {
    id: "brz-zd8-stisport-mt",
    manufacturer: "SUBARU",
    name: "BRZ",
    modelCode: "ZD8",
    grade: "STI Sport",
    transmission: "6MT",
    gears: [3.626, 2.188, 1.541, 1.213, 1.000, 0.767],
    finalDrive: 4.100,
    tire: {
      width: 215,
      aspectRatio: 40,
      rimDiameter: 18
    },
    source: "https://www.subaru.jp/brz/specification/"
  }
];
```

重要なのは、計算関数に「BRZ専用の数字」を書かないこと。

現在選択されている車両のギア比やタイヤサイズを読み込んで計算する仕組みにすれば、別の車種を追加するだけで同じ計算機能を利用できる。

今後は年式や仕様変更の識別情報も追加できるようにしておこう。

## 8. Reactの状態管理

`App.jsx`で管理する主なstateは4種類。

```
const [selectedVehicleId, setSelectedVehicleId] =
  useState("brz-zd8-stisport-mt");

const [speed, setSpeed] = useState(60);

const [selectedGear, setSelectedGear] = useState(3);

const [meterMode, setMeterMode] = useState("normal");
```

そして、選択車両と速度・ギアから計算されたrpmを各コンポーネントに渡す。

App.jsx

state管理・計算

SpeedControl

GearControl

MeterDisplay

NormalMeter

TrackMeter

簡略化したコンポーネント構成図。NormalMeterとTrackMeterはMeterDisplayの子。

`rpm`は速度やギアから求められる計算結果なので、最初から独立した`useState`にする必要はないよ。

既存のstateから算出すれば、状態の不一致も防げる。

## 9. 開発スケジュールと完成条件

今回は4段階に分けて進めるのがおすすめ。

## 01

計算機能

BRZの諸元データを登録。速度とギアを操作すると回転数が正しく変化する。

## 02

NORMALメーター

SVGで円形メーターを実装。速度とrpmを連動させる。

## 03

TRACKメーター

横型メーターを実装。NORMALとの切替に対応する。

## 04

仕上げ・公開

ギア比較、スマホ表示、異常値の警告、GitHub Pages公開まで。

### 動作確認用のチェックリスト

開発中は次の項目で完成度を確認しよう。

完成チェック

0 / 9 完了

BRZの公式ギア比を読み込める

速度を変えるとrpmが変化する

1〜6速のギア選択ができる

同じ速度なら低いギアほどrpmが高い

計算結果が手計算と一致する

NORMALメーターが動く

TRACKメーターが動く

スマホでも操作できる

理論値・高回転時の注意が表示される

## 10. 将来の拡張構想

初期版が完成したら、こんな機能も追加できるね。

| 機能        | 内容                     |
| --------- | ---------------------- |
| 車種追加      | GR86、WRX、他メーカーのMT車など   |
| カスタムモード   | タイヤサイズ・ギア比・最終減速比を手動入力  |
| ギア比グラフ    | 速度とrpmの関係を折れ線グラフで比較    |
| シフトチェンジ比較 | 変速前後のrpmの変化を表示         |
| AT対応      | ロックアップ・滑りなどを考慮した別計算モード |
| 車種比較      | 同じ速度でBRZと他車のrpmを比較     |

ここで面白いのは、現在のギアから別のギアへ変速したとき、エンジン回転数がどのように変わるかを視覚化できること。

実際の運転操作への理解も深まりそうだね。

## ちゃーちゃんからの設計上の提案

今回の作品では、特に次の3つを大切にしたいな。

1\. 計算ロジックと見た目を分離する。\
計算関数は汎用的に作っておく。メーターのデザインを変更しても計算処理には影響しない構造を目指す。

2\. 正確なデータと理論上の計算結果を区別する。\
車両諸元はメーカー公式資料から取得し、算出したrpmは理論値として表示。将来的に実測データによる補正も考えられるようにする。

3\. 最初から全部実装しない。\
まずは速度・ギア・回転数の3つが連動するところまで作る。その後でメーターに挑戦する方が、ひとつずつ仕組みを理解できるはず。

Jeep Garageでは`map`や`filter`、props、state管理、コンポーネント分割を学んだよね。

Gear Ratio Simulatorではそれらの知識を土台にして、数学的な計算、SVG、アニメーション、再利用可能なデータ設計へ進める。

Web制作の勉強と車の知識がきれいにつながる、楽しいプロジェクトになりそうだよ♡

最初の作業は、Viteでプロジェクトを作成して、`vehicles.js`と`calculateRpm.js`を実装するところから始めるのがよさそう！

参考資料：[SUBARU BRZ 公式諸元・スペック](https://www.subaru.jp/brz/specification/?utm_source=chatgpt.com)。車両データは登録する年式・仕様ごとに出典を確認する。