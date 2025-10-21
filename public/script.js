// ===================================
// Theme Management
// ===================================
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Load saved theme or default to light
const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

// Theme toggle handler
themeToggle.addEventListener('click', () => {
    const newTheme = html.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('.theme-icon');
    icon.setAttribute('data-lucide', theme === 'light' ? 'moon' : 'sun');
    lucide.createIcons();
}

// ===================================
// Copy Endpoint to Clipboard
// ===================================
async function copyEndpoint(apiName) {
    const endpoint = document.getElementById(`endpoint-${apiName}`).textContent;
    
    try {
        await navigator.clipboard.writeText(endpoint);
        
        // Visual feedback
        const btn = event.target.closest('.btn-copy');
        const icon = btn.querySelector('.copy-icon');
        
        btn.classList.add('copied');
        icon.setAttribute('data-lucide', 'check');
        lucide.createIcons();
        
        setTimeout(() => {
            btn.classList.remove('copied');
            icon.setAttribute('data-lucide', 'copy');
            lucide.createIcons();
        }, 2000);
        
    } catch (err) {
        console.error('Failed to copy:', err);
        alert('Failed to copy to clipboard');
    }
}

// ===================================
// Test API Function
// ===================================
async function testAPI(endpoint, cardId) {
    const resultContainer = document.getElementById(`result-${cardId}`);
    
    // Show loading state
    resultContainer.classList.add('show');
    resultContainer.innerHTML = `
        <div class="loading">
            <div class="loading-spinner"></div>
            <div>Testing API...</div>
        </div>
    `;
    
    const startTime = performance.now();
    
    try {
        const response = await fetch(endpoint);
        const endTime = performance.now();
        const responseTime = (endTime - startTime).toFixed(2);
        
        // Parse response
        const contentType = response.headers.get('content-type');
        let data;
        
        if (contentType && contentType.includes('application/json')) {
            data = await response.json();
        } else {
            data = await response.text();
        }
        
        // Build result HTML
        displayResult(resultContainer, {
            success: response.ok,
            status: response.status,
            statusText: response.statusText,
            responseTime: responseTime,
            contentType: contentType || 'N/A',
            data: data,
            endpoint: endpoint
        });
        
    } catch (error) {
        // Display error
        displayError(resultContainer, {
            error: error.message,
            endpoint: endpoint
        });
    }
}

// ===================================
// Display Success Result
// ===================================
function displayResult(container, result) {
    const statusClass = result.success ? 'status-success' : 'status-error';
    const statusIcon = result.success ? 'check-circle' : 'x-circle';
    
    container.innerHTML = `
        <div class="result-header">
            <h4 class="result-title">Response</h4>
            <div style="display: flex; gap: 0.75rem; align-items: center; flex-wrap: wrap;">
                <div class="status-badge ${statusClass}">
                    <i data-lucide="${statusIcon}" style="width: 16px; height: 16px;"></i>
                    <span>${result.status} ${result.statusText}</span>
                </div>
                <button class="btn-close" onclick="closeResult('${container.id}')">
                    <i data-lucide="x" style="width: 16px; height: 16px;"></i>
                </button>
            </div>
        </div>
        
        <div class="response-info">
            <div class="info-item">
                <div class="info-label">Status</div>
                <div class="info-value">${result.status}</div>
            </div>
            <div class="info-item">
                <div class="info-label">Time</div>
                <div class="info-value">${result.responseTime}ms</div>
            </div>
            <div class="info-item">
                <div class="info-label">Content-Type</div>
                <div class="info-value">${formatContentType(result.contentType)}</div>
            </div>
        </div>
        
        <div class="json-output">${formatJSON(result.data)}</div>
    `;
    
    lucide.createIcons();
}

// ===================================
// Display Error Result
// ===================================
function displayError(container, error) {
    container.innerHTML = `
        <div class="result-header">
            <h4 class="result-title">Response</h4>
            <div style="display: flex; gap: 0.75rem; align-items: center;">
                <div class="status-badge status-error">
                    <i data-lucide="alert-circle" style="width: 16px; height: 16px;"></i>
                    <span>ERROR</span>
                </div>
                <button class="btn-close" onclick="closeResult('${container.id}')">
                    <i data-lucide="x" style="width: 16px; height: 16px;"></i>
                </button>
            </div>
        </div>
        
        <div class="response-info">
            <div class="info-item">
                <div class="info-label">Error</div>
                <div class="info-value">${error.error}</div>
            </div>
        </div>
        
        <div class="json-output" style="color: var(--error);">
Failed to fetch API
Error: ${error.error}

Possible causes:
- Network connection issue
- CORS policy restriction
- Invalid endpoint
- Server not responding
        </div>
    `;
    
    lucide.createIcons();
}

// ===================================
// Close Result
// ===================================
function closeResult(containerId) {
    const container = document.getElementById(containerId);
    container.classList.remove('show');
}

// ===================================
// Helper Functions
// ===================================
function formatJSON(data) {
    if (typeof data === 'string') {
        return escapeHtml(data);
    }
    return escapeHtml(JSON.stringify(data, null, 2));
}

function formatContentType(contentType) {
    if (!contentType || contentType === 'N/A') return 'N/A';
    
    // Shorten common content types
    if (contentType.includes('application/json')) return 'JSON';
    if (contentType.includes('text/html')) return 'HTML';
    if (contentType.includes('text/plain')) return 'Text';
    
    return contentType.split(';')[0];
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ===================================
// Initialize
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    console.log('🚀 STEPH TECH API initialized');
    console.log('Theme:', currentTheme);
});