import socket

HOST = '127.0.0.1'  # The server's hostname or IP address
PORT = 6543        # The port used by the server
input = input('').encode('utf-8') #use encode('utf-8') to make sure it becomes into bytes

with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    s.connect((HOST, PORT))
    s.sendall(input)
    data = s.recv(1024)

output = data.decode('utf-8') #use decode('utf-8') not repr to produce a string

print('Received', repr(data))
print('Output', output)
