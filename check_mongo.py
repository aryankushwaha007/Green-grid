import socket

def check_mongo():
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    try:
        s.connect(('localhost', 27017))
        print("MongoDB is reachable.")
        s.close()
        return True
    except Exception as e:
        print(f"MongoDB is NOT reachable: {e}")
        return False

if __name__ == "__main__":
    check_mongo()
