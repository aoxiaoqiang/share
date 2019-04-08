# 对 jgb-weapp 一些思考及分享

## 初衷

面临越来越复杂的业务，面对越来越多的需求，面对代码耦合严重，
为此我们需要一个方便、易用、可扩展的框架。

针对现状以及微信框架限制，选择另行封装一层微信api（包括：Page，Component，App，wx.xxx 等api），
希望提供一些额外的扩展能力。下面列举了一些功能：

* 封装原生api
  * Page => JPage
  * Component => JComponent
  * App => JApp
  * wx.xxx => jgb.xxx 异步api提供 `Promise` 返回
* JPage、JComponent、JApp 提供 `mixin`, `intercept` 功能
  * `mixin` 类似 `vue` 的功能
  * `intercept` 拦截内容并返回： 提供两种形式
    * 拦截某个函数 （在最早的生命周期函数执行 Object.defineProperty）
    * 拦截整个 opts ( `Page(opts)` )
* 全局消息通知 `Eventbus`
  * JPage、JComponent、JApp 内置 `eventbus`
* 内置插件系统，方便扩展
  * router 在JPage上置入类似 `vue-router` 的功能
  * setData 优化setData
  * eventbus 消息通知
  * computed 计算属性
* 对typescript有较好支持，提升开发体验

## 使用案例

理论上可以覆盖所有需要的场景，能发挥多少功能，就看想象力。

> **当然我们完全可以扩展单个功能为一个插件，方便其他小程序使用。**

  * 对于pv全局埋设

    ```typescript
      import { analysis } from 'analysis'
      import { JPage } from 'jgb-weapp'
      analysis.init();

      JPage.mixin({
        onLoad(opts) {
          analysis.pv(opts);
        }
      })
    ```

  * 统一添加Auth请求头

    ```typescript
    import { jgb } from 'jgb-weapp'

    jgb.intercept('request', 'begin', (opts) => {
      const header = opts.header || {};
      const auth = 'xxxx';
      header.Authorization = `Bearer ${auth}`;
      opts.header = header;
      return opts;
    })
    ```

## 实现

  ### mixin

在调用`Page`之前对opts实现混入，如果已有方法则实现一个新方法然后内部调用。

下面是伪代码，实现一个 mixin onLoad

```typescript
const mixins = {
  onLoad() {
    // do someting
  }
};

function JPage(opts) {
  const oldOnLoad = opts.onLoad
  
  const onLoad = function(options) {
    oldOnload.call(this, options);
    mixins.onLoad.call(this, options)
  }
  
  opts.onLoad = onLoad;
  
  Page(opts)
}
```



  ### intercept

实现原理和mixin类似。不过实现机制不同，在最早的生命周期使用`Object.defineProperty`拦截函数并返回数据，返回的数据作为之后的函数的参数。

下面是伪代码, 实现一个intercept onShareAppMessage

```typescript
const intercepts = {
  onShareAppMessage(opts) {
    return opts
  }
}

function JPage(opts) {
  const oldOnLoad = opts.onLoad
  const onLoad = function(options) {
    let oldShareMessage = this.onShareAppMessage;
    Object.defineProperty(this, 'onShareAppMessage', {
      set(nv) {
        oldShareMessage = nv
      },
      get() {
        return (data) => {
          const result = intercepts.onShareAppMessage.call(this, data)
          return oldShareMessage.call(this, result)
        }
      }
    })
    
    oldOnload.call(this, options);    
  }
  
  opts.onLoad = onLoad;
  
  Page(opts)
}
```



  ### 插件

目的将不同功能独立，方便扩展。

#### 开发插件

##### ts编译导出的方式

```typescript
import { JPage } from 'jgb-weapp'

export function init() {
  JPage.mixin({
    onShow() {
      // todo
    }
  })
}
```

引入插件

```typescript
import { init } from 'jgb-plugin-test'

init();
```

##### 导出use的方式

```typescript
import { IPlugin } from 'jgb-weapp/types/plugins'

export const testPlugin: IPlugin = {
  install(res) {
    const { JComponent } = res;
    JComponent.mixin({
      attached() {
        // todo
      }
    })
  }
}
```

引入插件

```typescript
import { testPlugin } from 'jgb-plugin-use-test'
import { use } from 'jgb-weapp'

use(testPlugin)
```

两种方式的区别，最大区别在于use的方式是依赖注入，保持统一实例。而ts编译导出在一般情况下引用的实例是同一个。

  ### jgb

主要扩展了异步接口支持以Promise的形式返回。

#### intercept

示例

```typescript
import { jgb } from 'jgb-weapp'

jgb.intercept('request', 'begin', (opts) => {
  const header = opts.header || {};
  const auth = 'xxxx';
  header.Authorization = `Bearer ${auth}`;
  opts.header = header;
  return opts;
})
```

提供了四个生命周期: `begin`, `success`, `fail`, `complete`, 分别对应执行开始，成功，失败，完成。

[code](https://github.com/jgbjs/jgb/blob/2.x/packages/jgb-weapp/src/native-api/index.ts)

