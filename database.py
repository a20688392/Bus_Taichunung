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
        name varchar(42) NOT NULL,
        studentNumber varchar(42) NOT NULL,
        email varchar(255) NOT NULL
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

# result = conn.execute("select * from user")
# for row in result:
#     print("{}, {}, {}".format(row[0], row[1], row[2]))

conn.commit()