# import necessary libraries
import os, sqlite3, json
from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    redirect)

###################################################
# Flask Setup
#################################################
app = Flask(__name__)

#################################################
# Database Connect
#################################################

from flask_sqlalchemy import SQLAlchemy
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', '') or "sqlite:///superclean_facilities.db"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
DB = "superclean_facilities.db"

def get_all_data( json_str = False ):
    conn = sqlite3.connect( DB )
    conn.row_factory = sqlite3.Row # This enables column access by name: row['column_name'] 
    db = conn.cursor()
    print("start pulling data")
    rows = db.execute('''
    SELECT * from facility_leveldf_2010 
    UNION ALL
    SELECT * from facility_leveldf_2011 
    UNION ALL
    SELECT * from facility_leveldf_2012 
    UNION ALL
    SELECT * from facility_leveldf_2013 
    UNION ALL
    SELECT * from facility_leveldf_2014 
    UNION ALL
    SELECT * from facility_leveldf_2015 
    UNION ALL
    SELECT * from facility_leveldf_2016 
    UNION ALL
    SELECT * from facility_leveldf_2017 
    UNION ALL
    SELECT * from facility_leveldf_2018
    UNION ALL
    SELECT * from facility_leveldf_2019 
     ''').fetchall()
    print("done pulling data")
    conn.commit()
    conn.close()
    all_data_json = json.dumps([dict(ix) for ix in rows])
    return all_data_json

def get_all_air( json_str = False ):
    conn = sqlite3.connect( DB )
    conn.row_factory = sqlite3.Row # This enables column access by name: row['column_name'] 
    db = conn.cursor()
    print("start pulling data")
    rows = db.execute('''
    SELECT * from airquality
     ''').fetchall()
    print("done pulling data")
    conn.commit()
    conn.close()
    all_air_json = json.dumps([dict(ix) for ix in rows])
    return all_air_json

# create route that renders index.html template
@app.route("/")
def home():
    return render_template("index.html")

@app.route("/api/GHGdata")
def ghgdata():
    return get_all_data()

@app.route("/api/AIRdata")
def airdata():
    return get_all_air()

if __name__ == "__main__":
    app.run(debug=True)
    