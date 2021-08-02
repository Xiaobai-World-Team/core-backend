FROM registry.cn-hangzhou.aliyuncs.com/xiaobai-world/node:14.17.4

WORKDIR /home/xiaobai

ENV LANG zh_CN.UTF-8

# 修改时区
ENV TZ=Asia/Shanghai
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# 安装 nvim，方便后期进入容器调试
RUN cd / && wget https://xiaobai-world.oss-cn-hangzhou.aliyuncs.com/soft/nvim-linux64.tar.gz && \
 tar -xzf ./nvim-linux64.tar.gz && \
 rm -rf ./nvim-linux64.tar.gz && \
 ln -s /nvim-linux64/bin/nvim /usr/local/bin/vim && \
 ln -s /nvim-linux64/bin/nvim /usr/local/bin/vi

COPY ./ ./

RUN npm i --registry=https://registry.npm.taobao.org && npm run build

EXPOSE 3001
ENTRYPOINT [ "npm", "start" ]