import sqlite3
import json


class user:
    @staticmethod
    def register(account, password):
        conn = sqlite3.connect('user.sqlite')
        sql = "insert into user (account, password) values(?, ?)"
        values = [account, password]
        conn.execute(sql, values)
        result = conn.execute("select * from user ")
        conn.commit()
        return result
    @staticmethod
    def check_duplicate_username(account):
        conn = sqlite3.connect('user.sqlite')
        cursor = conn.cursor()
        sql = "SELECT EXISTS(SELECT 1 FROM user WHERE account = ?)"
        values = [account]
        cursor.execute(sql, values)
        result = cursor.fetchone()[0]
        conn.commit()
        return bool(result)
    
    @staticmethod
    def check(account):
        conn = sqlite3.connect('user.sqlite')
        cursor = conn.cursor()
        sql = "select password from user where (account = ?)"
        values = [account]
        cursor.execute(sql, values)
        result = cursor.fetchone()
        conn.commit()
        return result
    
    @staticmethod
    def getUserData(name):
        conn = sqlite3.connect('user.sqlite')
        cursor = conn.cursor()
        sql = "select * from user where (name = ?)"
        values = [name]
        cursor.execute(sql, values)
        result = cursor.fetchone()
        conn.commit()
        return result
