/**
 * RupeeTrack - Android Mobile Daily Expense & Wealth Manager
 * Multi-month sheet architecture, offline persistence, category analytics, and Excel export
 */

// Category metadata with icons & visual themes
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

// Initial 24 Sample Transactions for October 2026 in INR
const INITIAL_OCT_EXPENSES = [
  { id: 'exp_1', date: '2026-10-01', category: 'Subscriptions', description: 'Netflix 4K Ultra HD Plan', amount: 649.00, paymentMethod: 'Credit Card', notes: 'Recurring monthly auto-pay' },
  { id: 'exp_2', date: '2026-10-02', category: 'Meals', description: 'Morning Filter Coffee & Dosa', amount: 160.00, paymentMethod: 'UPI / GPay', notes: 'Cafe breakfast' },
  { id: 'exp_3', date: '2026-10-03', category: 'Travel', description: 'Metro Smart Card Recharge', amount: 800.00, paymentMethod: 'UPI / PhonePe', notes: 'Daily office transit' },
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
class AppState {
  constructor() {
    this.storageKey = 'rupeetrack_data_v1';
    this.data = this.loadData();
    this.selectedCategory = 'All';
    this.sortAscending = false; // default newest first for daily view
    this.editingExpenseId = null;
  }

  loadData() {
    const raw = localStorage.getItem(this.storageKey);
    if (raw) {
      try {
        return JSON.parse(raw);
      } catch (e) {
        console.error('Failed to parse storage, using initial data:', e);
      }
    }
    // Default data structure with 2 months ready
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

  updateMonthAllotments(totalMoney, savingsAllotted, cashAllotted) {
    const month = this.getActiveMonth();
    month.totalMoney = Number(totalMoney) || 0;
    month.savingsAllotted = Number(savingsAllotted) || 0;
    month.cashAllotted = Number(cashAllotted) || 0;
    this.saveData();
  }

  deleteMonth(monthId) {
    const keys = Object.keys(this.data.months);
    if (keys.length <= 1) {
      alert('You must have at least one month sheet.');
      return false;
    }
    delete this.data.months[monthId];
    this.data.activeMonthId = Object.keys(this.data.months)[0];
    this.saveData();
    return true;
  }

  addExpense(expense) {
    const month = this.getActiveMonth();
    month.expenses.push({
      id: 'exp_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
      ...expense
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
    
    // Auto-calculate Cash spent and cash remaining
    const cashSpent = expenses
      .filter(e => e.paymentMethod === 'Cash')
      .reduce((sum, e) => sum + (Number(e.amount) || 0), 0);
    const cashRemaining = month.cashAllotted - cashSpent;
    
    const digitalPool = Math.max(0, month.totalMoney - month.savingsAllotted - month.cashAllotted);
    
    // Category Breakdown
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

    // Category filter
    if (this.selectedCategory !== 'All') {
      list = list.filter(e => e.category === this.selectedCategory);
    }

    // Chronological date sort
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

function formatDateDisplay(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${d.getDate()} ${months[d.getMonth()]}`;
}

// UI Controller
class UIController {
  constructor(state) {
    this.state = state;
    this.initElements();
    this.bindEvents();
    this.render();
  }

  initElements() {
    this.monthSheetsBar = document.getElementById('monthSheetsBar');
    this.kpiTotalMoney = document.getElementById('kpiTotalMoney');
    this.kpiTotalExpenses = document.getElementById('kpiTotalExpenses');
    this.kpiMoneyLeft = document.getElementById('kpiMoneyLeft');
    this.kpiSavings = document.getElementById('kpiSavings');
    this.kpiCash = document.getElementById('kpiCash');
    this.kpiSpendable = document.getElementById('kpiSpendable');
    
    this.allotTotalMoney = document.getElementById('allotTotalMoney');
    this.allotSavings = document.getElementById('allotSavings');
    this.allotCash = document.getElementById('allotCash');
    this.allotDigital = document.getElementById('allotDigital');
    this.allotCashRemaining = document.getElementById('allotCashRemaining');
    this.allotSpendable = document.getElementById('allotSpendable');

    this.chartSvg = document.getElementById('chartSvg');
    this.chartLegend = document.getElementById('chartLegend');
    this.categoryFilters = document.getElementById('categoryFilters');
    this.categoryProgressList = document.getElementById('categoryProgressList');
    this.expenseListContainer = document.getElementById('expenseListContainer');
    this.filteredCountBadge = document.getElementById('filteredCountBadge');
    this.filteredTotalBadge = document.getElementById('filteredTotalBadge');

    // Dialogs
    this.expenseDialog = document.getElementById('expenseDialog');
    this.monthDialog = document.getElementById('monthDialog');
    this.allotmentDialog = document.getElementById('allotmentDialog');
    this.toast = document.getElementById('toast');
    this.fabAdd = document.getElementById('fabAdd');
  }

  bindEvents() {
    // Open Expense Modal
    this.fabAdd.addEventListener('click', () => this.openExpenseModal());
    
    // Close dialog buttons
    document.querySelectorAll('.btn-close').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const dialog = e.target.closest('dialog');
        if (dialog) dialog.close();
      });
    });

    // Light dismiss for dialogs (click outside to close)
    [this.expenseDialog, this.monthDialog, this.allotmentDialog].forEach(dialog => {
      dialog.addEventListener('click', (e) => {
        if (e.target === dialog) dialog.close();
      });
    });

    // Form Submissions
    document.getElementById('expenseForm').addEventListener('submit', (e) => this.handleExpenseSubmit(e));
    document.getElementById('monthForm').addEventListener('submit', (e) => this.handleMonthSubmit(e));
    document.getElementById('allotmentForm').addEventListener('submit', (e) => this.handleAllotmentSubmit(e));

    // Delete Expense
    document.getElementById('btnDeleteExpense').addEventListener('click', () => this.handleDeleteExpense());

    // Export to Excel Button
    document.getElementById('btnExportExcel').addEventListener('click', () => this.exportToExcel());

    // Edit Allotments button
    document.getElementById('btnEditAllotments').addEventListener('click', () => this.openAllotmentModal());

    // Sort Toggle
    document.getElementById('btnSortToggle').addEventListener('click', () => {
      this.state.sortAscending = !this.state.sortAscending;
      document.getElementById('btnSortToggle').innerText = this.state.sortAscending ? '📅 Date: Oldest First' : '📅 Date: Newest First';
      this.renderExpenses();
    });
  }

  showToast(msg) {
    this.toast.innerText = msg;
    this.toast.classList.add('show');
    setTimeout(() => this.toast.classList.remove('show'), 2400);
  }

  render() {
    this.renderMonthSheets();
    this.renderKPIs();
    this.renderAllotmentTable();
    this.renderCharts();
    this.renderCategoryFilters();
    this.renderCategoryBars();
    this.renderExpenses();
  }

  renderMonthSheets() {
    const months = this.state.data.months;
    const activeId = this.state.data.activeMonthId;
    
    let html = '';
    Object.values(months).forEach(m => {
      const isActive = m.id === activeId ? 'active' : '';
      html += `
        <button class="sheet-tab ${isActive}" onclick="app.switchMonth('${m.id}')">
          📑 ${m.name}
        </button>
      `;
    });
    
    html += `
      <button class="sheet-tab btn-add-sheet" onclick="app.openAddMonthModal()">
        ➕ Add Month
      </button>
    `;
    
    this.monthSheetsBar.innerHTML = html;
  }

  renderKPIs() {
    const calc = this.state.getCalculations();
    
    this.kpiTotalMoney.innerText = formatINR(calc.totalMoney);
    this.kpiTotalExpenses.innerText = formatINR(calc.totalExpenses);
    this.kpiMoneyLeft.innerText = formatINR(calc.moneyLeft);
    this.kpiSavings.innerText = formatINR(calc.savingsAllotted);
    this.kpiCash.innerText = formatINR(calc.cashAllotted);
    this.kpiSpendable.innerText = formatINR(calc.spendableBuffer);

    document.getElementById('subtextMoneyLeft').innerText = calc.moneyLeft >= 0 ? '🟢 Surplus / Under Budget' : '🔴 Deficit / Overdrawn';
    document.getElementById('subtextCashLeft').innerText = `Cash in Wallet: ${formatINR(calc.cashRemaining)}`;
    document.getElementById('subtextSpendable').innerText = calc.spendableBuffer >= 0 ? 'Safe buffer after savings' : '⚠️ Savings dipped into';
  }

  renderAllotmentTable() {
    const calc = this.state.getCalculations();
    this.allotTotalMoney.innerText = formatINR(calc.totalMoney);
    this.allotSavings.innerText = formatINR(calc.savingsAllotted);
    this.allotCash.innerText = formatINR(calc.cashAllotted);
    this.allotDigital.innerText = formatINR(calc.digitalPool);
    this.allotCashRemaining.innerText = formatINR(calc.cashRemaining);
    this.allotSpendable.innerText = formatINR(calc.spendableBuffer);

    // Percentage of total badges
    const total = calc.totalMoney || 1;
    document.getElementById('badgeSavingsPct').innerText = `${((calc.savingsAllotted / total) * 100).toFixed(1)}%`;
    document.getElementById('badgeCashPct').innerText = `${((calc.cashAllotted / total) * 100).toFixed(1)}%`;
    document.getElementById('badgeDigitalPct').innerText = `${((calc.digitalPool / total) * 100).toFixed(1)}%`;
  }

  renderCharts() {
    const calc = this.state.getCalculations();
    const total = calc.totalMoney || 1;
    
    // Donut Slices: Savings, Cash in Hand, Expenses Spent, Spendable Left
    const slices = [
      { name: 'Savings Protected', val: Math.max(0, calc.savingsAllotted), color: '#3B82F6' },
      { name: 'Cash in Wallet', val: Math.max(0, calc.cashRemaining), color: '#F59E0B' },
      { name: 'Expenses Spent', val: Math.max(0, calc.totalExpenses), color: '#EF4444' },
      { name: 'Spendable Left', val: Math.max(0, calc.spendableBuffer), color: '#10B981' }
    ];

    const sumValues = slices.reduce((acc, s) => acc + s.val, 0) || 1;
    
    // Draw SVG Donut
    let cumulative = 0;
    const cx = 110, cy = 110, r = 85, strokeWidth = 26;
    const circumference = 2 * Math.PI * r;
    
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
        <div class="legend-item">
          <div class="legend-dot" style="background:${slice.color};"></div>
          <div class="legend-text">
            <span>${slice.name}</span>
            <b>${formatINR(slice.val)}</b>
          </div>
        </div>
      `;
    });

    this.chartSvg.innerHTML = svgPaths;
    document.getElementById('chartCenterTotal').innerText = formatINR(calc.totalMoney);
    this.chartLegend.innerHTML = legendHtml;
  }

  renderCategoryFilters() {
    const calc = this.state.getCalculations();
    const active = this.state.selectedCategory;
    
    let html = `
      <button class="cat-pill ${active === 'All' ? 'active' : ''}" onclick="app.filterCategory('All')">
        All <span class="count">${calc.expenseCount}</span>
      </button>
    `;

    Object.keys(CATEGORIES).forEach(cat => {
      const info = CATEGORIES[cat];
      const count = calc.catBreakdown[cat] ? calc.catBreakdown[cat].count : 0;
      const isSel = active === cat ? 'active' : '';
      html += `
        <button class="cat-pill ${isSel}" onclick="app.filterCategory('${cat}')">
          ${info.icon} ${cat} <span class="count">${count}</span>
        </button>
      `;
    });

    this.categoryFilters.innerHTML = html;
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
        <div class="cat-bar-item" onclick="app.filterCategory('${cat}')">
          <div class="cat-bar-header">
            <span class="name">${info.icon} ${cat} (${data.count})</span>
            <span class="amt">${formatINR(data.total)} <span style="font-size:10px;color:var(--text-muted);">(${pct}%)</span></span>
          </div>
          <div class="cat-progress-track">
            <div class="cat-progress-fill" style="width: ${pct}%; background: ${info.color};"></div>
          </div>
        </div>
      `;
    });

    this.categoryProgressList.innerHTML = html;
  }

  renderExpenses() {
    const list = this.state.getFilteredExpenses();
    const calc = this.state.getCalculations();

    // Badges update
    const filteredTotal = list.reduce((sum, e) => sum + (Number(e.amount) || 0), 0);
    this.filteredCountBadge.innerText = `${list.length} item${list.length === 1 ? '' : 's'}`;
    this.filteredTotalBadge.innerText = formatINR(filteredTotal);

    if (list.length === 0) {
      this.expenseListContainer.innerHTML = `
        <div class="empty-state">
          <div class="icon">🔍</div>
          <p>No expenses found for this category.</p>
          <button class="btn-secondary" style="margin-top:12px;" onclick="app.openExpenseModal()">+ Add New Expense</button>
        </div>
      `;
      return;
    }

    let html = '';
    list.forEach(item => {
      const cat = CATEGORIES[item.category] || { icon: '📦', color: '#94A3B8', bg: 'rgba(148, 163, 184, 0.15)' };
      const isCash = item.paymentMethod === 'Cash';
      const pillClass = isCash ? 'cash' : (item.paymentMethod.includes('UPI') ? 'upi' : 'card');

      html += `
        <div class="expense-item-card" onclick="app.openEditExpense('${item.id}')">
          <div class="item-left">
            <div class="item-cat-icon" style="background:${cat.bg};">
              ${cat.icon}
            </div>
            <div class="item-info">
              <div class="item-desc">${item.description || item.category}</div>
              <div class="item-meta">
                <span>${formatDateDisplay(item.date)}</span>
                <span>•</span>
                <span class="payment-pill ${pillClass}">${item.paymentMethod || 'UPI'}</span>
              </div>
            </div>
          </div>
          <div class="item-right">
            <div class="item-amount">${formatINR(item.amount)}</div>
            <div class="item-time">${item.category}</div>
          </div>
        </div>
      `;
    });

    this.expenseListContainer.innerHTML = html;
  }

  // Category Filtering Action (Feature #4)
  filterCategory(cat) {
    this.state.selectedCategory = cat;
    this.renderCategoryFilters();
    this.renderExpenses();
    
    // Smooth scroll to expense list
    document.getElementById('expensesSection').scrollIntoView({ behavior: 'smooth', block: 'start' });
    this.showToast(`Filtered: ${cat}`);
  }

  switchMonth(monthId) {
    this.state.switchMonth(monthId);
    this.render();
    this.showToast(`Switched to ${this.state.getActiveMonth().name}`);
  }

  // Modal Handlers
  openExpenseModal(expenseId = null) {
    this.state.editingExpenseId = expenseId;
    const form = document.getElementById('expenseForm');
    const deleteBtn = document.getElementById('btnDeleteExpense');
    
    if (expenseId) {
      const month = this.state.getActiveMonth();
      const exp = month.expenses.find(e => e.id === expenseId);
      if (exp) {
        document.getElementById('modalTitle').innerText = 'Edit Expense';
        document.getElementById('expAmount').value = exp.amount;
        document.getElementById('expDescription').value = exp.description || '';
        document.getElementById('expDate').value = exp.date;
        document.getElementById('expCategory').value = exp.category;
        document.getElementById('expPaymentMethod').value = exp.paymentMethod;
        document.getElementById('expNotes').value = exp.notes || '';
        deleteBtn.style.display = 'block';
      }
    } else {
      document.getElementById('modalTitle').innerText = 'Add New Expense';
      form.reset();
      // Default to today's date in YYYY-MM-DD
      const today = new Date().toISOString().split('T')[0];
      document.getElementById('expDate').value = today;
      document.getElementById('expCategory').value = 'Meals';
      document.getElementById('expPaymentMethod').value = 'UPI / GPay';
      deleteBtn.style.display = 'none';
    }

    this.updateCategoryChips(document.getElementById('expCategory').value);
    this.expenseDialog.showModal();
    setTimeout(() => document.getElementById('expAmount').focus(), 100);
  }

  updateCategoryChips(activeCat) {
    const container = document.getElementById('categoryChipsGrid');
    let html = '';
    Object.keys(CATEGORIES).forEach(cat => {
      const info = CATEGORIES[cat];
      const isSel = cat === activeCat ? 'active' : '';
      html += `
        <button type="button" class="chip-btn ${isSel}" onclick="app.selectCategoryChip('${cat}')">
          <span class="icon">${info.icon}</span>
          <span>${cat}</span>
        </button>
      `;
    });
    container.innerHTML = html;
  }

  selectCategoryChip(cat) {
    document.getElementById('expCategory').value = cat;
    this.updateCategoryChips(cat);
  }

  openEditExpense(id) {
    this.openExpenseModal(id);
  }

  handleExpenseSubmit(e) {
    e.preventDefault();
    const amount = parseFloat(document.getElementById('expAmount').value);
    if (isNaN(amount) || amount <= 0) {
      alert('Please enter a valid amount.');
      return;
    }

    const expenseData = {
      amount,
      category: document.getElementById('expCategory').value,
      description: document.getElementById('expDescription').value || document.getElementById('expCategory').value,
      date: document.getElementById('expDate').value,
      paymentMethod: document.getElementById('expPaymentMethod').value,
      notes: document.getElementById('expNotes').value || ''
    };

    if (this.state.editingExpenseId) {
      this.state.updateExpense(this.state.editingExpenseId, expenseData);
      this.showToast('Expense updated!');
    } else {
      this.state.addExpense(expenseData);
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

  // Add Month Sheet Modal
  openAddMonthModal() {
    const current = this.state.getActiveMonth();
    document.getElementById('newMonthTotalMoney').value = current.totalMoney;
    document.getElementById('newMonthSavings').value = current.savingsAllotted;
    document.getElementById('newMonthCash').value = current.cashAllotted;
    this.monthDialog.showModal();
  }

  handleMonthSubmit(e) {
    e.preventDefault();
    const monthPicker = document.getElementById('newMonthPicker').value; // YYYY-MM
    if (!monthPicker) {
      alert('Please pick a month.');
      return;
    }

    const [year, monthNum] = monthPicker.split('-');
    const dateObj = new Date(year, parseInt(monthNum) - 1, 1);
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const monthName = `${monthNames[dateObj.getMonth()]} ${year}`;

    const totalMoney = parseFloat(document.getElementById('newMonthTotalMoney').value) || 0;
    const savings = parseFloat(document.getElementById('newMonthSavings').value) || 0;
    const cash = parseFloat(document.getElementById('newMonthCash').value) || 0;

    this.state.addMonth(monthPicker, monthName, totalMoney, savings, cash);
    this.monthDialog.close();
    this.render();
    this.showToast(`Created new sheet for ${monthName}!`);
  }

  // Edit Allotments Modal
  openAllotmentModal() {
    const current = this.state.getActiveMonth();
    document.getElementById('editTotalMoney').value = current.totalMoney;
    document.getElementById('editSavings').value = current.savingsAllotted;
    document.getElementById('editCash').value = current.cashAllotted;
    this.allotmentDialog.showModal();
  }

  handleAllotmentSubmit(e) {
    e.preventDefault();
    const totalMoney = parseFloat(document.getElementById('editTotalMoney').value) || 0;
    const savings = parseFloat(document.getElementById('editSavings').value) || 0;
    const cash = parseFloat(document.getElementById('editCash').value) || 0;

    this.state.updateMonthAllotments(totalMoney, savings, cash);
    this.allotmentDialog.close();
    this.render();
    this.showToast('Allotments updated!');
  }

  // 1-Click Export to Excel (.xlsx) using SheetJS
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
      ['Exported On:', new Date().toLocaleString()],
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

    // Download file
    const safeMonth = month.name.replace(/\s+/g, '_');
    const filename = `RupeeTrack_${safeMonth}.xlsx`;
    XLSX.writeFile(wb, filename);
    this.showToast(`Downloaded ${filename}!`);
  }
}

// Service Worker Registration for Offline Usage
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').then(reg => {
      console.log('RupeeTrack Service Worker registered:', reg.scope);
    }).catch(err => {
      console.log('Service Worker registration failed:', err);
    });
  });
}

// Global App Instance
let app;
window.addEventListener('DOMContentLoaded', () => {
  const state = new AppState();
  app = new UIController(state);
});
