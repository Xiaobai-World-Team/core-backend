FROM registry.cn-hangzhou.aliyuncs.com/xiaobai-world/node:14.17.6-alpine

WORKDIR /home/xiaobai

ENV LANG zh_CN.UTF-8

ENV TZ=Asia/Shanghai
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

COPY ./ ./

RUN npm i --registry=https://registry.npm.taobao.org && \
 npm run build --webpack && \
 rm -rf node_modules && \
 npm i --production --registry=https://registry.npm.taobao.org

EXPOSE 3001
ENTRYPOINT [ "npm", "start" ]