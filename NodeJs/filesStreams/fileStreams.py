import json

data = {
    "name": "Sarma",
    "age": 20,
    "skills": ["python", "Data Analysis"],
    "active": True
}
with open("data.json", "w", encoding="utf-8") as f:
    json.dump(data, f, indent=4)
    print("Created successfully")


with open("data.json", "r", encoding="utf-8") as f:
    parsed_data = json.load(f)

print(parsed_data)


import json
try:
    with open("data.json", "r", encoding="utf-8") as f:
        parsed_data = json.load(f)
except json.JSONDecodeError as e:
    print("Invalid JSON:", e)
except FileNotFoundError:
    print("File not found")


def safe_load(filepath, default=None):
    if default is None:
        default = {}

    try:
        with open(filepath, "r", encoding="utf-8") as f:
            return json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        return default

config = safe_load("config.json", default={"debug": False})
print(config)

with open("pretty_data.json", "w", encoding="utf-8") as f:
    json.dump(parsed_data, f, indent=4)



