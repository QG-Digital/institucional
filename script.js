// ==========================================================
// QG.DIGITAL - JAVASCRIPT (VERSÃO FINAL COM FETCH CORRIGIDO)
// ==========================================================

// Variáveis globais para armazenar os dados depois de carregados
let salesData = [];
let companyExpenses = [];
let charts = {};
let isDadosAbertosInitialized = false;

// O evento principal que dispara tudo
document.addEventListener('DOMContentLoaded', async () => {
  // 1. Tenta carregar os dados essenciais PRIMEIRO
  try {
    const salesResponse = await fetch('salesData.json');
    if (!salesResponse.ok) throw new Error('Falha ao carregar salesData.json');
    salesData = await salesResponse.json();

    const expensesResponse = await fetch('companyExpenses.json');
    if (!expensesResponse.ok) throw new Error('Falha ao carregar companyExpenses.json');
    companyExpenses = await expensesResponse.json();

    console.log("Dados carregados com sucesso!", { salesData, companyExpenses });

    // 2. AGORA que os dados existem, inicializa o resto do site
    initializeSite();

  } catch (error) {
    console.error("ERRO CRÍTICO AO CARREGAR DADOS:", error);
    // Opcional: Mostrar uma mensagem de erro visível na página de dados abertos
    const dadosPage = document.getElementById('dados-abertos-page');
    if (dadosPage) {
        dadosPage.innerHTML = `<div style="text-align:center; padding: 50px;"><h2>Erro ao carregar os dados</h2><p>Não foi possível carregar os arquivos de transparência. Verifique o console para mais detalhes.</p></div>`;
    }
  }
});

// Função que inicializa todos os componentes do site
function initializeSite() {
  initializeNavigation();
  initializeFAQ();
  initializeCounters();
  initializeBackToTop();
  initializeMenuToggle();
  initializeForms();
  removeLoaderAfterDelay();
  initializeDynamicYear();
  initializeFormValidation();
  initializeScrollAnimations();
  
  // Verifica se a página de dados abertos é a inicial e a inicializa
  if (document.getElementById('dados-abertos-page').classList.contains('active')) {
      initializeDadosAbertosPage();
  }
}

// ============ LÓGICA DA PÁGINA "DADOS ABERTOS" ============
function initializeDadosAbertosPage() {
    if (isDadosAbertosInitialized) return; // Não inicializar duas vezes

    populateFilters();
    updateDashboard(); // Primeira renderização com os dados já carregados

    // Adiciona os listeners para os filtros
    ['filtro-mes', 'filtro-ano', 'filtro-vendedor', 'filtro-software', 'filtro-bonus-input'].forEach(id => {
        document.getElementById(id).addEventListener('input', updateDashboard);
    });
    document.getElementById('btn-limpar-filtros').addEventListener('click', clearFilters);
    document.getElementById('btn-exportar-csv').addEventListener('click', exportToCSV);

    isDadosAbertosInitialized = true;
    console.log("Página de Dados Abertos inicializada.");
}

function getFilteredData() {
    const mes = document.getElementById('filtro-mes').value;
    const ano = document.getElementById('filtro-ano').value;
    const vendedor = document.getElementById('filtro-vendedor').value;
    const software = document.getElementById('filtro-software').value;
    const bonusInput = document.getElementById('filtro-bonus-input').value.toLowerCase();

    // AGORA a função lê a variável global 'salesData' que foi preenchida no início
    return salesData.filter(d => {
        const data = new Date(d.data_pedido);
        return (mes === 'todos' || data.getMonth() + 1 == mes) &&
               (ano === 'todos' || data.getFullYear() == ano) &&
               (vendedor === 'todos' || d.vendedor === vendedor) &&
               (software === 'todos' || d.software === software) &&
               (!bonusInput || d.codigo_bonus.toLowerCase().includes(bonusInput));
    });
}

function updateDashboard() {
    const filteredSales = getFilteredData();

    // Cálculos financeiros
    const faturamentoBruto = filteredSales.reduce((sum, d) => sum + d.valor_final, 0);
    const comissaoBonusTotal = faturamentoBruto * 0.20; // BONUS_COMMISSION_RATE
    const comissaoVendedorTotal = faturamentoBruto * 0.30; // SELLER_COMMISSION_RATE
    const impostos = faturamentoBruto * 0.23; // TAX_RATE
    const lucroLiquido = faturamentoBruto - comissaoBonusTotal - comissaoVendedorTotal - impostos;
    const totalGasto = companyExpenses.reduce((sum, d) => sum + d.valor, 0);

    // Atualiza DOM Financeiro
    document.getElementById('d-faturamento-bruto').textContent = formatCurrency(faturamentoBruto);
    document.getElementById('d-comissao-bonus').textContent = `-${formatCurrency(comissaoBonusTotal)}`;
    document.getElementById('d-comissao-vendedor').textContent = `-${formatCurrency(comissaoVendedorTotal)}`;
    document.getElementById('d-impostos').textContent = `-${formatCurrency(impostos)}`;
    document.getElementById('d-lucro-liquido').textContent = formatCurrency(lucroLiquido);
    
    // Atualiza Cards de Extrato
    document.getElementById('caixa-atual').textContent = formatCurrency(lucroLiquido - totalGasto);
    document.getElementById('total-gasto').textContent = `-${formatCurrency(totalGasto)}`;

    // Gráficos
    createChart('grafico-bonus', 'bar', getBarChartData(filteredSales, 'codigo_bonus', 'Comissão'));
    createChart('grafico-vendedor', 'bar', getBarChartData(filteredSales, 'vendedor'));
    
    // Preenche as tabelas
    populateSalesTable(filteredSales);
    populateExpensesTable(companyExpenses);
}


// ============ FUNÇÕES DE NAVEGAÇÃO E POPULAÇÃO (RESTO DO CÓDIGO) ============
// O resto do seu código (funções de gráfico, tabelas, faq, etc.) pode continuar aqui.
// As funções abaixo já estão corretas e não precisam de alteração.

function navigateToPage(pageName) {
  document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
  const selectedPage = document.getElementById(`${pageName}-page`);
  if (selectedPage) selectedPage.classList.add('active');
  window.scrollTo(0, 0);
  document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
  document.querySelector(`.nav-link[data-page="${pageName}"]`)?.classList.add('active');

  // Se a página de dados for aberta, inicializa seus componentes
  if (pageName === 'dados-abertos') {
    initializeDadosAbertosPage();
  }
}

function initializeNavigation() {
  document.querySelectorAll('[data-page]').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      navigateToPage(this.getAttribute('data-page'));
    });
  });
}

function populateFilters() {
    const meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    document.getElementById('filtro-mes').innerHTML = '<option value="todos">Todos</option>' + meses.map((mes, i) => `<option value="${i + 1}">${mes}</option>`).join('');
    const anos = [...new Set(salesData.map(d => new Date(d.data_pedido).getFullYear()))].sort();
    document.getElementById('filtro-ano').innerHTML = '<option value="todos">Todos</option>' + anos.map(ano => `<option value="${ano}">${ano}</option>`).join('');
    const vendedores = [...new Set(salesData.map(d => d.vendedor))].sort();
    document.getElementById('filtro-vendedor').innerHTML = '<option value="todos">Todos</option>' + vendedores.map(v => `<option value="${v}">${v}</option>`).join('');
    const softwares = [...new Set(salesData.map(d => d.software))].sort();
    document.getElementById('filtro-software').innerHTML = '<option value="todos">Todos</option>' + softwares.map(s => `<option value="${s}">${s}</option>`).join('');
}

function clearFilters() {
    ['filtro-mes', 'filtro-ano', 'filtro-vendedor', 'filtro-software'].forEach(id => {
        document.getElementById(id).value = 'todos';
    });
    document.getElementById('filtro-bonus-input').value = '';
    updateDashboard();
}

function populateSalesTable(data) {
    const tableBody = document.getElementById('tabela-vendas').querySelector('tbody');
    tableBody.innerHTML = '';
    if (data.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="7" style="text-align:center;">Nenhuma venda encontrada para os filtros selecionados.</td></tr>';
        return;
    }
    data.forEach(sale => {
        const comissaoBonus = sale.valor_final * 0.20;
        const comissaoVendedor = sale.valor_final * 0.30;
        tableBody.innerHTML += `
            <tr>
                <td>${sale.vendedor}</td>
                <td>${sale.codigo_bonus}</td>
                <td>${sale.software}</td>
                <td>${formatCurrency(sale.valor_final)}</td>
                <td>${formatCurrency(comissaoBonus)}</td>
                <td>${formatCurrency(comissaoVendedor)}</td>
                <td>${new Date(sale.data_pedido).toLocaleDateString('pt-BR')}</td>
            </tr>`;
    });
}

function populateExpensesTable(data) {
    const tableBody = document.getElementById('tabela-gastos').querySelector('tbody');
    tableBody.innerHTML = '';
    data.forEach(expense => {
        tableBody.innerHTML += `
            <tr>
                <td>${new Date(expense.data).toLocaleDateString('pt-BR')}</td>
                <td>${expense.descricao}</td>
                <td>${expense.categoria}</td>
                <td>-${formatCurrency(expense.valor)}</td>
            </tr>`;
    });
}

function createChart(canvasId, type, data) {
    if (charts[canvasId]) {
        charts[canvasId].destroy();
    }

    const ctx = document.getElementById(canvasId).getContext('2d');
    let options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            datalabels: {}
        }
    };
    let chartData;

    if (type === 'bubble') {
        // ... (o código do gráfico de bolhas continua o mesmo, sem alterações)
        chartData = { datasets: data };
        options.scales = {
            x: { display: false, grid: { display: false } },
            y: { display: false, grid: { display: false } }
        };
        options.plugins.legend = { display: false };
        options.plugins.datalabels = {
            color: '#FFFFFF',
            textAlign: 'center',
            textStrokeColor: 'rgba(0, 0, 0, 0.4)',
            textStrokeWidth: 2,
            font: function(context) {
                const radius = context.dataset.data[0].r;
                const size = Math.round(radius / 3);
                return {
                    family: 'Poppins',
                    weight: 'bold',
                    size: Math.max(size, 9)
                };
            },
            formatter: (value, context) => {
                const label = context.dataset.label;
                const truncatedLabel = label.length > 12 ? label.substring(0, 10) + '...' : label;
                return `${truncatedLabel}\n${formatCurrencyShort(value.comissao)}`;
            }
        };
    } else { // bar
        chartData = {
            labels: data.labels,
            datasets: [{
                label: data.datasetLabel || 'Valor',
                data: data.values,
                backgroundColor: '#fa8700'
            }]
        };

        options.indexAxis = 'y';
        
        // ================== INÍCIO DAS CORREÇÕES ==================

        // FIX 1: Desativa a animação inicial do gráfico
        options.animation = {
            duration: 0 
        };

        // FIX 2: Adiciona espaço (padding) à direita para os valores não cortarem
        options.layout = {
            padding: {
                right: 80 // Aumenta a área do gráfico em 80px à direita
            }
        };

        // =================== FIM DAS CORREÇÕES ====================

        options.plugins.tooltip = {
            enabled: false
        };

        options.plugins.datalabels = {
            display: true,
            anchor: 'end',
            align: 'end',
            color: '#101f4d',
            font: {
                weight: 'bold'
            },
            formatter: (value) => formatCurrency(value)
        };
        
        options.scales = {
            x: {
                ticks: { callback: (val) => formatCurrency(val) }
            },
            y: {
                afterFit: (scaleInstance) => {
                    scaleInstance.width = 150;
                }
            }
        };
        options.scales.x.beginAtZero = true;
    }

    charts[canvasId] = new Chart(ctx, {
        type: type,
        data: chartData,
        options: options,
        plugins: [ChartDataLabels]
    });
}

function getBarChartData(data, groupBy, datasetLabel = 'Faturamento') {
    const aggregation = data.reduce((acc, item) => {
        // Agora calcula a comissão se a legenda for 'Comissão'
        const value = datasetLabel === 'Comissão' ? item.valor_final * 0.20 : item.valor_final;
        acc[item[groupBy]] = (acc[item[groupBy]] || 0) + value;
        return acc;
    }, {});
    
    // Ordena do maior para o menor
    const sortedData = Object.entries(aggregation).sort((a, b) => b[1] - a[1]);
    
    // Retorna os dados no formato que a função createChart espera
    return { 
        labels: sortedData.map(item => item[0]), 
        values: sortedData.map(item => item[1]),
        datasetLabel: datasetLabel // Passa a legenda para o gráfico
    };
}

function getBubbleChartData(data, groupBy) {
    const aggregation = data.reduce((acc, item) => {
        const comissao = item.valor_final * 0.20;
        if (!acc[item[groupBy]]) acc[item[groupBy]] = { comissao: 0 };
        acc[item[groupBy]].comissao += comissao;
        return acc;
    }, {});
    return Object.entries(aggregation).map(([label, values]) => {
        // AJUSTE: O raio agora considera o comprimento do texto para garantir que ele caiba.
        const textLengthFactor = Math.max(1.0, label.length / 7); // Aumenta o raio base para textos longos
        const commissionValueFactor = Math.sqrt(values.comissao) / 1.2;
        
        // O raio final é o MAIOR valor entre o tamanho necessário para o texto e o tamanho da comissão.
        // Isso garante que mesmo um código longo com baixa comissão seja legível.
        const radius = Math.max(25 * textLengthFactor, commissionValueFactor, 25); // Adiciona um raio mínimo de 25.

        return {
            label: label,
            data: [{ x: Math.random() * 20, y: Math.random() * 20, r: radius, comissao: values.comissao }],
            backgroundColor: 'rgba(250, 135, 0, 0.85)',
        };
    });
}

function exportToCSV() {
    const dataToExport = getFilteredData();
    if (dataToExport.length === 0) {
        alert("Não há dados para exportar com os filtros selecionados.");
        return;
    }
    const csv = Papa.unparse(dataToExport.map(d => ({
        "Vendedor": d.vendedor, "Software": d.software, "Codigo Bonus": d.codigo_bonus,
        "Valor Venda": d.valor_final.toFixed(2), "Data Pedido": d.data_pedido
    })));
    const blob = new Blob([`\uFEFF${csv}`], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "vendas_qgdigital.csv";
    link.click();
    URL.revokeObjectURL(link.href);
}

// Funções Utilitárias e de UI (sem alterações)
function formatCurrency(value) { return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }); }
function formatCurrencyShort(value) {
    if (value >= 1000) return `R$ ${(value / 1000).toFixed(1)}k`;
    return `R$ ${value.toFixed(0)}`;
}
function initializeMenuToggle() { const menuToggle = document.getElementById('menuToggle'), navLinks = document.getElementById('navLinks'); if (menuToggle) menuToggle.addEventListener('click', () => navLinks.classList.toggle('active')); }
function initializeFAQ() { document.querySelectorAll('.faq-question').forEach(q => q.addEventListener('click', function() { const item = this.parentElement, active = item.classList.contains('active'); document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active')); if (!active) item.classList.add('active'); })); }
function initializeCounters() { const observer = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) { animateCounter(e.target); observer.unobserve(e.target); } }), { threshold: 0.5 }); document.querySelectorAll('.numero-counter').forEach(c => observer.observe(c)); }
function animateCounter(el) { const target = +el.dataset.target, duration = 2000; let start = null; const step = ts => { if (!start) start = ts; const progress = Math.min((ts - start) / duration, 1); el.textContent = Math.floor(progress * target); if (progress < 1) requestAnimationFrame(step); }; requestAnimationFrame(step); }
function initializeBackToTop() { const btn = document.getElementById('backToTop'); window.addEventListener('scroll', () => btn.classList.toggle('show', window.scrollY > 300)); btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' })); }
function initializeForms() { ['trabalheForm', 'afiliadosForm', 'newsletterForm'].forEach(id => { const form = document.getElementById(id); if (form) form.addEventListener('submit', e => { e.preventDefault(); alert('Formulário enviado! (Demonstração)'); form.reset(); }); }); }
function removeLoaderAfterDelay() { const loader = document.getElementById('loader'); if (loader) setTimeout(() => loader.style.display = 'none', 1500); }
function initializeDynamicYear() { const el = document.querySelector('.footer-bottom p'); if (el) el.textContent = `© ${new Date().getFullYear()} QG.Digital - Todos os direitos reservados`; }
function initializeFormValidation() { document.querySelectorAll('form').forEach(f => f.setAttribute('novalidate', true)); }
function initializeScrollAnimations() { const observer = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) { e.target.style.opacity = '1'; e.target.style.transform = 'translateY(0)'; } }), { threshold: 0.1 }); document.querySelectorAll('.numero-item, .diferencial, .servico-card, .uso-card, .beneficio, .passo, .missao-card, .beneficio-item, .posicao-card').forEach(el => { Object.assign(el.style, { opacity: '0', transform: 'translateY(20px)', transition: 'opacity 0.6s ease, transform 0.6s ease' }); observer.observe(el); }); }