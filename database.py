import sqlite3

conn = sqlite3.connect('user.sqlite')

conn.execute('''
    CREATE TABLE user (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name varchar(42) NOT NULL,
        account varchar(42) NOT NULL,
        password varchar(255) NOT NULL,
        phoneNumber varchar(42) NOT NULL,
        email varchar(255)
    );
''')
conn.execute('''
    CREATE TABLE author (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        class varchar(42) NOT NULL,
        name varchar(42) NOT NULL,
        studentNumber varchar(42) NOT NULL,
        nickename varchar(42) NOT NULL,
        img varchar(255) NOT NULL
    );
''')
conn.execute('''
    CREATE TABLE favorite (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        bus_number int NOT NULL,
        user_id int NOT NULL,
        FOREIGN KEY (user_id) REFERENCES user (id)
    );
''')
conn.execute('''
    CREATE TABLE QA (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        question varchar(255) NOT NULL,
        answer varchar(255) NOT NULL
    );
''')
conn.execute("insert into user (name, account, password, phoneNumber, email)\
            values('Jone','s1091881', '$2b$12$k/tLuYSd3aZTUkJX62A7YO0d3I.fiYdU6/gLCxUH2O0o/P2zmr0ZG', '0912-345-678' , 'Jone@gmail.com')")

conn.execute("insert into user (name, account, password, phoneNumber, email)\
            values('Andy','s1091915', '$2b$12$k/tLuYSd3aZTUkJX62A7YO0d3I.fiYdU6/gLCxUH2O0o/P2zmr0ZG', '0912-678-901' , 'Andy@gmail.com')")

conn.execute("insert into user (name, account, password, phoneNumber, email)\
            values('UserMate1','s1101916', 'password', '0934-325-618' , 'UserMate1@gmail.com')")

conn.execute("insert into user (name, account, password, phoneNumber, email)\
            values('UserMate2','s1091849', 'password', '0912-235-111' , 'UserMate2@gmail.com')")

conn.execute("insert into QA (question, answer)\
            values('如何使用' , '將您要搜尋的目標路線號碼輸入於主頁中的搜尋攔')")

conn.execute("insert into QA (question, answer)\
            values('查詢路線' , '將欲想搜尋的路線輸入後下方會出現搜尋結果，點擊進入後即可查詢路線')")

conn.execute("insert into QA (question, answer)\
            values('來源資料' , 'https://opendata.taichung.gov.tw')")

conn.execute("insert into QA (question, answer)\
            values('公車不準時/等不到公車' , '請撥打市民服務專線或是相關公司電話回報')")

conn.execute("insert into QA (question, answer)\
            values('公司機過站不停/態度不佳' , '請撥打市民服務專線或是相關公司電話回報')")

conn.execute("insert into author (class, name, studentNumber, nickename, img)\
            values('資工三B', '蔡侄宇' , '410918819', '時間不會等人，態度決定人生的高度。', './static/assets/img/jone.png')")

conn.execute("insert into author (class, name, studentNumber, nickename, img)\
            values('資工三B', '楊廷烽' , '410919158', '喜歡就是喜歡沒有理由，只有不喜歡才有理由', './static/assets/img/andy.png')")

conn.execute("insert into author (class, name, studentNumber, nickename, img)\
            values('資工三A', '高執益' , '410918495', '學無止境', './static/assets/img/monkey.jpg')")
# result = conn.execute("select * from user")
# for row in result:
#     print("{}, {}, {}".format(row[0], row[1], row[2]))

conn.commit()