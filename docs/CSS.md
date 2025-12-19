

# 全局CSS
uran-ui将一些基础且使用频率高的样式定义为全局样式

## ellipsis省略类样式
```css
//单行省略号
.p-te {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}

// 2/3/4行省略号
.p-te2,
.p-te3,
.p-te3 {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    /* autoprefixer: ignore next */
    -webkit-box-orient: vertical;
}

//2行省略号
.p-te2 {
    -webkit-line-clamp: 2;
}

//3行省略号
.p-te3 {
    -webkit-line-clamp: 3;
    /* autoprefixer: ignore next */
}

//4行省略号
.p-te4 {
    -webkit-line-clamp: 4;
}

.ellipsis,
.flex-ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
```

## flex布局类样式
```css
.flex {
    display: -webkit-box;
    /* //display: box; */
    display: -webkit-flex;
    display: flex;
}

.flex-inline {
    display: inline-flex;
}

.flex-wrap {
    flex-wrap: wrap;
  }

/* 垂直水平居中 */
.flex-center {
    display: flex;
    align-items: center;
    justify-content: center;
}

/* 垂直居中 */
.flex-vertical {
    display: flex;
    align-items: center;
}

/* 水平居中 */
.flex-horizontal {
    display: flex;
    justify-content: center;
}

/* 靠边垂直居中 */
.flex-between {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.flex-col {
    display: flex;
    flex-direction: column;
}

.flex-full {
    flex: 1;
    min-width: 0;
    min-height: 0;
}

.flex-ellipsis {
    flex: 1;
    width: 100%;
}

/* //子元素占用区域份数 */
.fx-f1 {
    -webkit-box-flex: 1;
    box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
}

/* //子元素占用区域份数 */
.fx-f1 {
    -webkit-box-flex: 1;
    box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
}

.fx-f2 {
    position: relative;
    -webkit-box-flex: 2;
    box-flex: 2;
    -webkit-flex: 2;
    flex: 2;
}

.fx-f3 {
    position: relative;
    -webkit-box-flex: 3;
    box-flex: 3;
    -webkit-flex: 3;
    flex: 3;
}

.fx-f4 {
    position: relative;
    -webkit-box-flex: 4;
    box-flex: 4;
    -webkit-flex: 4;
    flex: 4;
}

/* //占父盒子的二分之一 */
.fx-1f2 {
    -webkit-box-flex: 0;
    box-flex: 0;
    -webkit-flex: 0 0 50%;
    flex: 0 0 50%;
    max-width: 50%;
}

/* //占父盒子的三分之一 */
.fx-1f3 {
    -webkit-box-flex: 0;
    box-flex: 0;
    -webkit-flex: 0 0 33.333%;
    flex: 0 0 33.333%;
    max-width: 33.333%;
}

/* //占父盒子的四分之一 */
.fx-1f4 {
    -webkit-box-flex: 0;
    box-flex: 0;
    -webkit-flex: 0 0 25%;
    flex: 0 0 25%;
    max-width: 25%;
}

/* //============对齐方式==============
    //---子元素水平对齐----
    //居中对齐 */
.fx-pc {
    display: flex;
    -webkit-box-pack: center;
    box-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
}

/* //结尾对齐 */
.fx-pe {
    display: flex;

    -webkit-box-pack: end;
    box-pack: end;
    -webkit-justify-content: flex-end;
    justify-content: flex-end;
}

/* //两端对齐 */
.fx-pj {
    display: flex;

    -webkit-box-pack: justify;
    box-pack: justify;
    -webkit-justify-content: space-between;
    justify-content: space-between;
}

/* //---子元素垂直对齐----
    //子元素垂直居中 */
.fx-ac {
    display: flex;

    -webkit-box-align: center;
    box-align: center;
    -webkit-align-items: center;
    align-items: center;
}

/* //子元素垂直结尾对齐 */
.fx-ae {
    display: flex;

    -webkit-box-align: end;
    box-align: end;
    -webkit-align-items: flex-end;
    align-items: flex-end;
}

/* //子元素水平垂直居中 */
.fx-pac {
    display: flex;

    -webkit-box-pack: center;
    box-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    box-align: center;
    -webkit-align-items: center;
    align-items: center;
}

/* //=============================
    //子元素竖向排列 */
.fx-ver {
    -webkit-box-orient: vertical;
    box-orient: vertical;
    -webkit-flex-direction: column;
    flex-direction: column;
}

/* //子元素折行 */
.fx-bm {
    display: flex;

    /*box-lines出现无法使用的情况*/
    -webkit-box-lines: multiple;
    box-lines: multiple;
    -webkit-flex-wrap: wrap;
    flex-wrap: wrap;
}
```

## margin,padding类样式
```css
.ma {
    margin: 0 auto;
}

.m0 {
    margin: 0px;
}

.mt0 {
    margin-top: 0px;
}

.mb0 {
    margin-bottom: 0px;
}

.ml0 {
    margin-left: 0px;
}

.mr0 {
    margin-right: 0px;
}

.mlr0 {
    margin-left: 0px;
    margin-right: 0px;
}

.mtb0 {
    margin-top: 0px;
    margin-bottom: 0px;
}

.p0 {
    padding: 0px;
}

.pt0 {
    padding-top: 0px;
}

.pb0 {
    padding-bottom: 0px;
}

.pl0 {
    padding-left: 0px;
}

.pr0 {
    padding-right: 0px;
}

.plr0 {
    padding-left: 0px;
    padding-right: 0px;
}

.ptb0 {
    padding-top: 0px;
    padding-bottom: 0px;
}

.m5 {
    margin: 5px;
}

.mt5 {
    margin-top: 5px;
}

.mb5 {
    margin-bottom: 5px;
}

.ml5 {
    margin-left: 5px;
}

.mr5 {
    margin-right: 5px;
}

.mlr5 {
    margin-left: 5px;
    margin-right: 5px;
}

.mtb5 {
    margin-top: 5px;
    margin-bottom: 5px;
}

.p5 {
    padding: 5px;
}

.pt5 {
    padding-top: 5px;
}

.pb5 {
    padding-bottom: 5px;
}

.pl5 {
    padding-left: 5px;
}

.pr5 {
    padding-right: 5px;
}

.plr5 {
    padding-left: 5px;
    padding-right: 5px;
}

.ptb5 {
    padding-top: 5px;
    padding-bottom: 5px;
}

.m10 {
    margin: 10px;
}

.mt10 {
    margin-top: 10px;
}

.mb10 {
    margin-bottom: 10px;
}

.ml10 {
    margin-left: 10px;
}

.mr10 {
    margin-right: 10px;
}

.mlr10 {
    margin-left: 10px;
    margin-right: 10px;
}

.mtb10 {
    margin-top: 10px;
    margin-bottom: 10px;
}

.p10 {
    padding: 10px;
}

.pt10 {
    padding-top: 10px;
}

.pb10 {
    padding-bottom: 10px;
}

.pl10 {
    padding-left: 10px;
}

.pr10 {
    padding-right: 10px;
}

.plr10 {
    padding-left: 10px;
    padding-right: 10px;
}

.ptb10 {
    padding-top: 10px;
    padding-bottom: 10px;
}

.m15 {
    margin: 15px;
}

.mt15 {
    margin-top: 15px;
}

.mb15 {
    margin-bottom: 15px;
}

.ml15 {
    margin-left: 15px;
}

.mr15 {
    margin-right: 15px;
}

.mlr15 {
    margin-left: 15px;
    margin-right: 15px;
}

.mtb15 {
    margin-top: 15px;
    margin-bottom: 15px;
}

.p15 {
    padding: 15px;
}

.pt15 {
    padding-top: 15px;
}

.pb15 {
    padding-bottom: 15px;
}

.pl15 {
    padding-left: 15px;
}

.pr15 {
    padding-right: 15px;
}

.plr15 {
    padding-left: 15px;
    padding-right: 15px;
}

.ptb15 {
    padding-top: 15px;
    padding-bottom: 15px;
}

.m20 {
    margin: 20px;
}

.mt20 {
    margin-top: 20px;
}

.mb20 {
    margin-bottom: 20px;
}

.ml20 {
    margin-left: 20px;
}

.mr20 {
    margin-right: 20px;
}

.mlr20 {
    margin-left: 20px;
    margin-right: 20px;
}

.mtb20 {
    margin-top: 20px;
    margin-bottom: 20px;
}

.p20 {
    padding: 20px;
}

.pt20 {
    padding-top: 20px;
}

.pb20 {
    padding-bottom: 20px;
}

.pl20 {
    padding-left: 20px;
}

.pr20 {
    padding-right: 20px;
}

.plr20 {
    padding-left: 20px;
    padding-right: 20px;
}

.ptb20 {
    padding-top: 20px;
    padding-bottom: 20px;
}

.m25 {
    margin: 25px;
}

.mt25 {
    margin-top: 25px;
}

.mb25 {
    margin-bottom: 25px;
}

.ml25 {
    margin-left: 25px;
}

.mr25 {
    margin-right: 25px;
}

.mlr25 {
    margin-left: 25px;
    margin-right: 25px;
}

.mtb25 {
    margin-top: 25px;
    margin-bottom: 25px;
}

.p25 {
    padding: 25px;
}

.pt25 {
    padding-top: 25px;
}

.pb25 {
    padding-bottom: 25px;
}

.pl25 {
    padding-left: 25px;
}

.pr25 {
    padding-right: 25px;
}

.plr25 {
    padding-left: 25px;
    padding-right: 25px;
}

.ptb25 {
    padding-top: 25px;
    padding-bottom: 25px;
}

.m30 {
    margin: 30px;
}

.mt30 {
    margin-top: 30px;
}

.mb30 {
    margin-bottom: 30px;
}

.ml30 {
    margin-left: 30px;
}

.mr30 {
    margin-right: 30px;
}

.mlr30 {
    margin-left: 30px;
    margin-right: 30px;
}

.mtb30 {
    margin-top: 30px;
    margin-bottom: 30px;
}

.p30 {
    padding: 30px;
}

.pt30 {
    padding-top: 30px;
}

.pb30 {
    padding-bottom: 30px;
}

.pl30 {
    padding-left: 30px;
}

.pr30 {
    padding-right: 30px;
}

.plr30 {
    padding-left: 30px;
    padding-right: 30px;
}

.ptb30 {
    padding-top: 30px;
    padding-bottom: 30px;
}

.m35 {
    margin: 35px;
}

.mt35 {
    margin-top: 35px;
}

.mb35 {
    margin-bottom: 35px;
}

.ml35 {
    margin-left: 35px;
}

.mr35 {
    margin-right: 35px;
}

.mlr35 {
    margin-left: 35px;
    margin-right: 35px;
}

.mtb35 {
    margin-top: 35px;
    margin-bottom: 35px;
}

.p35 {
    padding: 35px;
}

.pt35 {
    padding-top: 35px;
}

.pb35 {
    padding-bottom: 35px;
}

.pl35 {
    padding-left: 35px;
}

.pr35 {
    padding-right: 35px;
}

.plr35 {
    padding-left: 35px;
    padding-right: 35px;
}

.ptb35 {
    padding-top: 35px;
    padding-bottom: 35px;
}

.m40 {
    margin: 40px;
}

.mt40 {
    margin-top: 40px;
}

.mb40 {
    margin-bottom: 40px;
}

.ml40 {
    margin-left: 40px;
}

.mr40 {
    margin-right: 40px;
}

.mlr40 {
    margin-left: 40px;
    margin-right: 40px;
}

.mtb40 {
    margin-top: 40px;
    margin-bottom: 40px;
}

.p40 {
    padding: 40px;
}

.pt40 {
    padding-top: 40px;
}

.pb40 {
    padding-bottom: 40px;
}

.pl40 {
    padding-left: 40px;
}

.pr40 {
    padding-right: 40px;
}

.plr40 {
    padding-left: 40px;
    padding-right: 40px;
}

.ptb40 {
    padding-top: 40px;
    padding-bottom: 40px;
}

.m45 {
    margin: 45px;
}

.mt45 {
    margin-top: 45px;
}

.mb45 {
    margin-bottom: 45px;
}

.ml45 {
    margin-left: 45px;
}

.mr45 {
    margin-right: 45px;
}

.mlr45 {
    margin-left: 45px;
    margin-right: 45px;
}

.mtb45 {
    margin-top: 45px;
    margin-bottom: 45px;
}

.p45 {
    padding: 45px;
}

.pt45 {
    padding-top: 45px;
}

.pb45 {
    padding-bottom: 45px;
}

.pl45 {
    padding-left: 45px;
}

.pr45 {
    padding-right: 45px;
}

.plr45 {
    padding-left: 45px;
    padding-right: 45px;
}

.ptb45 {
    padding-top: 45px;
    padding-bottom: 45px;
}

.m50 {
    margin: 50px;
}

.mt50 {
    margin-top: 50px;
}

.mb50 {
    margin-bottom: 50px;
}

.ml50 {
    margin-left: 50px;
}

.mr50 {
    margin-right: 50px;
}

.mlr50 {
    margin-left: 50px;
    margin-right: 50px;
}

.mtb50 {
    margin-top: 50px;
    margin-bottom: 50px;
}

.p50 {
    padding: 50px;
}

.pt50 {
    padding-top: 50px;
}

.pb50 {
    padding-bottom: 50px;
}

.pl50 {
    padding-left: 50px;
}

.pr50 {
    padding-right: 50px;
}

.plr50 {
    padding-left: 50px;
    padding-right: 50px;
}

.ptb50 {
    padding-top: 50px;
    padding-bottom: 50px;
}
```

## 宽高定位类样式
```css
.w-full {
    width: 100%;
}

.w-half {
    width: 50%;
}

.h-full {
    height: 100%;
}

.wh-full {
    width: 100%;
    height: 100%;
}

.hidden {
    display: none;
}

.por,
.relative {
    position: relative;
}

.poatl00 {
    position: absolute;
    top: 0;
    left: 0;
}
.poatr00 {
    position: absolute;
    top: 0;
    right: 0;
}
```

## 考拉特别类样式
```css
:root {
  --kl-main-color: #132f66;
  --kl-bg-color: #f0f4f9;
  --kl-font-color: #333333;
  --kl-click-color: #0c41ab;
  --kl-primary-color: #477ae0;
  --kl-success-color: #0ca62e;
  --kl-info-color: #999999;
  --kl-warning-color: #e1bf09;
  --kl-error-color: #d64949;
  --kl-border-color: #d4d4d4;
  --kl-ok-color: #0ca62e;
  --kl-ng-color: #cb0101;
  --kl-fx-color: #fc6d27;
  --kl-shadow-block: inset -3px -3px 7px #ffffff, inset 3px 3px 2px rgba(156, 156, 156, 0.5);
  --kl-shadow-inline: inset -1px -1px 0px #47484a, inset -2px -2px 0px #a8a8a8, inset 1px 1px 0px #ffffff;
  --kl-border-radius: 2px;
  --kl-padding-large: 30px;
  --kl-padding-small: 20px;
  --kl-padding-mini: 10px;
  --kl-disabled-btn-timer: 0.5s;
}

* {
  margin: 0;
  padding: 0;
  user-select: none;
  box-sizing: border-box;
}

html,
body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

body {
  background: #e5e5e5;
  font-size: 14px;
  color: var(--kl-font-color);
  overflow: hidden;
}

/** 图标 **/
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.hl-color {
  color: var(--kl-click-color);
}

.error-color {
  color: var(--kl-error-color);
}

.ok-color {
  color: var(--kl-success-color);
}

.ng-color {
  color: var(--kl-ng-color);
}

.fx-color {
  color: var(--kl-fx-color);
}

.border {
  border: var(--el-border);
}


.bg-black {
  background: #000;
}


/** 防止按钮重复点击 https://juejin.cn/post/7165828047520661534?searchId=20231207143441CFC059E251EAB3826714 */
.kl-throttle-btn {
  animation: kl-throttle var(--kl-disabled-btn-timer, 0.5s) step-end forwards;
}

.kl-throttle-btn:active,
.kl-throttle-btn.disabled {
  animation: none;
}

@keyframes kl-throttle {
  from {
    pointer-events: none;
    opacity: 0.6;
  }

  to {
    pointer-events: all;
    opacity: 1;
  }
}
```

## 其它
```css
.shadow-block {
    background: var(--kl-bg-color);
    box-shadow: var(--kl-shadow-block);
}

.shadow-inline {
    border: 0;
    box-shadow: var(--kl-shadow-inline);
}

.shadow-inline.hightlight {
    background: linear-gradient(110.58deg, #ebf2f8 -8.29%, #f8fcff 121.14%);
    box-shadow:
        inset -3px -3px 2px #d5dce4,
        inset 3px 3px 2px #a6bad5,
        0px 0px 2px 2px #fff;
    color: var(--kl-click-color);
}

// 分割线；默认位于底部
.split-line {
    position: relative;

    &::after {
        content: "";
        display: block;
        width: calc(100% - 3px);
        height: 2px;
        position: absolute;
        bottom: 0;
        left: 3px;
        background: #ccced0;
        box-shadow: inset 0px -1px 0px #ffffff;
    }
}

// 分割线；顶部
.split-line.split-top {
    &::after {
        top: 0;
    }
}

.split-line.split-left,
.split-line.split-right {
    &::after {
        width: 2px;
        height: 100%;
        background: #c4c4c4;
        box-shadow: -1px 0px 0px 0px #fff inset;
    }
}

.split-line.split-left {
    &::after {
        left: 0;
    }
}

.split-line.split-right {
    &::after {
        left: calc(100% - 3px);
    }
}

.main-title {
    color: #000;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    padding: 0 20px;
    height: 68px;
    line-height: 68px;
}

.aside {
    font-size: 14px;
    > .title,
    .aside-title {
        color: #000;
        font-size: 16px;
        font-style: normal;
        font-weight: 600;
        padding: 10px 18px;
    }

    .row {
        display: flex;
        align-items: center;
        width: 100%;
        height: 40px;
        padding: 0 18px;

        > * + .kl-btn {
            margin-left: 10px;
        }

        > .title {
            color: #333;
            font-size: 14px;
            font-style: normal;
            font-weight: 400;
            white-space: nowrap;
        }

        > .detail {
            width: 50px;
            height: 30px;
            flex: 1;
        }

        .border {
            padding: 0 4px;
            border: 1px solid #c4c4c4;
        }
    }

    .main-btn.kl-btn {
        color: #333;
        font-size: 20px;
        font-style: normal;
        font-weight: 600;
        letter-spacing: 1em;
        padding-left: 1em;
    }
}

.mask-body {
    position: fixed;
    top: 100px;
    left: 30px;
    right: 30px;
    bottom: 30px;
    margin: 0;
    z-index: 10;

    &::before {
        background: var(--kl-bg-color);
        content: "";
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
    }
}

.cursor,
.pointer {
    cursor: pointer;
}

.disabled {
    opacity: 0.6;
    pointer-events: none;
}

.pointer-events-none {
    pointer-events: none;
}

.pointer-events-all {
    pointer-events: all;
}

// 背景图像居中
.bg-img-center {
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
}

.nowrap {
    white-space: nowrap;
}

.rtl {
    direction: rtl;
}

.fw-b {
    font-weight: bold;
}
```
