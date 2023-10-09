import csv

listdata = []

with open('速限.csv', newline='', encoding='utf8') as csvfile:

  # 以冒號分隔欄位，讀取檔案內容
  rows = csv.reader(csvfile, delimiter=':')
  list_data = list(rows)

    

for i in range(len(list_data)):
    detail = []
    detail_string = list_data[i][0].split(',')
    for i in range(len(detail_string)):
       pass