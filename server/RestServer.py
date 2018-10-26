import tornado.ioloop
import tornado.web
import json

from DataProcessor import DataProcessor


class BaseHandler(tornado.web.RequestHandler):
    def set_default_headers(self):
        self.set_header("Access-Control-Allow-Origin", "*")
        self.set_header("Access-Control-Allow-Headers", "x-requested-with")
        self.set_header('Access-Control-Allow-Methods', ' GET, POST, PUT, DELETE, OPTIONS')
        self.set_header("Access-Control-Allow-Headers", "*")

    def options(self, *args, **kwargs):
        # no body
        self.set_status(204)
        self.finish()


class OrderDataHandler(BaseHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._dp = DataProcessor()

    async def get(self, coin):
        if coin == "eth":
            # Check ETH orders
            pass
        elif coin == "btc":
            pass
        self.write("{}")

    async def post(self, coin):
        try:
            data = json.loads(self.request.body)
            assert type(data.get("period")) == int
            assert type(data.get("interval")) in (int, float)
            assert type(data.get("start_date")) in (int, float, type(None))
            assert type(data.get("min")) in (int, float, type(None))

        except Exception as e:
            self.write(json.dumps({"error": "params are not valid"}))
            return
        try:
            if coin == "eth":
                result = await self._dp.get_order_data("ethereum", data.get("period"), data.get("interval"),
                                                       data.get("start_date"), minimum=data.get("min"))
                self.write(json.dumps({"price": result[0], "buy": result[1],  "sell": result[2]}))
            elif coin == "btc":
                result = await self._dp.get_order_data("bitcoin", data.get("period"), data.get("interval"),
                                                       data.get("start_date"), minimum=data.get("min"))
                self.write(json.dumps({"price": result[0], "buy": result[1], "sell": result[2]}))
        except Exception as e:
            self.write(json.dumps({"error": str(e)}))


class TimeOrderDataHandler(BaseHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._dp = DataProcessor()

    async def get(self, coin):
        if coin == "eth":
            # Check ETH orders
            pass
        elif coin == "btc":
            pass
        self.write("{}")

    async def post(self, coin):
        try:
            data = json.loads(self.request.body)
            assert type(data.get("period")) == int
            assert type(data.get("interval")) in (int, float)
            assert type(data.get("start_date")) in (int, float, type(None))
            assert type(data.get("min")) in (int, float, type(None))

        except Exception as e:
            self.write(json.dumps({"error": "params are not valid"}))
            return
        try:
            if coin == "eth":
                result = await self._dp.get_order_time_series_data("ethereum", data.get("period"), data.get("interval"),
                                                                   data.get("start_date"), minimum=data.get("min"))
                self.write(json.dumps({"time": result[0], "buy_amount": result[1], "sell_amount": result[2]}))
            elif coin == "btc":
                result = await self._dp.get_order_time_series_data("bitcoin", data.get("period"), data.get("interval"),
                                                                   data.get("start_date"), minimum=data.get("min"))
                self.write(json.dumps({"time": result[0], "buy_amount": result[1], "sell_amount": result[2]}))
        except Exception as e:
            self.write(json.dumps({"error": str(e)}))


class VolumeOrderDataHandler(BaseHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._dp = DataProcessor()

    async def get(self, coin):
        if coin == "eth":
            # Check ETH orders
            pass
        elif coin == "btc":
            pass
        self.write("{}")

    async def post(self, coin):
        try:
            data = json.loads(self.request.body)
            assert type(data.get("period")) == int
            assert type(data.get("interval")) in (int, float)
            assert type(data.get("start_date")) in (int, float, type(None))
            assert type(data.get("min")) in (int, float, type(None))

        except Exception as e:
            self.write(json.dumps({"error": "params are not valid"}))
            return
        try:
            if coin == "eth":
                result = await self._dp.get_order_volume_data("ethereum", data.get("period"), data.get("interval"),
                                                              data.get("start_date"), minimum=data.get("min"))
                self.write(json.dumps({"time": result[0], "buy_amount": result[1], "sell_amount": result[2]}))
            elif coin == "btc":
                result = await self._dp.get_order_volume_data("bitcoin", data.get("period"), data.get("interval"),
                                                              data.get("start_date"), minimum=data.get("min"))
                self.write(json.dumps({"time": result[0], "buy_amount": result[1], "sell_amount": result[2]}))
        except Exception as e:
            self.write(json.dumps({"error": str(e)}))


if __name__ == "__main__":
    application = tornado.web.Application([
        (r"/api/v1/orders/(.[a-zA-Z]+)", OrderDataHandler),
        (r"/api/v1/time_orders/(.[a-zA-Z]+)", TimeOrderDataHandler),
        (r"/api/v1/volume_orders/(.[a-zA-Z]+)", VolumeOrderDataHandler),

    ])
    application.listen(9888)
    tornado.ioloop.IOLoop.current().start()
