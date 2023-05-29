import sqlite3
import json

class myFavorite:
    @staticmethod
    def getFavorite(user_id):
        conn = sqlite3.connect('user.sqlite')
        cursor = conn.cursor()
        sql = "SELECT bus.busNumber, bus.busName from favorite left join bus on favorite.bus_number = bus.busNumber WHERE favorite.user_id = ?"
        values = [user_id]
        cursor.execute(sql, values)
        result = cursor.fetchall()
        conn.commit()
        return result
    @staticmethod
    def check_favorite(busNumber, user_id):
        conn = sqlite3.connect('user.sqlite')
        cursor = conn.cursor()
        sql = "SELECT EXISTS(SELECT 1 FROM favorite WHERE bus_number = ? and user_id = ?)"
        values = [busNumber, user_id]
        cursor.execute(sql, values)
        result = cursor.fetchone()[0]
        conn.commit()
        return bool(result)
    @staticmethod
    def check_exists(busNumber):
        conn = sqlite3.connect('user.sqlite')
        cursor = conn.cursor()
        sql = "SELECT EXISTS(SELECT 1 FROM bus WHERE busNumber = ?)"
        values = [busNumber]
        cursor.execute(sql, values)
        result = cursor.fetchone()[0]
        conn.commit()
        return not bool(result)
    @staticmethod
    def saveFavorite(busNumber, user_id):
        conn = sqlite3.connect('user.sqlite')
        sql = "insert into favorite (bus_number, user_id) values(?, ?)"
        values = [busNumber, user_id]
        conn.execute(sql, values)
        result = conn.execute("select * from favorite")
        conn.commit()
        return result
