from urllib.request import urlopen
import pandas as pd
import csv
from PIL import Image
from urllib.error import HTTPError 
from pymongo import MongoClient

MONGO_URI='mongodb+srv://user:1234@cluster0.phopimv.mongodb.net/?retryWrites=true&w=majority'

client = MongoClient(MONGO_URI)
db = client.get_database('project')

# db.drinks 컬렉션명: drinks

# 1. 모든 inner.csv 파일 행을 읽는다
# 2. 한 행마다, url을 찾고 이 url을 이미지로 변경한 것을 img 변수에 저장한다
# 3. 한 행마다, 전통주명을 name에 저장한다
# 4. 전통주명을 저장한 것과 파일 경로와 연결하여서, 이미지 파일을 images폴더에 저장한다

# 행 읽기
f=open('uploads/inner.csv') # csv 파일 읽기
#print(f)
data=csv.reader(f)
check=[] # 빠진 숫자 확인

def urlToImage():
    print(next(data)) # 첫번째 행은 컬럼명이므로 생략

    while(True): # 행이 끝날 때까지 반복
       
        present=next(data) # 현재 작업하는 행 이름: present

        if present=='': # 더이상 출력할 행이 없으면 종료
            continue 
        name=present[1].rstrip() # 전통주명
        url_=present[17] # url 주소

        try: 
            img=Image.open(urlopen(url_)) # 이미지로 변환 완료
            check.append(int(present[0])) # 이미지 변환 완료된 고유값 저장
        except HTTPError as e:
            print(e)
            print("오류가 발생한 전통주 명",name)

        img=Image.open(urlopen(url_)) # 이미지로 변환 완료
        img.save('uploads/images/'+name+'.BMP','BMP') # 전통주명과 일치하게 이미지 변환
        # db에 넣기
        #

        if present[0]=='338': # 마지막 행 종료
            img.save('uploads/images/'+name+'.BMP','BMP') # 전통주명과 일치하게 이미지 변환
            # db에 넣기
            #
            break

        # while문 종료
    
    return 0

urlToImage() #실행#


newUrl='https://terms.naver.com/imageDetail.naver?docId=5804479&imageUrl=https%3A%2F%2Fdbscthumb-phinf.pstatic.net%2F4776_000_2%2F20190726153119003_6MNBJWRWG.jpg%2Ffe87_366_i1.jpg%3Ftype%3Dm4500_4500_fst_n%26wm%3DY&cid=58637&categoryId=58655'
origin_url='https://dthumb-phinf.pstatic.net/?src=%22https%3A%2F%2Fdbscthumb-phinf.pstatic.net%2F4776_000_2%2F20190726153119003_6MNBJWRWG.jpg%2Ffe87_366_i1.jpg%3Ftype%3Dw450_fst_n%22&twidth=226&theight=226&opts=10'



