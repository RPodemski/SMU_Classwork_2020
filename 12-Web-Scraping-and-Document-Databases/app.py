from flask import Flask, render_template, redirect
import pymongo
from scrape_mars import ScrapeMars

app = Flask(__name__)
scrapeMars = ScrapeMars()

conn = 'mongodb://localhost:27017'
client = pymongo.MongoClient(conn)

db = client.marsApp

@app.route("/")
def home():

    marsData = db.marsData.find_one(sort=[('last_updated', pymongo.DESCENDING )])
    return render_template("index.html", mars=marsData)


@app.route("/scrape")
def scrape():
    scrapedData = scrapeMars.scrape_info()
    db.marsData.insert_one(scrapedData)
    return redirect("/", code=302)


if __name__ == "__main__":
    app.run(debug=True)
