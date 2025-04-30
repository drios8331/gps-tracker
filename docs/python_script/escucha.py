import socket
from Desencriptacion import descomponer_trama_a2

HOST = '0.0.0.0'
PORT = 5000

with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    s.bind((HOST, PORT))
    s.listen()
    print(f"Escuchando en el puerto {PORT}...")

    conn, addr = s.accept()
    with conn:
        print('Conexión desde', addr)
        while True:
            data = conn.recv(4048)
            if not data:
                print(" No hay datos, conexión cerrada.")
                break

#ambas traen los mismos datos, solo que retornan en diferente formato
            print("Bytes crudos:", data)
            print("En hexadecimal:", data.hex())
            hex_str = data.hex()
            
            
            if data[3] == 0xA2:
                resultado = descomponer_trama_a2(hex_str)
                print(" Decodificado:", resultado)           
