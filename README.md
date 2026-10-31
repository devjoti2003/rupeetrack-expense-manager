# 🏦 RupeeTrack - Personal Expense & Wealth Command Center (₹ INR)

A modern, full-featured financial command center and daily expense tracking suite in **Indian Rupees (₹ INR)**. Includes:
1. **Interactive Web Application**: Responsive widescreen desktop & mobile dashboard with real-time analytics.
2. **Android Mobile App (PWA)**: Standalone installable app with 100% offline support for daily phone use.
3. **Master Excel Workbook (`.xlsx`)**: Native formulas (`SORT(FILTER(...))`), Donut charts, and structured tables.

---

## ✨ Key Features

- **📑 Multi-Month "Sheets" Architecture**: Just like Excel sheets, create separate monthly sheets (*October 2026, November 2026, December 2026, etc.*) to track daily expenses across months.
- **💰 Total Money Pool**: Configure your monthly salary or capital pool.
- **🏦 Personally Allotted Savings**: Track your protected savings, mutual funds, SIP, and emergency reserve.
- **👛 Personally Allotted Cash**: Set physical wallet cash allotment.
- **💵 Cash Auto-Reconciliation**: Any expense logged with `Payment Method = 'Cash'` automatically deducts from your cash balance, showing your exact **Cash Remaining in Hand**.
- **🟢 Net Money Left & Spendable Buffer**: See your overall remaining balance and know exactly how much discretionary money you can spend without touching your savings.
- **🎯 Interactive Category Explorer**: Click any category pill (*Meals, Travel, Food, Stationary, Subscriptions, Other*) to instantly filter all transactions, strictly sorted chronologically by date.
- **📊 Live Visual Analytics**:
  - Capital & Liquidity Allocation Donut Chart
  - Category Distribution Donut Chart (% Share)
  - Category Spending Comparison Bar Chart
- **📥 1-Click Excel Export**: Download a fully formatted Microsoft Excel spreadsheet (`.xlsx`) for any month with one click.

---

## 🚀 Quick Start

### 1. Run the Website (Desktop & Mobile)
```bash
# Start the web dashboard (runs on port 3000)
python3 website/start_website.py
```
Or simply double-click **`Open_Website.command`** on macOS.
- **Local Browser:** [http://localhost:3000](http://localhost:3000)
- **Wi-Fi Phone Link:** `http://<your-ip>:3000`

### 2. Run the Android Mobile App (PWA)
```bash
# Start the mobile PWA server (runs on port 8080)
python3 rupee-expense-app/start_app.py
```
Or double-click **`Run_App.command`** on macOS.
- Open `http://<your-ip>:8080` in Chrome on your Android phone.
- Tap the three dots (⋮) $\rightarrow$ **"Install App"** / **"Add to Home screen"**.
- Works **100% offline** on your Android phone!

### 3. Open the Master Excel Workbook
- Open **[`Expense_Tracker.xlsx`](./Expense_Tracker.xlsx)** in Microsoft Excel, Apple Numbers, or Google Sheets.

---

## 📂 Project Structure

```
rupeetrack/
├── website/                     # Full Web Application & Dashboard
│   ├── index.html               # Main website interface
│   ├── style.css                # Responsive desktop & mobile styling
│   ├── app.js                   # State engine, charts, and Excel exporter
│   ├── start_website.py         # Local web server runner
│   ├── lib/xlsx.full.min.js     # 100% offline browser Excel generator
│   └── downloads/               # Direct download links for Excel templates
├── rupee-expense-app/           # Android Mobile Progressive Web App
│   ├── index.html               # Mobile-first app interface
│   ├── app.js                   # Offline localStorage engine
│   ├── style.css                # Mobile UI with touch gestures & safe-area
│   ├── manifest.json            # Android PWA manifest
│   ├── sw.js                    # Service worker for offline caching
│   └── start_app.py             # Mobile server with terminal QR code
├── Expense_Tracker.xlsx         # Master Excel Workbook (Formulas, Charts, INR)
├── Open_Website.command         # 1-Click launcher for Website
├── Run_App.command              # 1-Click launcher for Android App
└── README.md
```

---

## 🛠️ Built With

- **HTML5 & Modern CSS3**: Custom design tokens, CSS Grid, Flexbox, native `<dialog>`.
- **Vanilla JavaScript (ES6+)**: Zero external framework dependencies, lightweight, sub-second load times.
- **SheetJS (`xlsx`)**: Complete client-side `.xlsx` generation.
- **Python 3**: `openpyxl` for Excel generation and local development servers.

---

## 📄 License
MIT License. Free to use, modify, and distribute.
