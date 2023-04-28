## 目录结构

## 后端返回代码

1. 200 成功
2. 400 令牌验证通过，但无权限 
3. 404 no found 
4. 403 令牌过期/无效 
5. 409 存在相同资源/用户名（存在冲突，无法执行） 
6. 423 修改不支持修改的资源（资源被锁定） 
7. 429 请求次数过多 
8. 500 服务器端异常

## Web 页面

```sh
npm install
```

```sh
npm run dev
```

```sh
npm run build
```

## 文档

```sh
npm run docs:dev
```

```sh
npm run docs:build
```
