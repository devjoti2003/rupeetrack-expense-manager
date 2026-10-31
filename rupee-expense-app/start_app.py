#!/usr/bin/env python3
"""
RupeeTrack Local Server Runner
Serves the mobile app and displays a terminal QR code for instant Android access.
"""

import http.server
import socketserver
import socket
import os
import sys

PORT = 8080
APP_DIR = os.path.dirname(os.path.abspath(__file__))

def get_local_ips():
    ips = []
    # Try en0 via ipconfig
    try:
        import subprocess
        out = subprocess.check_output(["ipconfig", "getifaddr", "en0"], stderr=subprocess.DEVNULL).decode().strip()
        if out:
            ips.append(out)
    except Exception:
        pass

    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        ip = s.getsockname()[0]
        s.close()
        if ip and ip not in ips:
            ips.append(ip)
    except Exception:
        pass
    
    if not ips:
        ips.append("127.0.0.1")
    return ips

class CustomHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=APP_DIR, **kwargs)

    def log_message(self, format, *args):
        # Quieter terminal logs
        sys.stderr.write(f"[{self.log_date_time_string()}] {format % args}\n")

def main():
    local_ips = get_local_ips()
    primary_ip = local_ips[0]
    url = f"http://{primary_ip}:{PORT}"
    
    print("\n" + "="*56)
    print(" 🚀 RupeeTrack - Android Mobile Expense App is Running!")
    print("="*56)
    print(f"\n📱 DIRECT PHONE LINK: \033[1;34m{url}\033[0m")
    if len(local_ips) > 1:
        for other_ip in local_ips[1:]:
            print(f"   (Alt Wi-Fi Link):  \033[1;34mhttp://{other_ip}:{PORT}\033[0m")
    print(f"💻 LOCAL DESKTOP LINK: \033[1;32mhttp://localhost:{PORT}\033[0m\n")
    
    try:
        import qrcode
        qr = qrcode.QRCode()
        qr.add_data(url)
        print("📲 Scan this QR Code with your Android Phone Camera to open:")
        qr.print_ascii(invert=True)
    except Exception:
        pass
        
    print("\n💡 HOW TO INSTALL ON ANDROID AS A NATIVE APP:")
    print(" 1. Scan the QR code above or open the URL in Chrome on your Android phone.")
    print(" 2. In Chrome, tap the 3 dots (⋮) at top-right.")
    print(" 3. Tap 'Add to Home screen' or 'Install App'.")
    print(" 4. Done! RupeeTrack is now installed on your Android home screen and works 100% OFFLINE!\n")
    print("Press Ctrl+C to stop the server anytime.\n")

    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", PORT), CustomHandler) as httpd:
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServer stopped.")

if __name__ == "__main__":
    main()
