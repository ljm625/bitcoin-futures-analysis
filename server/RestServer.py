import tornado.ioloop
import tornado.web
import json

from DataProcessor import DataProcessor


class OrderDataHandler(tornado.web.RequestHandler):

    def __init__(self,*args,**kwargs):
        super().__init__(*args,**kwargs)
        self._dp=DataProcessor()


    async def get(self,coin):
        if coin=="eth":
            # Check ETH orders
            pass
        elif coin == "btc":
            pass
        self.write("{}")

    async def post(self,coin):
        try:
            data = json.loads(self.request.body)
            assert type(data.get("period"))==int
            assert type(data.get("interval")) in (int,float)
            assert type(data.get("start_date")) in (int,float,type(None))
        except Exception as e:
            self.write(json.dumps({"error":"params are not valid"}))
            return
        try:
            if coin == "eth":
                result = await self._dp.get_order_data("ethereum",data.get("period"),data.get("interval"),data.get("start_date"))
                self.write(json.dumps({"price":result[0],"amount":result[1]}))
            elif coin == "btc":
                result = await self._dp.get_order_data("bitcoin",data.get("period"),data.get("interval"),data.get("start_date"))
                self.write(json.dumps({"price":result[0],"amount":result[1]}))
        except Exception as e:
            self.write(json.dumps({"result":"error","error":str(e)}))


if __name__ == "__main__":
    application = tornado.web.Application([
        (r"/orders/(.[a-zA-Z]+)", OrderDataHandler),

    ])
    application.listen(9888)
    tornado.ioloop.IOLoop.current().start()
