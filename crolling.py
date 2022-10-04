import csv
import requests 
from bs4 import BeautifulSoup
from pymongo import MongoClient
import pandas as pd
from urllib.request import urlopen


def matching_imgUrl():

    #filename = 'save_image.csv'
    #f = open(filename, 'w', encoding='utf-8-sig', newline='')
    #writer = csv.writer(f)
    with open('./uploads/save_img.csv','w',newline='') as f:
        writer=csv.writer(f)
        # 컬럼 명
        writer.writerow(['전통주명','이미지'])
    #url='https://terms.naver.com/list.naver?cid=58637&categoryId=58637&so=st3.asc&viewType=&categoryType=&page=1'
    url='https://terms.naver.com/list.naver?cid=58637&categoryId=58637&so=st3.asc&viewType=&categoryType=&page='

    # res = requests.get(url)
    #soup = BeautifulSoup(res.text, 'lxml')


    total=[] # 모든 이름과 이미지 url 저장할 곳   
    for page in range(1,39): # 페이지 수
        res = requests.get(url + str(page))
        res.raise_for_status() # 페이지를 못 가져올 경우 종료
        
        soup = BeautifulSoup(res.text, 'lxml')

        each_page=soup.select('.thumb_area')
        for item in range(len(each_page)): # 15개
            tmp=[] # 각 이름 & 이미지 url 저장
            tmp.append(each_page[item].img['alt'])
            tmp.append(each_page[item].img['data-src'])
            total.append(tmp)
    print(total)
    
    # 컬럼 명
    #writer.writerow(['전통주명','이미지'])
    # csv wirte
    with open('./uploads/save_img.csv','w',newline='') as f:
        writer=csv.writer(f)
        # 컬럼 명
        writer.writerow(['전통주명','이미지'])
        for i in total:
            writer.writerow(i)
    # 쓰기 종료
    f.close
        
    return 0

# 전체 데이터와 이미지 매핑
def join_img():
    img_file=pd.read_csv('./uploads/save_img.csv')
    jeon_file=pd.read_csv('./uploads/origin_data.csv')
    merged=pd.merge(jeon_file,img_file,how='left',on="전통주명") # 합치기
    #merged=pd.merge(left=jeon_file, right=img_file, how="inner", on='전통주명') --> inner.csv에 저장
#pd.merge(left = DF1 , right = DF2, how = "inner", on = "이름")

    with open('./uploads/jeontongju.csv','w',newline='') as f:
        #merged.to_csv('merged.csv',encoding='cp949')
        merged.to_csv('./uploads/jeontongju.csv',encoding='utf-8-sig')
        f.close
    return 0


# 실행
#matching_imgUrl() ->완료

join_img()