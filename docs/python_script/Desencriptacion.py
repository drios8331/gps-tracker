def descomponer_trama_a2(hex_str):
    data = bytes.fromhex(hex_str)
    print("📡 Trama recibida:")
    print(hex_str)
    print("=" * 80)

    def show(label, value, explanation=""):
        print(f"{label:<20} → {value:<20} {explanation}")

    show("🔹 Start Bit", data[0:2].hex(), "Inicio fijo")
    show("📏 Longitud", data[2], "Longitud de los datos")
    show("📦 Protocolo", f"{data[3]:#04x}", "Debe ser 0xA2 (ubicación extendida)")

    year = 2000 + data[4]
    month, day, hour, minute, second = data[5:10]
    show("🕒 Fecha/Hora", f"{year:04d}-{month:02d}-{day:02d} {hour:02d}:{minute:02d}:{second:02d}")

    gps_status = data[10]
    is_valid = (gps_status >> 3) & 1
    ns = (gps_status >> 2) & 1
    ew = (gps_status >> 1) & 1
    show("📍 GPS válido", is_valid, "(1 = válido, 0 = inválido)")
    show("🧭 NS", ns, "(1 = Norte, 0 = Sur)")
    show("🧭 EW", ew, "(1 = Este, 0 = Oeste)")

    lat_raw = int.from_bytes(data[11:15], 'big')
    lon_raw = int.from_bytes(data[15:19], 'big')
    lat = lat_raw / 1800000.0
    lon = lon_raw / 1800000.0
    lat = lat if ns else -lat
    lon = lon if ew else -lon
    show("🌐 Latitud", round(lat, 6))
    show("🌐 Longitud", round(lon, 6))

    speed = data[19]
    show("🚗 Velocidad", f"{speed} km/h")

    direction = int.from_bytes(data[20:22], 'big')
    show("🧭 Dirección", direction)

    mcc = int.from_bytes(data[22:24], 'big')
    mnc = data[24]
    lac = int.from_bytes(data[25:27], 'big')
    cell_id = int.from_bytes(data[27:29], 'big')
    show("📶 MCC", mcc)
    show("📶 MNC", mnc)
    show("📶 LAC", lac)
    show("📶 Cell ID", cell_id)

    sim_status = data[40]
    sim_ok = (sim_status & 0x01) == 1
    show("📲 SIM insertada", sim_ok)

    battery = data[41]
    show("🔋 Batería", f"{battery}%", "(si es escala 0-100)")

    imei_bytes = data[53:61]
    imei = ''.join(f"{(b >> 4) & 0x0F}{b & 0x0F}" for b in imei_bytes).lstrip("0")
    show("📱 IMEI", imei)

    serial = int.from_bytes(data[61:63], 'big')
    show("🔢 Serial", serial)

    crc = data[63:65].hex()
    checksum = data[65:67].hex()
    show("🧪 CRC", crc)
    show("🏁 Checksum", checksum)
    show("🔚 Fin de trama", data[67:69].hex(), "(debe ser 0d0a)")

    print("=" * 80)
