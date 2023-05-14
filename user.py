import sqlite3
import json


class user:
    @staticmethod
    def register(name, account, password, phoneNumber, email):
        conn = sqlite3.connect('user.sqlite')
        sql = "insert into user (name, account, password, phoneNumber, email) values(?, ?,?,?,?)"
        values = [name, account, password, phoneNumber, email]
        conn.execute(sql, values)
        result = conn.execute("select * from user ")
        conn.commit()
        return result
    
    @staticmethod
    def check_duplicate_username(name):
        conn = sqlite3.connect('user.sqlite')
        cursor = conn.cursor()
        sql = "SELECT EXISTS(SELECT 1 FROM user WHERE name = ?)"
        values = [name]
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
    def getUserData(account):
        conn = sqlite3.connect('user.sqlite')
        cursor = conn.cursor()
        sql = "select * from user where (account = ?)"
        values = [account]
        cursor.execute(sql, values)
        result = cursor.fetchone()
        print("??????:? " , result)
        conn.commit()
        return result
