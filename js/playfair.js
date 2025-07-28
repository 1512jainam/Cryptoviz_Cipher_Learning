class PlayfairPage {
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
  .playfair-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 2px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 16px;
    margin: 16px 0;
    max-width: 200px;
  }
  .playfair-cell {
    background: linear-gradient(135deg, #0a192f 0%, #112d42 100%);
    border: 2px solid #00d4ff;
    padding: 12px;
    text-align: center;
    border-radius: 6px;
    color: white;
    font-weight: bold;
    min-height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .playfair-cell.highlight {
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    border-color: #10b981;
    animation: pulse 1s infinite;
  }
  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
  }
  .bigram-display {
    display: flex;
    gap: 8px;
    margin: 8px 0;
    flex-wrap: wrap;
  }
  .bigram-pair {
    background: linear-gradient(135deg, #c084fc 0%, #9333ea 100%);
    color: white;
    padding: 4px 8px;
    border-radius: 4px;
    font-family: 'JetBrains Mono', monospace;
    font-weight: bold;
    min-width: 40px;
    text-align: center;
  }
  .bigram-pair.encrypted {
    background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
  }
</style>
<div class="max-w-4xl mx-auto mt-10 bg-dark-card p-8 rounded-xl border border-dark-border">
  <h1 class="text-4xl font-extrabold mb-6 text-cyber-green font-['JetBrains_Mono','Inter',monospace] tracking-tight">Playfair Cipher</h1>
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
    <label class="block mb-2 text-lg font-semibold">Key:</label>
    <div class="flex gap-4 items-center">
      <input type="text" id="keyInput" class="flex-1 bg-dark-bg border border-dark-border rounded p-2 text-white font-mono text-lg" placeholder="Enter key (e.g., PLAYFAIR)" />
      <div id="keyStrength" class="key-strength">Enter Key</div>
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
        <p class="mb-2">The <b>Playfair Cipher</b> encrypts pairs of letters (digrams) using a 5×5 grid filled with letters from the keyword. It replaces I/J as one letter.</p>
        <p class="mb-2"><b>Rules:</b></p>
        <ul class="list-disc ml-4 mb-2">
          <li>Same row: Move right (wrap around)</li>
          <li>Same column: Move down (wrap around)</li>
          <li>Rectangle: Swap column positions</li>
          <li>Identical pairs: Insert 'X' between them</li>
        </ul>
        <p><b>Example:</b> With key <span class="font-mono text-cyber-green">PLAYFAIR</span>, 'HE' becomes 'BM' and 'LL' becomes 'LXL'.</p>
      </div>
    </div>
    <div class="cyber-fadein" id="visualizationFade">
      <div class="p-4 bg-dark-bg border border-dark-border rounded text-base font-mono">
        <h2 class="text-xl font-bold mb-2 text-cyber-blue font-['JetBrains_Mono','Inter',monospace]">Encryption Visualization</h2>
        <div class="flex flex-col lg:flex-row gap-6">
          <div>
            <h3 class="text-lg font-bold mb-2 text-cyber-green">5×5 Grid</h3>
            <div id="playfairGrid" class="playfair-grid"></div>
          </div>
          <div class="flex-1">
            <div id="keyVis" class="key-display"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
`;
        this.setupHandlers();
        this.setupFileDragDrop();
        this.setupFadeInOnScroll();
        this.updateDisplay();
    }
    

    generatePlayfairGrid(key) {
        const alphabet = 'ABCDEFGHIKLMNOPQRSTUVWXYZ'; 
        const keyUpper = key.toUpperCase().replace(/[^A-Z]/g, '').replace(/J/g, 'I');
        const uniqueKey = [...new Set(keyUpper)];
        
        let grid = [];
        let usedLetters = new Set(uniqueKey);
        

        for (let letter of uniqueKey) {
            grid.push(letter);
        }
        

        for (let letter of alphabet) {
            if (!usedLetters.has(letter)) {
                grid.push(letter);
                usedLetters.add(letter);
            }
        }
        

        const result = [];
        for (let i = 0; i < 5; i++) {
            result.push(grid.slice(i * 5, (i + 1) * 5));
        }
        
        return result;
    }
    

    findPosition(grid, letter) {
        for (let row = 0; row < 5; row++) {
            for (let col = 0; col < 5; col++) {
                if (grid[row][col] === letter) {
                    return [row, col];
                }
            }
        }
        return null;
    }
    

    prepareText(text) {
        let prepared = text.toUpperCase().replace(/[^A-Z]/g, '').replace(/J/g, 'I');
        let result = '';
        
        for (let i = 0; i < prepared.length; i++) {
            result += prepared[i];
            

            if (i < prepared.length - 1 && prepared[i] === prepared[i + 1]) {
                result += 'X';
            }
        }
        

        if (result.length % 2 === 1) {
            result += 'X';
        }
        
        return result;
    }

    encryptPair(grid, char1, char2) {
        const pos1 = this.findPosition(grid, char1);
        const pos2 = this.findPosition(grid, char2);
        
        if (!pos1 || !pos2) return char1 + char2;
        
        const [row1, col1] = pos1;
        const [row2, col2] = pos2;
        
        if (row1 === row2) {

            return grid[row1][(col1 + 1) % 5] + grid[row2][(col2 + 1) % 5];
        } else if (col1 === col2) {

            return grid[(row1 + 1) % 5][col1] + grid[(row2 + 1) % 5][col2];
        } else {

            return grid[row1][col2] + grid[row2][col1];
        }
    }
    

    decryptPair(grid, char1, char2) {
        const pos1 = this.findPosition(grid, char1);
        const pos2 = this.findPosition(grid, char2);
        
        if (!pos1 || !pos2) return char1 + char2;
        
        const [row1, col1] = pos1;
        const [row2, col2] = pos2;
        
        if (row1 === row2) {

            return grid[row1][(col1 + 4) % 5] + grid[row2][(col2 + 4) % 5];
        } else if (col1 === col2) {

            return grid[(row1 + 4) % 5][col1] + grid[(row2 + 4) % 5][col2];
        } else {

            return grid[row1][col2] + grid[row2][col1];
        }
    }
    

    playfairEncrypt(text, key) {
        if (!key || key.length === 0) return text;
        
        const grid = this.generatePlayfairGrid(key);
        const prepared = this.prepareText(text);
        let result = '';
        
        for (let i = 0; i < prepared.length; i += 2) {
            const pair = this.encryptPair(grid, prepared[i], prepared[i + 1]);
            result += pair;
        }
        
        return result;
    }
    

    playfairDecrypt(text, key) {
        if (!key || key.length === 0) return text;
        
        const grid = this.generatePlayfairGrid(key);
        const prepared = text.toUpperCase().replace(/[^A-Z]/g, '');
        let result = '';
        
        for (let i = 0; i < prepared.length; i += 2) {
            if (i + 1 < prepared.length) {
                const pair = this.decryptPair(grid, prepared[i], prepared[i + 1]);
                result += pair;
            }
        }
        
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
        
        const uniqueChars = new Set(key.toUpperCase().replace(/[^A-Z]/g, ''));
        let strength = 'weak';
        let label = 'Weak';
        
        if (uniqueChars.size >= 10) {
            strength = 'strong';
            label = 'Strong';
        } else if (uniqueChars.size >= 6) {
            strength = 'medium';
            label = 'Medium';
        }
        
        strengthEl.textContent = label;
        strengthEl.className = `key-strength ${strength}`;
    }
    
    updateDisplay() {
        const key = document.getElementById('keyInput').value;
        const text = document.getElementById('inputText').value || 'HELLO';
        const keyVis = document.getElementById('keyVis');
        const gridEl = document.getElementById('playfairGrid');
        
        if (!key || key.length === 0) {
            keyVis.innerHTML = '<div class="text-center text-cyber-purple">Enter a key to see visualization</div>';
            gridEl.innerHTML = '';
            return;
        }
        
        const grid = this.generatePlayfairGrid(key);
        const prepared = this.prepareText(text);
        

        let gridHtml = '';
        for (let row = 0; row < 5; row++) {
            for (let col = 0; col < 5; col++) {
                gridHtml += `<div class="playfair-cell">${grid[row][col]}</div>`;
            }
        }
        gridEl.innerHTML = gridHtml;
        

        let html = '';
        

        html += '<div class="key-row">';
        html += '<div class="key-label">Prepared</div>';
        html += '<div class="key-content">';
        for (let i = 0; i < Math.min(prepared.length, 20); i++) {
            html += `<span class="key-char text">${prepared[i]}</span>`;
        }
        if (prepared.length > 20) {
            html += '<span class="text-cyber-purple">...</span>';
        }
        html += '</div></div>';
        

        html += '<div class="key-row">';
        html += '<div class="key-label">Bigrams</div>';
        html += '<div class="bigram-display">';
        for (let i = 0; i < Math.min(prepared.length, 20); i += 2) {
            if (i + 1 < prepared.length) {
                html += `<span class="bigram-pair">${prepared[i]}${prepared[i + 1]}</span>`;
            }
        }
        if (prepared.length > 20) {
            html += '<span class="text-cyber-purple">...</span>';
        }
        html += '</div></div>';
        

        const encrypted = this.playfairEncrypt(text, key);
        html += '<div class="key-row">';
        html += '<div class="key-label">Encrypted</div>';
        html += '<div class="bigram-display">';
        for (let i = 0; i < Math.min(encrypted.length, 20); i += 2) {
            if (i + 1 < encrypted.length) {
                html += `<span class="bigram-pair encrypted">${encrypted[i]}${encrypted[i + 1]}</span>`;
            }
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
        
        const updateDisplays = () => {
            this.updateDisplay();
            this.updateKeyStrength();
        };
        
        keyInput.addEventListener('input', updateDisplays);
        inputText.addEventListener
        keyInput.addEventListener('input', updateDisplays);
        inputText.addEventListener('input', () => this.updateDisplay());
        
        const getParams = () => ({
            key: keyInput.value
        });
        
        document.getElementById('encryptBtn').onclick = () => {
            const text = inputText.value;
            const { key } = getParams();
            
            if (!text.trim()) return;
            if (!key) return alert('Please enter a key.');
            
            const result = this.playfairEncrypt(text, key);
            document.getElementById('result').textContent = result;
            this.animateMessage();
        };
        
        document.getElementById('decryptBtn').onclick = () => {
            const text = inputText.value;
            const { key } = getParams();
            
            if (!text.trim()) return;
            if (!key) return alert('Please enter a key.');
            
            const result = this.playfairDecrypt(text, key);
            document.getElementById('result').textContent = result;
            this.animateMessage();
        };
        
        document.getElementById('encryptFileBtn').onclick = async () => {
            const fileInput = document.getElementById('fileInput');
            const { key } = getParams();
            
            if (fileInput.files.length === 0) return alert('Please select a file.');
            if (!key) return alert('Please enter a key.');
            
            const file = fileInput.files[0];
            const text = await file.text();
            const encrypted = this.playfairEncrypt(text, key);
            this.downloadFile(encrypted, 'encrypted_playfair.txt');
            this.animateMessage();
        };
        
        document.getElementById('decryptFileBtn').onclick = async () => {
            const fileInput = document.getElementById('fileInput');
            const { key } = getParams();
            
            if (fileInput.files.length === 0) return alert('Please select a file.');
            if (!key) return alert('Please enter a key.');
            
            const file = fileInput.files[0];
            const text = await file.text();
            const decrypted = this.playfairDecrypt(text, key);
            this.downloadFile(decrypted, 'decrypted_playfair.txt');
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
    

    generatePlayfairGrid(key) {
        const alphabet = 'ABCDEFGHIKLMNOPQRSTUVWXYZ'; 
        const keyLetters = key.toUpperCase().replace(/[^A-Z]/g, '').replace(/J/g, 'I');
        const used = new Set();
        const grid = [];
        

        let gridString = '';
        for (let char of keyLetters) {
            if (!used.has(char)) {
                used.add(char);
                gridString += char;
            }
        }
        

        for (let char of alphabet) {
            if (!used.has(char)) {
                gridString += char;
            }
        }
        

        for (let i = 0; i < 5; i++) {
            grid[i] = [];
            for (let j = 0; j < 5; j++) {
                grid[i][j] = gridString[i * 5 + j];
            }
        }
        
        return grid;
    }
    

    findPosition(grid, char) {
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                if (grid[i][j] === char) {
                    return [i, j];
                }
            }
        }
        return null;
    }
    

    prepareText(text) {
        let prepared = text.toUpperCase().replace(/[^A-Z]/g, '').replace(/J/g, 'I');
        let result = '';
        
        for (let i = 0; i < prepared.length; i++) {
            result += prepared[i];
            

            if (i < prepared.length - 1 && prepared[i] === prepared[i + 1]) {
                result += 'X';
            }
        }
        

        if (result.length % 2 !== 0) {
            result += 'X';
        }
        
        return result;
    }
}

window.onload = () => new PlayfairPage();