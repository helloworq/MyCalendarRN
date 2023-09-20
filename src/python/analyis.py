import re

pathProvince = r'C:\Users\lei.zhou\Desktop\region.json'
pathCity = r'C:\Users\lei.zhou\Desktop\中国-市级.svg'
pathCounty = r'C:\Users\lei.zhou\Desktop\中国-县级.svg'

pattenMatchPath = "/<path\b([\s\S]*?)\/>/g"
pattenMathValue = "(?<= name=\").*?(?=\")"  # 取以name="开头 "结尾的数据


def handle():
    r = re.findall(pattern=pattenMatchPath,string='<svg width="1000" height="800" xmlns="http://www.w3.org/2000/svg"> <path d="M699.82355980,220148496,212.62222100 699.27991612,212.62863201 699.35584347,212.58005509 699.48364894,212.57434578 699.76924168,212.66993674 699.82355980,212.65446740Z" adcode="110000" name="北京市" stroke="blue" fill="#aaa"/></svg>')
    print(r)

    #with open(pathProvince, 'r', encoding='utf-8') as f:
        #content = f.read()
        #match = re.findall(pattenMatchPath, f.read())
        #print(content)
        #print(len(f.read()))


if __name__ == '__main__':
    handle()
