import requests

url = "http://127.0.0.1:8000/upload/image"
files = {'file': ('test_image.jpg', open('test_image.jpg', 'rb'), 'image/jpeg')}
params = {'facility_id': 'facility-001'}

try:
    response = requests.post(url, files=files, params=params)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.text}")
except Exception as e:
    print(f"Error: {e}")
