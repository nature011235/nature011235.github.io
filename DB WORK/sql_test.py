import pymysql



def fetch_data(table, address=""):

    #資料庫連線設定
    #可縮寫db = pymysql.connect("localhost","root","0000","easy_go" )
    db = pymysql.connect(host='localhost', port=3306, user='root', passwd='darkness31415', db='easy_go', charset='utf8')
    #建立操作游標
    cursor = db.cursor()

    # select all data
    if address == "":
        sql = 'SELECT * FROM {0}'.format(table)

    # selects certain data
    else:
        sql = 'SELECT * FROM {0} WHERE Address LIKE \'%{1}%\''.format(table, address)
    
    #執行語法
    cursor.execute(sql)

    #選取全部結果
    data = cursor.fetchall()

    data_position = []
    data_info = []

    for i in range(len(data)):
        position = {"latitude": data[i][1], "longitude": data[i][2]}
        data_position.append(position)

        # information append
        # charging point
        if table == 'charging_point':
            info = {"id": data[i][0], "name": data[i][3], "address": data[i][4]}
        # gas station
        if table == 'gas_station':
            info = {"id": data[i][0], "address": data[i][3]}
        # maintainance station
        if table == 'maintainance_station':
            info = {"id": data[i][0], "city name": data[i][3], "region name": data[i][4], "company name": data[i][5],"company name abbreviation": data[i][6], 
                    "name": data[i][7], "phone number": data[i][8], "address": data[i][9]}
        # speed limit
        if table == 'speed_limit':
            info = {"id": data[i][0], "city name": data[i][3], "region name": data[i][4], "address": data[i][5], "department": data[i][6],
                    "branch": data[i][7], "direction": data[i][8], "speed limit": data[i][9]}
        data_info.append(info)

    combined_data = {"positions": data_position, "informations": data_info}

   #關閉連線
    db.close()
    return combined_data
