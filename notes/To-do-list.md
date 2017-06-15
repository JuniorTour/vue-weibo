# To-do-list:大体完成后，逐步添加

1. 点击看大图功能，需要长图可以滑动查看：
  1. 尝试了在Home内通过body.appendChild(pictureViewer)插入，
  不行！插入的结果只是一个<picture-viewer></picture-viewer>，没有渲染。

  这本质上应该是一个组件间通信的问题！6/14
  2. 尝试了Event Bus，几乎可行，已经能实现APP和Home组件间通信！详见：https://www.w3ctrain.com/2016/08/02/text-overflow-mutiple-line/
  目前的难点在于，如何将pictureViewer插入到#app同级的地方。

  3. 放弃Event Bus，可以想象到日后不便于拓展维护。直接上Vuex！6/15
  文档里说：“Vuex就像眼镜，你会知道何时需要他。”真是精辟！

  实现了！6/15/17:49
  但是，用了直接给img添加click事件的方式，会影响性能。
  微博源站使用了data-act-type，应该是利用了事件代理，考虑尝试！

2. safari中的:active尝试data-act-type:'hover'方案

3. 卡片右上角.card-operate相关功能

4. 点赞动画

5. 下拉刷新

6. 滑动到底部更新内容

7. 登录页
