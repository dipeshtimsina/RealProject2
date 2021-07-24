from flask import json, jsonify
import app
print("start")
json_file = app.get_all_air()

print("1")

print(json_file)

print("yay")