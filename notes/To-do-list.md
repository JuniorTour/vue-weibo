# To-do-list:大体完成后，逐步添加

## **2017/6/12**
1.点击看大图功能，需要长图可以滑动查看：
  1. 尝试了在Home内通过body.appendChild(pictureViewer)插入，
  不行！插入的结果只是一个<picture-viewer></picture-viewer>，没有渲染。

  这本质上应该是一个组件间通信的问题！
  2. 尝试了Event Bus，几乎可行，已经能实现APP和Home组件间通信！详见：https://www.w3ctrain.com/2016/08/02/text-overflow-mutiple-line/
  目前的难点在于，如何将pictureViewer插入到#app同级的地方。

2.safari中的:active尝试data-act-type:'hover'方案

3.卡片右上角.card-operate相关功能

## **2017/6/14**
1.点赞动画

2.下拉刷新

3.滑动到底部更新内容
