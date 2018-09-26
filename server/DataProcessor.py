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


    async def get_order_data(self,coin,period,interval,start_date=None):
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
            y[int((data["price"] - min_price) // interval)] += abs(data["amount"])
            y2[int((data["price"] - min_price) // interval)] += data["amount"]
        for i in range(0, len(x)):
            if y2[i] < 0:
                y[i] = -y[i]
        return [x,y]

    async def get_order_data_time(self,coin,period,interval,start_date=None):
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
            y[int((data["price"] - min_price) // interval)] += abs(data["amount"])
            y2[int((data["price"] - min_price) // interval)] += data["amount"]
        for i in range(0, len(x)):
            if y2[i] < 0:
                y[i] = -y[i]
        return [x,y]






