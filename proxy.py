from flask import Flask, request
import requests
import json
from urllib.parse import urlencode
import example_crash

app = Flask(__name__)


@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    return response

#
# @app.route('/')
# def hello_world():
#     return 'here'


@app.route('/<some_url>')
def proxy(some_url):
    # if some_url == 'getCrashes':
    #     return json.dumps(example_crash.crash_lookup)

    arg_dict = {k: v for k, v in request.args.items()}
    if arg_dict:
        url_string = 'http://localhost:8080/SSA/{0}?{1}'.format(some_url, urlencode(arg_dict))
    else:
        url_string = 'http://localhost:8080/SSA/{0}'.format(some_url)

    response = requests.get(url_string)
    return json.dumps(response.json())


if __name__ == '__main__':
    app.run(debug=True, port=5004)
