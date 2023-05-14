import sqlite3
import json


class QA:
    @staticmethod
    def getAll():
        conn = sqlite3.connect('user.sqlite')
        result = conn.execute("select * from QA")
        conn.commit()
        return result

