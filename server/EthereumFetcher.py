import aiohttp
import asyncio
import time
import yaml

from DataFetcher import DataFecher
from MongoController import MongoController


class EthereumFetcher(object):
    """

    """

    def __init__(self,config_path="config.yaml"):
        def yaml_loader():
            with open(config_path) as f:
                return yaml.load(f)

        self.config=yaml_loader()
        self.db_handler = MongoController(self.config.get("mongo_uri"),self.config.get("mongo_username"),self.config.get("mongo_password"))
        self.db_name = "ethereum"
        self.coll_name = "orders"

        pass

    async def get_high_volume_orders(self):
        def generate_data(datas):
            new_data = []
            for data in datas:
                if abs(data[2]) >= self.config.get("eth_order_threshold"):
                    print("ETH order filled at {} :{}".format(data[-1], data[2]))
                    new_data.append({"time":data[1],"amount":data[2],"price":data[-1]})
            return new_data

        def cur_time():
            return int(time.time()*1000)

        async with aiohttp.ClientSession() as session:
            last_time = cur_time()
            while True:
                await asyncio.sleep(int(self.config.get("fetch_interval")))
                now_time = cur_time()
                data = await DataFecher().fetch(session,self.config.get("eth_order_fetch_uri").format(last_time,now_time))
                print(self.config.get("eth_order_fetch_uri").format(last_time,now_time))
                last_time=now_time
                new_data=generate_data(data)
                if new_data:
                    # pass
                    await self.write_data_to_db(new_data)


    async def write_data_to_db(self,data):
        await self.db_handler.insert_many(self.db_name,self.coll_name,data)

