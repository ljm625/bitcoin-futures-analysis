#%%
import requests

resp=requests.get("https://api.bitfinex.com/v2/book/tETHUSD/R0?len=100")

datas=resp.json()

print(datas)



for data in datas:
    if abs(data[2])>=100:
        print("Whales at {} : {}".format(data[1],data[-1]))

resp = requests.get("https://api.bitfinex.com/v2/trades/tETHUSD/hist?limit=500")

datas=resp.json()
print(datas)

for data in datas:
    if abs(data[2])>=100:
        print("Whales order filled at {} :{}".format(data[-1],data[2]))



# Try to combine the strategy



# 策略1. 短线精灵：
"""
最近大笔成交均为单方向 （90%）

200 level没有看到大挂单

单向行情

------

最近大笔成交为同价格
单方向

该价格有大单，且还在不断挂单（可能的反转）

一般往往反方向有压缩价格单

-----

最近基本无大笔交易

双方均有大挂单

往往说明要变盘


"""

# 长线精灵

"""
统计这段时间的所有大单成交，分类

进行数据处理，跟踪测试。
"""


