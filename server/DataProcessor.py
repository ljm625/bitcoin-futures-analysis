import datetime

import requests
import yaml

from MongoController import MongoController
import time
import asyncio

class DataProcessor(object):
    """

    """
    def __init__(self,config_path="config.yaml"):
        def yaml_loader():
            with open(config_path) as f:
                return yaml.load(f)

        self.config=yaml_loader()
        self.db_handler = MongoController(self.config.get("mongo_uri"),self.config.get("mongo_username"),self.config.get("mongo_password"))


    async def get_order_data(self,coin,period,interval,start_date=None,minimum=None):
        """

        :param coin: coin type, [bitcoin, ethereum]
        :param period: Period of data, in hours. If it's 0, it means no period.
        :param interval: Period, in hours
        :param start_date: the Unix timestamp * 1000
        :return: [x,y] x is price list, y is amount list.
        """
        def query_string_builder():
            time_now = int(time.time() * 1000)
            if start_date:
                return {"time": {"$lt": start_date+(3600*period)*1000,"$gt":start_date}}
            else:
                return {"time": {"$lt": time_now,"$gt":time_now-(3600*period)*1000}}

        datas = await self.db_handler.get(coin,"orders",query_string_builder())
        max_price = int((max(datas, key=lambda x: x["price"])["price"]//interval+1)*interval)
        min_price = int((min(datas, key=lambda x: x["price"])["price"]//interval)*interval)
        x = [min_price+i*interval for i in range(0,(max_price-min_price)//interval+1)]
        y = [0 for _ in range(0,(max_price-min_price)//interval+1)]
        y2 = [0 for _ in range(0,(max_price-min_price)//interval+1)]

        for data in datas:
            if minimum:
                if abs(data['amount'])<minimum:
                    continue
            y[int((data["price"] - min_price) // interval)] += abs(data["amount"])
            y2[int((data["price"] - min_price) // interval)] += data["amount"]
        for i in range(0, len(x)):
            if y2[i] < 0:
                y[i] = -y[i]
        return [x,y]

    async def get_order_volume_data(self,coin,period,interval,start_date=None,minimum=None):
        """

        :param coin: coin type, [bitcoin, ethereum]
        :param period: Period of data, in hours. If it's 0, it means no period.
        :param interval: Period, in hours
        :param start_date: the Unix timestamp * 1000
        :return: [x,y] x is price list, y is amount list.
        """

        def query_string_builder():
            return {"time": {"$lt": end_time,"$gt":start_time}}

        def candle_data_fetcher():
            data=dict(zip([1,3,6,12,24,168,336],['1h','3h','6h','12h','1D','7D','14D']))
            ts = '1h'
            if data.get(interval):
                ts = data.get(interval)
            resp = requests.get(
                    self.config.get("{}_candle_fetch_uri".format(coin)).format(ts, start_time,end_time))
            return resp.json()

        if not start_date:
            end_time = int(time.time()*1000)
            start_time = end_time - period*3600*1000
        else:
            start_time = start_date
            end_time = start_time + period*3600*1000

        ##########
        result = candle_data_fetcher()
        x = []
        y = []
        y2 = []

        for data in result:
            x.append(data[0])
            y2.append(data[-1])

        x.reverse()
        y2.reverse()
        #     print(x)
        for i in range(1, len(x)):
            if x[i] < x[i - 1]:
                print("Issue occured")
        delta = x[1] - x[0]
        start_time = x[0]
        end_time = x[-1]

        datas = await self.db_handler.get(coin,"orders",query_string_builder())

        for data in datas:
            if minimum:
                if abs(data['amount'])<minimum:
                    continue
            y[int((data["time"]-x[0])//delta)] += abs(data["amount"])

        return [x,y,y2]


    async def get_order_time_series_data(self,coin,period,interval,start_date=None,minimum=None):
        """

        :param coin: coin type, [bitcoin, ethereum]
        :param period: Period of data, in hours. If it's 0, it means no period.
        :param interval: Period, in hours
        :param start_date: the Unix timestamp * 1000
        :return: [x,y] x is price list, y is amount list.
        """

        def query_string_builder():
            return {"time": {"$lt": end_time,"$gt":start_time}}
        if not start_date:
            end_time = int(time.time()*1000)
            start_time = end_time - period*3600*1000
        else:
            start_time = start_date
            end_time = start_time + period*3600*1000
        datas = await self.db_handler.get(coin,"orders",query_string_builder())
        interval_timestamp = interval*3600*1000

        x = [start_time+i*interval_timestamp for i in range(0,(end_time-start_time)//interval_timestamp)]
        y = [0 for _ in range(0,len(x))]
        y2 = [0 for _ in range(0,len(x))]

        for data in datas:
            if minimum:
                if abs(data['amount'])<minimum:
                    continue

            if data["amount"]>=0:
                y[int((data["time"] - start_time) // interval_timestamp)] += data["amount"]
            else:
                y2[int((data["time"] - start_time) // interval_timestamp)] += data["amount"]
        return [x,y,y2]




