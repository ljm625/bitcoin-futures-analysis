
import motor.motor_asyncio





class MongoController(object):
    def __init__(self,ip,port,db_path,username,password):
        self.client = motor.motor_asyncio.AsyncIOMotorClient('mongodb://{}:{}@{}:{}/{}'.format(username,password,ip,port,db_path))
        pass


    async def get_data(self):
        pass


    async def insert_data(self):
        pass
