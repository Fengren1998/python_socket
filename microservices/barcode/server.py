import socket
#from src.api.reservation import Reservations, Reservation

def server_init():
    print('Initializing barcode receiver...')

    HOST = '127.0.0.1'  # Standard loopback interface address (localhost)
    PORT = 6543        # Port to listen on (non-privileged ports are > 1023)
    done = False

    #db_resrs = Reservations()
    #db_resr = Reservation()

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

if __name__ == '__main__':
    server_init()
