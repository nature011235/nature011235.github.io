import pymysql

db = pymysql.connect(host='localhost', port=3306, user='root', passwd='darkness31415', db='easy_go', charset='utf8')

cursor = db.cursor()

#data = '--------------'

def findUserId(email):
    sql = "SELECT Id FROM member WHERE AccountNumber = \'{}\';".format(email)
    try:
        cursor.execute(sql)
        data = cursor.fetchone()
        print(data[0])
        db.commit()
        return data[0]
    except:
        db.rollback
        return 0

def deleteFavorite(email, placeId):
    userId = findUserId(email)
    sql = "DELETE FROM favorite_list WHERE UserId = {} AND PlaceId = \'{}\';".format(userId, placeId)
    try:
        cursor.execute(sql)
        db.commit()
        return True
    except:
        db.rollback
        return False
    
