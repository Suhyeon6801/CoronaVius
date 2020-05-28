# CoronaVirus  


## corona19 정보 전달 웹페이지

### 사용기술

> Front-end : React.js  
> Back-end : node.js, AWS RDS, Mysql  
> Crawling & Predict : python - Beautifulsoup4, prophet


### 구현기능
- 뉴스 : 연합뉴스 링크를 연결하여 코로나19의 최신기사를 볼 수 있게 구현
- 지도보기 : NAVER MAP API를 활용하여 지역(서울) 감염자 현황을 지도에 marker와 circle로 표시, 클릭하면 감염자 수 알림
- 서울 확진자현황 : 확진자 정보를 질병관리본부에서 Python을 이용해 crawling후 csv파일을 db에 저장, api서버에서 데이터를 가져와 화면에 표시, 구별 조건검색기능 구현
- 코로나 현황 : 확진자, 격리해제, 검사중, 사망자 수를 그래프
- 서울시 확진자 예측 : python에서 prophet패키지를 이용하여 시계열 데이터를 분석하여 일주일 뒤의 확진자 수 예측, 그래프로 구현.  

## Screenshot  
  <img src="https://user-images.githubusercontent.com/28249931/77292013-c8004d00-6d22-11ea-8f84-a322de57f498.PNG" width="432" height="300"></img>
  <img src="https://user-images.githubusercontent.com/28249931/77292042-de0e0d80-6d22-11ea-8df2-d902e365bb91.png" width="432" height="300"></img>
  <img src="https://user-images.githubusercontent.com/28249931/77292052-e403ee80-6d22-11ea-9bc5-87ca178dfc56.PNG" width="432" height="300"></img>
  <img src="https://user-images.githubusercontent.com/28249931/77292057-e5cdb200-6d22-11ea-9c40-81ab0cfb3c88.PNG" width="432" height="300"></img>
  <img src="https://user-images.githubusercontent.com/28249931/77292061-e8c8a280-6d22-11ea-8979-50d093cff427.PNG" width="432" height="300"></img>
  <img src="https://user-images.githubusercontent.com/28249931/77292177-24636c80-6d23-11ea-9dea-4a5d640b4f03.PNG" width="432" height="300"></img>
  <img src="https://user-images.githubusercontent.com/28249931/77292130-0c8be880-6d23-11ea-9759-40890665ff06.png" width="432" height="300"></img>
