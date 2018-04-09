## libraryClub图书社区日记

> 这是本人的毕业设计，一个以技术含量为主的作品~ 哈

#### log1: 社区前端框架的搭建
因为是门户网站，页面比较多，也是pc和移动端结合的响应式网站，因此选用了vue + nuxt的多页面服务端渲染的大概架构进行搭建


#### log2: 模块划分
1、首页的资讯（热门图书（销售数量排序）、推荐文章（推荐数排序）、社区动态）、社区动态、以及即将上市书籍、走马灯、广告等等
2、图书和文章页的比较简单、以排序为主（阅读数、推荐数、更新日期）

### Build Setup（安装）

``` bash
# install dependencies
$ npm install # Or yarn install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, checkout the [Nuxt.js docs](https://github.com/nuxt/nuxt.js).
