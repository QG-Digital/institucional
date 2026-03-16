    // ====== CHART: Redução de Tempo ======
    const ctxReducao = document.getElementById('chartReducao').getContext('2d');
    new Chart(ctxReducao, {
      type: 'bar',
      data: {
        labels: ['QG.Cotações', 'Atendimento\nCliente', 'Relatórios\nVendas', 'Marketing\nRedes', 'Prospecção\nLeads', 'Emissão\nOrçamentos', 'Gerador\nEAN'],
        datasets: [{
          label: 'Redução de tempo (%)',
          data: [95, 80, 90, 85, 70, 70, 92],
          backgroundColor: [
            'rgba(37,211,102,0.8)',
            'rgba(250,135,0,0.8)',
            'rgba(59,130,246,0.8)',
            'rgba(139,92,246,0.8)',
            'rgba(0,150,136,0.8)',
            'rgba(250,135,0,0.6)',
            'rgba(220,50,50,0.8)',
          ],
          borderRadius: 8,
          borderSkipped: false,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) => ` Redução de ${ctx.raw}% no tempo`
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            ticks: {
              callback: v => v + '%',
              font: { size: 11 }
            },
            grid: { color: 'rgba(0,0,0,0.05)' }
          },
          x: {
            ticks: { font: { size: 10 } },
            grid: { display: false }
          }
        }
      }
    });

    // ====== CHART: Distribuição Serviços ======
    const ctxDist = document.getElementById('chartDistribuicao').getContext('2d');
    new Chart(ctxDist, {
      type: 'doughnut',
      data: {
        labels: ['WhatsApp', 'Scripts & Automações', 'Dados & Ferramentas', 'Consultoria', 'Web & Redes Sociais'],
        datasets: [{
          data: [2, 3, 2, 1, 2],
          backgroundColor: [
            'rgba(37,211,102,0.85)',
            'rgba(250,135,0,0.85)',
            'rgba(139,92,246,0.85)',
            'rgba(13,27,62,0.85)',
            'rgba(59,130,246,0.85)',
          ],
          borderWidth: 3,
          borderColor: '#fff',
          hoverOffset: 8,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '65%',
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              font: { size: 11 },
              padding: 14,
              usePointStyle: true,
              pointStyleWidth: 8,
            }
          },
          tooltip: {
            callbacks: {
              label: (ctx) => ` ${ctx.label}: ${ctx.raw} serviço${ctx.raw > 1 ? 's' : ''}`
            }
          }
        }
      }
    });

    // ====== CHART: QG.Cotações Tempo ======
    const ctxCot = document.getElementById('chartCotacoes').getContext('2d');
    new Chart(ctxCot, {
      type: 'bar',
      data: {
        labels: ['Solicitação', 'Processamento', 'Disparo', 'Resposta Transp.', 'Consolidação', 'Entrega'],
        datasets: [{
          label: 'Minutos',
          data: [0.5, 0.2, 0.3, 12, 0.5, 0.3],
          backgroundColor: [
            'rgba(37,211,102,0.7)',
            'rgba(250,135,0,0.7)',
            'rgba(250,135,0,0.7)',
            'rgba(59,130,246,0.7)',
            'rgba(250,135,0,0.7)',
            'rgba(37,211,102,0.7)',
          ],
          borderRadius: 6,
          borderSkipped: false,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) => ` ${ctx.raw} min`
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: { callback: v => v + 'min', font: { size: 10 } },
            grid: { color: 'rgba(0,0,0,0.05)' }
          },
          x: {
            ticks: { font: { size: 9 } },
            grid: { display: false }
          }
        }
      }
    });

    // ====== CHART: Canais ======
    const ctxCanais = document.getElementById('chartCanais').getContext('2d');
    new Chart(ctxCanais, {
      type: 'pie',
      data: {
        labels: ['WhatsApp', 'Web / Landing Page', 'Instagram', 'Facebook', 'Presencial'],
        datasets: [{
          data: [55, 20, 10, 8, 7],
          backgroundColor: [
            'rgba(37,211,102,0.85)',
            'rgba(59,130,246,0.85)',
            'rgba(200,50,200,0.85)',
            'rgba(13,27,62,0.85)',
            'rgba(250,135,0,0.85)',
          ],
          borderWidth: 3,
          borderColor: '#fff',
          hoverOffset: 6,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: { font: { size: 10 }, padding: 10, usePointStyle: true }
          },
          tooltip: {
            callbacks: {
              label: (ctx) => ` ${ctx.label}: ${ctx.raw}%`
            }
          }
        }
      }
    });

    // ====== CHART: Setores ======
    const ctxSetores = document.getElementById('chartSetores').getContext('2d');
    new Chart(ctxSetores, {
      type: 'radar',
      data: {
        labels: ['Vendas', 'Logística', 'Marketing', 'Financeiro', 'Atendimento', 'Compras'],
        datasets: [{
          label: 'Potencial de automação',
          data: [90, 95, 85, 75, 88, 80],
          backgroundColor: 'rgba(250,135,0,0.15)',
          borderColor: 'rgba(250,135,0,0.8)',
          borderWidth: 2,
          pointBackgroundColor: 'rgba(250,135,0,0.8)',
          pointRadius: 4,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) => ` Potencial: ${ctx.raw}%`
            }
          }
        },
        scales: {
          r: {
            beginAtZero: true,
            max: 100,
            ticks: { display: false },
            grid: { color: 'rgba(0,0,0,0.08)' },
            pointLabels: { font: { size: 10 } }
          }
        }
      }
    });

    // ====== TABLE FILTER ======
    function filterTable(category, btn) {
      // Update active tab
      document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
      btn.classList.add('active');

      // Filter rows
      const rows = document.querySelectorAll('#servicesTable tbody tr');
      rows.forEach(row => {
        if (category === 'todos' || row.dataset.category === category) {
          row.style.display = '';
        } else {
          row.style.display = 'none';
        }
      });
    }

    // ====== ANIMATE PROGRESS BARS ======
    function animateProgressBars() {
      document.querySelectorAll('.progress-fill').forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0%';
        setTimeout(() => {
          bar.style.width = width;
        }, 300);
      });
    }

    // Run on load
    window.addEventListener('load', () => {
      setTimeout(animateProgressBars, 500);
    });
