#!/usr/bin/env python3
"""
RupeeTrack Website Server & Browser Launcher
"""

import http.server
import socketserver
import socket
import os
import sys
import webbrowser

PORT = 3000
WEBSITE_DIR = os.path.dirname(os.path.abspath(__file__))

def get_local_ips():
    ips = []
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
        super().__init__(*args, directory=WEBSITE_DIR, **kwargs)

    def log_message(self, format, *args):
        sys.stderr.write(f"[{self.log_date_time_string()}] {format % args}\n")

def main():
    local_ips = get_local_ips()
    primary_ip = local_ips[0]
    local_url = f"http://localhost:{PORT}"
    network_url = f"http://{primary_ip}:{PORT}"

    print("\n" + "="*60)
    print(" 🌐 RupeeTrack - Financial Command Center Website is Running!")
    print("="*60)
    print(f"\n💻 OPEN IN BROWSER:  \033[1;32m{local_url}\033[0m")
    print(f"📱 MOBILE / LAN URL: \033[1;34m{network_url}\033[0m\n")

    try:
        import qrcode
        qr = qrcode.QRCode()
        qr.add_data(network_url)
        print("📲 Scan to open on phone/tablet on same Wi-Fi:")
        qr.print_ascii(invert=True)
    except Exception:
        pass

    print("Press Ctrl+C to stop the server anytime.\n")

    # Try opening browser automatically
    try:
        webbrowser.open(local_url)
    except Exception:
        pass

    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", PORT), CustomHandler) as httpd:
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nWebsite server stopped.")

if __name__ == "__main__":
    main()
