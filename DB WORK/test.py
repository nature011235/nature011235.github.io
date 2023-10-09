from flask import render_template
from flask import Flask, request
import json
import submit_sql
import login_sql
import add_favorite_sql
import delete_favorite_sql
import select_favorite_sql
import sql_test

app = Flask(__name__,static_folder='./', static_url_path='/',template_folder='./')

@app.route("/get_data/<table>/", methods=['GET'])
def address(table):
    result = sql_test.fetch_data(table)
    return result

@app.route("/get_data/<table>/<user_addr_input>", methods=['GET'])
def looking_for_address(table, user_addr_input):
    result = sql_test.fetch_data(table, user_addr_input)
    return result

# @app.route("/index")
@app.route("/submit", methods=['POST'])
def submit():
    #return request.values['username'] + request.values['email'] + request.values['password']
    isSubmit = submit_sql.submit(request.values['username'], request.values['email'], request.values['password'])
    dic = {}
    dic['isSubmit'] = isSubmit
    dataJson = json.dumps(dic, ensure_ascii = False)
    print(dataJson)
    return dataJson
    #return render_template('index.html', data = dataJson)

@app.route("/login", methods=['POST'])
def login():
    isLogin = login_sql.login(request.values['email'], request.values['password'])
    dic = {}
    dic['isLogin'] = isLogin
    dataJson = json.dumps(dic, ensure_ascii = False)
    print(dataJson)
    return dataJson

@app.route("/addfavorite", methods=['POST'])
def addFavorite():
    isAddFavorite = add_favorite_sql.addFavorite(request.values['email'], request.values['placeId'])
    dic = {}
    dic['isAddFavorite'] = isAddFavorite
    dataJson = json.dumps(dic, ensure_ascii = False)
    print(dataJson)
    return dataJson

@app.route("/deletefavorite", methods=['POST'])
def deleteFavorite():
    isDeleteFavorite = delete_favorite_sql.deleteFavorite(request.values['email'], request.values['placeId'])
    dic = {}
    dic['isDeleteFavorite'] = isDeleteFavorite
    dataJson = json.dumps(dic, ensure_ascii = False)
    print(dataJson)
    return dataJson

@app.route("/selectfavorite", methods=['POST'])
def selectFavorite():
    isSelectFavorite = select_favorite_sql.selectFavorite(request.values['email'])
    dic = {}
    dic['isSelectFavorite'] = isSelectFavorite
    dataJson = json.dumps(dic, ensure_ascii = False)
    print(dataJson)
    return dataJson

@app.route("/", methods=['GET'])
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)


