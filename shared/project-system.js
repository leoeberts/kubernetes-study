class ProjectSystem {
  constructor() {
    this.allModules = {};
    this.moduleOrder = [];
    this.basePath = window.location.pathname.includes('/shared/') ? '../' : '';
  }

  async discoverModules() {
    if (this.moduleOrder.length > 0) return this.moduleOrder;
    
    const patterns = [
      'basic-pod', 'nginx-pod', 'replication-controller', 'replica-set', 'deployment', 
      'update-rollback', 'service-nodeport', 'web-api-services', 'voting-app', 
      'voting-app-deployment', 'eks', 'service', 'configmap', 'secret', 'ingress'
    ];
    
    const foundModules = [];
    for (let i = 1; i <= 20; i++) {
      const num = i.toString().padStart(2, '0');
      for (const pattern of patterns) {
        try {
          await this.loadModule(`${num}-${pattern}`);
          foundModules.push(`${num}-${pattern}`);
          break;
        } catch {}
      }
    }
    
    this.moduleOrder = foundModules;
    return foundModules;
  }

  async loadModule(moduleId) {
    if (this.allModules[moduleId]) return;
    
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = `${this.basePath}${moduleId}/module-data.js`;
      script.onload = () => {
        if (window.moduleData) {
          this.allModules[moduleId] = window.moduleData;
          delete window.moduleData;
          resolve();
        } else {
          reject(new Error('Module data not found'));
        }
      };
      script.onerror = () => reject(new Error(`Failed to load ${moduleId}`));
      document.head.appendChild(script);
    });
  }

  async loadAllModules() {
    await this.discoverModules();
  }

  generateIndexCards() {
    const container = document.querySelector('.projects-grid');
    if (!container) return;

    container.innerHTML = this.moduleOrder.map(moduleId => {
      const data = this.allModules[moduleId];
      if (!data) return '';
      
      return `
        <div class="project-card ${data.complexity}">
          <div class="project-number">${data.projectNumber}</div>
          <div class="project-title">${data.title}</div>
          <div class="complexity ${data.complexity}">${data.complexity.charAt(0).toUpperCase() + data.complexity.slice(1)}</div>
          <div class="project-description">${data.description}</div>
          <div class="actions">
            <a href="shared/project.html?module=${moduleId}" class="btn btn-primary">View Diagram</a>
            <a href="${moduleId}/" class="btn btn-secondary">Files</a>
          </div>
        </div>
      `;
    }).join('');
  }

  async loadProjectPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const moduleId = urlParams.get('module');
    
    if (!moduleId) {
      document.body.innerHTML = '<h1>Error: No module specified</h1>';
      return;
    }

    try {
      await this.discoverModules();
      const data = this.allModules[moduleId];
      
      if (!data) {
        document.body.innerHTML = '<h1>Error: Module not found</h1>';
        return;
      }

      document.title = data.pageTitle;
      
      const container = document.querySelector('.container');
      if (container) {
        container.className = `container difficulty-${data.complexity}`;
      }
      
      document.getElementById('project-title').innerHTML = `${data.headerIcon} ${data.headerTitle}`;
      document.getElementById('complexity-badge').textContent = data.complexity.charAt(0).toUpperCase() + data.complexity.slice(1);
      document.getElementById('project-description').textContent = data.headerDesc;
      
      this.setupNavigation(data);
      this.setupDiagrams(data);
      this.generateInfoCards(data);
      
    } catch (error) {
      document.body.innerHTML = `<h1>Error loading module: ${error.message}</h1>`;
    }
  }

  setupNavigation(data) {
    const currentIndex = this.moduleOrder.indexOf(data.id);
    const prevModule = this.moduleOrder[currentIndex - 1];
    const nextModule = this.moduleOrder[currentIndex + 1];
    
    const navLeft = document.getElementById('nav-left');
    const navRight = document.getElementById('nav-right');
    
    navLeft.innerHTML = prevModule ? 
      `<a href="project.html?module=${prevModule}" class="nav-btn">← Project ${prevModule.split('-')[0]}</a>` : '';
    
    navRight.innerHTML = nextModule ? 
      `<a href="project.html?module=${nextModule}" class="nav-btn">Project ${nextModule.split('-')[0]} →</a>` : '';
  }

  setupDiagrams(data) {
    if (data.multiDiagram) {
      document.getElementById('diagram-title').textContent = 'Architecture Diagrams';
      
      const tabsContainer = document.getElementById('diagram-tabs');
      tabsContainer.style.display = 'flex';
      tabsContainer.innerHTML = `
        <button class="tab-btn active" onclick="projectSystem.showDiagram('kubernetes')" id="k8s-tab">Kubernetes Application</button>
        <button class="tab-btn" onclick="projectSystem.showDiagram('terraform')" id="tf-tab">Terraform Infrastructure</button>
      `;
      
      const terraformScript = document.createElement('script');
      terraformScript.src = `${this.basePath}${data.id}/terraform-diagram.js`;
      document.head.appendChild(terraformScript);
    }

    const diagramScript = document.createElement('script');
    diagramScript.src = `${this.basePath}${data.id}/diagram.js`;
    diagramScript.onload = () => {
      this.initializeDiagram();
    };
    document.head.appendChild(diagramScript);
  }

  initializeDiagram() {
    mermaid.initialize({
      startOnLoad: false,
      theme: 'default',
      securityLevel: 'loose',
      flowchart: { nodeSpacing: 50, rankSpacing: 80 },
      panZoom: true
    });

    if (typeof diagramCode !== 'undefined') {
      document.getElementById('mermaid-diagram').innerHTML = `<div class="mermaid" id="mermaid-content">${diagramCode}</div>`;
      mermaid.init();
      setTimeout(() => this.resetZoom(), 100);
    }
  }

  showDiagram(type) {
    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(btn => btn.classList.remove('active'));
    document.getElementById(type === 'kubernetes' ? 'k8s-tab' : 'tf-tab').classList.add('active');
    
    const diagram = type === 'kubernetes' ? window.diagramCode : window.terraformDiagramCode;
    if (diagram) {
      document.getElementById('mermaid-diagram').innerHTML = `<div class="mermaid" id="mermaid-content">${diagram}</div>`;
      mermaid.init();
      setTimeout(() => this.resetZoom(), 100);
    }
  }

  generateInfoCards(data) {
    const infoPanel = document.getElementById('info-panel');
    infoPanel.innerHTML = data.infoCards.map(card => {
      let content = `<h3>${card.title}</h3>`;
      
      if (card.components) {
        content += card.components.map(comp => 
          `<div class="component"><strong>${comp.label}:</strong> ${comp.desc}</div>`
        ).join('');
      }
      
      if (card.features) {
        content += card.features.map(feature => 
          `<div class="cloud-feature">${feature}</div>`
        ).join('');
      }
      
      if (card.technologies) {
        content += '<div class="tech-stack">' + 
          card.technologies.map(tech => `<span class="tech">${tech}</span>`).join('') +
          '</div>';
      }
      
      if (card.code) {
        content += `<pre style="background: #2d3748; color: #e2e8f0; padding: 10px; border-radius: 5px; font-size: 0.8em;">${card.code}</pre>`;
      }
      
      return `<div class="info-card">${content}</div>`;
    }).join('');
  }

  zoomIn() { this.currentZoom += 0.2; this.updateZoom(); }
  zoomOut() { this.currentZoom = Math.max(0.2, this.currentZoom - 0.2); this.updateZoom(); }
  resetZoom() { this.currentZoom = 1; this.updateZoom(); }
  
  updateZoom() {
    const content = document.getElementById('mermaid-content');
    if (content) {
      content.style.transform = `scale(${this.currentZoom})`;
      content.style.transformOrigin = 'top left';
    }
  }

  fitToScreen() {
    const container = document.getElementById('mermaid-diagram');
    const content = document.getElementById('mermaid-content');
    if (container && content) {
      const containerRect = container.getBoundingClientRect();
      const contentRect = content.getBoundingClientRect();
      const scaleX = (containerRect.width - 40) / contentRect.width;
      const scaleY = (containerRect.height - 40) / contentRect.height;
      this.currentZoom = Math.min(scaleX, scaleY, 1);
      this.updateZoom();
    }
  }
}

const projectSystem = new ProjectSystem();
projectSystem.currentZoom = 1;

function zoomIn() { projectSystem.zoomIn(); }
function zoomOut() { projectSystem.zoomOut(); }
function resetZoom() { projectSystem.resetZoom(); }
function fitToScreen() { projectSystem.fitToScreen(); }

if (window.location.pathname.includes('index.html') || window.location.pathname.endsWith('/')) {
  document.addEventListener('DOMContentLoaded', async () => {
    await projectSystem.loadAllModules();
    projectSystem.generateIndexCards();
  });
} else if (window.location.pathname.includes('project.html')) {
  document.addEventListener('DOMContentLoaded', () => {
    projectSystem.loadProjectPage();
  });
}