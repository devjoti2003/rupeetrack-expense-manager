/**
 * RupeeTrack Website - Full-Featured Financial Dashboard & Expense Command Center
 * Multi-month sheet architecture, interactive category analytics, date sorting, and Excel export
 */

// Categories Configuration
const CATEGORIES = {
  'Meals': { icon: '🍔', color: '#F97316', bg: 'rgba(249, 115, 22, 0.15)' },
  'Travel': { icon: '🚗', color: '#0EA5E9', bg: 'rgba(14, 165, 233, 0.15)' },
  'Food': { icon: '🛒', color: '#10B981', bg: 'rgba(16, 185, 129, 0.15)' },
  'Stationary': { icon: '📝', color: '#8B5CF6', bg: 'rgba(139, 92, 246, 0.15)' },
  'Subscriptions': { icon: '📺', color: '#EC4899', bg: 'rgba(236, 72, 153, 0.15)' },
  'Other': { icon: '📦', color: '#EAB308', bg: 'rgba(234, 179, 8, 0.15)' }
};

const PAYMENT_METHODS = [
  'UPI / GPay',
  'UPI / PhonePe',
  'Credit Card',
  'Debit Card',
  'Cash',
  'Net Banking',
  'Amazon Pay'
];

// Initial Sample Expenses for October 2026 in INR
const INITIAL_OCT_EXPENSES = [
  { id: 'exp_1', date: '2026-10-01', category: 'Subscriptions', description: 'Netflix 4K Ultra HD Plan', amount: 649.00, paymentMethod: 'Credit Card', notes: 'Monthly recurring auto-pay' },
  { id: 'exp_2', date: '2026-10-02', category: 'Meals', description: 'Morning Filter Coffee & Dosa', amount: 160.00, paymentMethod: 'UPI / GPay', notes: 'Cafe breakfast' },
  { id: 'exp_3', date: '2026-10-03', category: 'Travel', description: 'Metro Smart Card Monthly Recharge', amount: 800.00, paymentMethod: 'UPI / PhonePe', notes: 'Daily office transit' },
  { id: 'exp_4', date: '2026-10-04', category: 'Food', description: 'Supermarket Weekly Groceries', amount: 2850.00, paymentMethod: 'Credit Card', notes: "Nature's Basket grocery" },
  { id: 'exp_5', date: '2026-10-05', category: 'Stationary', description: 'Notebooks & Parker Pen Refills', amount: 480.00, paymentMethod: 'Debit Card', notes: 'Office writing supplies' },
  { id: 'exp_6', date: '2026-10-06', category: 'Meals', description: 'Team Lunch at Restaurant', amount: 1650.00, paymentMethod: 'Credit Card', notes: 'Downtown team outing' },
  { id: 'exp_7', date: '2026-10-08', category: 'Travel', description: 'Uber Cab Ride to Airport', amount: 1150.00, paymentMethod: 'UPI / GPay', notes: 'Business trip airport drop' },
  { id: 'exp_8', date: '2026-10-10', category: 'Subscriptions', description: 'Spotify Family Music Plan', amount: 179.00, paymentMethod: 'Credit Card', notes: 'Monthly music streaming' },
  { id: 'exp_9', date: '2026-10-11', category: 'Food', description: 'Zepto / Instamart Pantry Essentials', amount: 1420.00, paymentMethod: 'UPI / GPay', notes: 'Household staples' },
  { id: 'exp_10', date: '2026-10-12', category: 'Other', description: 'Apollo Pharmacy Medicines', amount: 680.00, paymentMethod: 'Debit Card', notes: 'Health & vitamins' },
  { id: 'exp_11', date: '2026-10-14', category: 'Stationary', description: 'Desk Organizer & Sticky Notes', amount: 590.00, paymentMethod: 'Amazon Pay', notes: 'Workstation setup' },
  { id: 'exp_12', date: '2026-10-15', category: 'Subscriptions', description: 'Apple iCloud+ 2TB Storage', amount: 749.00, paymentMethod: 'Credit Card', notes: 'Cloud backup plan' },
  { id: 'exp_13', date: '2026-10-16', category: 'Meals', description: 'Client Business Dinner', amount: 3450.00, paymentMethod: 'Credit Card', notes: 'Client dinner discussion' },
  { id: 'exp_14', date: '2026-10-18', category: 'Travel', description: 'Fuel / Petrol Station Tank Full', amount: 2800.00, paymentMethod: 'Debit Card', notes: 'IndianOil fuel station' },
  { id: 'exp_15', date: '2026-10-20', category: 'Food', description: 'Fresh Vegetables & Fruits', amount: 980.00, paymentMethod: 'UPI / PhonePe', notes: 'Weekly fresh produce' },
  { id: 'exp_16', date: '2026-10-21', category: 'Meals', description: 'Zomato Dinner Delivery (Biryani)', amount: 820.00, paymentMethod: 'UPI / GPay', notes: 'Evening meal delivery' },
  { id: 'exp_17', date: '2026-10-23', category: 'Other', description: 'PVR Cinema Movie Night', amount: 950.00, paymentMethod: 'Credit Card', notes: 'Weekend movie & popcorn' },
  { id: 'exp_18', date: '2026-10-24', category: 'Stationary', description: 'Printer Paper Reams & Ink', amount: 890.00, paymentMethod: 'Debit Card', notes: 'Home office printing' },
  { id: 'exp_19', date: '2026-10-26', category: 'Travel', description: 'Vande Bharat Express Train', amount: 1580.00, paymentMethod: 'UPI / GPay', notes: 'Family weekend trip' },
  { id: 'exp_20', date: '2026-10-27', category: 'Subscriptions', description: 'ChatGPT Plus AI Subscription', amount: 1999.00, paymentMethod: 'Credit Card', notes: 'AI productivity tool' },
  { id: 'exp_21', date: '2026-10-28', category: 'Meals', description: 'Sunday Breakfast at Udupi Diner', amount: 420.00, paymentMethod: 'Cash', notes: 'Breakfast with family (paid in cash)' },
  { id: 'exp_22', date: '2026-10-29', category: 'Food', description: 'Artisan Bakery & Amul Dairy', amount: 540.00, paymentMethod: 'UPI / PhonePe', notes: 'Daily dairy products' },
  { id: 'exp_23', date: '2026-10-30', category: 'Other', description: 'Monthly Cult.fit Fitness Pass', amount: 1850.00, paymentMethod: 'Credit Card', notes: 'Health & gym membership' },
  { id: 'exp_24', date: '2026-10-31', category: 'Meals', description: 'Festive Celebration Sweets', amount: 1450.00, paymentMethod: 'UPI / GPay', notes: 'Diwali celebration' }
];

// App State Management
class WebAppState {
  constructor() {
    this.storageKey = 'rupeetrack_web_v1';
    this.data = this.loadData();
    this.selectedCategory = 'All';
    this.searchQuery = '';
    this.paymentFilter = 'All';
    this.sortAscending = true; // true = chronological oldest to newest (Feature #2)
    this.editingExpenseId = null;
  }

  loadData() {
    const raw = localStorage.getItem(this.storageKey);
    if (raw) {
      try {
        return JSON.parse(raw);
      } catch (e) {
        console.error('Storage error:', e);
      }
    }
    const initial = {
      activeMonthId: '2026-10',
      months: {
        '2026-10': {
          id: '2026-10',
          name: 'October 2026',
          totalMoney: 85000,
          savingsAllotted: 25000,
          cashAllotted: 8000,
          expenses: INITIAL_OCT_EXPENSES
        },
        '2026-11': {
          id: '2026-11',
          name: 'November 2026',
          totalMoney: 85000,
          savingsAllotted: 25000,
          cashAllotted: 8000,
          expenses: []
        }
      }
    };
    localStorage.setItem(this.storageKey, JSON.stringify(initial));
    return initial;
  }

  saveData() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.data));
  }

  getActiveMonth() {
    return this.data.months[this.data.activeMonthId] || Object.values(this.data.months)[0];
  }

  switchMonth(monthId) {
    if (this.data.months[monthId]) {
      this.data.activeMonthId = monthId;
      this.selectedCategory = 'All';
      this.searchQuery = '';
      this.saveData();
    }
  }

  addMonth(id, name, totalMoney, savingsAllotted, cashAllotted) {
    this.data.months[id] = {
      id,
      name,
      totalMoney: Number(totalMoney) || 0,
      savingsAllotted: Number(savingsAllotted) || 0,
      cashAllotted: Number(cashAllotted) || 0,
      expenses: []
    };
    this.data.activeMonthId = id;
    this.saveData();
  }

  updateAllotments(totalMoney, savingsAllotted, cashAllotted) {
    const month = this.getActiveMonth();
    month.totalMoney = Number(totalMoney) || 0;
    month.savingsAllotted = Number(savingsAllotted) || 0;
    month.cashAllotted = Number(cashAllotted) || 0;
    this.saveData();
  }

  addExpense(exp) {
    const month = this.getActiveMonth();
    month.expenses.push({
      id: 'exp_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
      ...exp
    });
    this.saveData();
  }

  updateExpense(id, updated) {
    const month = this.getActiveMonth();
    const idx = month.expenses.findIndex(e => e.id === id);
    if (idx !== -1) {
      month.expenses[idx] = { ...month.expenses[idx], ...updated };
      this.saveData();
    }
  }

  deleteExpense(id) {
    const month = this.getActiveMonth();
    month.expenses = month.expenses.filter(e => e.id !== id);
    this.saveData();
  }

  getCalculations() {
    const month = this.getActiveMonth();
    const expenses = month.expenses || [];

    const totalExpenses = expenses.reduce((sum, e) => sum + (Number(e.amount) || 0), 0);
    const moneyLeft = month.totalMoney - totalExpenses;
    const spendableBuffer = month.totalMoney - month.savingsAllotted - totalExpenses;

    // Cash auto-reconciliation: expenses where paymentMethod == 'Cash'
    const cashSpent = expenses
      .filter(e => e.paymentMethod === 'Cash')
      .reduce((sum, e) => sum + (Number(e.amount) || 0), 0);
    const cashRemaining = month.cashAllotted - cashSpent;

    const digitalPool = Math.max(0, month.totalMoney - month.savingsAllotted - month.cashAllotted);

    // Category breakdown
    const catBreakdown = {};
    Object.keys(CATEGORIES).forEach(cat => {
      catBreakdown[cat] = { total: 0, count: 0 };
    });

    expenses.forEach(e => {
      if (catBreakdown[e.category]) {
        catBreakdown[e.category].total += Number(e.amount) || 0;
        catBreakdown[e.category].count += 1;
      }
    });

    return {
      totalMoney: month.totalMoney,
      savingsAllotted: month.savingsAllotted,
      cashAllotted: month.cashAllotted,
      totalExpenses,
      moneyLeft,
      spendableBuffer,
      cashSpent,
      cashRemaining,
      digitalPool,
      catBreakdown,
      expenseCount: expenses.length
    };
  }

  getFilteredExpenses() {
    const month = this.getActiveMonth();
    let list = [...month.expenses];

    // Category Filter (Feature #4)
    if (this.selectedCategory !== 'All') {
      list = list.filter(e => e.category === this.selectedCategory);
    }

    // Payment Method Filter
    if (this.paymentFilter !== 'All') {
      list = list.filter(e => e.paymentMethod === this.paymentFilter);
    }

    // Keyword Search
    if (this.searchQuery.trim() !== '') {
      const q = this.searchQuery.toLowerCase();
      list = list.filter(e => 
        (e.description && e.description.toLowerCase().includes(q)) ||
        (e.category && e.category.toLowerCase().includes(q)) ||
        (e.notes && e.notes.toLowerCase().includes(q)) ||
        (e.amount && e.amount.toString().includes(q))
      );
    }

    // Chronological Date Sort (Feature #2)
    list.sort((a, b) => {
      const cmp = a.date.localeCompare(b.date);
      return this.sortAscending ? cmp : -cmp;
    });

    return list;
  }
}

// Format Currency Utility in Indian Rupees
function formatINR(val) {
  const num = Number(val) || 0;
  return '₹' + num.toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  const [y, m, d] = dateStr.split('-');
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${d} ${months[parseInt(m) - 1]} ${y}`;
}

// Web UI Controller
class WebUIController {
  constructor(state) {
    this.state = state;
    this.initElements();
    this.bindEvents();
    this.render();
  }

  initElements() {
    // Sheets tab bar
    this.sheetsTabGroup = document.getElementById('sheetsTabGroup');
    this.activeSheetNameText = document.getElementById('activeSheetNameText');

    // KPI Values
    this.kpiTotalMoney = document.getElementById('kpiTotalMoney');
    this.kpiTotalExpenses = document.getElementById('kpiTotalExpenses');
    this.kpiMoneyLeft = document.getElementById('kpiMoneyLeft');
    this.kpiSavings = document.getElementById('kpiSavings');
    this.kpiCash = document.getElementById('kpiCash');
    this.kpiSpendable = document.getElementById('kpiSpendable');

    this.subMoneyLeft = document.getElementById('subMoneyLeft');
    this.subCashLeft = document.getElementById('subCashLeft');
    this.subSpendable = document.getElementById('subSpendable');

    // Allotment Table Elements
    this.allotTotalMoney = document.getElementById('allotTotalMoney');
    this.allotSavings = document.getElementById('allotSavings');
    this.allotCash = document.getElementById('allotCash');
    this.allotDigital = document.getElementById('allotDigital');
    this.allotCashSpent = document.getElementById('allotCashSpent');
    this.allotCashRemaining = document.getElementById('allotCashRemaining');
    this.allotMoneyLeft = document.getElementById('allotMoneyLeft');
    this.allotSpendable = document.getElementById('allotSpendable');

    // Charts & Category Cards
    this.svgDonut = document.getElementById('svgDonut');
    this.donutCenterTotal = document.getElementById('donutCenterTotal');
    this.chartLegendGrid = document.getElementById('chartLegendGrid');
    this.categoryCardsGrid = document.getElementById('categoryCardsGrid');
    this.categoryBarList = document.getElementById('categoryBarList');

    // Table elements
    this.expensesTableBody = document.getElementById('expensesTableBody');
    this.tableTotalRow = document.getElementById('tableTotalRow');
    this.tableItemCount = document.getElementById('tableItemCount');
    this.searchInput = document.getElementById('searchInput');
    this.paymentSelectFilter = document.getElementById('paymentSelectFilter');
    this.btnSortDate = document.getElementById('btnSortDate');

    // Dialogs
    this.expenseDialog = document.getElementById('expenseDialog');
    this.monthDialog = document.getElementById('monthDialog');
    this.allotmentDialog = document.getElementById('allotmentDialog');
    this.toast = document.getElementById('toastNotice');
  }

  bindEvents() {
    // Modal buttons
    document.getElementById('btnOpenAddExpense').addEventListener('click', () => this.openExpenseModal());
    document.getElementById('btnHeaderAddExpense').addEventListener('click', () => this.openExpenseModal());
    document.getElementById('btnOpenAllotmentModal').addEventListener('click', () => this.openAllotmentModal());

    // Close buttons on dialogs
    document.querySelectorAll('.btn-modal-close, .btn-modal-cancel').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const d = e.target.closest('dialog');
        if (d) d.close();
      });
    });

    // Light dismiss on click outside
    [this.expenseDialog, this.monthDialog, this.allotmentDialog].forEach(dialog => {
      dialog.addEventListener('click', (e) => {
        if (e.target === dialog) dialog.close();
      });
    });

    // Form Submits
    document.getElementById('formExpense').addEventListener('submit', (e) => this.handleExpenseSubmit(e));
    document.getElementById('formMonth').addEventListener('submit', (e) => this.handleMonthSubmit(e));
    document.getElementById('formAllotment').addEventListener('submit', (e) => this.handleAllotmentSubmit(e));

    // Delete Expense
    document.getElementById('btnDeleteExpense').addEventListener('click', () => this.handleDeleteExpense());

    // Search and Filters
    this.searchInput.addEventListener('input', (e) => {
      this.state.searchQuery = e.target.value;
      this.renderExpensesTable();
    });

    this.paymentSelectFilter.addEventListener('change', (e) => {
      this.state.paymentFilter = e.target.value;
      this.renderExpensesTable();
    });

    this.btnSortDate.addEventListener('click', () => {
      this.state.sortAscending = !this.state.sortAscending;
      this.btnSortDate.innerText = this.state.sortAscending ? 'Date ▴ (Oldest First)' : 'Date ▾ (Newest First)';
      this.renderExpensesTable();
    });

    // Excel Export Buttons
    document.getElementById('btnExportExcel').addEventListener('click', () => this.exportToExcel());
    document.getElementById('btnExportExcelHeader').addEventListener('click', () => this.exportToExcel());
  }

  showToast(msg) {
    this.toast.innerText = msg;
    this.toast.classList.add('show');
    setTimeout(() => this.toast.classList.remove('show'), 2600);
  }

  render() {
    this.renderMonthSheets();
    this.renderKPIs();
    this.renderAllotmentTable();
    this.renderCharts();
    this.renderCategoryCards();
    this.renderCategoryBars();
    this.renderExpensesTable();
  }

  renderMonthSheets() {
    const months = this.state.data.months;
    const activeId = this.state.data.activeMonthId;
    const activeMonth = this.state.getActiveMonth();

    this.activeSheetNameText.innerText = activeMonth.name;

    let html = '';
    Object.values(months).forEach(m => {
      const isActive = m.id === activeId ? 'active' : '';
      html += `
        <button class="sheet-pill ${isActive}" onclick="webApp.switchMonth('${m.id}')">
          📑 ${m.name}
        </button>
      `;
    });

    html += `
      <button class="sheet-pill add-sheet" onclick="webApp.openAddMonthModal()">
        ➕ Add Month Sheet
      </button>
    `;

    this.sheetsTabGroup.innerHTML = html;
  }

  renderKPIs() {
    const calc = this.state.getCalculations();

    this.kpiTotalMoney.innerText = formatINR(calc.totalMoney);
    this.kpiTotalExpenses.innerText = formatINR(calc.totalExpenses);
    this.kpiMoneyLeft.innerText = formatINR(calc.moneyLeft);
    this.kpiSavings.innerText = formatINR(calc.savingsAllotted);
    this.kpiCash.innerText = formatINR(calc.cashAllotted);
    this.kpiSpendable.innerText = formatINR(calc.spendableBuffer);

    this.subMoneyLeft.innerText = calc.moneyLeft >= 0 ? '🟢 Surplus / Under Budget' : '🔴 Deficit / Over Budget';
    this.subCashLeft.innerText = `Cash in Wallet: ${formatINR(calc.cashRemaining)}`;
    this.subSpendable.innerText = calc.spendableBuffer >= 0 ? 'Safe buffer without touching savings' : '⚠️ Savings dipped into';
  }

  renderAllotmentTable() {
    const calc = this.state.getCalculations();
    const total = calc.totalMoney || 1;

    this.allotTotalMoney.innerText = formatINR(calc.totalMoney);
    this.allotSavings.innerText = formatINR(calc.savingsAllotted);
    this.allotCash.innerText = formatINR(calc.cashAllotted);
    this.allotDigital.innerText = formatINR(calc.digitalPool);
    this.allotCashSpent.innerText = formatINR(calc.cashSpent);
    this.allotCashRemaining.innerText = formatINR(calc.cashRemaining);
    this.allotMoneyLeft.innerText = formatINR(calc.moneyLeft);
    this.allotSpendable.innerText = formatINR(calc.spendableBuffer);

    document.getElementById('badgeSavingsPct').innerText = `${((calc.savingsAllotted / total) * 100).toFixed(1)}%`;
    document.getElementById('badgeCashPct').innerText = `${((calc.cashAllotted / total) * 100).toFixed(1)}%`;
    document.getElementById('badgeDigitalPct').innerText = `${((calc.digitalPool / total) * 100).toFixed(1)}%`;
  }

  renderCharts() {
    const calc = this.state.getCalculations();

    // Slices for Wealth Allocation Donut Chart
    const slices = [
      { name: 'Savings Protected', val: Math.max(0, calc.savingsAllotted), color: '#3B82F6' },
      { name: 'Cash Remaining', val: Math.max(0, calc.cashRemaining), color: '#F59E0B' },
      { name: 'Expenses Spent', val: Math.max(0, calc.totalExpenses), color: '#EF4444' },
      { name: 'Spendable Left', val: Math.max(0, calc.spendableBuffer), color: '#10B981' }
    ];

    const sumValues = slices.reduce((acc, s) => acc + s.val, 0) || 1;
    const cx = 120, cy = 120, r = 90, strokeWidth = 28;
    const circumference = 2 * Math.PI * r;

    let cumulative = 0;
    let svgPaths = '';
    let legendHtml = '';

    slices.forEach(slice => {
      const pct = slice.val / sumValues;
      const strokeDash = pct * circumference;
      const offset = -cumulative * circumference;
      cumulative += pct;

      svgPaths += `
        <circle cx="${cx}" cy="${cy}" r="${r}" fill="transparent"
          stroke="${slice.color}" stroke-width="${strokeWidth}"
          stroke-dasharray="${strokeDash} ${circumference - strokeDash}"
          stroke-dashoffset="${offset}"
          transform="rotate(-90 ${cx} ${cy})"
          style="transition: stroke-dasharray 0.5s ease;" />
      `;

      legendHtml += `
        <div class="chart-legend-item">
          <div class="legend-color-dot" style="background:${slice.color};"></div>
          <div class="legend-meta">
            <span>${slice.name}</span>
            <b>${formatINR(slice.val)}</b>
          </div>
        </div>
      `;
    });

    this.svgDonut.innerHTML = svgPaths;
    this.donutCenterTotal.innerText = formatINR(calc.totalMoney);
    this.chartLegendGrid.innerHTML = legendHtml;
  }

  // Interactive Category Cards (Feature #4)
  renderCategoryCards() {
    const calc = this.state.getCalculations();
    const active = this.state.selectedCategory;
    const totalExp = calc.totalExpenses || 1;

    let html = `
      <div class="category-filter-card ${active === 'All' ? 'active' : ''}" onclick="webApp.filterCategory('All')">
        <div class="cat-card-header">
          <span class="cat-card-name">✨ All Categories</span>
          <span class="cat-card-count">${calc.expenseCount}</span>
        </div>
        <div class="cat-card-spent">${formatINR(calc.totalExpenses)}</div>
        <div class="cat-card-progress">
          <div class="cat-card-bar" style="width: 100%; background: #3B82F6;"></div>
        </div>
      </div>
    `;

    Object.keys(CATEGORIES).forEach(cat => {
      const info = CATEGORIES[cat];
      const data = calc.catBreakdown[cat] || { total: 0, count: 0 };
      const pct = ((data.total / totalExp) * 100).toFixed(1);
      const isSel = active === cat ? 'active' : '';

      html += `
        <div class="category-filter-card ${isSel}" onclick="webApp.filterCategory('${cat}')">
          <div class="cat-card-header">
            <span class="cat-card-name">${info.icon} ${cat}</span>
            <span class="cat-card-count">${data.count}</span>
          </div>
          <div class="cat-card-spent">${formatINR(data.total)}</div>
          <div class="cat-card-progress">
            <div class="cat-card-bar" style="width: ${pct}%; background: ${info.color};"></div>
          </div>
        </div>
      `;
    });

    this.categoryCardsGrid.innerHTML = html;
  }

  renderCategoryBars() {
    const calc = this.state.getCalculations();
    const totalExp = calc.totalExpenses || 1;

    let html = '';
    Object.keys(CATEGORIES).forEach(cat => {
      const info = CATEGORIES[cat];
      const data = calc.catBreakdown[cat] || { total: 0, count: 0 };
      const pct = ((data.total / totalExp) * 100).toFixed(1);

      html += `
        <div class="bar-row" onclick="webApp.filterCategory('${cat}')">
          <div class="bar-row-info">
            <span class="name">${info.icon} ${cat} <span style="font-size:11px;color:var(--text-muted);font-weight:400;">(${data.count} items)</span></span>
            <span class="val">${formatINR(data.total)} <span style="font-size:11px;color:var(--text-muted);">(${pct}%)</span></span>
          </div>
          <div class="bar-row-track">
            <div class="bar-row-fill" style="width: ${pct}%; background: ${info.color};"></div>
          </div>
        </div>
      `;
    });

    this.categoryBarList.innerHTML = html;
  }

  renderExpensesTable() {
    const list = this.state.getFilteredExpenses();
    const total = list.reduce((sum, e) => sum + (Number(e.amount) || 0), 0);

    this.tableItemCount.innerText = `${list.length} transaction${list.length === 1 ? '' : 's'}`;

    if (list.length === 0) {
      this.expensesTableBody.innerHTML = `
        <tr>
          <td colspan="7" style="text-align:center;padding:36px;color:var(--text-muted);">
            🔍 No expenses found matching your active filter.
          </td>
        </tr>
      `;
      this.tableTotalRow.innerHTML = '';
      return;
    }

    let rowsHtml = '';
    list.forEach(item => {
      const cat = CATEGORIES[item.category] || { icon: '📦', color: '#94A3B8' };
      const isCash = item.paymentMethod === 'Cash';
      const badgeStyle = isCash ? 'badge-gold' : (item.paymentMethod.includes('UPI') ? 'badge-blue' : 'badge-purple');

      rowsHtml += `
        <tr>
          <td><b style="color:var(--text-primary);">${formatDate(item.date)}</b></td>
          <td>
            <span style="font-weight:600;display:flex;align-items:center;gap:6px;">
              ${cat.icon} ${item.category}
            </span>
          </td>
          <td>${item.description || item.category}</td>
          <td style="text-align:right;font-weight:800;color:var(--text-primary);">
            ${formatINR(item.amount)}
          </td>
          <td>
            <span class="badge ${badgeStyle}">${item.paymentMethod || 'UPI'}</span>
          </td>
          <td style="color:var(--text-secondary);font-size:12px;">${item.notes || '—'}</td>
          <td style="text-align:center;">
            <div class="action-btn-group" style="justify-content:center;">
              <button class="btn-row-action" title="Edit" onclick="webApp.openEditExpense('${item.id}')">✏️</button>
              <button class="btn-row-action delete" title="Delete" onclick="webApp.confirmDeleteExpense('${item.id}')">🗑️</button>
            </div>
          </td>
        </tr>
      `;
    });

    this.expensesTableBody.innerHTML = rowsHtml;

    // Summary Total Row
    this.tableTotalRow.innerHTML = `
      <td colspan="3" style="font-weight:800;">TOTAL (${list.length} transactions)</td>
      <td style="text-align:right;font-weight:800;color:#38BDF8;font-size:15px;">${formatINR(total)}</td>
      <td colspan="3"></td>
    `;
  }

  // Category Filtering Action (Feature #4)
  filterCategory(cat) {
    this.state.selectedCategory = cat;
    this.renderCategoryCards();
    this.renderExpensesTable();

    // Smooth scroll to table
    document.getElementById('expensesTableCard').scrollIntoView({ behavior: 'smooth', block: 'start' });
    this.showToast(`Filtered by ${cat}`);
  }

  switchMonth(monthId) {
    this.state.switchMonth(monthId);
    this.render();
    this.showToast(`Switched sheet to ${this.state.getActiveMonth().name}`);
  }

  // Modals Handlers
  openExpenseModal(expenseId = null) {
    this.state.editingExpenseId = expenseId;
    const form = document.getElementById('formExpense');
    const deleteBtn = document.getElementById('btnDeleteExpense');

    if (expenseId) {
      const month = this.state.getActiveMonth();
      const exp = month.expenses.find(e => e.id === expenseId);
      if (exp) {
        document.getElementById('modalExpenseTitle').innerText = 'Edit Expense';
        document.getElementById('expInputAmount').value = exp.amount;
        document.getElementById('expInputCategory').value = exp.category;
        document.getElementById('expInputDesc').value = exp.description || '';
        document.getElementById('expInputDate').value = exp.date;
        document.getElementById('expInputPayment').value = exp.paymentMethod;
        document.getElementById('expInputNotes').value = exp.notes || '';
        deleteBtn.style.display = 'inline-block';
      }
    } else {
      document.getElementById('modalExpenseTitle').innerText = 'Add New Expense';
      form.reset();
      const today = new Date().toISOString().split('T')[0];
      document.getElementById('expInputDate').value = today;
      document.getElementById('expInputCategory').value = 'Meals';
      document.getElementById('expInputPayment').value = 'UPI / GPay';
      deleteBtn.style.display = 'none';
    }

    this.renderModalCategoryChips(document.getElementById('expInputCategory').value);
    this.expenseDialog.showModal();
    setTimeout(() => document.getElementById('expInputAmount').focus(), 100);
  }

  renderModalCategoryChips(activeCat) {
    const container = document.getElementById('modalCategoryChips');
    let html = '';
    Object.keys(CATEGORIES).forEach(cat => {
      const info = CATEGORIES[cat];
      const isSel = cat === activeCat ? 'active' : '';
      html += `
        <button type="button" class="modal-chip ${isSel}" onclick="webApp.selectModalCategory('${cat}')">
          <span class="icon">${info.icon}</span>
          <span>${cat}</span>
        </button>
      `;
    });
    container.innerHTML = html;
  }

  selectModalCategory(cat) {
    document.getElementById('expInputCategory').value = cat;
    this.renderModalCategoryChips(cat);
  }

  openEditExpense(id) {
    this.openExpenseModal(id);
  }

  confirmDeleteExpense(id) {
    if (confirm('Are you sure you want to delete this expense?')) {
      this.state.deleteExpense(id);
      this.render();
      this.showToast('Expense deleted.');
    }
  }

  handleExpenseSubmit(e) {
    e.preventDefault();
    const amount = parseFloat(document.getElementById('expInputAmount').value);
    if (isNaN(amount) || amount <= 0) {
      alert('Please enter a valid amount.');
      return;
    }

    const data = {
      amount,
      category: document.getElementById('expInputCategory').value,
      description: document.getElementById('expInputDesc').value || document.getElementById('expInputCategory').value,
      date: document.getElementById('expInputDate').value,
      paymentMethod: document.getElementById('expInputPayment').value,
      notes: document.getElementById('expInputNotes').value || ''
    };

    if (this.state.editingExpenseId) {
      this.state.updateExpense(this.state.editingExpenseId, data);
      this.showToast('Expense updated successfully!');
    } else {
      this.state.addExpense(data);
      this.showToast('Expense added successfully!');
    }

    this.expenseDialog.close();
    this.render();
  }

  handleDeleteExpense() {
    if (this.state.editingExpenseId && confirm('Delete this expense?')) {
      this.state.deleteExpense(this.state.editingExpenseId);
      this.expenseDialog.close();
      this.render();
      this.showToast('Expense deleted.');
    }
  }

  // Month Modal
  openAddMonthModal() {
    const current = this.state.getActiveMonth();
    document.getElementById('inputMonthTotalMoney').value = current.totalMoney;
    document.getElementById('inputMonthSavings').value = current.savingsAllotted;
    document.getElementById('inputMonthCash').value = current.cashAllotted;
    this.monthDialog.showModal();
  }

  handleMonthSubmit(e) {
    e.preventDefault();
    const monthPicker = document.getElementById('inputMonthPicker').value;
    if (!monthPicker) {
      alert('Please pick a month.');
      return;
    }

    const [year, monthNum] = monthPicker.split('-');
    const dateObj = new Date(year, parseInt(monthNum) - 1, 1);
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const monthName = `${monthNames[dateObj.getMonth()]} ${year}`;

    const totalMoney = parseFloat(document.getElementById('inputMonthTotalMoney').value) || 0;
    const savings = parseFloat(document.getElementById('inputMonthSavings').value) || 0;
    const cash = parseFloat(document.getElementById('inputMonthCash').value) || 0;

    this.state.addMonth(monthPicker, monthName, totalMoney, savings, cash);
    this.monthDialog.close();
    this.render();
    this.showToast(`Created new sheet for ${monthName}!`);
  }

  // Allotments Modal
  openAllotmentModal() {
    const current = this.state.getActiveMonth();
    document.getElementById('editAllotTotalMoney').value = current.totalMoney;
    document.getElementById('editAllotSavings').value = current.savingsAllotted;
    document.getElementById('editAllotCash').value = current.cashAllotted;
    this.allotmentDialog.showModal();
  }

  handleAllotmentSubmit(e) {
    e.preventDefault();
    const totalMoney = parseFloat(document.getElementById('editAllotTotalMoney').value) || 0;
    const savings = parseFloat(document.getElementById('editAllotSavings').value) || 0;
    const cash = parseFloat(document.getElementById('editAllotCash').value) || 0;

    this.state.updateAllotments(totalMoney, savings, cash);
    this.allotmentDialog.close();
    this.render();
    this.showToast('Monthly allotments updated!');
  }

  // Export to Excel (.xlsx) using SheetJS
  exportToExcel() {
    if (typeof XLSX === 'undefined') {
      alert('Excel export library is loading... please try again in a moment.');
      return;
    }

    const month = this.state.getActiveMonth();
    const calc = this.state.getCalculations();
    const wb = XLSX.utils.book_new();

    // 1. Dashboard Sheet Data
    const dashData = [
      ['RupeeTrack - Expense & Wealth Manager (₹ INR)', ''],
      ['Month:', month.name],
      ['Generated On:', new Date().toLocaleString()],
      ['', ''],
      ['FINANCIAL SUMMARY (₹ INR)', 'AMOUNT (₹)'],
      ['Total Money Pool', calc.totalMoney],
      ['Total Expenses Incurred', calc.totalExpenses],
      ['Net Money Left', calc.moneyLeft],
      ['Personal Savings Allotted', calc.savingsAllotted],
      ['Personal Cash Allotted', calc.cashAllotted],
      ['Cash Remaining in Hand', calc.cashRemaining],
      ['Digital / Bank Spending Pool', calc.digitalPool],
      ['Spendable Buffer (After Savings)', calc.spendableBuffer],
      ['', ''],
      ['CATEGORY BREAKDOWN (₹)', 'TOTAL SPENT (₹)', 'TRANSACTIONS', '% SHARE'],
    ];

    Object.keys(CATEGORIES).forEach(cat => {
      const data = calc.catBreakdown[cat] || { total: 0, count: 0 };
      const pct = calc.totalExpenses > 0 ? (data.total / calc.totalExpenses) : 0;
      dashData.push([cat, data.total, data.count, (pct * 100).toFixed(1) + '%']);
    });

    const wsDash = XLSX.utils.aoa_to_sheet(dashData);
    XLSX.utils.book_append_sheet(wb, wsDash, 'Dashboard');

    // 2. Expenses Log Sheet Data (Sorted Chronologically)
    const sortedExpenses = [...month.expenses].sort((a, b) => a.date.localeCompare(b.date));
    const logData = [
      ['Date', 'Category', 'Description', 'Amount (₹)', 'Payment Method', 'Notes']
    ];

    sortedExpenses.forEach(exp => {
      logData.push([
        exp.date,
        exp.category,
        exp.description,
        exp.amount,
        exp.paymentMethod,
        exp.notes || ''
      ]);
    });

    const wsLog = XLSX.utils.aoa_to_sheet(logData);
    XLSX.utils.book_append_sheet(wb, wsLog, 'Expenses_Log');

    const safeMonth = month.name.replace(/\s+/g, '_');
    const filename = `RupeeTrack_${safeMonth}.xlsx`;
    XLSX.writeFile(wb, filename);
    this.showToast(`Exported ${filename}!`);
  }
}

// Global App Instance
let webApp;
window.addEventListener('DOMContentLoaded', () => {
  const state = new WebAppState();
  webApp = new WebUIController(state);
});
