import sqlite3
import json


class author:
    @staticmethod
    def getAll():
        conn = sqlite3.connect('user.sqlite')
        result = conn.execute("select * from author")
        conn.commit()
        return result

