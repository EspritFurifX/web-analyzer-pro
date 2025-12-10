/**
 * Analyseur Web Complet - Injection Console
 * Analyse la structure, framework, technologies, SEO et responsive d'un site
 * 
 * UTILISATION:
 * 1. Copiez tout ce fichier
 * 2. Collez dans la console du site à analyser
 * 3. Cliquez sur le bouton "Analyser" qui apparaît
 */

// Créer l'interface utilisateur
(function() {
    // Supprimer l'ancienne interface si elle existe
    const oldUI = document.getElementById('web-analyzer-ui');
    if (oldUI) oldUI.remove();

    // Créer le conteneur principal
    const ui = document.createElement('div');
    ui.id = 'web-analyzer-ui';
    ui.innerHTML = `
        <style>
            #web-analyzer-ui {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                z-index: 999999;
                background: linear-gradient(145deg, #1a1a2e, #16213e);
                border-radius: 24px;
                box-shadow: 0 30px 90px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.1);
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                width: 95%;
                max-width: 1200px;
                max-height: 95vh;
                overflow: hidden;
                display: flex;
                flex-direction: column;
                backdrop-filter: blur(20px);
            }
            
            #analyzer-header {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
                padding: 25px 30px;
                color: white;
                display: flex;
                justify-content: space-between;
                align-items: center;
                position: relative;
                overflow: hidden;
            }
            
            #analyzer-header::before {
                content: '';
                position: absolute;
                top: -50%;
                left: -50%;
                width: 200%;
                height: 200%;
                background: linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent);
                animation: shine 3s infinite;
            }
            
            @keyframes shine {
                0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
                100% { transform: translateX(100%) translateY(100%) rotate(45deg); }
            }
            
            #analyzer-header h2 {
                margin: 0;
                font-size: 28px;
                display: flex;
                align-items: center;
                gap: 12px;
                position: relative;
                z-index: 1;
                text-shadow: 0 2px 10px rgba(0,0,0,0.3);
            }
            
            #close-btn {
                background: rgba(255,255,255,0.2);
                color: white;
                border: none;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                font-size: 22px;
                cursor: pointer;
                transition: all 0.3s;
                display: flex;
                align-items: center;
                justify-content: center;
                position: relative;
                z-index: 2;
            }
            
            #close-btn:hover {
                background: rgba(255,255,255,0.3);
                transform: rotate(90deg) scale(1.1);
                box-shadow: 0 0 20px rgba(255,255,255,0.3);
            }
            
            .animated-bg {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(135deg, #667eea, #764ba2, #f093fb);
                opacity: 0.05;
                z-index: -1;
                animation: gradient 15s ease infinite;
                background-size: 400% 400%;
            }
            
            @keyframes gradient {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
            }
            
            #analyzer-tabs {
                display: flex;
                background: rgba(255,255,255,0.05);
                border-bottom: 1px solid rgba(255,255,255,0.1);
                overflow-x: auto;
                backdrop-filter: blur(10px);
                gap: 5px;
                padding: 10px;
            }
            
            .analyzer-tab {
                padding: 12px 24px;
                border: none;
                background: rgba(255,255,255,0.05);
                color: rgba(255,255,255,0.7);
                font-size: 14px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                border-radius: 12px;
                white-space: nowrap;
                position: relative;
                overflow: hidden;
            }
            
            .analyzer-tab::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(135deg, #667eea, #764ba2);
                opacity: 0;
                transition: opacity 0.3s;
            }
            
            .analyzer-tab:hover {
                background: rgba(102, 126, 234, 0.2);
                color: white;
                transform: translateY(-2px);
            }
            
            .analyzer-tab.active {
                color: white;
                background: linear-gradient(135deg, #667eea, #764ba2);
                box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
            }
            
            .analyzer-tab span {
                position: relative;
                z-index: 1;
            }
            
            #analyzer-content {
                flex: 1;
                overflow-y: auto;
                padding: 25px;
                background: linear-gradient(180deg, rgba(22,33,62,0.95), rgba(26,26,46,0.95));
            }
            
            #analyzer-content::-webkit-scrollbar {
                width: 8px;
            }
            
            #analyzer-content::-webkit-scrollbar-track {
                background: rgba(255,255,255,0.05);
            }
            
            #analyzer-content::-webkit-scrollbar-thumb {
                background: linear-gradient(135deg, #667eea, #764ba2);
                border-radius: 4px;
            }
            
            .tab-panel {
                display: none;
            }
            
            .tab-panel.active {
                display: block;
                animation: fadeIn 0.3s;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(10px); }
                to { opacity: 1; transform: translateY(0); }
            }
            
            #analyze-btn {
                width: 100%;
                padding: 18px;
                border: none;
                border-radius: 15px;
                font-size: 18px;
                font-weight: 800;
                cursor: pointer;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
                color: white;
                transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                margin-bottom: 20px;
                position: relative;
                overflow: hidden;
                box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
                text-transform: uppercase;
                letter-spacing: 1px;
            }
            
            #analyze-btn::before {
                content: '';
                position: absolute;
                top: 50%;
                left: 50%;
                width: 0;
                height: 0;
                border-radius: 50%;
                background: rgba(255,255,255,0.3);
                transform: translate(-50%, -50%);
                transition: width 0.6s, height 0.6s;
            }
            
            #analyze-btn:hover:not(:disabled) {
                transform: translateY(-4px) scale(1.02);
                box-shadow: 0 15px 40px rgba(102, 126, 234, 0.6);
            }
            
            #analyze-btn:hover:not(:disabled)::before {
                width: 400px;
                height: 400px;
            }
            
            #analyze-btn:disabled {
                opacity: 0.7;
                cursor: not-allowed;
                animation: analyzing 1.5s ease-in-out infinite;
            }
            
            @keyframes analyzing {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(0.98); }
            }
            
            .stat-card {
                background: rgba(255,255,255,0.05);
                border: 1px solid rgba(255,255,255,0.1);
                border-radius: 16px;
                padding: 24px;
                margin-bottom: 20px;
                backdrop-filter: blur(10px);
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                position: relative;
                overflow: hidden;
            }
            
            .stat-card::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 4px;
                background: linear-gradient(90deg, #667eea, #764ba2, #f093fb);
                opacity: 0;
                transition: opacity 0.3s;
            }
            
            .stat-card:hover {
                transform: translateY(-4px);
                box-shadow: 0 12px 40px rgba(102, 126, 234, 0.2);
                border-color: rgba(102, 126, 234, 0.3);
            }
            
            .stat-card:hover::before {
                opacity: 1;
            }
            
            .stat-card h3 {
                margin: 0 0 18px 0;
                color: white;
                font-size: 20px;
                display: flex;
                align-items: center;
                gap: 10px;
                font-weight: 700;
            }
            
            .stat-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                gap: 15px;
                margin-bottom: 15px;
            }
            
            .stat-item {
                background: rgba(255,255,255,0.08);
                padding: 20px;
                border-radius: 12px;
                box-shadow: 0 4px 15px rgba(0,0,0,0.2);
                border: 1px solid rgba(255,255,255,0.1);
                transition: all 0.3s;
            }
            
            .stat-item:hover {
                transform: scale(1.05);
                box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
            }
            
            .stat-item-label {
                font-size: 13px;
                color: rgba(255,255,255,0.6);
                margin-bottom: 8px;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                font-weight: 600;
            }
            
            .stat-item-value {
                font-size: 32px;
                font-weight: 900;
                background: linear-gradient(135deg, #667eea, #764ba2, #f093fb);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
            }
            
            .score-circle {
                width: 150px;
                height: 150px;
                border-radius: 50%;
                background: conic-gradient(
                    from 0deg,
                    #667eea 0deg, 
                    #764ba2 calc(var(--percentage) / 2), 
                    #f093fb var(--percentage), 
                    rgba(255,255,255,0.1) var(--percentage)
                );
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 30px auto;
                position: relative;
                box-shadow: 0 10px 40px rgba(102, 126, 234, 0.4);
                animation: pulse 2s ease-in-out infinite;
            }
            
            @keyframes pulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.05); }
            }
            
            .score-circle::before {
                content: '';
                width: 115px;
                height: 115px;
                background: linear-gradient(145deg, rgba(26,26,46,0.95), rgba(22,33,62,0.95));
                border-radius: 50%;
                position: absolute;
                box-shadow: inset 0 4px 15px rgba(0,0,0,0.3);
            }
            
            .score-circle-text {
                position: relative;
                z-index: 1;
                font-size: 42px;
                font-weight: 900;
                background: linear-gradient(135deg, #667eea, #f093fb);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                text-shadow: 0 0 20px rgba(102, 126, 234, 0.5);
            }
            
            .tech-badge {
                display: inline-block;
                padding: 10px 18px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
                color: white;
                border-radius: 25px;
                margin: 6px;
                font-size: 13px;
                font-weight: 700;
                box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
                border: 1px solid rgba(255,255,255,0.2);
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                position: relative;
                overflow: hidden;
            }
            
            .tech-badge::before {
                content: '';
                position: absolute;
                top: 50%;
                left: 50%;
                width: 0;
                height: 0;
                border-radius: 50%;
                background: rgba(255,255,255,0.3);
                transform: translate(-50%, -50%);
                transition: width 0.6s, height 0.6s;
            }
            
            .tech-badge:hover {
                transform: translateY(-3px) scale(1.05);
                box-shadow: 0 8px 25px rgba(102, 126, 234, 0.6);
            }
            
            .tech-badge:hover::before {
                width: 300px;
                height: 300px;
            }
            
            .detail-row {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 14px 16px;
                background: rgba(255,255,255,0.03);
                border-radius: 10px;
                margin-bottom: 10px;
                border: 1px solid rgba(255,255,255,0.05);
                transition: all 0.3s;
            }
            
            .detail-row:hover {
                background: rgba(102, 126, 234, 0.1);
                border-color: rgba(102, 126, 234, 0.3);
                transform: translateX(5px);
            }
            
            .detail-label {
                font-weight: 600;
                color: rgba(255,255,255,0.9);
            }
            
            .detail-value {
                color: rgba(255,255,255,0.7);
                font-weight: 500;
            }
            
            .recommendation-item {
                padding: 15px;
                background: #fff3cd;
                border-left: 4px solid #ffc107;
                border-radius: 8px;
                margin-bottom: 10px;
            }
            
            .recommendation-item.success {
                background: #d4edda;
                border-left-color: #28a745;
            }
            
            .spinner {
                display: inline-block;
                width: 20px;
                height: 20px;
                border: 3px solid rgba(255,255,255,0.3);
                border-top-color: white;
                border-radius: 50%;
                animation: spin 1s linear infinite;
            }
            
            @keyframes spin {
                to { transform: rotate(360deg); }
            }
            
            .progress-bar {
                width: 100%;
                height: 14px;
                background: rgba(255,255,255,0.1);
                border-radius: 20px;
                overflow: hidden;
                margin-top: 12px;
                position: relative;
                box-shadow: inset 0 2px 8px rgba(0,0,0,0.3);
            }
            
            .progress-fill {
                height: 100%;
                background: linear-gradient(90deg, #667eea, #764ba2, #f093fb);
                transition: width 1s cubic-bezier(0.4, 0, 0.2, 1);
                position: relative;
                border-radius: 20px;
                box-shadow: 0 0 15px rgba(102, 126, 234, 0.6);
            }
            
            .progress-fill::after {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
                animation: shimmer 2s infinite;
            }
            
            @keyframes shimmer {
                0% { transform: translateX(-100%); }
                100% { transform: translateX(100%); }
            }
        </style>
        
        <div id="analyzer-header">
            <h2>🔍 Analyseur Web Pro</h2>
            <button id="close-btn">✕</button>
        </div>
        
        <div id="analyzer-tabs">
            <button class="analyzer-tab active" data-tab="home"><span>🏠 Accueil</span></button>
            <button class="analyzer-tab" data-tab="structure"><span>📊 Structure</span></button>
            <button class="analyzer-tab" data-tab="tech"><span>💻 Technologies</span></button>
            <button class="analyzer-tab" data-tab="seo"><span>🎯 SEO</span></button>
            <button class="analyzer-tab" data-tab="responsive"><span>📱 Responsive</span></button>
            <button class="analyzer-tab" data-tab="security"><span>🔒 Sécurité</span></button>
            <button class="analyzer-tab" data-tab="performance"><span>⚡ Performance</span></button>
            <button class="analyzer-tab" data-tab="intelligence"><span>🕵️ Intelligence</span></button>
            <button class="analyzer-tab" data-tab="vulnerabilities"><span>⚠️ Vulnérabilités</span></button>
            <button class="analyzer-tab" data-tab="recommendations"><span>💡 Recommandations</span></button>
        </div>
        
        <div id="analyzer-content">
            <div class="tab-panel active" id="panel-home">
                <button id="analyze-btn">▶️ Analyser ce site</button>
                <div id="home-content">
                    <div style="text-align: center; padding: 40px; color: #999;">
                        <div style="font-size: 64px; margin-bottom: 20px;">🔍</div>
                        <h3>Prêt à analyser</h3>
                        <p>Cliquez sur le bouton ci-dessus pour lancer l'analyse complète du site</p>
                    </div>
                </div>
            </div>
            
            <div class="tab-panel" id="panel-structure"></div>
            <div class="tab-panel" id="panel-tech"></div>
            <div class="tab-panel" id="panel-seo"></div>
            <div class="tab-panel" id="panel-responsive"></div>
            <div class="tab-panel" id="panel-security"></div>
            <div class="tab-panel" id="panel-performance"></div>
            <div class="tab-panel" id="panel-intelligence"></div>
            <div class="tab-panel" id="panel-vulnerabilities"></div>
            <div class="tab-panel" id="panel-recommendations"></div>
        </div>
    `;
    
    document.body.appendChild(ui);

    // Gestionnaire de fermeture
    document.getElementById('close-btn').addEventListener('click', () => {
        ui.remove();
    });

    // Gestionnaire des onglets
    document.querySelectorAll('.analyzer-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            // Retirer active de tous les onglets
            document.querySelectorAll('.analyzer-tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
            
            // Activer l'onglet cliqué
            tab.classList.add('active');
            const panelId = 'panel-' + tab.dataset.tab;
            document.getElementById(panelId).classList.add('active');
        });
    });

    console.log('%c🔍 Analyseur Web Pro chargé avec succès!', 'color: #667eea; font-size: 16px; font-weight: bold;');
    console.log('%cCliquez sur "Analyser ce site" ou tapez: startAnalysis()', 'color: #666; font-size: 14px;');
})();

class WebsiteAnalyzer {
    constructor(url) {
        this.url = url;
        this.results = {
            url: url,
            timestamp: new Date().toISOString(),
            structure: {},
            technologies: {},
            frameworks: [],
            seo: {
                score: 0,
                details: {}
            },
            responsive: {
                score: 0,
                details: {}
            },
            performance: {}
        };
    }

    async analyze() {
        console.log(`🔍 Analyse du site: ${this.url}`);
        
        try {
            const response = await fetch(this.url);
            const html = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');

            // Analyses locales
            this.analyzeStructure(doc);
            this.detectFrameworks(doc, html);
            await this.detectTechnologies(doc, html);
            this.analyzeSEO(doc);
            this.analyzeResponsive(doc);
            this.analyzePerformance();
            
            // Analyses via APIs externes
            await this.analyzeWithExternalAPIs();

            return this.results;
        } catch (error) {
            console.error('❌ Erreur lors de l\'analyse:', error);
            throw error;
        }
    }
    
    async analyzeWithExternalAPIs() {
        console.log('🌐 Analyse via APIs externes...');
        
        this.results.externalData = {
            securityHeaders: {},
            ssl: {},
            dns: {},
            performance: {},
            whois: {},
            reputation: {},
            vulnerabilities: {},
            metadata: {},
            apiStatus: {}
        };
        
        const domain = new URL(this.url).hostname;
        
        // 1. Security Headers via securityheaders.com API alternative
        try {
            const securityCheck = await this.checkSecurityHeaders();
            this.results.externalData.securityHeaders = securityCheck;
            this.results.externalData.apiStatus.securityHeaders = 'success';
        } catch (e) {
            console.log('⚠️ Security headers check failed:', e.message);
            this.results.externalData.apiStatus.securityHeaders = 'failed';
        }
        
        // 2. SSL/TLS Check
        try {
            const sslInfo = await this.checkSSL();
            this.results.externalData.ssl = sslInfo;
            this.results.externalData.apiStatus.ssl = 'success';
        } catch (e) {
            console.log('⚠️ SSL check failed:', e.message);
            this.results.externalData.apiStatus.ssl = 'failed';
        }
        
        // 3. DNS Check via cloudflare DNS
        try {
            const dnsInfo = await fetch(`https://cloudflare-dns.com/dns-query?name=${domain}&type=A`, {
                headers: { 'Accept': 'application/dns-json' }
            }).then(r => r.json());
            
            this.results.externalData.dns = {
                records: dnsInfo.Answer?.length || 0,
                ips: dnsInfo.Answer?.map(a => a.data) || [],
                status: dnsInfo.Status === 0 ? 'Valid' : 'Issues detected'
            };
            this.results.externalData.apiStatus.dns = 'success';
        } catch (e) {
            console.log('⚠️ DNS check failed:', e.message);
            this.results.externalData.apiStatus.dns = 'failed';
        }
        
        // 4. PageSpeed Insights (simulation - nécessite clé API)
        try {
            const perfData = this.simulatePageSpeedInsights();
            this.results.externalData.performance = perfData;
            this.results.externalData.apiStatus.performance = 'success';
        } catch (e) {
            console.log('⚠️ Performance check failed:', e.message);
            this.results.externalData.apiStatus.performance = 'failed';
        }
        
        // 5. WHOIS Lookup via API publique
        try {
            const whoisData = await this.checkWHOIS(domain);
            this.results.externalData.whois = whoisData;
            this.results.externalData.apiStatus.whois = 'success';
        } catch (e) {
            console.log('⚠️ WHOIS check failed:', e.message);
            this.results.externalData.apiStatus.whois = 'failed';
        }
        
        // 6. Reputation Check (URLhaus, PhishTank, Google Safe Browsing style)
        try {
            const repData = await this.checkReputation(domain);
            this.results.externalData.reputation = repData;
            this.results.externalData.apiStatus.reputation = 'success';
        } catch (e) {
            console.log('⚠️ Reputation check failed:', e.message);
            this.results.externalData.apiStatus.reputation = 'failed';
        }
        
        // 7. Vulnerability Scan (CVE, exploits connus)
        try {
            const vulnData = await this.scanVulnerabilities();
            this.results.externalData.vulnerabilities = vulnData;
            this.results.externalData.apiStatus.vulnerabilities = 'success';
        } catch (e) {
            console.log('⚠️ Vulnerability scan failed:', e.message);
            this.results.externalData.apiStatus.vulnerabilities = 'failed';
        }
        
        // 8. Deep Metadata Extraction
        try {
            const metaData = await this.extractDeepMetadata();
            this.results.externalData.metadata = metaData;
            this.results.externalData.apiStatus.metadata = 'success';
        } catch (e) {
            console.log('⚠️ Metadata extraction failed:', e.message);
            this.results.externalData.apiStatus.metadata = 'failed';
        }
        
        // 9. Shodan/Censys Style IP Intelligence
        try {
            const ipIntel = await this.getIPIntelligence(domain);
            this.results.externalData.ipIntelligence = ipIntel;
            this.results.externalData.apiStatus.ipIntelligence = 'success';
        } catch (e) {
            console.log('⚠️ IP Intelligence failed:', e.message);
            this.results.externalData.apiStatus.ipIntelligence = 'failed';
        }
    }
    
    async checkSecurityHeaders() {
        const response = await fetch(window.location.href, { method: 'HEAD' });
        
        return {
            'Strict-Transport-Security': response.headers.get('strict-transport-security') ? '✅' : '❌',
            'Content-Security-Policy': response.headers.get('content-security-policy') ? '✅' : '❌',
            'X-Frame-Options': response.headers.get('x-frame-options') ? '✅' : '❌',
            'X-Content-Type-Options': response.headers.get('x-content-type-options') ? '✅' : '❌',
            'Referrer-Policy': response.headers.get('referrer-policy') ? '✅' : '❌',
            'Permissions-Policy': response.headers.get('permissions-policy') ? '✅' : '❌',
            score: this.calculateSecurityScore(response.headers)
        };
    }
    
    calculateSecurityScore(headers) {
        let score = 0;
        const securityHeaders = [
            'strict-transport-security',
            'content-security-policy',
            'x-frame-options',
            'x-content-type-options',
            'referrer-policy',
            'permissions-policy'
        ];
        
        securityHeaders.forEach(header => {
            if (headers.get(header)) score += 16.67;
        });
        
        return Math.round(score);
    }
    
    async checkSSL() {
        const isHTTPS = window.location.protocol === 'https:';
        
        return {
            enabled: isHTTPS,
            protocol: window.location.protocol,
            score: isHTTPS ? 100 : 0,
            message: isHTTPS ? 'SSL/TLS actif' : 'Site non sécurisé (HTTP)'
        };
    }
    
    simulatePageSpeedInsights() {
        const navTiming = performance.timing;
        const loadTime = navTiming.loadEventEnd - navTiming.navigationStart;
        const domReady = navTiming.domContentLoadedEventEnd - navTiming.navigationStart;
        
        let score = 100;
        if (loadTime > 3000) score -= 30;
        if (loadTime > 5000) score -= 20;
        if (domReady > 2000) score -= 20;
        
        return {
            score: Math.max(0, score),
            loadTime: loadTime,
            domReady: domReady,
            metrics: {
                'First Contentful Paint': domReady + 'ms',
                'Total Load Time': loadTime + 'ms',
                'Resources': performance.getEntriesByType('resource').length
            }
        };
    }
    
    async checkWHOIS(domain) {
        // Utilisation d'API WHOIS publiques
        try {
            // API alternative: whoisxmlapi, ipapi, etc.
            const response = await fetch(`https://ipapi.co/${domain}/json/`);
            const data = await response.json();
            
            return {
                domain: domain,
                org: data.org || 'N/A',
                country: data.country_name || 'N/A',
                city: data.city || 'N/A',
                asn: data.asn || 'N/A',
                isp: data.org || 'N/A',
                ip: data.ip || 'N/A'
            };
        } catch (e) {
            return { error: 'WHOIS lookup failed', domain: domain };
        }
    }
    
    async checkReputation(domain) {
        // Vérification de réputation basique
        const checks = {
            isNewDomain: false,
            hasSSL: window.location.protocol === 'https:',
            suspiciousPatterns: [],
            trustScore: 100
        };
        
        // Détection de patterns suspects
        const suspiciousKeywords = ['login', 'secure', 'account', 'verify', 'update', 'confirm', 'banking', 'paypal'];
        const domainLower = domain.toLowerCase();
        
        suspiciousKeywords.forEach(keyword => {
            if (domainLower.includes(keyword) && !domainLower.includes('official')) {
                checks.suspiciousPatterns.push(keyword);
                checks.trustScore -= 10;
            }
        });
        
        // Vérification de la longueur (domaines suspects souvent longs)
        if (domain.length > 30) {
            checks.trustScore -= 15;
            checks.suspiciousPatterns.push('Nom de domaine inhabituel');
        }
        
        // Vérification de caractères suspects
        if (domain.match(/[0-9]{3,}/) || domain.includes('--')) {
            checks.trustScore -= 20;
            checks.suspiciousPatterns.push('Caractères suspects');
        }
        
        if (!checks.hasSSL) {
            checks.trustScore -= 30;
            checks.suspiciousPatterns.push('Pas de SSL');
        }
        
        checks.status = checks.trustScore >= 70 ? 'Sûr' : checks.trustScore >= 40 ? 'Suspect' : 'Dangereux';
        checks.trustScore = Math.max(0, checks.trustScore);
        
        return checks;
    }
    
    async scanVulnerabilities() {
        const vulns = {
            detected: [],
            riskLevel: 'Low',
            score: 100
        };
        
        // Détection de versions obsolètes
        const html = document.documentElement.outerHTML;
        
        // jQuery version detection
        const jqueryMatch = html.match(/jquery[/-](\d+\.\d+\.\d+)/i);
        if (jqueryMatch) {
            const version = jqueryMatch[1];
            const major = parseInt(version.split('.')[0]);
            if (major < 3) {
                vulns.detected.push({
                    type: 'Outdated Library',
                    name: 'jQuery ' + version,
                    severity: 'Medium',
                    description: 'Version obsolète avec vulnérabilités connues'
                });
                vulns.score -= 20;
            }
        }
        
        // Angular version detection
        if (window.angular && window.angular.version) {
            const angVersion = window.angular.version.full;
            vulns.detected.push({
                type: 'Framework Version',
                name: 'AngularJS ' + angVersion,
                severity: 'Info',
                description: 'AngularJS détecté (considéré obsolète)'
            });
        }
        
        // Détection de fichiers sensibles exposés
        const sensitiveFiles = ['.git', '.env', 'composer.json', 'package.json', '.htaccess'];
        for (const file of sensitiveFiles) {
            if (html.includes(file)) {
                vulns.detected.push({
                    type: 'Information Disclosure',
                    name: file + ' exposé',
                    severity: 'High',
                    description: 'Fichier sensible potentiellement accessible'
                });
                vulns.score -= 25;
            }
        }
        
        // Vérification de console.log exposé (erreurs/debug)
        const scripts = Array.from(document.querySelectorAll('script'));
        let hasDebugCode = false;
        scripts.forEach(script => {
            if (script.textContent.includes('console.log') || script.textContent.includes('debugger')) {
                hasDebugCode = true;
            }
        });
        
        if (hasDebugCode) {
            vulns.detected.push({
                type: 'Debug Code',
                name: 'Code de debug détecté',
                severity: 'Low',
                description: 'Du code de débogage est présent en production'
            });
            vulns.score -= 5;
        }
        
        // Détection de mixed content
        const insecureResources = Array.from(document.querySelectorAll('script[src^="http:"], link[href^="http:"], img[src^="http:"]'));
        if (window.location.protocol === 'https:' && insecureResources.length > 0) {
            vulns.detected.push({
                type: 'Mixed Content',
                name: insecureResources.length + ' ressources HTTP',
                severity: 'Medium',
                description: 'Ressources non-sécurisées sur site HTTPS'
            });
            vulns.score -= 15;
        }
        
        vulns.score = Math.max(0, vulns.score);
        vulns.riskLevel = vulns.score >= 80 ? 'Low' : vulns.score >= 50 ? 'Medium' : 'High';
        
        return vulns;
    }
    
    async extractDeepMetadata() {
        const meta = {
            emails: [],
            phones: [],
            socialLinks: [],
            externalDomains: [],
            apiEndpoints: [],
            hiddenInputs: [],
            comments: []
        };
        
        const html = document.documentElement.outerHTML;
        const text = document.body.innerText;
        
        // Extraction d'emails
        const emailRegex = /[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+/gi;
        const emails = [...new Set((html + text).match(emailRegex))];
        meta.emails = emails ? emails.slice(0, 10) : [];
        
        // Extraction de numéros de téléphone
        const phoneRegex = /(?:\+\d{1,3}[-.\s]?)?(?:\(?\d{1,4}\)?[-.\s]?)?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/g;
        const phones = [...new Set(text.match(phoneRegex))];
        meta.phones = phones ? phones.filter(p => p.length >= 10).slice(0, 5) : [];
        
        // Extraction de liens sociaux
        const socialDomains = ['facebook.com', 'twitter.com', 'x.com', 'instagram.com', 'linkedin.com', 'youtube.com', 'tiktok.com', 'github.com'];
        document.querySelectorAll('a[href]').forEach(link => {
            const href = link.href;
            socialDomains.forEach(social => {
                if (href.includes(social) && !meta.socialLinks.includes(href)) {
                    meta.socialLinks.push(href);
                }
            });
        });
        
        // Extraction de domaines externes
        const currentDomain = new URL(this.url).hostname;
        document.querySelectorAll('a[href], script[src], link[href]').forEach(el => {
            const url = el.href || el.src;
            if (url && url.startsWith('http')) {
                try {
                    const domain = new URL(url).hostname;
                    if (domain !== currentDomain && !meta.externalDomains.includes(domain)) {
                        meta.externalDomains.push(domain);
                    }
                } catch(e) {}
            }
        });
        
        // Détection d'API endpoints
        const apiPatterns = ['/api/', '/v1/', '/v2/', '/graphql', '/rest/', '/endpoint'];
        document.querySelectorAll('script').forEach(script => {
            apiPatterns.forEach(pattern => {
                if (script.textContent.includes(pattern)) {
                    const matches = script.textContent.match(new RegExp(`['"][^'"]*${pattern}[^'"]*['"]`, 'g'));
                    if (matches) {
                        matches.forEach(m => {
                            const clean = m.replace(/['"`]/g, '');
                            if (!meta.apiEndpoints.includes(clean)) {
                                meta.apiEndpoints.push(clean);
                            }
                        });
                    }
                }
            });
        });
        meta.apiEndpoints = meta.apiEndpoints.slice(0, 10);
        
        // Détection de champs cachés
        document.querySelectorAll('input[type="hidden"]').forEach(input => {
            if (input.name && input.value) {
                meta.hiddenInputs.push({
                    name: input.name,
                    value: input.value.substring(0, 50)
                });
            }
        });
        meta.hiddenInputs = meta.hiddenInputs.slice(0, 5);
        
        // Extraction de commentaires HTML
        const commentRegex = /<!--([\s\S]*?)-->/g;
        let match;
        while ((match = commentRegex.exec(html)) !== null) {
            const comment = match[1].trim();
            if (comment.length > 0 && comment.length < 200) {
                meta.comments.push(comment);
            }
        }
        meta.comments = meta.comments.slice(0, 10);
        
        meta.externalDomains = meta.externalDomains.slice(0, 15);
        
        return meta;
    }
    
    async getIPIntelligence(domain) {
        const intel = {
            ports: [],
            services: [],
            geolocation: {},
            threat: 'None'
        };
        
        try {
            // Simulation d'intelligence IP
            const response = await fetch(`https://ipapi.co/${domain}/json/`);
            const data = await response.json();
            
            intel.geolocation = {
                country: data.country_name,
                region: data.region,
                city: data.city,
                latitude: data.latitude,
                longitude: data.longitude,
                timezone: data.timezone
            };
            
            intel.services = [
                { port: 80, service: 'HTTP', status: 'Open' },
                { port: 443, service: 'HTTPS', status: window.location.protocol === 'https:' ? 'Open' : 'Closed' }
            ];
            
            // Vérification basique de threat intelligence
            const suspiciousCountries = ['CN', 'RU', 'KP'];
            if (suspiciousCountries.includes(data.country_code)) {
                intel.threat = 'Suspicious origin country';
            }
            
        } catch (e) {
            intel.error = 'IP intelligence unavailable';
        }
        
        return intel;
    }

    analyzeStructure(doc) {
        console.log('📊 Analyse de la structure...');
        
        // Collecter les H1
        const h1Elements = Array.from(doc.querySelectorAll('h1')).map(h => h.textContent.trim());
        
        // Analyser les images
        const images = Array.from(doc.querySelectorAll('img'));
        const imagesWithoutAlt = images.filter(img => !img.hasAttribute('alt') || img.alt === '').length;
        const imagesLazy = images.filter(img => img.loading === 'lazy' || img.hasAttribute('data-src')).length;
        
        // Analyser les scripts
        const scripts = Array.from(doc.querySelectorAll('script'));
        const inlineScripts = scripts.filter(s => !s.src).length;
        const externalScripts = scripts.filter(s => s.src).length;
        const asyncScripts = scripts.filter(s => s.async).length;
        const deferScripts = scripts.filter(s => s.defer).length;
        
        this.results.structure = {
            title: doc.title || 'Non défini',
            titleLength: doc.title ? doc.title.length : 0,
            headings: {
                h1: doc.querySelectorAll('h1').length,
                h2: doc.querySelectorAll('h2').length,
                h3: doc.querySelectorAll('h3').length,
                h4: doc.querySelectorAll('h4').length,
                h5: doc.querySelectorAll('h5').length,
                h6: doc.querySelectorAll('h6').length,
                h1Content: h1Elements
            },
            images: doc.querySelectorAll('img').length,
            imagesDetails: {
                total: images.length,
                withoutAlt: imagesWithoutAlt,
                withAlt: images.length - imagesWithoutAlt,
                lazyLoaded: imagesLazy
            },
            links: {
                internal: 0,
                external: 0,
                total: doc.querySelectorAll('a').length,
                nofollow: doc.querySelectorAll('a[rel*="nofollow"]').length,
                blank: doc.querySelectorAll('a[target="_blank"]').length
            },
            scripts: doc.querySelectorAll('script').length,
            scriptsDetails: {
                total: scripts.length,
                inline: inlineScripts,
                external: externalScripts,
                async: asyncScripts,
                defer: deferScripts
            },
            stylesheets: doc.querySelectorAll('link[rel="stylesheet"]').length,
            forms: doc.querySelectorAll('form').length,
            iframes: doc.querySelectorAll('iframe').length,
            videos: doc.querySelectorAll('video, iframe[src*="youtube"], iframe[src*="vimeo"]').length,
            buttons: doc.querySelectorAll('button').length,
            inputs: doc.querySelectorAll('input').length
        };

        // Analyse des liens
        doc.querySelectorAll('a[href]').forEach(link => {
            const href = link.getAttribute('href');
            if (href.startsWith('http') && !href.includes(new URL(this.url).hostname)) {
                this.results.structure.links.external++;
            } else {
                this.results.structure.links.internal++;
            }
        });
    }

    detectFrameworks(doc, html) {
        console.log('🔧 Détection des frameworks...');
        
        const frameworks = [];

        // React
        if (html.includes('react') || doc.querySelector('[data-reactroot]') || 
            doc.querySelector('[data-reactid]') || window.React) {
            frameworks.push({ name: 'React', confidence: 'high' });
        }

        // Vue.js
        if (html.includes('vue') || doc.querySelector('[data-v-]') || 
            doc.querySelector('[v-cloak]') || window.Vue) {
            frameworks.push({ name: 'Vue.js', confidence: 'high' });
        }

        // Angular
        if (html.includes('ng-version') || doc.querySelector('[ng-version]') || 
            doc.querySelector('[ng-app]') || window.angular) {
            frameworks.push({ name: 'Angular', confidence: 'high' });
        }

        // jQuery
        if (window.jQuery || window.$ || html.includes('jquery')) {
            frameworks.push({ name: 'jQuery', confidence: 'high' });
        }

        // Next.js
        if (html.includes('__NEXT_DATA__') || doc.getElementById('__next')) {
            frameworks.push({ name: 'Next.js', confidence: 'high' });
        }

        // Nuxt.js
        if (html.includes('__NUXT__') || doc.getElementById('__nuxt')) {
            frameworks.push({ name: 'Nuxt.js', confidence: 'high' });
        }

        // Svelte
        if (html.includes('svelte') || doc.querySelector('[class*="svelte-"]')) {
            frameworks.push({ name: 'Svelte', confidence: 'medium' });
        }

        // Bootstrap
        if (html.includes('bootstrap') || doc.querySelector('[class*="bootstrap"]')) {
            frameworks.push({ name: 'Bootstrap', confidence: 'high' });
        }

        // Tailwind CSS
        if (html.includes('tailwind') || doc.querySelector('[class*="tw-"]')) {
            frameworks.push({ name: 'Tailwind CSS', confidence: 'medium' });
        }

        this.results.frameworks = frameworks;
    }

    async detectTechnologies(doc, html) {
        console.log('💻 Détection des technologies...');
        
        const tech = {
            server: [],
            cms: [],
            backend: [],
            analytics: [],
            fonts: [],
            cdn: [],
            security: [],
            hosting: [],
            other: []
        };

        // Détection du serveur web via headers
        try {
            const response = await fetch(window.location.href, { method: 'HEAD' });
            const server = response.headers.get('server');
            const poweredBy = response.headers.get('x-powered-by');
            const aspNet = response.headers.get('x-aspnet-version');
            const aspNetMvc = response.headers.get('x-aspnetmvc-version');
            
            if (server) {
                if (server.toLowerCase().includes('nginx')) tech.server.push('Nginx');
                if (server.toLowerCase().includes('apache')) tech.server.push('Apache');
                if (server.toLowerCase().includes('microsoft-iis')) tech.server.push('IIS (Microsoft)');
                if (server.toLowerCase().includes('cloudflare')) tech.server.push('Cloudflare');
                if (server.toLowerCase().includes('litespeed')) tech.server.push('LiteSpeed');
            }
            
            if (poweredBy) {
                if (poweredBy.toLowerCase().includes('php')) tech.backend.push('PHP ' + poweredBy);
                if (poweredBy.toLowerCase().includes('asp.net')) tech.backend.push('ASP.NET');
                if (poweredBy.toLowerCase().includes('express')) tech.backend.push('Express.js (Node.js)');
            }
            
            if (aspNet) tech.backend.push('ASP.NET ' + aspNet);
            if (aspNetMvc) tech.backend.push('ASP.NET MVC ' + aspNetMvc);
        } catch (e) {
            console.log('⚠️ Impossible de récupérer les headers serveur (CORS)');
        }

        // CMS et Frameworks Backend
        if (html.includes('wp-content') || html.includes('wordpress') || html.includes('wp-includes')) {
            tech.cms.push('WordPress');
            tech.backend.push('PHP (WordPress)');
        }
        if (html.includes('shopify')) {
            tech.cms.push('Shopify');
            tech.backend.push('Ruby on Rails (Shopify)');
        }
        if (html.includes('wix.com')) {
            tech.cms.push('Wix');
        }
        if (html.includes('drupal')) {
            tech.cms.push('Drupal');
            tech.backend.push('PHP (Drupal)');
        }
        if (html.includes('joomla')) {
            tech.cms.push('Joomla');
            tech.backend.push('PHP (Joomla)');
        }
        if (html.includes('magento')) {
            tech.cms.push('Magento');
            tech.backend.push('PHP (Magento)');
        }
        if (html.includes('prestashop')) {
            tech.cms.push('PrestaShop');
            tech.backend.push('PHP (PrestaShop)');
        }
        if (html.includes('woocommerce')) {
            tech.cms.push('WooCommerce');
        }
        // Ghost CMS - détection plus précise
        if (html.includes('ghost_head') || html.includes('ghost_foot') || html.includes('"ghost"') || 
            (html.includes('ghost') && (html.includes('/ghost/api/') || html.includes('content/ghost/')))) {
            tech.cms.push('Ghost');
            tech.backend.push('Node.js (Ghost)');
        }
        // Django - détection améliorée
        if (html.includes('django') || html.includes('csrfmiddlewaretoken') || html.includes('__admin_media_prefix__') ||
            html.includes('djdt') || html.includes('django-debug-toolbar')) {
            tech.backend.push('Django (Python)');
            // Ne pas ajouter Django si déjà détecté
            if (!tech.backend.includes('Django (Python)')) {
                tech.backend.push('Django (Python)');
            }
        }
        if (html.includes('flask')) {
            tech.backend.push('Flask (Python)');
        }
        if (html.includes('laravel') || html.includes('laravel_session')) {
            tech.backend.push('Laravel (PHP)');
        }
        if (html.includes('symfony')) {
            tech.backend.push('Symfony (PHP)');
        }
        if (html.includes('spring')) {
            tech.backend.push('Spring (Java)');
        }
        if (html.includes('aspnet') || html.includes('__VIEWSTATE')) {
            tech.backend.push('ASP.NET');
        }
        if (html.includes('rails') || html.includes('csrf-token')) {
            tech.backend.push('Ruby on Rails');
        }
        
        // Détection via meta generator
        const generator = doc.querySelector('meta[name="generator"]');
        if (generator) {
            const content = generator.content.toLowerCase();
            if (content.includes('wordpress')) tech.cms.push('WordPress ' + generator.content.split(' ')[1]);
            if (content.includes('drupal')) tech.cms.push('Drupal ' + generator.content.split(' ')[1]);
            if (content.includes('joomla')) tech.cms.push('Joomla ' + generator.content.split(' ')[1]);
        }

        // Analytics
        if (html.includes('google-analytics') || html.includes('gtag')) {
            tech.analytics.push('Google Analytics');
        }
        if (html.includes('googletagmanager')) {
            tech.analytics.push('Google Tag Manager');
        }
        if (html.includes('facebook.com/tr') || html.includes('fbq')) {
            tech.analytics.push('Facebook Pixel');
        }
        if (html.includes('hotjar')) {
            tech.analytics.push('Hotjar');
        }

        // Fonts
        if (html.includes('fonts.googleapis.com') || html.includes('fonts.gstatic.com')) {
            tech.fonts.push('Google Fonts');
        }
        if (html.includes('use.typekit.net') || html.includes('typekit.com')) {
            tech.fonts.push('Adobe Fonts (Typekit)');
        }

        // CDN
        if (html.includes('cloudflare') || html.includes('cf-ray')) {
            tech.cdn.push('Cloudflare');
        }
        if (html.includes('amazonaws.com') || html.includes('cloudfront')) {
            tech.cdn.push('Amazon CloudFront');
        }
        if (html.includes('cdn.jsdelivr.net')) {
            tech.cdn.push('jsDelivr');
        }
        if (html.includes('unpkg.com')) {
            tech.cdn.push('unpkg');
        }
        if (html.includes('cdnjs.cloudflare.com')) {
            tech.cdn.push('cdnjs');
        }
        
        // Hosting
        if (html.includes('vercel')) tech.hosting.push('Vercel');
        if (html.includes('netlify')) tech.hosting.push('Netlify');
        if (html.includes('herokuapp')) tech.hosting.push('Heroku');
        if (html.includes('github.io')) tech.hosting.push('GitHub Pages');
        if (html.includes('firebase')) tech.hosting.push('Firebase');
        
        // Sécurité
        if (doc.querySelector('meta[http-equiv="Content-Security-Policy"]')) {
            tech.security.push('Content Security Policy');
        }
        if (html.includes('recaptcha') || html.includes('g-recaptcha')) {
            tech.security.push('Google reCAPTCHA');
        }
        if (html.includes('hcaptcha')) {
            tech.security.push('hCaptcha');
        }
        
        // Autres technologies
        if (html.includes('socket.io')) tech.other.push('Socket.IO (WebSocket)');
        if (html.includes('graphql')) tech.other.push('GraphQL');
        if (html.includes('webpack')) tech.other.push('Webpack');
        if (html.includes('vite')) tech.other.push('Vite');
        if (html.includes('parcel')) tech.other.push('Parcel');

        this.results.technologies = tech;
    }

    analyzeSEO(doc) {
        console.log('🎯 Analyse SEO...');
        
        const seo = {
            score: 0,
            maxScore: 100,
            details: {}
        };

        let score = 0;

        // Title (15 points)
        const title = doc.querySelector('title');
        if (title && title.textContent.length > 0) {
            score += 15;
            seo.details.title = {
                present: true,
                length: title.textContent.length,
                optimal: title.textContent.length >= 30 && title.textContent.length <= 60,
                content: title.textContent
            };
        } else {
            seo.details.title = { present: false };
        }

        // Meta description (15 points)
        const metaDesc = doc.querySelector('meta[name="description"]');
        if (metaDesc && metaDesc.content.length > 0) {
            score += 15;
            seo.details.metaDescription = {
                present: true,
                length: metaDesc.content.length,
                optimal: metaDesc.content.length >= 120 && metaDesc.content.length <= 160,
                content: metaDesc.content
            };
        } else {
            seo.details.metaDescription = { present: false };
        }

        // H1 (10 points)
        const h1 = doc.querySelectorAll('h1');
        seo.details.h1 = {
            count: h1.length,
            optimal: h1.length === 1
        };
        if (h1.length === 1) score += 10;

        // Meta viewport (10 points)
        const viewport = doc.querySelector('meta[name="viewport"]');
        seo.details.viewport = { present: !!viewport };
        if (viewport) score += 10;

        // Canonical (5 points)
        const canonical = doc.querySelector('link[rel="canonical"]');
        seo.details.canonical = { present: !!canonical };
        if (canonical) score += 5;

        // Open Graph (10 points)
        const ogTags = doc.querySelectorAll('meta[property^="og:"]');
        seo.details.openGraph = {
            present: ogTags.length > 0,
            count: ogTags.length
        };
        if (ogTags.length >= 4) score += 10;

        // Twitter Cards (5 points)
        const twitterCards = doc.querySelectorAll('meta[name^="twitter:"]');
        seo.details.twitterCards = {
            present: twitterCards.length > 0,
            count: twitterCards.length
        };
        if (twitterCards.length > 0) score += 5;

        // Alt text sur images (10 points)
        const images = doc.querySelectorAll('img');
        const imagesWithAlt = doc.querySelectorAll('img[alt]');
        seo.details.images = {
            total: images.length,
            withAlt: imagesWithAlt.length,
            percentage: images.length > 0 ? (imagesWithAlt.length / images.length * 100).toFixed(2) : 0
        };
        if (images.length > 0 && (imagesWithAlt.length / images.length) >= 0.8) score += 10;

        // Structured Data (10 points)
        const structuredData = doc.querySelectorAll('script[type="application/ld+json"]');
        seo.details.structuredData = {
            present: structuredData.length > 0,
            count: structuredData.length
        };
        if (structuredData.length > 0) score += 10;

        // Robots meta (5 points)
        const robotsMeta = doc.querySelector('meta[name="robots"]');
        seo.details.robots = { present: !!robotsMeta };
        if (robotsMeta) score += 5;

        // Lang attribute (5 points)
        const htmlLang = doc.documentElement.getAttribute('lang');
        seo.details.language = { present: !!htmlLang, value: htmlLang };
        if (htmlLang) score += 5;

        seo.score = score;
        this.results.seo = seo;
    }

    analyzeResponsive(doc) {
        console.log('📱 Analyse du responsive...');
        
        const responsive = {
            score: 0,
            maxScore: 100,
            details: {}
        };

        let score = 0;

        // Meta viewport (30 points)
        const viewport = doc.querySelector('meta[name="viewport"]');
        responsive.details.viewport = {
            present: !!viewport,
            content: viewport ? viewport.content : null
        };
        if (viewport && viewport.content.includes('width=device-width')) score += 30;

        // Media queries dans les styles (20 points - estimation)
        const styleSheets = Array.from(doc.querySelectorAll('style'));
        let hasMediaQueries = false;
        styleSheets.forEach(style => {
            if (style.textContent.includes('@media')) {
                hasMediaQueries = true;
            }
        });
        responsive.details.mediaQueries = { detected: hasMediaQueries };
        if (hasMediaQueries) score += 20;

        // Responsive images (15 points)
        const responsiveImages = doc.querySelectorAll('img[srcset], picture');
        const totalImages = doc.querySelectorAll('img').length;
        responsive.details.responsiveImages = {
            count: responsiveImages.length,
            total: totalImages,
            percentage: totalImages > 0 ? (responsiveImages.length / totalImages * 100).toFixed(2) : 0
        };
        if (totalImages > 0 && (responsiveImages.length / totalImages) >= 0.5) score += 15;

        // Framework responsive (20 points)
        const hasResponsiveFramework = this.results.frameworks.some(f => 
            ['Bootstrap', 'Tailwind CSS', 'Foundation', 'Bulma'].includes(f.name)
        );
        responsive.details.responsiveFramework = { detected: hasResponsiveFramework };
        if (hasResponsiveFramework) score += 20;

        // Flexbox/Grid (15 points - estimation basique)
        const hasModernLayout = styleSheets.some(style => 
            style.textContent.includes('flex') || 
            style.textContent.includes('grid') ||
            style.textContent.includes('display: flex') ||
            style.textContent.includes('display: grid')
        );
        responsive.details.modernLayout = { detected: hasModernLayout };
        if (hasModernLayout) score += 15;

        responsive.score = score;
        this.results.responsive = responsive;
    }

    analyzePerformance() {
        console.log('⚡ Analyse des performances...');
        
        this.results.performance = {
            resourceTiming: performance.getEntriesByType ? 
                performance.getEntriesByType('resource').length : 'N/A',
            navigationTiming: performance.timing ? {
                domContentLoaded: performance.timing.domContentLoadedEventEnd - 
                                  performance.timing.navigationStart,
                loadComplete: performance.timing.loadEventEnd - 
                             performance.timing.navigationStart
            } : 'N/A'
        };
    }

    generateReport() {
        console.log('\n📋 RAPPORT D\'ANALYSE\n');
        console.log('='.repeat(60));
        console.log(`🌐 URL: ${this.results.url}`);
        console.log(`📅 Date: ${new Date(this.results.timestamp).toLocaleString()}`);
        console.log('='.repeat(60));

        console.log('\n📊 STRUCTURE HTML:');
        console.log(`  📄 Title: "${this.results.structure.title}" (${this.results.structure.titleLength} caractères)`);
        
        console.log(`\n  📑 Hiérarchie des titres:`);
        console.log(`    • H1: ${this.results.structure.headings.h1} ${this.results.structure.headings.h1 === 1 ? '✅' : '⚠️'}`);
        if (this.results.structure.headings.h1Content.length > 0) {
            this.results.structure.headings.h1Content.forEach((h1, i) => {
                console.log(`      ${i + 1}. "${h1.substring(0, 60)}${h1.length > 60 ? '...' : ''}"`);            });
        }
        console.log(`    • H2: ${this.results.structure.headings.h2}`);
        console.log(`    • H3: ${this.results.structure.headings.h3}`);
        console.log(`    • H4: ${this.results.structure.headings.h4}`);
        console.log(`    • H5: ${this.results.structure.headings.h5}`);
        console.log(`    • H6: ${this.results.structure.headings.h6}`);
        
        console.log(`\n  🖼️  Images: ${this.results.structure.images} au total`);
        console.log(`    • Avec Alt: ${this.results.structure.imagesDetails.withAlt} ✅`);
        console.log(`    • Sans Alt: ${this.results.structure.imagesDetails.withoutAlt} ${this.results.structure.imagesDetails.withoutAlt > 0 ? '⚠️' : '✅'}`);
        console.log(`    • Lazy Loading: ${this.results.structure.imagesDetails.lazyLoaded}`);
        
        console.log(`\n  🔗 Liens: ${this.results.structure.links.total} au total`);
        console.log(`    • Internes: ${this.results.structure.links.internal}`);
        console.log(`    • Externes: ${this.results.structure.links.external}`);
        console.log(`    • Nofollow: ${this.results.structure.links.nofollow}`);
        console.log(`    • Target="_blank": ${this.results.structure.links.blank}`);
        
        console.log(`\n  📜 Scripts: ${this.results.structure.scripts} au total`);
        console.log(`    • Inline: ${this.results.structure.scriptsDetails.inline}`);
        console.log(`    • Externes: ${this.results.structure.scriptsDetails.external}`);
        console.log(`    • Async: ${this.results.structure.scriptsDetails.async}`);
        console.log(`    • Defer: ${this.results.structure.scriptsDetails.defer}`);
        
        console.log(`\n  🎨 Autres éléments:`);
        console.log(`    • Feuilles de style: ${this.results.structure.stylesheets}`);
        console.log(`    • Formulaires: ${this.results.structure.forms}`);
        console.log(`    • iFrames: ${this.results.structure.iframes}`);
        console.log(`    • Vidéos: ${this.results.structure.videos}`);
        console.log(`    • Boutons: ${this.results.structure.buttons}`);
        console.log(`    • Champs input: ${this.results.structure.inputs}`);

        console.log('\n🔧 FRAMEWORKS DÉTECTÉS:');
        if (this.results.frameworks.length > 0) {
            this.results.frameworks.forEach(fw => {
                console.log(`  • ${fw.name} (confiance: ${fw.confidence})`);
            });
        } else {
            console.log('  • Aucun framework majeur détecté');
        }

        console.log('\n💻 STACK TECHNOLOGIQUE:');
        
        if (this.results.technologies.server.length > 0) {
            console.log(`  • Serveur Web: ${this.results.technologies.server.join(', ')}`);
        } else {
            console.log(`  • Serveur Web: Non détecté (CORS ou caché)`);
        }
        
        if (this.results.technologies.backend.length > 0) {
            console.log(`  • Backend/Framework: ${this.results.technologies.backend.join(', ')}`);
        } else {
            console.log(`  • Backend/Framework: Non détecté (site statique ou caché)`);
        }
        
        if (this.results.technologies.cms.length > 0) {
            console.log(`  • CMS: ${this.results.technologies.cms.join(', ')}`);
        } else {
            console.log(`  • CMS: Aucun CMS détecté (site custom)`);
        }
        
        if (this.results.technologies.hosting.length > 0) {
            console.log(`  • Hébergement: ${this.results.technologies.hosting.join(', ')}`);
        }
        
        if (this.results.technologies.cdn.length > 0) {
            console.log(`  • CDN: ${this.results.technologies.cdn.join(', ')}`);
        }
        
        if (this.results.technologies.analytics.length > 0) {
            console.log(`  • Analytics: ${this.results.technologies.analytics.join(', ')}`);
        }
        
        if (this.results.technologies.fonts.length > 0) {
            console.log(`  • Fonts: ${this.results.technologies.fonts.join(', ')}`);
        }
        
        if (this.results.technologies.security.length > 0) {
            console.log(`  • Sécurité: ${this.results.technologies.security.join(', ')}`);
        }
        
        if (this.results.technologies.other.length > 0) {
            console.log(`  • Autres: ${this.results.technologies.other.join(', ')}`);
        }

        console.log('\n🎯 ANALYSE SEO DÉTAILLÉE:');
        console.log(`  📊 Score Global: ${this.results.seo.score}/${this.results.seo.maxScore} (${(this.results.seo.score / this.results.seo.maxScore * 100).toFixed(1)}%)`);
        console.log(``);
        
        console.log(`  📄 Title Tag: ${this.results.seo.details.title.present ? '✅' : '❌'}`);
        if (this.results.seo.details.title.present) {
            console.log(`    • Longueur: ${this.results.seo.details.title.length} caractères ${this.results.seo.details.title.optimal ? '✅ (optimal 30-60)' : '⚠️ (recommandé 30-60)'}`);
            console.log(`    • Contenu: "${this.results.seo.details.title.content.substring(0, 80)}${this.results.seo.details.title.content.length > 80 ? '...' : ''}"`);        }
        
        console.log(`\n  📝 Meta Description: ${this.results.seo.details.metaDescription.present ? '✅' : '❌'}`);
        if (this.results.seo.details.metaDescription.present) {
            console.log(`    • Longueur: ${this.results.seo.details.metaDescription.length} caractères ${this.results.seo.details.metaDescription.optimal ? '✅ (optimal 120-160)' : '⚠️ (recommandé 120-160)'}`);
            console.log(`    • Contenu: "${this.results.seo.details.metaDescription.content.substring(0, 100)}${this.results.seo.details.metaDescription.content.length > 100 ? '...' : ''}"`);        }
        
        console.log(`\n  🏷️  Balises Meta:`);
        console.log(`    • H1: ${this.results.seo.details.h1.optimal ? '✅' : '⚠️'} (${this.results.seo.details.h1.count} détecté(s))`);
        console.log(`    • Viewport: ${this.results.seo.details.viewport.present ? '✅' : '❌'}`);
        console.log(`    • Canonical: ${this.results.seo.details.canonical.present ? '✅' : '❌'}`);
        console.log(`    • Robots: ${this.results.seo.details.robots.present ? '✅' : '❌'}`);
        console.log(`    • Lang: ${this.results.seo.details.language.present ? '✅ (' + this.results.seo.details.language.value + ')' : '❌'}`);
        
        console.log(`\n  🌐 Social Media:`);
        console.log(`    • Open Graph: ${this.results.seo.details.openGraph.present ? '✅' : '❌'} (${this.results.seo.details.openGraph.count} tags)`);
        console.log(`    • Twitter Cards: ${this.results.seo.details.twitterCards.present ? '✅' : '❌'} (${this.results.seo.details.twitterCards.count} tags)`);
        
        console.log(`\n  🖼️  Optimisation Images:`);
        console.log(`    • Images avec Alt: ${this.results.seo.details.images.withAlt}/${this.results.seo.details.images.total} (${this.results.seo.details.images.percentage}%) ${parseFloat(this.results.seo.details.images.percentage) >= 80 ? '✅' : '⚠️'}`);
        
        console.log(`\n  📊 Structured Data (Schema.org):`);
        console.log(`    • Présent: ${this.results.seo.details.structuredData.present ? '✅' : '❌'} (${this.results.seo.details.structuredData.count} bloc(s))`);

        console.log('\n📱 ANALYSE RESPONSIVE DÉTAILLÉE:');
        console.log(`  📊 Score Global: ${this.results.responsive.score}/${this.results.responsive.maxScore} (${(this.results.responsive.score / this.results.responsive.maxScore * 100).toFixed(1)}%)`);
        console.log(``);
        
        console.log(`  📱 Configuration Mobile:`);
        console.log(`    • Viewport: ${this.results.responsive.details.viewport.present ? '✅' : '❌'}`);
        if (this.results.responsive.details.viewport.present) {
            console.log(`      → ${this.results.responsive.details.viewport.content}`);
        }
        
        console.log(`\n  🎨 Design Responsive:`);
        console.log(`    • Media Queries CSS: ${this.results.responsive.details.mediaQueries.detected ? '✅' : '❌'}`);
        console.log(`    • Framework Responsive: ${this.results.responsive.details.responsiveFramework.detected ? '✅' : '❌'}`);
        console.log(`    • Layout Moderne (Flex/Grid): ${this.results.responsive.details.modernLayout.detected ? '✅' : '❌'}`);
        
        console.log(`\n  🖼️  Images Responsives:`);
        console.log(`    • Images avec srcset/picture: ${this.results.responsive.details.responsiveImages.count}/${this.results.responsive.details.responsiveImages.total} (${this.results.responsive.details.responsiveImages.percentage}%) ${parseFloat(this.results.responsive.details.responsiveImages.percentage) >= 50 ? '✅' : '⚠️'}`);

        console.log('\n' + '='.repeat(60));
        
        // Recommandations
        console.log('\n💡 RECOMMANDATIONS:');
        const recommendations = [];
        
        if (!this.results.seo.details.title.optimal) recommendations.push('  ⚠️  Ajustez la longueur du title (30-60 caractères)');
        if (!this.results.seo.details.metaDescription.optimal) recommendations.push('  ⚠️  Ajustez la meta description (120-160 caractères)');
        if (this.results.seo.details.h1.count !== 1) recommendations.push('  ⚠️  Utilisez exactement 1 balise H1 par page');
        if (!this.results.seo.details.canonical.present) recommendations.push('  ⚠️  Ajoutez une balise canonical');
        if (!this.results.seo.details.structuredData.present) recommendations.push('  ⚠️  Implémentez des données structurées (Schema.org)');
        if (parseFloat(this.results.seo.details.images.percentage) < 80) recommendations.push('  ⚠️  Ajoutez des attributs alt à toutes les images');
        if (!this.results.responsive.details.responsiveFramework.detected && parseFloat(this.results.responsive.details.responsiveImages.percentage) < 50) recommendations.push('  ⚠️  Implémentez des images responsives (srcset)');
        if (this.results.seo.score === 100 && this.results.responsive.score === 100) recommendations.push('  ✅ Parfait ! Aucune recommandation');
        
        if (recommendations.length > 0) {
            recommendations.forEach(rec => console.log(rec));
        }
        
        console.log('\n' + '='.repeat(60));

        return this.results;
    }

    exportJSON() {
        return JSON.stringify(this.results, null, 2);
    }
}

// Fonction pour formater les résultats dans l'interface
function displayResults(analyzer) {
    const results = analyzer.results;
    
    // ACCUEIL
    const homeContent = document.getElementById('home-content');
    const seoScore = results.seo.score;
    const responsiveScore = results.responsive.score;
    const avgScore = Math.round((seoScore + responsiveScore) / 2);
    
    homeContent.innerHTML = `
        <div class="stat-grid">
            <div class="stat-item">
                <div class="stat-item-label">Score SEO</div>
                <div class="stat-item-value" style="color: ${seoScore >= 80 ? '#28a745' : seoScore >= 60 ? '#ffc107' : '#dc3545'}">${seoScore}/100</div>
                <div class="progress-bar"><div class="progress-fill" style="width: ${seoScore}%"></div></div>
            </div>
            <div class="stat-item">
                <div class="stat-item-label">Score Responsive</div>
                <div class="stat-item-value" style="color: ${responsiveScore >= 80 ? '#28a745' : responsiveScore >= 60 ? '#ffc107' : '#dc3545'}">${responsiveScore}/100</div>
                <div class="progress-bar"><div class="progress-fill" style="width: ${responsiveScore}%"></div></div>
            </div>
            <div class="stat-item">
                <div class="stat-item-label">Score Moyen</div>
                <div class="stat-item-value" style="color: ${avgScore >= 80 ? '#28a745' : avgScore >= 60 ? '#ffc107' : '#dc3545'}">${avgScore}/100</div>
                <div class="progress-bar"><div class="progress-fill" style="width: ${avgScore}%"></div></div>
            </div>
        </div>
        
        <div class="stat-card">
            <h3>🌐 URL Analysée</h3>
            <div style="word-break: break-all; padding: 10px; background: white; border-radius: 8px;">${results.url}</div>
        </div>
        
        <div class="stat-card">
            <h3>⏰ Date d'analyse</h3>
            <div style="padding: 10px; background: white; border-radius: 8px;">${new Date(results.timestamp).toLocaleString()}</div>
        </div>
    `;
    
    // STRUCTURE
    document.getElementById('panel-structure').innerHTML = `
        <div class="stat-card">
            <h3>📄 Titre de la page</h3>
            <div style="padding: 10px; background: white; border-radius: 8px; margin-bottom: 10px;">"${results.structure.title}"</div>
            <div class="detail-row">
                <span class="detail-label">Longueur</span>
                <span class="detail-value">${results.structure.titleLength} caractères ${results.structure.titleLength >= 30 && results.structure.titleLength <= 60 ? '✅' : '⚠️'}</span>
            </div>
        </div>
        
        <div class="stat-card">
            <h3>📑 Hiérarchie des titres</h3>
            <div class="detail-row"><span class="detail-label">H1</span><span class="detail-value">${results.structure.headings.h1} ${results.structure.headings.h1 === 1 ? '✅' : '⚠️'}</span></div>
            <div class="detail-row"><span class="detail-label">H2</span><span class="detail-value">${results.structure.headings.h2}</span></div>
            <div class="detail-row"><span class="detail-label">H3</span><span class="detail-value">${results.structure.headings.h3}</span></div>
            <div class="detail-row"><span class="detail-label">H4</span><span class="detail-value">${results.structure.headings.h4}</span></div>
            <div class="detail-row"><span class="detail-label">H5</span><span class="detail-value">${results.structure.headings.h5}</span></div>
            <div class="detail-row"><span class="detail-label">H6</span><span class="detail-value">${results.structure.headings.h6}</span></div>
        </div>
        
        <div class="stat-grid">
            <div class="stat-item">
                <div class="stat-item-label">🖼️ Images</div>
                <div class="stat-item-value">${results.structure.images}</div>
                <small>Avec alt: ${results.structure.imagesDetails.withAlt}</small>
            </div>
            <div class="stat-item">
                <div class="stat-item-label">🔗 Liens</div>
                <div class="stat-item-value">${results.structure.links.total}</div>
                <small>${results.structure.links.internal} int. / ${results.structure.links.external} ext.</small>
            </div>
            <div class="stat-item">
                <div class="stat-item-label">📜 Scripts</div>
                <div class="stat-item-value">${results.structure.scripts}</div>
                <small>${results.structure.scriptsDetails.async} async / ${results.structure.scriptsDetails.defer} defer</small>
            </div>
            <div class="stat-item">
                <div class="stat-item-label">🎨 CSS</div>
                <div class="stat-item-value">${results.structure.stylesheets}</div>
                <small>Feuilles de style</small>
            </div>
        </div>
        
        <div class="stat-card">
            <h3>📋 Autres éléments</h3>
            <div class="detail-row"><span class="detail-label">Formulaires</span><span class="detail-value">${results.structure.forms}</span></div>
            <div class="detail-row"><span class="detail-label">iFrames</span><span class="detail-value">${results.structure.iframes}</span></div>
            <div class="detail-row"><span class="detail-label">Vidéos</span><span class="detail-value">${results.structure.videos}</span></div>
            <div class="detail-row"><span class="detail-label">Boutons</span><span class="detail-value">${results.structure.buttons}</span></div>
            <div class="detail-row"><span class="detail-label">Inputs</span><span class="detail-value">${results.structure.inputs}</span></div>
        </div>
    `;
    
    // TECHNOLOGIES
    const tech = results.technologies;
    let techBadges = '';
    
    if (tech.server.length) techBadges += tech.server.map(t => `<span class="tech-badge">🖥️ ${t}</span>`).join('');
    if (tech.backend.length) techBadges += tech.backend.map(t => `<span class="tech-badge">⚙️ ${t}</span>`).join('');
    if (tech.cms.length) techBadges += tech.cms.map(t => `<span class="tech-badge">📦 ${t}</span>`).join('');
    if (results.frameworks.length) techBadges += results.frameworks.map(f => `<span class="tech-badge">🔧 ${f.name}</span>`).join('');
    if (tech.cdn.length) techBadges += tech.cdn.map(t => `<span class="tech-badge">🌐 ${t}</span>`).join('');
    if (tech.analytics.length) techBadges += tech.analytics.map(t => `<span class="tech-badge">📊 ${t}</span>`).join('');
    if (tech.fonts.length) techBadges += tech.fonts.map(t => `<span class="tech-badge">🔤 ${t}</span>`).join('');
    
    document.getElementById('panel-tech').innerHTML = `
        <div class="stat-card">
            <h3>💻 Stack Technologique Détecté</h3>
            <div style="padding: 15px; background: white; border-radius: 8px;">
                ${techBadges || '<span style="color: #999;">Aucune technologie majeure détectée</span>'}
            </div>
        </div>
        
        <div class="stat-card">
            <h3>🖥️ Serveur Web</h3>
            <div style="padding: 10px; background: white; border-radius: 8px;">
                ${tech.server.length ? tech.server.join(', ') : 'Non détecté (CORS ou caché)'}
            </div>
        </div>
        
        <div class="stat-card">
            <h3>⚙️ Backend / Framework</h3>
            <div style="padding: 10px; background: white; border-radius: 8px;">
                ${tech.backend.length ? tech.backend.join(', ') : 'Non détecté (site statique ou caché)'}
            </div>
        </div>
        
        <div class="stat-card">
            <h3>📦 CMS</h3>
            <div style="padding: 10px; background: white; border-radius: 8px;">
                ${tech.cms.length ? tech.cms.join(', ') : 'Aucun CMS détecté (site custom)'}
            </div>
        </div>
    `;
    
    // SEO
    const seoDetails = results.seo.details;
    document.getElementById('panel-seo').innerHTML = `
        <div style="text-align: center;">
            <div class="score-circle" style="--percentage: ${seoScore * 3.6}deg;">
                <span class="score-circle-text">${seoScore}</span>
            </div>
            <h3>Score SEO sur 100</h3>
        </div>
        
        <div class="stat-card">
            <h3>📄 Title Tag ${seoDetails.title.present ? '✅' : '❌'}</h3>
            ${seoDetails.title.present ? `
                <div style="padding: 10px; background: white; border-radius: 8px; margin-bottom: 10px;">"${seoDetails.title.content}"</div>
                <div class="detail-row">
                    <span class="detail-label">Longueur</span>
                    <span class="detail-value">${seoDetails.title.length} caractères ${seoDetails.title.optimal ? '✅' : '⚠️ (30-60 recommandé)'}</span>
                </div>
            ` : '<p style="color: #dc3545;">❌ Aucun title détecté</p>'}
        </div>
        
        <div class="stat-card">
            <h3>📝 Meta Description ${seoDetails.metaDescription.present ? '✅' : '❌'}</h3>
            ${seoDetails.metaDescription.present ? `
                <div style="padding: 10px; background: white; border-radius: 8px; margin-bottom: 10px;">"${seoDetails.metaDescription.content}"</div>
                <div class="detail-row">
                    <span class="detail-label">Longueur</span>
                    <span class="detail-value">${seoDetails.metaDescription.length} caractères ${seoDetails.metaDescription.optimal ? '✅' : '⚠️ (120-160 recommandé)'}</span>
                </div>
            ` : '<p style="color: #dc3545;">❌ Aucune description détectée</p>'}
        </div>
        
        <div class="stat-grid">
            <div class="stat-item">
                <div class="stat-item-label">H1 Unique</div>
                <div class="stat-item-value">${seoDetails.h1.optimal ? '✅' : '⚠️'}</div>
                <small>${seoDetails.h1.count} détecté(s)</small>
            </div>
            <div class="stat-item">
                <div class="stat-item-label">Viewport</div>
                <div class="stat-item-value">${seoDetails.viewport.present ? '✅' : '❌'}</div>
            </div>
            <div class="stat-item">
                <div class="stat-item-label">Canonical</div>
                <div class="stat-item-value">${seoDetails.canonical.present ? '✅' : '❌'}</div>
            </div>
            <div class="stat-item">
                <div class="stat-item-label">Lang</div>
                <div class="stat-item-value">${seoDetails.language.present ? '✅' : '❌'}</div>
                ${seoDetails.language.present ? `<small>${seoDetails.language.value}</small>` : ''}
            </div>
        </div>
        
        <div class="stat-card">
            <h3>🌐 Social Media</h3>
            <div class="detail-row">
                <span class="detail-label">Open Graph</span>
                <span class="detail-value">${seoDetails.openGraph.present ? '✅' : '❌'} (${seoDetails.openGraph.count} tags)</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Twitter Cards</span>
                <span class="detail-value">${seoDetails.twitterCards.present ? '✅' : '❌'} (${seoDetails.twitterCards.count} tags)</span>
            </div>
        </div>
        
        <div class="stat-card">
            <h3>📊 Structured Data</h3>
            <div class="detail-row">
                <span class="detail-label">Schema.org</span>
                <span class="detail-value">${seoDetails.structuredData.present ? '✅' : '❌'} (${seoDetails.structuredData.count} bloc(s))</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Images avec Alt</span>
                <span class="detail-value">${seoDetails.images.percentage}% ${parseFloat(seoDetails.images.percentage) >= 80 ? '✅' : '⚠️'}</span>
            </div>
        </div>
    `;
    
    // RESPONSIVE
    const respDetails = results.responsive.details;
    document.getElementById('panel-responsive').innerHTML = `
        <div style="text-align: center;">
            <div class="score-circle" style="--percentage: ${responsiveScore * 3.6}deg;">
                <span class="score-circle-text">${responsiveScore}</span>
            </div>
            <h3>Score Responsive sur 100</h3>
        </div>
        
        <div class="stat-card">
            <h3>📱 Configuration Mobile</h3>
            <div class="detail-row">
                <span class="detail-label">Meta Viewport</span>
                <span class="detail-value">${respDetails.viewport.present ? '✅' : '❌'}</span>
            </div>
            ${respDetails.viewport.present ? `
                <div style="padding: 10px; background: white; border-radius: 8px; margin-top: 10px; font-family: monospace;">
                    ${respDetails.viewport.content}
                </div>
            ` : ''}
        </div>
        
        <div class="stat-grid">
            <div class="stat-item">
                <div class="stat-item-label">Media Queries</div>
                <div class="stat-item-value">${respDetails.mediaQueries.detected ? '✅' : '❌'}</div>
            </div>
            <div class="stat-item">
                <div class="stat-item-label">Framework</div>
                <div class="stat-item-value">${respDetails.responsiveFramework.detected ? '✅' : '❌'}</div>
            </div>
            <div class="stat-item">
                <div class="stat-item-label">Flex/Grid</div>
                <div class="stat-item-value">${respDetails.modernLayout.detected ? '✅' : '❌'}</div>
            </div>
        </div>
        
        <div class="stat-card">
            <h3>🖼️ Images Responsives</h3>
            <div class="detail-row">
                <span class="detail-label">Images avec srcset/picture</span>
                <span class="detail-value">${respDetails.responsiveImages.count}/${respDetails.responsiveImages.total} (${respDetails.responsiveImages.percentage}%) ${parseFloat(respDetails.responsiveImages.percentage) >= 50 ? '✅' : '⚠️'}</span>
            </div>
        </div>
    `;
    
    // RECOMMANDATIONS
    const recommendations = [];
    if (!seoDetails.title.optimal) recommendations.push({ type: 'warning', text: 'Ajustez la longueur du title (30-60 caractères)' });
    if (!seoDetails.metaDescription.optimal) recommendations.push({ type: 'warning', text: 'Ajustez la meta description (120-160 caractères)' });
    if (seoDetails.h1.count !== 1) recommendations.push({ type: 'warning', text: 'Utilisez exactement 1 balise H1 par page' });
    if (!seoDetails.canonical.present) recommendations.push({ type: 'warning', text: 'Ajoutez une balise canonical' });
    if (!seoDetails.structuredData.present) recommendations.push({ type: 'warning', text: 'Implémentez des données structurées (Schema.org)' });
    if (parseFloat(seoDetails.images.percentage) < 80) recommendations.push({ type: 'warning', text: 'Ajoutez des attributs alt à toutes les images' });
    if (!respDetails.responsiveFramework.detected && parseFloat(respDetails.responsiveImages.percentage) < 50) recommendations.push({ type: 'warning', text: 'Implémentez des images responsives (srcset)' });
    if (!seoDetails.twitterCards.present) recommendations.push({ type: 'info', text: 'Ajoutez des Twitter Cards pour améliorer le partage' });
    if (seoScore === 100 && responsiveScore === 100) recommendations.push({ type: 'success', text: 'Parfait ! Aucune recommandation, votre site est optimisé !' });
    
    let recoHTML = '';
    recommendations.forEach(rec => {
        const className = rec.type === 'success' ? 'recommendation-item success' : 'recommendation-item';
        const icon = rec.type === 'success' ? '✅' : rec.type === 'info' ? 'ℹ️' : '⚠️';
        recoHTML += `<div class="${className}">${icon} ${rec.text}</div>`;
    });
    
    document.getElementById('panel-recommendations').innerHTML = `
        <div class="stat-card">
            <h3>💡 Recommandations d'amélioration</h3>
            ${recoHTML || '<div class="recommendation-item success">✅ Aucune recommandation, tout est parfait !</div>'}
        </div>
    `;
    
    // SÉCURITÉ
    if (results.externalData && results.externalData.securityHeaders) {
        const secHeaders = results.externalData.securityHeaders;
        const secScore = secHeaders.score || 0;
        
        document.getElementById('panel-security').innerHTML = `
            <div style="text-align: center;">
                <div class="score-circle" style="--percentage: ${secScore * 3.6}deg;">
                    <span class="score-circle-text">${secScore}</span>
                </div>
                <h3 style="color: white;">Score Sécurité sur 100</h3>
            </div>
            
            <div class="stat-card">
                <h3>🔒 En-têtes de Sécurité HTTP</h3>
                <div class="detail-row">
                    <span class="detail-label">Strict-Transport-Security (HSTS)</span>
                    <span class="detail-value">${secHeaders['Strict-Transport-Security']}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Content-Security-Policy (CSP)</span>
                    <span class="detail-value">${secHeaders['Content-Security-Policy']}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">X-Frame-Options</span>
                    <span class="detail-value">${secHeaders['X-Frame-Options']}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">X-Content-Type-Options</span>
                    <span class="detail-value">${secHeaders['X-Content-Type-Options']}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Referrer-Policy</span>
                    <span class="detail-value">${secHeaders['Referrer-Policy']}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Permissions-Policy</span>
                    <span class="detail-value">${secHeaders['Permissions-Policy']}</span>
                </div>
            </div>
            
            <div class="stat-card">
                <h3>🔐 SSL/TLS</h3>
                <div class="detail-row">
                    <span class="detail-label">Protocole</span>
                    <span class="detail-value">${results.externalData.ssl.protocol?.toUpperCase() || 'N/A'}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Status</span>
                    <span class="detail-value">${results.externalData.ssl.enabled ? '✅ Sécurisé' : '❌ Non sécurisé'}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Score SSL</span>
                    <span class="detail-value">${results.externalData.ssl.score}/100</span>
                </div>
            </div>
            
            ${results.externalData.dns ? `
            <div class="stat-card">
                <h3>🌐 DNS</h3>
                <div class="detail-row">
                    <span class="detail-label">Enregistrements DNS</span>
                    <span class="detail-value">${results.externalData.dns.records} record(s)</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Adresses IP</span>
                    <span class="detail-value">${results.externalData.dns.ips?.join(', ') || 'N/A'}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Status</span>
                    <span class="detail-value">${results.externalData.dns.status}</span>
                </div>
            </div>
            ` : ''}
        `;
    }
    
    // PERFORMANCE
    if (results.externalData && results.externalData.performance) {
        const perf = results.externalData.performance;
        const perfScore = perf.score || 0;
        
        document.getElementById('panel-performance').innerHTML = `
            <div style="text-align: center;">
                <div class="score-circle" style="--percentage: ${perfScore * 3.6}deg;">
                    <span class="score-circle-text">${perfScore}</span>
                </div>
                <h3 style="color: white;">Score Performance sur 100</h3>
            </div>
            
            <div class="stat-grid">
                <div class="stat-item">
                    <div class="stat-item-label">⚡ Temps de Chargement</div>
                    <div class="stat-item-value">${(perf.loadTime / 1000).toFixed(2)}s</div>
                </div>
                <div class="stat-item">
                    <div class="stat-item-label">📄 DOM Ready</div>
                    <div class="stat-item-value">${(perf.domReady / 1000).toFixed(2)}s</div>
                </div>
                <div class="stat-item">
                    <div class="stat-item-label">📦 Ressources</div>
                    <div class="stat-item-value">${results.performance.resourceTiming}</div>
                </div>
            </div>
            
            <div class="stat-card">
                <h3>⏱️ Métriques de Performance</h3>
                ${Object.entries(perf.metrics).map(([key, value]) => `
                    <div class="detail-row">
                        <span class="detail-label">${key}</span>
                        <span class="detail-value">${value}</span>
                    </div>
                `).join('')}
            </div>
            
            <div class="stat-card">
                <h3>💡 Recommandations Performance</h3>
                ${perf.loadTime > 3000 ? '<div class="recommendation-item">⚠️ Temps de chargement élevé (>3s). Optimisez vos ressources.</div>' : ''}
                ${perf.domReady > 2000 ? '<div class="recommendation-item">⚠️ DOM Ready lent (>2s). Réduisez le JavaScript bloquant.</div>' : ''}
                ${results.performance.resourceTiming > 100 ? '<div class="recommendation-item">⚠️ Trop de ressources (' + results.performance.resourceTiming + '). Considérez le lazy loading.</div>' : ''}
                ${perf.score >= 80 ? '<div class="recommendation-item success">✅ Excellentes performances !</div>' : ''}
            </div>
        `;
    }
    
    // INTELLIGENCE OSINT
    if (results.externalData && results.externalData.metadata) {
        const meta = results.externalData.metadata;
        const whois = results.externalData.whois || {};
        const reputation = results.externalData.reputation || {};
        const ipIntel = results.externalData.ipIntelligence || {};
        
        document.getElementById('panel-intelligence').innerHTML = `
            <div class="stat-card">
                <h3>🌍 WHOIS & Géolocalisation</h3>
                ${whois.ip ? `
                <div class="detail-row">
                    <span class="detail-label">Adresse IP</span>
                    <span class="detail-value">${whois.ip}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Organisation</span>
                    <span class="detail-value">${whois.org || 'N/A'}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Pays</span>
                    <span class="detail-value">${whois.country || 'N/A'}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Ville</span>
                    <span class="detail-value">${whois.city || 'N/A'}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">ASN</span>
                    <span class="detail-value">${whois.asn || 'N/A'}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">ISP</span>
                    <span class="detail-value">${whois.isp || 'N/A'}</span>
                </div>
                ` : '<p style="color: rgba(255,255,255,0.5);">Données WHOIS indisponibles</p>'}
            </div>
            
            <div class="stat-card">
                <h3>🛡️ Réputation & Confiance</h3>
                ${reputation.trustScore !== undefined ? `
                <div style="text-align: center; margin-bottom: 20px;">
                    <div style="display: inline-block; padding: 15px 30px; background: ${reputation.trustScore >= 70 ? 'linear-gradient(135deg, #10b981, #059669)' : reputation.trustScore >= 40 ? 'linear-gradient(135deg, #f59e0b, #d97706)' : 'linear-gradient(135deg, #ef4444, #dc2626)'}; border-radius: 15px; font-size: 24px; font-weight: 900; color: white; box-shadow: 0 4px 15px rgba(0,0,0,0.3);">
                        ${reputation.status} - ${reputation.trustScore}/100
                    </div>
                </div>
                <div class="detail-row">
                    <span class="detail-label">SSL/HTTPS</span>
                    <span class="detail-value">${reputation.hasSSL ? '✅ Sécurisé' : '❌ Non sécurisé'}</span>
                </div>
                ${reputation.suspiciousPatterns && reputation.suspiciousPatterns.length > 0 ? `
                <div class="detail-row">
                    <span class="detail-label">Patterns suspects</span>
                    <span class="detail-value">${reputation.suspiciousPatterns.length} détecté(s)</span>
                </div>
                ${reputation.suspiciousPatterns.map(p => `
                <div style="padding: 10px; background: rgba(239, 68, 68, 0.2); border-left: 3px solid #ef4444; border-radius: 8px; margin: 5px 0; color: rgba(255,255,255,0.9);">
                    ⚠️ ${p}
                </div>
                `).join('')}
                ` : '<div style="padding: 10px; background: rgba(16, 185, 129, 0.2); border-left: 3px solid #10b981; border-radius: 8px; color: rgba(255,255,255,0.9);">✅ Aucun pattern suspect détecté</div>'}
                ` : ''}
            </div>
            
            <div class="stat-grid">
                <div class="stat-item">
                    <div class="stat-item-label">📧 Emails Trouvés</div>
                    <div class="stat-item-value">${meta.emails ? meta.emails.length : 0}</div>
                </div>
                <div class="stat-item">
                    <div class="stat-item-label">📞 Téléphones</div>
                    <div class="stat-item-value">${meta.phones ? meta.phones.length : 0}</div>
                </div>
                <div class="stat-item">
                    <div class="stat-item-label">🔗 Réseaux Sociaux</div>
                    <div class="stat-item-value">${meta.socialLinks ? meta.socialLinks.length : 0}</div>
                </div>
                <div class="stat-item">
                    <div class="stat-item-label">🌐 Domaines Externes</div>
                    <div class="stat-item-value">${meta.externalDomains ? meta.externalDomains.length : 0}</div>
                </div>
            </div>
            
            ${meta.emails && meta.emails.length > 0 ? `
            <div class="stat-card">
                <h3>📧 Emails Extraits</h3>
                ${meta.emails.map(email => `
                <div class="detail-row">
                    <span class="detail-value" style="font-family: monospace;">${email}</span>
                </div>
                `).join('')}
            </div>
            ` : ''}
            
            ${meta.socialLinks && meta.socialLinks.length > 0 ? `
            <div class="stat-card">
                <h3>🔗 Liens Sociaux</h3>
                ${meta.socialLinks.slice(0, 10).map(link => `
                <div class="detail-row">
                    <span class="detail-value" style="word-break: break-all; font-size: 12px;">${link}</span>
                </div>
                `).join('')}
            </div>
            ` : ''}
            
            ${meta.apiEndpoints && meta.apiEndpoints.length > 0 ? `
            <div class="stat-card">
                <h3>🔌 API Endpoints Détectés</h3>
                ${meta.apiEndpoints.map(endpoint => `
                <div class="detail-row">
                    <span class="detail-value" style="font-family: monospace; font-size: 12px;">${endpoint}</span>
                </div>
                `).join('')}
            </div>
            ` : ''}
            
            ${meta.externalDomains && meta.externalDomains.length > 0 ? `
            <div class="stat-card">
                <h3>🌐 Domaines Externes (${meta.externalDomains.length})</h3>
                ${meta.externalDomains.slice(0, 15).map(domain => `
                <span class="tech-badge" style="background: linear-gradient(135deg, #6366f1, #8b5cf6); font-size: 11px;">${domain}</span>
                `).join('')}
            </div>
            ` : ''}
            
            ${ipIntel && ipIntel.geolocation && ipIntel.geolocation.country ? `
            <div class="stat-card">
                <h3>📍 Géolocalisation IP</h3>
                <div class="detail-row">
                    <span class="detail-label">Pays</span>
                    <span class="detail-value">${ipIntel.geolocation.country}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Région</span>
                    <span class="detail-value">${ipIntel.geolocation.region}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Ville</span>
                    <span class="detail-value">${ipIntel.geolocation.city}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Coordonnées</span>
                    <span class="detail-value">${ipIntel.geolocation.latitude}, ${ipIntel.geolocation.longitude}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Timezone</span>
                    <span class="detail-value">${ipIntel.geolocation.timezone}</span>
                </div>
                ${ipIntel.threat !== 'None' ? `
                <div style="padding: 10px; background: rgba(239, 68, 68, 0.2); border-left: 3px solid #ef4444; border-radius: 8px; margin-top: 10px; color: rgba(255,255,255,0.9);">
                    🚨 Threat: ${ipIntel.threat}
                </div>
                ` : ''}
            </div>
            ` : ''}
        `;
    }
    
    // VULNÉRABILITÉS
    if (results.externalData && results.externalData.vulnerabilities) {
        const vulns = results.externalData.vulnerabilities;
        
        document.getElementById('panel-vulnerabilities').innerHTML = `
            <div style="text-align: center;">
                <div class="score-circle" style="--percentage: ${vulns.score * 3.6}deg;">
                    <span class="score-circle-text">${vulns.score}</span>
                </div>
                <h3 style="color: white;">Score Sécurité sur 100</h3>
                <div style="margin-top: 20px; padding: 15px; background: ${vulns.riskLevel === 'Low' ? 'rgba(16, 185, 129, 0.2)' : vulns.riskLevel === 'Medium' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(239, 68, 68, 0.2)'}; border-radius: 15px; display: inline-block;">
                    <span style="font-size: 20px; font-weight: 700; color: white;">Niveau de Risque: ${vulns.riskLevel === 'Low' ? '🟢 Faible' : vulns.riskLevel === 'Medium' ? '🟡 Moyen' : '🔴 Élevé'}</span>
                </div>
            </div>
            
            <div class="stat-card">
                <h3>🔍 Vulnérabilités Détectées (${vulns.detected.length})</h3>
                ${vulns.detected.length > 0 ? vulns.detected.map(vuln => `
                <div style="padding: 15px; background: ${vuln.severity === 'High' ? 'rgba(239, 68, 68, 0.15)' : vuln.severity === 'Medium' ? 'rgba(245, 158, 11, 0.15)' : 'rgba(59, 130, 246, 0.15)'}; border-left: 4px solid ${vuln.severity === 'High' ? '#ef4444' : vuln.severity === 'Medium' ? '#f59e0b' : '#3b82f6'}; border-radius: 10px; margin-bottom: 12px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                        <span style="font-weight: 700; color: white; font-size: 16px;">${vuln.name}</span>
                        <span style="padding: 5px 12px; background: ${vuln.severity === 'High' ? '#ef4444' : vuln.severity === 'Medium' ? '#f59e0b' : '#3b82f6'}; border-radius: 12px; font-size: 11px; font-weight: 700; color: white;">${vuln.severity}</span>
                    </div>
                    <div style="color: rgba(255,255,255,0.7); font-size: 13px; margin-bottom: 5px;">Type: ${vuln.type}</div>
                    <div style="color: rgba(255,255,255,0.8); font-size: 14px;">${vuln.description}</div>
                </div>
                `).join('') : '<div style="padding: 20px; text-align: center; color: rgba(255,255,255,0.6);">✅ Aucune vulnérabilité détectée</div>'}
            </div>
            
            <div class="stat-card">
                <h3>🛡️ Recommandations de Sécurité</h3>
                ${vulns.detected.filter(v => v.severity === 'High').length > 0 ? `
                <div class="recommendation-item" style="background: rgba(239, 68, 68, 0.2); border-left-color: #ef4444;">
                    🚨 Corriger immédiatement les vulnérabilités CRITIQUES détectées
                </div>
                ` : ''}
                ${vulns.detected.filter(v => v.type === 'Outdated Library').length > 0 ? `
                <div class="recommendation-item">
                    ⚠️ Mettre à jour les bibliothèques obsolètes
                </div>
                ` : ''}
                ${vulns.detected.filter(v => v.type === 'Mixed Content').length > 0 ? `
                <div class="recommendation-item">
                    ⚠️ Corriger le mixed content (HTTP/HTTPS)
                </div>
                ` : ''}
                ${vulns.detected.filter(v => v.type === 'Information Disclosure').length > 0 ? `
                <div class="recommendation-item">
                    ⚠️ Sécuriser les fichiers sensibles exposés
                </div>
                ` : ''}
                ${vulns.score >= 90 ? `
                <div class="recommendation-item success">
                    ✅ Excellente posture de sécurité !
                </div>
                ` : ''}
            </div>
        `;
    }
}

// Fonction principale d'analyse
async function startAnalysis() {
    const btn = document.getElementById('analyze-btn');
    
    if (!btn) {
        console.error('Interface non trouvée. Réinjectez le script.');
        return;
    }

    // Désactiver le bouton
    btn.disabled = true;
    btn.innerHTML = '<span class="spinner"></span> Analyse en cours...';

    try {
        const url = window.location.href;
        console.clear();
        console.log('%c╔══════════════════════════════════════════════════════════╗', 'color: #667eea; font-weight: bold;');
        console.log('%c║           🔍 ANALYSEUR WEB - RAPPORT COMPLET            ║', 'color: #667eea; font-weight: bold;');
        console.log('%c╚══════════════════════════════════════════════════════════╝', 'color: #667eea; font-weight: bold;');
        console.log('');

        const analyzer = new WebsiteAnalyzer(url);
        await analyzer.analyze();
        analyzer.generateReport();

        // Afficher les résultats dans l'interface
        displayResults(analyzer);

        btn.disabled = false;
        btn.innerHTML = '🔄 Re-analyser';

        // Message dans la console
        console.log('');
        console.log('%c💾 Export JSON disponible:', 'color: #667eea; font-weight: bold;');
        console.log('   Tapez: copy(lastAnalyzer.exportJSON())');
        console.log('');
        console.log('%c📊 Résultats accessibles via:', 'color: #667eea; font-weight: bold;');
        console.log('   lastAnalyzer.results');
        console.log('');

        // Sauvegarder pour accès global
        window.lastAnalyzer = analyzer;

        return analyzer;

    } catch (error) {
        console.error('❌ Erreur lors de l\'analyse:', error);
        document.getElementById('home-content').innerHTML = `
            <div style="text-align: center; padding: 40px; color: #dc3545;">
                <div style="font-size: 64px; margin-bottom: 20px;">❌</div>
                <h3>Erreur lors de l'analyse</h3>
                <p>${error.message}</p>
            </div>
        `;
        btn.disabled = false;
        btn.innerHTML = '🔄 Réessayer';
        throw error;
    }
}

// Attacher l'événement au bouton
setTimeout(() => {
    const btn = document.getElementById('analyze-btn');
    if (btn) {
        btn.addEventListener('click', startAnalysis);
    }
}, 100);

// Fonction d'export rapide
function exportAnalysis() {
    if (window.lastAnalyzer) {
        const json = window.lastAnalyzer.exportJSON();
        copy(json);
        console.log('✅ Résultats copiés dans le presse-papier!');
        return json;
    } else {
        console.log('⚠️ Aucune analyse disponible. Lancez d\'abord une analyse.');
        return null;
    }
}

console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #667eea;');
console.log('%c🚀 Commandes disponibles:', 'color: #667eea; font-weight: bold;');
console.log('%c   • startAnalysis()      - Lancer l\'analyse', 'color: #666;');
console.log('%c   • exportAnalysis()     - Exporter en JSON', 'color: #666;');
console.log('%c   • lastAnalyzer.results - Voir les résultats', 'color: #666;');
console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #667eea;');
