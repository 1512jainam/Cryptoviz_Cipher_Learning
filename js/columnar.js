class ColumnarPage {
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
  .columnar-grid {
    display: grid;
    gap: 2px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 14px;
    margin: 16px 0;
  }
  .columnar-cell {
    background: linear-gradient(135deg, #0a192f 0%, #112d42 100%);
    border: 1px solid #00d4ff;
    padding: 8px;
    text-align: center;
    border-radius: 4px;
    color: white;
    font-weight: bold;
  }
  .columnar-cell.header {
    background: linear-gradient(135deg, #c084fc 0%, #9333ea 100%);
  }
  .columnar-cell.data {
    background: linear-gradient(135deg, #00d4ff 0%, #0284c7 100%);
  }
  .columnar-cell.result {
    background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
  }
</style>
<div class="max-w-4xl mx-auto mt-10 bg-dark-card p-8 rounded-xl border border-dark-border">
  <h1 class="text-4xl font-extrabold mb-6 text-cyber-green font-['JetBrains_Mono','Inter',monospace] tracking-tight">Columnar Transposition Cipher</h1>
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
    <label class="block mb-2 text-lg font-semibold">Key (Column Order):</label>
    <div class="flex gap-4 items-center">
      <input type="text" id="keyInput" class="flex-1 bg-dark-bg border border-dark-border rounded p-2 text-white font-mono text-lg" placeholder="Enter key (e.g., CRYPTO)" />
      <div id="keyStrength" class="key-strength">Enter Key</div>
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
        <p class="mb-2">The <b>Columnar Transposition Cipher</b> rearranges the plaintext by writing it in a grid and reading it column by column in a specific order determined by the key.</p>
        <p class="mb-2"><b>Example:</b> With key <span class="font-mono text-cyber-green">CRYPTO</span> and message <span class="font-mono text-cyber-orange">HELLO WORLD</span>:</p>
        <pre class="bg-dark-bg p-2 rounded mb-2 font-mono text-base text-cyber-green">Key order: C(1) R(4) Y(6) P(3) T(5) O(2)
Grid:      H E L L O W
           O R L D X X
Read by:   H O | W X | L D | E R | O X | L L </pre>
        <p>Characters are arranged in columns under the key, then read column by column in alphabetical order of the key letters.</p>
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
        this.updateKeyStrength();
    }
    

    getColumnOrder(key) {
        const keyChars = key.toUpperCase().split('');
        const indexed = keyChars.map((char, index) => ({ char, index }));
        indexed.sort((a, b) => {
            if (a.char === b.char) {
                return a.index - b.index;
            }
            return a.char.localeCompare(b.char);
        });
        
        const order = new Array(keyChars.length);
        for (let i = 0; i < indexed.length; i++) {
            order[indexed[i].index] = i + 1;
        }
        
        return order;
    }
    

    columnarEncrypt(text, key, preserveSpaces, caseSensitive) {
        if (!key || key.length === 0) return text;
        
        const processedText = preserveSpaces ? text : text.replace(/\s+/g, '');
        const processedKey = caseSensitive ? key : key.toUpperCase();
        const keyLength = processedKey.length;
        
        let paddedText = processedText;
        const remainder = paddedText.length % keyLength;
        if (remainder !== 0) {
            const padding = keyLength - remainder;
            paddedText += 'X'.repeat(padding);
        }
        
        const rows = paddedText.length / keyLength;
        const grid = Array(rows).fill(null).map(() => Array(keyLength).fill(''));
        
        for (let i = 0; i < paddedText.length; i++) {
            const row = Math.floor(i / keyLength);
            const col = i % keyLength;
            grid[row][col] = paddedText[i];
        }
        
        const columnOrder = this.getColumnOrder(processedKey);
        let result = '';
        
        for (let order = 1; order <= keyLength; order++) {
            const colIndex = columnOrder.indexOf(order);
            for (let row = 0; row < rows; row++) {
                result += grid[row][colIndex];
            }
        }
        
        return result;
    }
    columnarDecrypt(text, key, preserveSpaces, caseSensitive) {
        if (!key || key.length === 0) return text;
        
        const processedKey = caseSensitive ? key : key.toUpperCase();
        const keyLength = processedKey.length;
        const rows = Math.ceil(text.length / keyLength);
        
        const columnLengths = Array(keyLength).fill(rows);
        const remainder = text.length % keyLength;
        if (remainder !== 0) {
            for (let i = remainder; i < keyLength; i++) {
                columnLengths[i] = rows - 1;
            }
        }
        
        const columnOrder = this.getColumnOrder(processedKey);
        const grid = Array(rows).fill(null).map(() => Array(keyLength).fill(''));
        
        let textIndex = 0;
        for (let order = 1; order <= keyLength; order++) {
            const colIndex = columnOrder.indexOf(order);
            for (let row = 0; row < columnLengths[colIndex]; row++) {
                if (textIndex < text.length) {
                    grid[row][colIndex] = text[textIndex++];
                }
            }
        }
        
        let result = '';
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < keyLength; col++) {
                if (grid[row][col]) {
                    result += grid[row][col];
                }
            }
        }
        
        result = result.replace(/X+$/, '');
        
        return result;
    }
    
    updateKeyStrength() {
        const key = document.getElementById('keyInput').value;
        const strengthEl = document.getElementById('keyStrength');
        
        if (!key) {
            strengthEl.textContent = 'Enter Key';
            strengthEl.className = 'key-strength';
            return;
        }
        
        let strength = 'weak';
        let label = 'Weak';
        
        if (key.length >= 8) {
            strength = 'strong';
            label = 'Strong';
        } else if (key.length >= 4) {
            strength = 'medium';
            label = 'Medium';
        }
        
        strengthEl.textContent = label;
        strengthEl.className = `key-strength ${strength}`;
    }
    
    updateKeyDisplay() {
        const key = document.getElementById('keyInput').value;
        const text = document.getElementById('inputText').value || 'HELLO WORLD';
        const preserveSpaces = document.getElementById('preserveSpaces').checked;
        const caseSensitive = document.getElementById('caseSensitive').checked;
        const keyVis = document.getElementById('keyVis');
        
        if (!key || key.length === 0) {
            keyVis.innerHTML = '<div class="text-center text-cyber-purple">Enter a key to see visualization</div>';
            return;
        }
        
        const processedText = preserveSpaces ? text : text.replace(/\s+/g, '');
        const processedKey = caseSensitive ? key : key.toUpperCase();
        
        if (processedText.length === 0) {
            keyVis.innerHTML = '<div class="text-center text-cyber-purple">Enter text to see visualization</div>';
            return;
        }
        
        const keyLength = processedKey.length;
        let paddedText = processedText;
        const remainder = paddedText.length % keyLength;
        if (remainder !== 0) {
            const padding = keyLength - remainder;
            paddedText += 'X'.repeat(padding);
        }
        const rows = paddedText.length / keyLength;
        const columnOrder = this.getColumnOrder(processedKey);
        

        let html = '<div class="columnar-grid" style="grid-template-columns: repeat(' + keyLength + ', 1fr);">';
        

        for (let i = 0; i < keyLength; i++) {
            html += `<div class="columnar-cell header">${processedKey[i]}<br><small>(${columnOrder[i]})</small></div>`;
        }
        

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < keyLength; col++) {
                const index = row * keyLength + col;
                const char = index < paddedText.length ? paddedText[index] : '';
                html += `<div class="columnar-cell data">${char || '·'}</div>`;
            }
        }
        
        html += '</div>';
        

        html += '<div class="key-row">';
        html += '<div class="key-label">Read Order</div>';
        html += '<div class="key-content">';
        
        const encrypted = this.columnarEncrypt(processedText, processedKey, preserveSpaces, caseSensitive);
        for (let i = 0; i < Math.min(encrypted.length, 20); i++) {
            html += `<span class="key-char result">${encrypted[i]}</span>`;
        }
        if (encrypted.length > 20) {
            html += '<span class="text-cyber-purple">...</span>';
        }
        html += '</div></div>';
        
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
        const keyInput = document.getElementById('keyInput');
        const inputText = document.getElementById('inputText');
        const preserveSpaces = document.getElementById('preserveSpaces');
        const caseSensitive = document.getElementById('caseSensitive');
        
        const updateDisplays = () => {
            this.updateKeyDisplay();
            this.updateKeyStrength();
        };
        
        keyInput.addEventListener('input', updateDisplays);
        inputText.addEventListener('input', () => this.updateKeyDisplay());
        preserveSpaces.addEventListener('change', () => this.updateKeyDisplay());
        caseSensitive.addEventListener('change', () => this.updateKeyDisplay());
        
        const getParams = () => ({
            key: keyInput.value,
            preserveSpaces: preserveSpaces.checked,
            caseSensitive: caseSensitive.checked
        });
        
        document.getElementById('encryptBtn').onclick = () => {
            const text = inputText.value;
            const { key, preserveSpaces, caseSensitive } = getParams();
            
            if (!text.trim()) return;
            if (!key) return alert('Please enter a key.');
            
            const result = this.columnarEncrypt(text, key, preserveSpaces, caseSensitive);
            document.getElementById('result').textContent = result;
            this.animateMessage();
        };
        
        document.getElementById('decryptBtn').onclick = () => {
            const text = inputText.value;
            const { key, preserveSpaces, caseSensitive } = getParams();
            
            if (!text.trim()) return;
            if (!key) return alert('Please enter a key.');
            
            const result = this.columnarDecrypt(text, key, preserveSpaces, caseSensitive);
            document.getElementById('result').textContent = result;
            this.animateMessage();
        };
        
        document.getElementById('encryptFileBtn').onclick = async () => {
            const fileInput = document.getElementById('fileInput');
            const { key, preserveSpaces, caseSensitive } = getParams();
            
            if (fileInput.files.length === 0) return alert('Please select a file.');
            if (!key) return alert('Please enter a key.');
            
            const file = fileInput.files[0];
            const text = await file.text();
            const encrypted = this.columnarEncrypt(text, key, preserveSpaces, caseSensitive);
            this.downloadFile(encrypted, 'encrypted_columnar.txt');
            this.animateMessage();
        };
        
        document.getElementById('decryptFileBtn').onclick = async () => {
            const fileInput = document.getElementById('fileInput');
            const { key, preserveSpaces, caseSensitive } = getParams();
            
            if (fileInput.files.length === 0) return alert('Please select a file.');
            if (!key) return alert('Please enter a key.');
            
            const file = fileInput.files[0];
            const text = await file.text();
            const decrypted = this.columnarDecrypt(text, key, preserveSpaces, caseSensitive);
            this.downloadFile(decrypted, 'decrypted_columnar.txt');
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

window.onload = () => new ColumnarPage();