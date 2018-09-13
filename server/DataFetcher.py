import asyncio
import aiohttp



class DataFecher(object):

    def __init__(self):
        pass


    async def fetch(self,session, url):
        async with session.get(url) as response:
            return await response.text()

    async def test(self):
        async with aiohttp.ClientSession() as session:
            html = await self.fetch(session, 'http://python.org')
            print(html)






if __name__ == '__main__':
    loop = asyncio.get_event_loop()
    loop.run_until_complete(DataFecher().test())

