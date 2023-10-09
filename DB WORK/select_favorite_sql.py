import pymysql

db = pymysql.connect(host='localhost', port=3306, user='root', passwd='darkness31415', db='easy_go', charset='utf8')

cursor = db.cursor()

#data = '--------------'

def findUserId(email):
    sql = "SELECT Id FROM `member` WHERE AccountNumber = \'{}\';".format(email)
    try:
        cursor.execute(sql)
        data = cursor.fetchone()
        print(data[0])
        db.commit()
        return data[0]
    except:
        db.rollback
        return 0

def selectFavorite(email):
    userId = findUserId(email)
    sql = "SELECT PlaceId FROM `favorite_list` WHERE UserId = {};".format(userId)
    try:
        cursor.execute(sql)
        db.commit()
        data = cursor.fetchall()
        datalist = []
        for i in data:
            datalist.append(i[0])
        print(datalist)
        return datalist
    except:
        db.rollback
        return False
    
