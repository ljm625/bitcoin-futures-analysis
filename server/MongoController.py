
import motor.motor_asyncio





class MongoController(object):
    def __init__(self,mongo_uri,username,password):
        self.client = motor.motor_asyncio.AsyncIOMotorClient(mongo_uri.format(username,password))
        pass

    async def get(self,db,coll,query_string):
        cursor = self.client[db][coll].find(query_string)
        datas = []
        for data in await cursor.to_list(length=10000):
            datas.append(data)
        return datas


    async def insert_many(self,db,coll,datas):
        result = await self.client[db][coll].insert_many(datas)
        print('inserted %d docs' % (len(result.inserted_ids),))
        pass

    async def insert_one(self,db,coll,data):
        result = await self.client[db][coll].insert_one(data)
        print('result %s' % repr(result.inserted_id))
        pass

