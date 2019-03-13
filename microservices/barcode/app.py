import time
import socket
from flask import Flask

print('Initialized app.py...')

#app = Flask(__name__)

def create_app():
    app = Flask(__name__)

    def server_init(*args, **argv):
        print('Initializing barcode receiver...')

        HOST = '127.0.0.1'  # Standard loopback interface address (localhost)
        PORT = 6543        # Port to listen on (non-privileged ports are > 1023)
        done = False

        print('Initialized some stuff...')

        while done == False:
            with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
                s.bind((HOST, PORT))
                s.listen()
                conn, addr = s.accept()
                with conn:
                    print('Connected by', addr)
                    while True:
                        data = conn.recv(1024)
                        if not data:
                            break
                        print(data.decode('utf-8'))
                        conn.sendall(data)
    server_init()
    return app
app = create_app()

@app.route("/")
def hello():
    return "Hello World!"


if __name__ == '__main__':
    print('Reached barcode app.py...')
    app.run(host="0.0.0.0", debug=True)
    #server_initialize()
