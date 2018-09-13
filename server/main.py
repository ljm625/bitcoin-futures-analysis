import asyncio

import aiohttp

from EthereumFetcher import EthereumFetcher

if __name__ == '__main__':
    # Start the loop
    loop = asyncio.get_event_loop()
    eth_tools = EthereumFetcher()


    loop.run_until_complete(eth_tools.get_high_volume_orders())

