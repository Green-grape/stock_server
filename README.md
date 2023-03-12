# 주식 서버
> 자동 매매를 위한 주식서버입니다.

키움 API를 이용한 주식 자동매매에서 사용되는 주식서버로 
서버 프레임워크: [Nestjs](https://nestjs.com/)
데이터베이스:[MongoDB](https://www.mongodb.com/ko-kr)
를 이용해서 구성했습니다.
![](../header.png)

## 사용 방법

```sh
docker-compose up
npm run start
```

## REST API
HTTP 요청 리스트

**GET /api/chart/min**
+ beginDate에서 endDate까지 해당종목코드의 주식거래정보를 가져옴
+ query: {code: string(6자리종목코드), beginDate:Number, endDate:Number}
+ return:  StockData[]

**GET /api/recommend/today**
+ 오늘의 분석종목을 가져옴
+ return: RecommendStock[]

**POST /api/recommend**
+ 오늘의 분석종목을 저장함
+ body: {stockNames: string[], stockCodes: string[]}
+ return: {success:true}


## 개발 환경 설정

모든 개발 의존성 설치 방법과 자동 테스트 슈트 실행 방법을 운영체제 별로 작성합니다.

```sh
make install
npm test
```

## 업데이트 내역
