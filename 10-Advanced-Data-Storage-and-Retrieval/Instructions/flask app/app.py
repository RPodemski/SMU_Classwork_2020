import datetime as dt
import numpy as np
import pandas as pd
from flask import Flask, jsonify
import json
from sqlHelper import SQLHelper

app = Flask(__name__)

sqlHelper = SQLHelper()

@app.route("/")
def home():
    print("Client requested the home page from the server")
    return("<h1>Welcome to my home page!</h1>")

@app.route("/api/v1/precipitation")
def precipitation():
    data = sqlHelper.precipitation()
    return jsonify(json.loads(data.to_json(orient="records")))

@app.route("/api/v1/stations")
def allStations():
    data = sqlHelper.allStations()
    return jsonify(json.loads(data.to_json(orient="records")))

@app.route("/api/v1/tobs")
def tobsMostActive():
    data = sqlHelper.tobsMostActive()
    return jsonify(json.loads(data.to_json(orient="records")))

# date must be in format YYYY-MM-DD
@app.route("/api/v1/<start_date>/<end_date>")
def tempDataRange(start_date, end_date):
    data = sqlHelper.tempDataRange(start_date, end_date)
    return jsonify(json.loads(data.to_json(orient="records")))

# date must be in format YYYY-MM-DD
@app.route("/api/v1/<start_date>")
def tempDataDate(start_date):
    data = sqlHelper.tempDataDate(start_date)
    return jsonify(json.loads(data.to_json(orient="records")))

if __name__ == "__main__":
    app.run(debug=True)
