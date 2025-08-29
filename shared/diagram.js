/* Kubernetes Project Documentation Shared JavaScript */

// Mermaid initialization
mermaid.initialize({
    startOnLoad: false,
    theme: 'default',
    securityLevel: 'loose',
    flowchart: {
        nodeSpacing: 50,
        rankSpacing: 80
    },
    panZoom: true
});

// Diagram management for single and multi-diagram projects
let currentZoom = 1;
let currentDiagram = 'kubernetes'; // Default diagram type

// Initialize diagram(s) on page load
function initializeDiagrams() {
    // Check if this is a multi-diagram project (has terraformDiagramCode)
    if (typeof terraformDiagramCode !== 'undefined') {
        showDiagram('kubernetes'); // Start with kubernetes diagram
    } else {
        // Single diagram project
        loadSingleDiagram();
    }
}

// Load single diagram
function loadSingleDiagram() {
    if (typeof diagramCode !== 'undefined') {
        document.getElementById('mermaid-diagram').innerHTML = 
            '<div class="mermaid" id="mermaid-content">' + diagramCode + '</div>';
        mermaid.init();
        setTimeout(resetZoom, 100);
    } else {
        console.error('Diagram code not found');
    }
}

// Show specific diagram (for multi-diagram projects)
function showDiagram(diagramType) {
    currentDiagram = diagramType;
    
    // Update active tab
    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(btn => btn.classList.remove('active'));
    const activeTab = document.getElementById(diagramType === 'kubernetes' ? 'k8s-tab' : 'tf-tab');
    if (activeTab) {
        activeTab.classList.add('active');
    }
    
    // Load appropriate diagram
    const diagram = diagramType === 'kubernetes' ? diagramCode : terraformDiagramCode;
    if (diagram) {
        document.getElementById('mermaid-diagram').innerHTML = 
            '<div class="mermaid" id="mermaid-content">' + diagram + '</div>';
        mermaid.init();
        setTimeout(resetZoom, 100);
    }
}

// Zoom functionality
function zoomIn() {
    currentZoom += 0.2;
    updateZoom();
}

function zoomOut() {
    currentZoom = Math.max(0.2, currentZoom - 0.2);
    updateZoom();
}

function resetZoom() {
    currentZoom = 1;
    updateZoom();
}

function fitToScreen() {
    const container = document.getElementById('mermaid-diagram');
    const content = document.getElementById('mermaid-content');
    if (container && content) {
        const containerRect = container.getBoundingClientRect();
        const contentRect = content.getBoundingClientRect();
        const scaleX = (containerRect.width - 40) / contentRect.width;
        const scaleY = (containerRect.height - 40) / contentRect.height;
        currentZoom = Math.min(scaleX, scaleY, 1);
        updateZoom();
    }
}

function updateZoom() {
    const diagramContent = document.getElementById('mermaid-content');
    if (diagramContent) {
        diagramContent.style.transform = `scale(${currentZoom})`;
        diagramContent.style.transformOrigin = 'top left';
    }
}

// Pan functionality with mouse
let isPanning = false;
let startX, startY, scrollLeft, scrollTop;

function initializePanning() {
    const diagramContainer = document.getElementById('mermaid-diagram');
    if (!diagramContainer) return;
    
    diagramContainer.addEventListener('mousedown', (e) => {
        if (e.target.closest('.mermaid')) {
            isPanning = true;
            startX = e.pageX - diagramContainer.offsetLeft;
            startY = e.pageY - diagramContainer.offsetTop;
            scrollLeft = diagramContainer.scrollLeft;
            scrollTop = diagramContainer.scrollTop;
        }
    });
    
    document.addEventListener('mouseup', () => {
        isPanning = false;
    });
    
    diagramContainer.addEventListener('mousemove', (e) => {
        if (!isPanning) return;
        e.preventDefault();
        const x = e.pageX - diagramContainer.offsetLeft;
        const y = e.pageY - diagramContainer.offsetTop;
        const walkX = (x - startX) * 2;
        const walkY = (y - startY) * 2;
        diagramContainer.scrollLeft = scrollLeft - walkX;
        diagramContainer.scrollTop = scrollTop - walkY;
    });
    
    // Wheel zoom
    diagramContainer.addEventListener('wheel', (e) => {
        e.preventDefault();
        if (e.deltaY < 0) {
            zoomIn();
        } else {
            zoomOut();
        }
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeDiagrams();
    initializePanning();
});

// Auto-fit on window events
window.addEventListener('load', () => {
    setTimeout(resetZoom, 100);
});

window.addEventListener('resize', () => {
    setTimeout(resetZoom, 100);
});