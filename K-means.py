"""
1부터 5까지 매겨진 단맛, 신맛, 청량감, 바디감 데이터로 
K-maeans를 이용하여 군집화하는 함수
"""
from sklearn.preprocessing import scale
from sklearn.datasets import load_iris
from sklearn.cluster import KMeans
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
#%matplotlib inline

def makeCluster(c_number, iterator, data): #c_number: 클러스터 개수, iterator:최대 반복횟수,data:단신바청 dataframe
    # 단신바청_zero: 결측치는 0으로 채웠다는 의미로 생성한 변수 이름
    단신바청_zero=data
    # 학습시키기
    kmeans = KMeans(n_clusters=c_number, init='k-means++', max_iter=iterator,random_state=0)
    kmeans.fit(단신바청_zero)
    #print(kmeans.labels_) #k-means 라벨 추출
    
    단신바청_zero['cluster']=kmeans.labels_ # 클러스터 추가
    
    # 2차원으로 축소하기
    
    pca = PCA(n_components=2) # 2차원으로 표현할 거니까
    pca_transformed = pca.fit_transform(단신바청_zero.values) #데이터프레임 말고 값만 가지고

    단신바청_zero['pca_x'] = pca_transformed[:,0]
    단신바청_zero['pca_y'] = pca_transformed[:,1]
    
    # 시각화하기
    var=[]
    for i in range(c_number): # 클러스터 개수만큼
        # 반복문의 i를 가지고 변수명을 만드는 법: globals()
        tmp=globals()['marker{}_ind'.format(i)]=단신바청_zero[단신바청_zero['cluster']==i].index # marker변수생성
        var.append(tmp)
        #str(i)+'marker'+'_ind'=단신바청_zero[단신바청_zero['cluster']==i].index # marker변수생성
    
#     print(marker0_ind)
#     print(marker1_ind)
#     print(marker2_ind)
#    print(marker3_ind) # global변수 정상 동작 확인
    
    markers=['o','s','^','*','.','v','<',','] # 마커들
    
    for i,j in zip(range(len(var)),markers):
        #var='marker'+str(i)+'_ind'
        #print(var)
        plt.scatter(x=단신바청_zero.loc[var[i],'pca_x'], y=단신바청_zero.loc[var[i],'pca_y'], marker=j)
    
    plt.xlabel('PCA 1')
    plt.ylabel('PCA 2')
    plt.title(str(c_number)+' Clusters Visualization by 2 PCA Components')
    plt.show()
        

# 함수 호출 예시
#makeCluster(c_number, iterator, data):
#클러스터 5개, 300번 반복
df=pd.read_csv('/Users/lucy/Downloads/inner.csv')
단신바청=df[['단맛','신맛','바디감','청량감']]
print(단신바청.iloc[1])
단신바청_zero=단신바청.fillna(0) # 결측치 (nan값) 0으로 채움
makeCluster(5,300,단신바청_zero)