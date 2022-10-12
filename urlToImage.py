from urllib.request import urlopen
import pandas as pd
import csv
from PIL import Image

# 1. 모든 inner.csv 파일 행을 읽는다
# 2. 한 행마다, url을 찾고 이 url을 이미지로 변경한 것을 img 변수에 저장한다
# 3. 한 행마다, 전통주명을 name에 저장한다
# 4. 전통주명을 저장한 것과 파일 경로와 연결하여서, 이미지 파일을 images폴더에 저장한다

# 행 읽기
f=open('uploads/inner.csv') # csv 파일 읽기
#print(f)
data=csv.reader(f)

def urlToImage():
    print(next(data)) # 첫번째 행은 컬럼명이므로 생략

    while(True): # 행이 끝날 때까지 반복

        if next(data)=='': # 더이상 출력할 행이 없으면 종료
            break 
        present=next(data) # 현재 작업하는 행 이름: present
        print(present)
        name=present[1].rstrip() # 전통주명
        url_=present[17] # url 주소

        img=Image.open(urlopen(url_)) # 이미지로 변환 완료
        img.save('uploads/images/'+name+'.BMP','BMP') # 전통주명과 일치하게 이미지 변환

        # while문 종료
    
    return 0

urlToImage() #실행#







