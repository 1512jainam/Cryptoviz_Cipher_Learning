class AffinePage {
    constructor() {
        this.init();
    }
    
    init() {
        document.getElementById('app').innerHTML = `
<style>
  .cyber-dotted {
    border-width: 3px !important;
    border-style: dashed !important;
    border-color: #00d4ff !important;
    background: linear-gradient(135deg, #0a192f 0%, #112d42 100%);
    transition: border-color 0.3s, box-shadow 0.3s;
  }
  .cyber-dotted.active {
    border-color: #10b981 !important;
    box-shadow: 0 0 0 4px #10b98133;
  }
  .cyber-fadein {
    opacity: 0;
    transform: translateY(60px);
    transition: opacity 1s cubic-bezier(.4,2,.3,1), transform 1s cubic-bezier(.4,2,.3,1);
    will-change: opacity, transform;
  }
  .cyber-fadein.visible {
    opacity: 1;
    transform: translateY(0);
  }
  .cyber-dark-green {
    background: linear-gradient(135deg,rgb(72, 200, 255) 0%, #1a4730 100%);
  }
  .cyber-dark-blue {
    background: linear-gradient(135deg,rgb(72, 200, 255) 0%, #1a4730 100%);
  }
  .cyber-btn-blue {
    background: linear-gradient(90deg,rgb(18, 176, 211) 0%,rgb(18, 114, 134) 100%);
    color: #fff !important;
    border: none;
    box-shadow: 0 2px 12px 0 rgb(3, 197, 236);
  }
  .cyber-btn-blue:hover {
    background: linear-gradient(90deg, #00d4ff 0%,rgb(9, 28, 42) 100%);
    box-shadow: 0 4px 24px 0 #00d4ff55;
  }
  .cyber-btn-green {
    background: linear-gradient(90deg, #1a4730 0%, #10b981 100%);
    color: #fff !important;
    border: none;
    box-shadow: 0 2px 12px 0 #10b98133;
  }
  .cyber-btn-green:hover {
    background: linear-gradient(90deg, #10b981 0%, #1a4730 100%);
    box-shadow: 0 4px 24px 0 #10b98155;
  }
  .cyber-btn-orange {
    background: linear-gradient(90deg, #f59e0b 0%, #ff5858 100%);
    color: #fff !important;
    border: none;
    box-shadow: 0 2px 12px 0 #f59e0b33;
  }
  .cyber-btn-orange:hover {
    background: linear-gradient(90deg, #ff5858 0%, #f59e0b 100%);
    box-shadow: 0 4px 24px 0 #f59e0b55;
  }
  .key-display {
    font-family: 'JetBrains Mono', monospace;
    font-size: 14px;
    line-height: 1.8;
    background: linear-gradient(135deg, #0a192f 0%, #112d42 100%);
    border: 2px solid #00d4ff;
    border-radius: 8px;
    padding: 16px;
    margin: 16px 0;
    overflow-x: auto;
  }
  .key-row {
    display: flex;
    align-items: center;
    margin: 4px 0;
    min-height: 24px;
  }
  .key-label {
    background: linear-gradient(135deg, #c084fc 0%, #9333ea 100%);
    color: white;
    padding: 4px 8px;
    border-radius: 4px;
    font-weight: bold;
    margin-right: 12px;
    min-width: 80px;
    text-align: center;
    font-size: 12px;
  }
  .key-content {
    font-family: 'JetBrains Mono', monospace;
    color: #00d4ff;
    letter-spacing: 2px;
    font-weight: bold;
  }
  .key-char {
    display: inline-block;
    width: 20px;
    text-align: center;
    padding: 2px;
    margin: 0 1px;
    border-radius: 3px;
    transition: all 0.3s ease;
  }
  .key-char.text {
    background: linear-gradient(135deg, #00d4ff 0%, #0284c7 100%);
    color: white;
  }
  .key-char.key {
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    color: white;
  }
  .key-char.result {
    background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
    color: white;
  }
  .key-char.empty {
    color: #374151;
  }
  .key-strength {
    background: linear-gradient(135deg, #1a4730 0%, #10b981 100%);
    color: white;
    padding: 8px 12px;
    border-radius: 6px;
    font-weight: bold;
    margin-left: 12px;
    font-size: 14px;
    text-transform: uppercase;
  }
  .key-strength.weak {
    background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
  }
  .key-strength.medium {
    background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
  }
  .key-strength.strong {
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  }
  .affine-grid {
    display: grid;
    grid-template-columns: repeat(13, 1fr);
    gap: 2px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 12px;
    margin: 16px 0;
  }
  .affine-cell {
    background: linear-gradient(135deg, #0a192f 0%, #112d42 100%);
    border: 1px solid #00d4ff;
    padding: 4px;
    text-align: center;
    border-radius: 4px;
    color: white;
    font-weight: bold;
    min-height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .affine-cell.header {
    background: linear-gradient(135deg, #c084fc 0%, #9333ea 100%);
  }
  .affine-cell.original {
    background: linear-gradient(135deg, #00d4ff 0%, #0284c7 100%);
  }
  .affine-cell.encrypted {
    background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
  }
  .params-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }
</style>
<div class="max-w-4xl mx-auto mt-10 bg-dark-card p-8 rounded-xl border border-dark-border">
  <h1 class="text-4xl font-extrabold mb-6 text-cyber-green font-['JetBrains_Mono','Inter',monospace] tracking-tight">Affine Cipher</h1>
  <div class="mb-8">
    <label class="block mb-2 text-lg font-semibold">Message Animation:</label>
    <div class="flex items-center gap-4 mb-4">
      <div id="sender" class="w-16 h-16 rounded-full cyber-dark-blue flex items-center justify-center text-3xl shadow-lg">👤</div>
      <div class="flex-1 relative h-4">
        <div id="messageBall" class="absolute left-0 top-[-12px] w-8 h-8 rounded-full cyber-dark-green flex items-center justify-center text-white text-lg opacity-0 transition-all duration-700 shadow-lg">✉️</div>
        <div class="w-full h-1 bg-gradient-to-r from-cyber-blue to-cyber-green rounded-full"></div>
      </div>
      <div id="receiver" class="w-16 h-16 rounded-full cyber-dark-green flex items-center justify-center text-3xl shadow-lg">👥</div>
    </div>
  </div>
  <div class="mb-6">
    <label class="block mb-2 text-lg font-semibold">Affine Parameters:</label>
    <div class="params-grid">
      <div>
        <label class="block mb-1 text-sm font-medium">Key A (multiplier):</label>
        <input type="number" id="keyA" class="w-full bg-dark-bg border border-dark-border rounded p-2 text-white font-mono text-lg" placeholder="5" min="1" max="25" value="5" />
      </div>
      <div>
        <label class="block mb-1 text-sm font-medium">Key B (shift):</label>
        <input type="number" id="keyB" class="w-full bg-dark-bg border border-dark-border rounded p-2 text-white font-mono text-lg" placeholder="8" min="0" max="25" value="8" />
      </div>
    </div>
    <div class="flex items-center gap-4 mt-4">
      <div id="keyStrength" class="key-strength">Valid</div>
      <div id="keyValidation" class="text-sm text-cyber-purple font-mono"></div>
    </div>
  </div>
  <div class="mb-4 flex justify-end">
    <div class="flex items-end gap-4">
      <label class="inline-flex items-center text-lg font-semibold">
        <input type="checkbox" id="preserveSpaces" class="mr-2" /> Preserve Spaces
      </label>
      <label class="inline-flex items-center text-lg font-semibold">
        <input type="checkbox" id="caseSensitive" class="mr-2" /> Case Sensitive
      </label>
    </div>
  </div>
  <div class="mb-4">
    <label class="block mb-2 text-lg font-semibold">Message:</label>
    <textarea id="inputText" rows="3" class="w-full bg-dark-bg border border-dark-border rounded p-2 text-white font-mono text-lg" placeholder="Type your message here..."></textarea>
  </div>
  <div class="mb-4 flex gap-4">
    <button id="encryptBtn" class="flex-1 cyber-btn-blue px-4 py-2 rounded shadow-md hover:scale-105 transition text-lg font-bold font-['JetBrains_Mono','Inter',monospace]">Encrypt</button>
    <button id="decryptBtn" class="flex-1 cyber-btn-orange px-4 py-2 rounded shadow-md hover:scale-105 transition text-lg font-bold font-['JetBrains_Mono','Inter',monospace]">Decrypt</button>
  </div>
  <div class="mb-4">
    <label class="block mb-2 text-lg font-semibold">Result:</label>
    <div id="result" class="bg-dark-bg border border-dark-border rounded p-2 text-cyber-purple font-mono text-lg min-h-[40px]"></div>
  </div>
  <div class="mb-8">
    <label class="block mb-2 text-lg font-semibold">Upload Text File:</label>
    <div id="dropArea" tabindex="0" class="cyber-dotted flex flex-col md:flex-row gap-2 items-stretch text-center cursor-pointer transition hover:border-cyber-purple focus:border-cyber-purple outline-none p-6">
      <input type="file" id="fileInput" accept=".txt" class="hidden" />
      <span id="fileLabel" class="flex-1 text-cyber-blue font-semibold text-lg select-none">Drag & Drop or <span class="underline">Choose File</span></span>
      <span id="fileName" class="flex-1 text-cyber-green font-mono text-base hidden"></span>
      <button id="encryptFileBtn" class="cyber-btn-green px-4 py-2 rounded-lg shadow-md hover:scale-105 transition text-lg font-bold font-['JetBrains_Mono','Inter',monospace]">Encrypt File</button>
      <button id="decryptFileBtn" class="cyber-btn-orange px-4 py-2 rounded-lg shadow-md hover:scale-105 transition text-lg font-bold font-['JetBrains_Mono','Inter',monospace]">Decrypt File</button>
    </div>
  </div>
  <div class="mt-8 flex flex-col gap-6">
    <div class="cyber-fadein" id="readMoreFade">
      <div class="p-4 bg-dark-bg border border-dark-border rounded text-base leading-relaxed font-['Inter',sans-serif]">
        <h2 class="text-xl font-bold mb-2 text-cyber-blue font-['JetBrains_Mono','Inter',monospace]">Cipher Principle</h2>
        <p class="mb-2">The <b>Affine Cipher</b> is a type of monoalphabetic substitution cipher where each letter is mapped to another letter using a mathematical function.</p>
        <p class="mb-2"><b>Encryption Formula:</b> <span class="font-mono text-cyber-green">E(x) = (ax + b) mod 26</span></p>
        <p class="mb-2"><b>Decryption Formula:</b> <span class="font-mono text-cyber-orange">D(y) = a⁻¹(y - b) mod 26</span></p>
        <p class="mb-2"><b>Example:</b> With a=<span class="font-mono text-cyber-green">5</span>, b=<span class="font-mono text-cyber-green">8</span> and message <span class="font-mono text-cyber-orange">HELLO</span>:</p>
        <pre class="bg-dark-bg p-2 rounded mb-2 font-mono text-base text-cyber-green">H(7) → (5×7+8) mod 26 = 17 → R
E(4) → (5×4+8) mod 26 = 2 → C
L(11) → (5×11+8) mod 26 = 11 → L
Result: RCCXS</pre>
        <p>Key A must be coprime to 26 (gcd(a, 26) = 1) for the cipher to work correctly.</p>
      </div>
    </div>
    <div class="cyber-fadein" id="visualizationFade">
      <div class="p-4 bg-dark-bg border border-dark-border rounded text-base font-mono">
        <h2 class="text-xl font-bold mb-2 text-cyber-blue font-['JetBrains_Mono','Inter',monospace]">Encryption Visualization</h2>
        <div id="keyVis" class="key-display"></div>
      </div>
    </div>
  </div>
</div>
`;
        this.setupHandlers();
        this.setupFileDragDrop();
        this.setupFadeInOnScroll();
        this.updateKeyDisplay();
        this.updateKeyValidation();
    }

    gcd(a, b) {
        while (b !== 0) {
            let temp = b;
            b = a % b;
            a = temp;
        }
        return a;
    }
    

    modInverse(a, m) {
        for (let i = 1; i < m; i++) {
            if ((a * i) % m === 1) {
                return i;
            }
        }
        return -1;
    }
    

    affineEncrypt(text, a, b, preserveSpaces, caseSensitive) {
        if (this.gcd(a, 26) !== 1) return text;
        
        let result = '';
        
        for (let i = 0; i < text.length; i++) {
            let char = text[i];
            
            if (!preserveSpaces && char === ' ') continue;
            
            if (char.match(/[a-zA-Z]/)) {
                const isUpperCase = char === char.toUpperCase();
                const charCode = caseSensitive && isUpperCase ? 
                    char.charCodeAt(0) - 65 : 
                    char.toLowerCase().charCodeAt(0) - 97;
                
                const encryptedCode = (a * charCode + b) % 26;
                const encryptedChar = String.fromCharCode(encryptedCode + (caseSensitive && isUpperCase ? 65 : 97));
                
                result += caseSensitive ? encryptedChar : 
                         (isUpperCase ? encryptedChar.toUpperCase() : encryptedChar);
            } else {
                result += char;
            }
        }
        
        return result;
    }
    

    affineDecrypt(text, a, b, preserveSpaces, caseSensitive) {
        const aInverse = this.modInverse(a, 26);
        if (aInverse === -1) return text;
        
        let result = '';
        
        for (let i = 0; i < text.length; i++) {
            let char = text[i];
            
            if (!preserveSpaces && char === ' ') continue;
            
            if (char.match(/[a-zA-Z]/)) {
                const isUpperCase = char === char.toUpperCase();
                const charCode = caseSensitive && isUpperCase ? 
                    char.charCodeAt(0) - 65 : 
                    char.toLowerCase().charCodeAt(0) - 97;
                
                const decryptedCode = (aInverse * (charCode - b + 26)) % 26;
                const decryptedChar = String.fromCharCode(decryptedCode + (caseSensitive && isUpperCase ? 65 : 97));
                
                result += caseSensitive ? decryptedChar : 
                         (isUpperCase ? decryptedChar.toUpperCase() : decryptedChar);
            } else {
                result += char;
            }
        }
        
        return result;
    }
    
    updateKeyValidation() {
        const a = parseInt(document.getElementById('keyA').value) || 1;
        const b = parseInt(document.getElementById('keyB').value) || 0;
        const strengthEl = document.getElementById('keyStrength');
        const validationEl = document.getElementById('keyValidation');
        
        const isValid = this.gcd(a, 26) === 1 && a >= 1 && a <= 25 && b >= 0 && b <= 25;
        
        if (isValid) {
            strengthEl.textContent = 'Valid';
            strengthEl.className = 'key-strength strong';
            validationEl.textContent = `gcd(${a}, 26) = ${this.gcd(a, 26)} `;
        } else {
            strengthEl.textContent = 'Invalid';
            strengthEl.className = 'key-strength weak';
            if (this.gcd(a, 26) !== 1) {
                validationEl.textContent = `gcd(${a}, 26) = ${this.gcd(a, 26)} X (must be 1)`;
            } else {
                validationEl.textContent = 'Parameters out of range';
            }
        }
    }
    
    updateKeyDisplay() {
        const a = parseInt(document.getElementById('keyA').value) || 5;
        const b = parseInt(document.getElementById('keyB').value) || 8;
        const text = document.getElementById('inputText').value || 'HELLO';
        const preserveSpaces = document.getElementById('preserveSpaces').checked;
        const caseSensitive = document.getElementById('caseSensitive').checked;
        const keyVis = document.getElementById('keyVis');
        
        if (this.gcd(a, 26) !== 1) {
            keyVis.innerHTML = '<div class="text-center text-cyber-purple">Key A must be coprime to 26</div>';
            return;
        }
        
        const processedText = preserveSpaces ? text : text.replace(/\s+/g, '');
        
        if (processedText.length === 0) {
            keyVis.innerHTML = '<div class="text-center text-cyber-purple">Enter text to see visualization</div>';
            return;
        }
        

        let html = '<div class="key-row">';
        html += '<div class="key-label">Formula</div>';
        html += `<div class="key-content">E(x) = (${a}x + ${b}) mod 26</div>`;
        html += '</div>';
        

        html += '<div class="affine-grid">';
        

        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        html += '<div class="affine-cell header">Orig</div>';
        for (let i = 0; i < 12; i++) {
            html += `<div class="affine-cell header">${alphabet[i]}</div>`;
        }
        

        html += '<div class="affine-cell header">Pos</div>';
        for (let i = 0; i < 12; i++) {
            html += `<div class="affine-cell original">${i}</div>`;
        }
        

        html += '<div class="affine-cell header">New</div>';
        for (let i = 0; i < 12; i++) {
            const encrypted = (a * i + b) % 26;
            html += `<div class="affine-cell encrypted">${encrypted}</div>`;
        }
        

        html += '<div class="affine-cell header">Enc</div>';
        for (let i = 0; i < 12; i++) {
            const encrypted = (a * i + b) % 26;
            html += `<div class="affine-cell encrypted">${alphabet[encrypted]}</div>`;
        }
        

        html += '<div class="affine-cell header">Orig</div>';
        for (let i = 13; i < 25; i++) {
            html += `<div class="affine-cell header">${alphabet[i]}</div>`;
        }
        html += '<div class="affine-cell header">Z</div>';
        
        html += '<div class="affine-cell header">Pos</div>';
        for (let i = 13; i < 25; i++) {
            html += `<div class="affine-cell original">${i}</div>`;
        }
        html += '<div class="affine-cell original">25</div>';
        
        html += '<div class="affine-cell header">New</div>';
        for (let i = 13; i < 25; i++) {
            const encrypted = (a * i + b) % 26;
            html += `<div class="affine-cell encrypted">${encrypted}</div>`;
        }
        const encryptedZ = (a * 25 + b) % 26;
        html += `<div class="affine-cell encrypted">${encryptedZ}</div>`;
        
        html += '<div class="affine-cell header">Enc</div>';
        for (let i = 13; i < 25; i++) {
            const encrypted = (a * i + b) % 26;
            html += `<div class="affine-cell encrypted">${alphabet[encrypted]}</div>`;
        }
        html += `<div class="affine-cell encrypted">${alphabet[encryptedZ]}</div>`;
        
        html += '</div>';
        

        const firstChars = processedText.slice(0, 10).split('').filter(c => c.match(/[a-zA-Z]/));
        if (firstChars.length > 0) {
            html += '<div class="key-row">';
            html += '<div class="key-label">Example</div>';
            html += '<div class="key-content">';
            
            firstChars.forEach(char => {
                const upperChar = char.toUpperCase();
                const pos = upperChar.charCodeAt(0) - 65;
                const newPos = (a * pos + b) % 26;
                const newChar = String.fromCharCode(newPos + 65);
                html += `<span class="key-char text">${upperChar}</span>`;
                html += `<span class="text-cyber-purple">→</span>`;
                html += `<span class="key-char result">${newChar}</span>`;
                html += `<span style="margin-right: 8px;"></span>`;
            });
            html += '</div></div>';
        }
        
        keyVis.innerHTML = html;
    }
    
    animateMessage() {
        const ball = document.getElementById('messageBall');
        ball.style.opacity = 1;
        ball.style.left = '0';
        setTimeout(() => {
            ball.style.left = 'calc(100% - 32px)';
        }, 100);
        setTimeout(() => {
            ball.style.opacity = 0;
            ball.style.left = '0';
        }, 900);
    }
    
    setupFileDragDrop() {
        const dropArea = document.getElementById('dropArea');
        const fileInput = document.getElementById('fileInput');
        const fileLabel = document.getElementById('fileLabel');
        const fileName = document.getElementById('fileName');
        
        dropArea.addEventListener('click', (e) => {
            if (e.target === dropArea || e.target === fileLabel) fileInput.click();
        });
        
        dropArea.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') fileInput.click();
        });
        
        fileInput.addEventListener('change', () => {
            if (fileInput.files.length > 0) {
                fileName.textContent = fileInput.files[0].name;
                fileName.classList.remove('hidden');
                fileLabel.classList.add('hidden');
            } else {
                fileName.classList.add('hidden');
                fileLabel.classList.remove('hidden');
            }
        });
        
        dropArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropArea.classList.add('active');
        });
        
        dropArea.addEventListener('dragleave', (e) => {
            e.preventDefault();
            dropArea.classList.remove('active');
        });
        
        dropArea.addEventListener('drop', (e) => {
            e.preventDefault();
            dropArea.classList.remove('active');
            if (e.dataTransfer.files.length > 0) {
                fileInput.files = e.dataTransfer.files;
                fileInput.dispatchEvent(new Event('change'));
            }
        });
    }
    
    setupFadeInOnScroll() {
        const fadeEls = [document.getElementById('readMoreFade'), document.getElementById('visualizationFade')];
        const observer = new window.IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        fadeEls.forEach(el => { if (el) observer.observe(el); });
    }
    
    setupHandlers() {
        const keyA = document.getElementById('keyA');
        const keyB = document.getElementById('keyB');
        const inputText = document.getElementById('inputText');
        const preserveSpaces = document.getElementById('preserveSpaces');
        const caseSensitive = document.getElementById('caseSensitive');
        
        const updateDisplays = () => {
            this.updateKeyDisplay();
            this.updateKeyValidation();
        };
        
        keyA.addEventListener('input', updateDisplays);
        keyB.addEventListener('input', updateDisplays);
        inputText.addEventListener('input', () => this.updateKeyDisplay());
        preserveSpaces.addEventListener('change', () => this.updateKeyDisplay());
        caseSensitive.addEventListener('change', () => this.updateKeyDisplay());
        
        const getParams = () => ({
            a: parseInt(keyA.value) || 5,
            b: parseInt(keyB.value) || 8,
            preserveSpaces: preserveSpaces.checked,
            caseSensitive: caseSensitive.checked
        });
        
        document.getElementById('encryptBtn').onclick = () => {
            const text = inputText.value;
            const { a, b, preserveSpaces, caseSensitive } = getParams();
            
            if (!text.trim()) return;
            if (this.gcd(a, 26) !== 1) return alert('Key A must be coprime to 26.');
            
            const result = this.affineEncrypt(text, a, b, preserveSpaces, caseSensitive);
            document.getElementById('result').textContent = result;
            this.animateMessage();
        };
        
        document.getElementById('decryptBtn').onclick = () => {
            const text = inputText.value;
            const { a, b, preserveSpaces, caseSensitive } = getParams();
            
            if (!text.trim()) return;
            if (this.gcd(a, 26) !== 1) return alert('Key A must be coprime to 26.');
            
            const result = this.affineDecrypt(text, a, b, preserveSpaces, caseSensitive);
            document.getElementById('result').textContent = result;
            this.animateMessage();
        };
        
        document.getElementById('encryptFileBtn').onclick = async () => {
            const fileInput = document.getElementById('fileInput');
            const { a, b, preserveSpaces, caseSensitive } = getParams();
            
            if (fileInput.files.length === 0) return alert('Please select a file.');
            if (this.gcd(a, 26) !== 1) return alert('Key A must be coprime to 26.');
            
            const file = fileInput.files[0];
            const text = await file.text();
            const encrypted = this.affineEncrypt(text, a, b, preserveSpaces, caseSensitive);
            this.downloadFile(encrypted, 'encrypted_affine.txt');
            this.animateMessage();
        };
        
        document.getElementById('decryptFileBtn').onclick = async () => {
            const fileInput = document.getElementById('fileInput');
            const { a, b, preserveSpaces, caseSensitive } = getParams();
            
            if (fileInput.files.length === 0) return alert('Please select a file.');
            if (this.gcd(a, 26) !== 1) return alert('Key A must be coprime to 26.');
            
            const file = fileInput.files[0];
            const text = await file.text();
            const decrypted = this.affineDecrypt(text, a, b, preserveSpaces, caseSensitive);
            this.downloadFile(decrypted, 'decrypted_affine.txt');
            this.animateMessage();
        };
    }
    
    downloadFile(content, filename) {
        const blob = new Blob([content], { type: 'text/plain' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = filename;
        a.click();
        URL.revokeObjectURL(a.href);
    }
}

window.onload = () => new AffinePage();