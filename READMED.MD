# 武义社区移动端

## 项目运行

- yarn或者npm install 安装依赖
- yarn dev:weapp 微信小程序测试环境运行,yarn dev:h5 浙里办和h5测试环境运行
- 打包:浙里办打包去除node modules 压缩成zip,微信小程序yarn build:weapp,h5yarn build:h5

## 项目环境变量

- APP_ENV:移动端环境,‘zlb'为浙里办
- RUN_ENV:接口环境，test为测试环境、prod为生产环境
