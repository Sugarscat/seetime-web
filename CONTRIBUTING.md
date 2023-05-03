# 贡献

## 您需了解

`SeeTime` 是通过 [Go](https://golang.org/) 和 [React](https://reactjs.org/) 编写的.

在任意位置克隆 `SeeTime` 和 `SeeTime-web`

`SeeTime` —— 后端
```
git clone https://github.com/Sugarscat/seetime.git
```
`SeeTime-web` —— 前端
```
git clone  https://github.com/Sugarscat/seetime-web.git
```

## 预览您的更改

1. 后端
    ```
   go run main.go
   ```

2. Web 页面
    ```sh
    npm install
    ```

    ```sh
    npm run dev
    ```

## 后端返回代码

1. 200 成功
2. 400 令牌验证通过，但无权限 
3. 404 no found 
4. 403 令牌过期/无效 
5. 409 存在相同资源/用户名（存在冲突，无法执行） 
6. 423 修改不支持修改的资源（资源被锁定） 
7. 429 请求次数过多 
8. 500 服务器端异常
