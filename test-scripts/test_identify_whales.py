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