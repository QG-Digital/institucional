// ============================================
// QG.DIGITAL - JAVASCRIPT (VERSÃO FINAL COM GRÁFICO DE BOLHAS CUSTOMIZADO)
// ============================================

document.addEventListener('DOMContentLoaded', function() {
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
});
// ============================================
// DADOS E CONSTANTES GLOBAIS
// ============================================
const salesData = [
    {id: 1, vendedor: "Isadora", software: "Financeiro PRO", codigo_bonus: "Isadora_GA25W", valor_final: 489.0, data_pedido: "2025-10-21 18:57:44"},
    {id: 2, vendedor: "Vinicius", software: "Financeiro PRO", codigo_bonus: "Vinicius_GQLIV", valor_final: 489.0, data_pedido: "2025-10-22 22:26:44"},
    {id: 3, vendedor: "Matheus", software: "Pesquisador de Lojas", codigo_bonus: "Matheus_0NSNE", valor_final: 750.0, data_pedido: "2025-11-11 03:35:44"},
    {id: 4, vendedor: "Isadora", software: "Financeiro PRO", codigo_bonus: "Isadora_GA25W", valor_final: 489.0, data_pedido: "2025-11-10 02:58:44"},
    {id: 5, vendedor: "Vinicius", software: "Sistema de Barra Lateral", codigo_bonus: "Vinicius_GQLIV", valor_final: 600.0, data_pedido: "2025-10-25 02:24:44"},
    {id: 6, vendedor: "Isadora", software: "Financeiro PRO", codigo_bonus: "Isadora_GA25W", valor_final: 500.0, data_pedido: "2025-11-12 10:00:00"},
    {id: 7, vendedor: "Matheus", software: "Financeiro PRO", codigo_bonus: "Matheus_0NSNE", valor_final: 300.0, data_pedido: "2025-11-12 11:30:00"},
    {id: 8, vendedor: "Vinicius", software: "Pesquisador de Lojas", codigo_bonus: "Vinicius_GQLIV", valor_final: 750.0, data_pedido: "2025-12-01 09:00:00"},
];

const companyExpenses = [
    { data: "2025-11-15", descricao: "Supermercado (Café e lanches)", categoria: "Despesas Operacionais", valor: 150.75 },
    { data: "2025-11-20", descricao: "Pagamento de anúncio no Instagram", categoria: "Marketing", valor: 500.00 },
];

const BONUS_COMMISSION_RATE = 0.20;
const SELLER_COMMISSION_RATE = 0.30;
const TAX_RATE = 0.23;

let charts = {};
let isDadosAbertosInitialized = false;

// ============ PAGE NAVIGATION E INICIALIZAÇÃO ============
function initializeNavigation() {
  document.querySelectorAll('[data-page]').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      navigateToPage(this.getAttribute('data-page'));
      document.getElementById('navLinks').classList.remove('active');
    });
  });
}

function navigateToPage(pageName) {
  document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
  const selectedPage = document.getElementById(`${pageName}-page`);
  if (selectedPage) selectedPage.classList.add('active');
  window.scrollTo(0, 0);
  document.querySelectorAll('[data-page]').forEach(link => link.classList.remove('active'));
  const activeLink = document.querySelector(`[data-page="${pageName}"]`);
  if (activeLink) activeLink.classList.add('active');

  if (pageName === 'dados-abertos' && !isDadosAbertosInitialized) {
    initializeDadosAbertos();
    isDadosAbertosInitialized = true;
  }
}

// ============ LÓGICA DA PÁGINA "DADOS ABERTOS" ============
function initializeDadosAbertos() {
    populateFilters();
    updateDashboard();
    ['filtro-mes', 'filtro-ano', 'filtro-vendedor', 'filtro-software', 'filtro-bonus-input'].forEach(id => {
        document.getElementById(id).addEventListener('input', updateDashboard);
    });
    document.getElementById('btn-limpar-filtros').addEventListener('click', clearFilters);
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

function filterData(dataArray, config) {
    return dataArray.filter(d => {
        const data = new Date(d[config.dateField]);
        return ((config.mes === 'todos') || (data.getMonth() + 1 == config.mes)) &&
               ((config.ano === 'todos') || (data.getFullYear() == config.ano)) &&
               ((config.vendedor === 'todos') || (d.vendedor === config.vendedor)) &&
               ((config.software === 'todos') || (d.software === config.software)) &&
               ((!config.bonusInput) || d.codigo_bonus.toLowerCase().includes(config.bonusInput));
    });
}

function updateDashboard() {
    const filterConfig = {
        mes: document.getElementById('filtro-mes').value,
        ano: document.getElementById('filtro-ano').value,
        vendedor: document.getElementById('filtro-vendedor').value,
        software: document.getElementById('filtro-software').value,
        bonusInput: document.getElementById('filtro-bonus-input').value.toLowerCase(),
        dateField: 'data_pedido'
    };
    const filteredSales = salesData.map(sale => ({
        ...sale,
        comissao_bonus: sale.valor_final * BONUS_COMMISSION_RATE,
        comissao_vendedor: sale.valor_final * SELLER_COMMISSION_RATE
    })).filter(d => filterData([d], filterConfig).length > 0);

    // Cálculos financeiros
    const faturamentoBruto = filteredSales.reduce((sum, d) => sum + d.valor_final, 0);
    const comissaoBonusTotal = filteredSales.reduce((sum, d) => sum + d.comissao_bonus, 0);
    const comissaoVendedorTotal = filteredSales.reduce((sum, d) => sum + d.comissao_vendedor, 0);
    const impostos = faturamentoBruto * TAX_RATE;
    const lucroLiquido = faturamentoBruto - comissaoBonusTotal - comissaoVendedorTotal - impostos;
    
    // Atualiza DOM
    document.getElementById('d-faturamento-bruto').textContent = faturamentoBruto.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    document.getElementById('d-comissao-bonus').textContent = `-${comissaoBonusTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`;
    document.getElementById('d-comissao-vendedor').textContent = `-${comissaoVendedorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`;
    document.getElementById('d-impostos').textContent = `-${impostos.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`;
    document.getElementById('d-lucro-liquido').textContent = lucroLiquido.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    // Gráficos
    createChart('grafico-bonus', 'bubble', getBubbleChartData(filteredSales, 'codigo_bonus'));
    createChart('grafico-vendedor', 'bar', getBarChartData(filteredSales, 'vendedor'));
    
    // ... (outras atualizações de tabelas)
}

// ============ FUNÇÕES DE GRÁFICO (ATUALIZADAS) ============

function getBarChartData(data, groupBy) {
    const aggregation = data.reduce((acc, item) => {
        acc[item[groupBy]] = (acc[item[groupBy]] || 0) + item.valor_final;
        return acc;
    }, {});
    const sortedData = Object.entries(aggregation).sort((a, b) => b[1] - a[1]);
    return { labels: sortedData.map(item => item[0]), values: sortedData.map(item => item[1]) };
}

function getTextWidth(text, font) {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    context.font = font;
    const metrics = context.measureText(text);
    return metrics.width;
}

function getBubbleChartData(data, groupBy) {
    const aggregation = data.reduce((acc, item) => {
        if (!acc[item[groupBy]]) acc[item[groupBy]] = { comissao: 0, qtd: 0 };
        acc[item[groupBy]].comissao += item.comissao_bonus;
        acc[item[groupBy]].qtd += 1;
        return acc;
    }, {});

    return Object.entries(aggregation).map(([label, values]) => {
        const formattedValue = formatCurrencyShort(values.comissao);
        const textWidth = Math.max(getTextWidth(label, "bold 12px Poppins"), getTextWidth(formattedValue, "12px Poppins"));
        
        // O raio é o maior entre a largura do texto (com margem) e um valor proporcional à comissão
        const radiusFromText = (textWidth / 2) + 10; // 10px de padding
        const radiusFromValue = Math.sqrt(values.comissao) / 1.5;
        const finalRadius = Math.max(radiusFromText, radiusFromValue, 25); // Raio mínimo de 25px

        return {
            label: label,
            data: [{
                x: Math.random() * 20,
                y: Math.random() * 20,
                r: finalRadius,
                comissao: values.comissao,
            }],
            // Animação individual e aleatória!
            animation: {
                duration: 2000,
                delay: Math.random() * 1500, // Atraso aleatório
            },
            backgroundColor: `rgba(250, 135, 0, ${Math.max(0.4, Math.random())})`, // Opacidade aleatória
        };
    });
}

function formatCurrencyShort(value) {
    if (value >= 1000000) return `R$ ${(value / 1000000).toFixed(2)} mi`;
    if (value >= 1000) return `R$ ${(value / 1000).toFixed(1)}k`;
    return `R$ ${value.toFixed(0)}`;
}

function createChart(canvasId, type, data) {
    if (charts[canvasId]) charts[canvasId].destroy();
    const ctx = document.getElementById(canvasId).getContext('2d');
    
    let options = { responsive: true, maintainAspectRatio: false, plugins: {} };
    let chartData;

    if (type === 'bubble') {
        chartData = { datasets: data };
        options.scales = { x: { display: false, grid: { display: false } }, y: { display: false, grid: { display: false } } };
        options.plugins.legend = { display: false };
        options.elements = {
            point: {
                // Aplicando a animação CSS individualmente
                animation: {
                    name: 'floatBubble',
                    duration: (ctx) => (Math.random() * 4000) + 4000, // Duração aleatória entre 4-8s
                    easing: 'ease-in-out',
                    loop: true
                }
            }
        };
        options.plugins.datalabels = {
            color: '#fff',
            textAlign: 'center',
            font: { weight: 'bold', family: 'Poppins' },
            formatter: (value, context) => {
                const label = context.dataset.label;
                const formattedValue = formatCurrencyShort(value.comissao);
                return `${label}\n${formattedValue}`;
            }
        };
    } else { // bar
        chartData = {
            labels: data.labels,
            datasets: [{ label: 'Faturamento', data: data.values, backgroundColor: 'var(--primary)' }]
        };
        options.plugins.datalabels = { display: false };
    }
    
    charts[canvasId] = new Chart(ctx, { type, data: chartData, options, plugins: [ChartDataLabels] });
}

function exportToCSV() {
    const filteredData = filterData();
    const dataToExport = filteredData.map(d => ({
        "Vendedor": d.vendedor,
        "Software": d.software,
        "Codigo Bonus": d.codigo_bonus,
        "Valor Final": d.valor_final,
        "Comissao": d.comissao,
        "Forma Pagamento": d.forma_pagamento,
        "Data Pedido": d.data_pedido
    }));

    const csv = Papa.unparse(dataToExport);
    const blob = new Blob([`\uFEFF${csv}`], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "dados_abertos_qgdigital.csv");
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// ============ OUTRAS FUNÇÕES (EXISTENTES) ============
// ... (cole aqui o resto das suas funções originais, como initializeMenuToggle, initializeFAQ, etc.)
// ... (elas não precisam de alteração, apenas precisam estar aqui)

function initializeMenuToggle() {
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  if (menuToggle) {
    menuToggle.addEventListener('click', () => navLinks.classList.toggle('active'));
  }
  document.addEventListener('click', (event) => {
    if (!event.target.closest('.nav') && navLinks.classList.contains('active')) {
      navLinks.classList.remove('active');
    }
  });
}

function initializeFAQ() {
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(question => {
    question.addEventListener('click', function() {
      const faqItem = this.parentElement;
      const isActive = faqItem.classList.contains('active');
      document.querySelectorAll('.faq-item').forEach(item => item.classList.remove('active'));
      if (!isActive) {
        faqItem.classList.add('active');
      }
    });
  });
}

function initializeCounters() {
  const counters = document.querySelectorAll('.numero-counter');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
        }
    });
  }, { threshold: 0.5 });
  counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element) {
  const target = parseInt(element.getAttribute('data-target'));
  const duration = 2000;
  const startTime = Date.now();
  
  function updateCounter() {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const current = Math.floor(progress * target);
    element.textContent = current;
    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    }
  }
  requestAnimationFrame(updateCounter);
}

function initializeBackToTop() {
  const backToTopBtn = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    backToTopBtn.classList.toggle('show', window.pageYOffset > 300);
  });
  backToTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

function initializeForms() {
  const forms = {
    'trabalheForm': 'trabalhe_conosco',
    'afiliadosForm': 'afiliados',
    'newsletterForm': 'newsletter'
  };
  for (const [formId, formType] of Object.entries(forms)) {
    const formElement = document.getElementById(formId);
    if (formElement) {
      formElement.addEventListener('submit', function(e) {
        e.preventDefault();
        handleFormSubmit(this, formType);
      });
    }
  }
}

function handleFormSubmit(form, formType) {
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  data.form_type = formType;
  data.timestamp = new Date().toLocaleString('pt-BR');
  console.log('Form Data to be sent:', data); // Simula envio
  showSuccessMessage(form);
  form.reset();
}

function showSuccessMessage(form) {
  const successMsg = document.createElement('div');
  successMsg.className = 'success-message';
  successMsg.innerHTML = `<div style="background: #4caf50; color: white; padding: 16px; border-radius: 8px; margin-bottom: 16px; animation: slideDown 0.3s ease;"><i class="fas fa-check-circle" style="margin-right: 8px;"></i>Formulário enviado com sucesso!</div>`;
  form.parentElement.insertBefore(successMsg, form);
  setTimeout(() => successMsg.remove(), 5000);
}

function removeLoaderAfterDelay() {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) loader.style.display = 'none';
  }, 1500);
}

function initializeScrollAnimations() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && !href.startsWith('#page-')) {
                e.preventDefault();
                document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.numero-item, .diferencial, .servico-card, .uso-card, .beneficio, .passo, .missao-card, .beneficio-item, .posicao-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

function trackPageView(pageName) {
  console.log('Page viewed:', pageName);
}

function initializeDynamicYear() {
  const year = new Date().getFullYear();
  const footerText = document.querySelector('.footer-bottom p');
  if (footerText) {
    footerText.textContent = `© ${year} QG.Digital - Todos os direitos reservados`;
  }
}

function initializeFormValidation() {
    document.addEventListener('submit', function(e) {
        if (e.target.tagName === 'FORM' && e.target.checkValidity() === false) {
            e.preventDefault();
            alert('Por favor, preencha todos os campos obrigatórios.');
        }
    }, true);
}

console.log('QG.Digital Site - JavaScript initialized successfully');
