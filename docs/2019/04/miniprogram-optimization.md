# 小程序优化

## 前言

在小程序官方文档中其实有一些[优化建议](https://developers.weixin.qq.com/miniprogram/dev/framework/performance/tips.html)，我们时常需要看看，其中最主要的是`setData`的优化。

### setData

由于微信小程序实现机制`setData`需要在视图层和逻辑层进行数据传输，这就有了性能瓶颈，所以我们需要做优化。

### 图片

目前图片资源的主要性能问题在于大图片和长列表图片上，这两种情况都有可能导致 iOS 客户端内存占用上升，从而触发系统回收小程序页面。

在 iOS 上，小程序的页面是由多个 WKWebView 组成的，在系统内存紧张时，会回收掉一部分 WKWebView。从过去我们分析的案例来看，大图片和长列表图片的使用会引起 WKWebView 的回收。

除了内存问题外，大图片也会造成页面切换的卡顿。我们分析过的案例中，有一部分小程序会在页面中引用大图片，在页面后退切换中会出现掉帧卡顿的情况。

当前我们建议开发者尽量减少使用大图片资源。

### 包大小

小程序一开始时代码包限制为 1MB，但我们收到了很多反馈说代码包大小不够用，经过评估后我们放开了这个限制，增加到 2MB 。代码包上限的增加对于开发者来说，能够实现更丰富的功能，但对于用户来说，也增加了下载流量和本地空间的占用。

开发者在实现业务逻辑同时也有必要尽量减少代码包的大小，因为代码包大小直接影响到下载速度，从而影响用户的首次打开体验。

在日常开发的时候，我们可能引入了一些新的库文件，而过了一段时间后，由于各种原因又不再使用这个库了，我们常常会只是去掉了代码里的引用，而忘记删掉这类库文件了。目前小程序打包是会将工程下所有文件都打入代码包内，也就是说，这些没有被实际使用到的库文件和资源也会被打入到代码包里，从而影响到整体代码包的大小。

### [Audits](https://developers.weixin.qq.com/miniprogram/dev/devtools/audits.html)

体验评分是一项给小程序的体验好坏打分的功能，它会在小程序运行过程中实时检查，分析出一些可能导致体验不好的地方，并且定位出哪里有问题，以及给出一些优化建议。

## 优化点

基于以上，提出下列优化项：

- 避免频繁`setData`
- 避免传递大数据
- 避免在后台进行`setData`
- 减小图片大小，按需引用图片
- 减小包大小
- 减少并发数

## 如何优化

基于以上点我们需要做的

### 如何避免频繁`setData`

在一个事件循环内，将批量的`setData`进行合并

```typescript
// 现状
Page({
  onLoad() {
    this.setData({
      a: '1'
    });
    // do something
    this.setData({
      b: '1'
    });
  }
});
// 期望
Page({
  onLoad() {
    // do something
    this.setData({
      a: '1',
      b: '1'
    });
  }
});
```

有些情况，可能会频繁触发事件导致会频繁`setData`,比如`onScroll`,`onTouchMove`等，我们应该怎么做呢？

- 使用节流函数
- 使用[wxs 响应事件](https://developers.weixin.qq.com/miniprogram/dev/framework/view/interactive-animation.html)

### 如何避免传递大数据

有以下几点

- 最小化更新
  比如我们需要更新某一项

  ```typescript
  Page({
    data: {
      item: {
        a: 1,
        b: 2,
        c: 3
      }
    },
    method() {
      // 错误示例, 当数据小的时候没事
      const item = this.data.item;
      item.a = 2;
      this.setData({ item });
      // 正确示例
      this.setData({
        'item.a': 2
      });
    }
  });
  ```

  其实我们日常开发中碰到大部分情况是长列表分页加载，如果我们每次都将获取新数据`concat`到长列表数据中再`setData`, 这样数据会越来越多导致数据超出或者慢等情况，那我们也可以以这种方式更新数据。

  ```typescript
  Page({
    data: {
      list: []
    },
    load() {
      const newdata = getMoreData(); // 分页加载拿到的数据
      let newList = {};
      // 以下是示例用代码，不严谨
      const len = this.data.list.length;
      for (let i = 0; i < arr.length; i++) {
        const item = newData[i];
        newList[`list[${len + i}]`] = item;
      }
      this.setData(newList);
    }
  });
  ```

- 优先更新-延迟更新
  当我们可能一次性拿到比较大的数据时，我们可能会直接`setData`，就会造成性能问。

  我们可以优先更新可视区域内的数据，之后再更新可视区域外的区域，这样避免一次性设置过多数据导致慢、卡顿等问题。

- 按需更新

  [recycle-view](https://github.com/wechat-miniprogram/recycle-view) 是一个很好的例子，原理如下图（<https://zhuanlan.zhihu.com/p/34585166>）

  ![img](https://pic3.zhimg.com/80/v2-f00bb3f5d9815d660d7bcbd87236af86_hd.jpg)

  只在可视区域内显示节点信息 ，其他的用占位替代，这样我们就可以到达按需更新的目的。在长列表或者瀑布流等需要展示很多数据并且有规律的场景下是**很有用处的**。

### [图片优化](https://www.yuque.com/ysfe/ykx/imgopt)

- 减少图片大小

  我们使用七牛 cdn，七牛提供了相对丰富的[api](https://developer.qiniu.com/dora/manual/1279/basic-processing-images-imageview2)可以动态改变图片大小等功能

  like: http://odum9helk.qnssl.com/resource/gogopher.jpg?imageView2/1/w/200/h/200

  ![1556162364876](https://user-images.githubusercontent.com/4362412/56707577-0a548f00-674c-11e9-8c16-461d31f54f90.png)

- 按需引用图片

  按照样式稿，基本能确定所需图片的宽高, 这样就能极大的减少图片大小。我们也有相应的**方法**得到处理过的图片地址。

### 减少包大小

- 查找代码，分析出不需要的代码并删除
- 通过**audits**分析，查找那些页面有 wxss 可能有优化空间
- 等等

### 减少并发

在 audits 分析中，有两个比较突出的是多图片并发和多请求并发，这是优化重点及难点。

- 减少图片请求并发

  - 使用`image`标签中得`lazy-load`属性，可以延迟加载图片

  ![image](https://user-images.githubusercontent.com/4362412/56708640-0c205180-6750-11e9-9591-ee5f706268d8.png)

  但是是在上下三屏开始加载，这个阈值不能设置，可能需要我们自己实现一个满足需求。
  当然我们可以考虑更好的解决方案。

  - 尽可能使用`iconfont` 或 css实现一些图标， 而不是引入一张图片

- 减少请求并发数

  - 根据实际情况优先请求首屏展示的内容，延后请求非首屏内容。
  - 查看是否有重复的请求，能否减少。
  - 使用`lazy-component`

    当我们把页面拆分成多个组件展示时，每个组件独立请求的情况下，这个时候我们需要引入延迟加载组件`lazy-component`,效果和`image`组件的`lazy-load`类似，当组件在可视区域内时初始化，不在可视区域内则不初始化。
