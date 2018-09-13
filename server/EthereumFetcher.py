import aiohttp
import asyncio
import time
import yaml

from DataFetcher import DataFecher


class EthereumFetcher(object):
    """

    """

    def __init__(self,config_path="config.yaml"):
        def yaml_loader():
            with open(config_path) as f:
                return yaml.load(f)

        self.config=yaml_loader()

        pass

    async def get_high_volume_orders(self):
        last_time = 0
        def cur_time():
            return int(time.time()*1000)
        async with aiohttp.ClientSession() as session:
            last_time = cur_time()
            while True:
                await asyncio.sleep(10)
                now_time = cur_time()
                data = await DataFecher().fetch(session,self.config.get("eth_order_fetch_uri").format(last_time,now_time))
                print(self.config.get("eth_order_fetch_uri").format(last_time,now_time))
                last_time=now_time
                print(data)
