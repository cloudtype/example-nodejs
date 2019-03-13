# @cloudtype/example-nodejs

## 1. 사전준비

```sh
$ git clone https://github.com/cloudtype/example-nodejs.git
$ cd example-nodejs
$ npm install
$ npm i -g cloudtype-cli
$ ctype join http://cloudtype-server:port
```

## 2. 로컬실행

```sh
$ npm start
```

## 3. 배포하기

```sh
$ ctype init
$ ctype pack docker
$ ctype pack mongodb
$ ctype deploy
```

## 4. 시작/중지/확장/상태조회/로그

```sh
$ ctype stop
$ ctype start
$ ctype scale 10
$ ctype status
$ ctype log --tail 100
```

## 5. 제거

```sh
$ ctype destroy
```

