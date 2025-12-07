import requests

url = "http://localhost:8000/upload/csv"
files = {'file': ('test.csv', open('test.csv', 'rb'), 'text/csv')}

try:
    response = requests.post(url, files=files)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.text}")
except Exception as e:
    print(f"Error: {e}")
