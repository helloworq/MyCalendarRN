import os

path = 'D:\\app\\PNG-cards-1.3\\PNG-cards-1.3'

r = []
for f in os.listdir(path):
    print("\""+f[:-4]+'\":{"score":},')
#     r.append("\""+f[:-4]+"\":"+ " require(\'../../../../img/poker/"+f+"\'),")
#     r.sort()
# for i in r:
#     print(i)