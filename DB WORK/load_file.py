import json


# Load location file
with open('加油站位置.json', encoding="utf-8") as f:
    data = json.load(f)

gas_station = []
for i in data:
    gas_station.append(data[i])

for i in range(len(gas_station)):
    print(gas_station[i])