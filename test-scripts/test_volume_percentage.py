import ssl

import requests
import time
import yaml
from pymongo import MongoClient
import numpy as np
now = int(time.time()*1000)

previous = int(now - 3600*24*1000)
resp = requests.get("https://api.bitfinex.com/v2/candles/trade:{}:tETHUSD/hist?start={}&end={}".format("1h",previous,now))

result = resp.json()

print(result)


def yaml_loader(config_path):
    with open(config_path) as f:
        return yaml.load(f)


config = yaml_loader("../server/config.yaml")


mongo_uri = config.get("mongo_uri").format(config.get("mongo_username"), config.get("mongo_password"))
db = MongoClient(mongo_uri,ssl=True,ssl_cert_reqs=ssl.CERT_NONE)
x = []
y2 = []

for data in result:
    x.append(data[0])
    y2.append(data[-1])
x.reverse()
y2.reverse()
print(x)
delta = x[1]-x[0]
coll = db.ethereum.orders

cur = coll.find({"time": {"$lt": result[0][0], "$gt": result[-1][0]}})
datas=list(cur)
y = [0 for _ in range(0,len(x))]
for data in datas:
    y[int((data['time']-x[0])//delta)] += abs(data['amount'])

y_total = [y[i]/y2[i] for i in range(0,len(y))]

print(x)
print(y)
print(y2)
print(y_total)


