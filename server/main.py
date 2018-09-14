import asyncio

import aiohttp

from BitcoinFetcher import BitcoinFetcher
from EthereumFetcher import EthereumFetcher

if __name__ == '__main__':
    # Start the loop
    loop = asyncio.get_event_loop()
    eth_tools = EthereumFetcher()
    btc_tools = BitcoinFetcher()
    loop.run_until_complete(asyncio.gather(
        eth_tools.get_high_volume_orders(),
        btc_tools.get_high_volume_orders()
    )
)

