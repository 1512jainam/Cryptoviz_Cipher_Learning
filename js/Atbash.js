class AtbashPage {
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
  .alphabet-display {
    background: linear-gradient(135deg, #0a192f 0%, #112d42 100%);
    border: 2px solid #00d4ff;
    border-radius: 8px;
    padding: 16px;
    margin: 16px 0;
    overflow-x: auto;
  }
  .alphabet-row {
    display: flex;
    align-items: center;
    margin: 8px 0;
    justify-content: center;
    flex-wrap: wrap;
    gap: 4px;
  }
  .alphabet-label {
    background: linear-gradient(135deg, #c084fc 0%, #9333ea 100%);
    color: white;
    padding: 6px 12px;
    border-radius: 6px;
    font-weight: bold;
    margin-right: 12px;
    min-width: 80px;
    text-align: center;
    font-size: 14px;
  }
  .alphabet-char {
    display: inline-block;
    width: 32px;
    height: 32px;
    text-align: center;
    line-height: 32px;
    margin: 2px;
    border-radius: 6px;
    transition: all 0.3s ease;
    font-family: 'JetBrains Mono', monospace;
    font-weight: bold;
    font-size: 14px;
    background: linear-gradient(135deg, #374151 0%, #4b5563 100%);
    color: #00d4ff;
    border: 1px solid #6b7280;
  }
  .alphabet-char.highlight {
    background: linear-gradient(135deg, #00d4ff 0%, #0284c7 100%);
    color: white;
    transform: scale(1.1);
    box-shadow: 0 4px 12px rgba(0, 212, 255, 0.4);
  }
  .transformation-display {
    font-family: 'JetBrains Mono', monospace;
    font-size: 16px;
    line-height: 2;
    background: linear-gradient(135deg, #0a192f 0%, #112d42 100%);
    border: 2px solid #00d4ff;
    border-radius: 8px;
    padding: 20px;
    margin: 16px 0;
    overflow-x: auto;
  }
  .transform-row {
    display: flex;
    align-items: center;
    margin: 8px 0;
    justify-content: center;
    flex-wrap: wrap;
    gap: 8px;
  }
  .char-transform {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 4px;
    padding: 8px;
    border-radius: 8px;
    background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
    border: 1px solid #475569;
    min-width: 50px;
    transition: all 0.3s ease;
  }
  .char-transform:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 212, 255, 0.3);
  }
  .original-char {
    color: #f59e0b;
    font-weight: bold;
    font-size: 18px;
    margin-bottom: 4px;
  }
  .arrow {
    color: #c084fc;
    font-size: 14px;
    margin: 2px 0;
  }
  .transformed-char {
    color: #10b981;
    font-weight: bold;
    font-size: 18px;
    margin-top: 4px;
  }
  .non-alpha {
    color: #6b7280;
  }
  .case-toggle {
    background: linear-gradient(135deg, #9333ea 0%, #7c3aed 100%);
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 6px;
    font-weight: bold;
    transition: all 0.3s ease;
    cursor: pointer;
    font-family: 'JetBrains Mono', monospace;
  }
  .case-toggle:hover {
    background: linear-gradient(135deg, #7c3aed 0%, #9333ea 100%);
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(147, 51, 234, 0.4);
  }
  .case-toggle.active {
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
  }
</style>
<div class="max-w-5xl mx-auto mt-10 bg-dark-card p-8 rounded-xl border border-dark-border">
  <h1 class="text-4xl font-extrabold mb-6 text-cyber-orange font-['JetBrains_Mono','Inter',monospace] tracking-tight">Atbash Cipher</h1>
  <div class="mb-8">
    <label class="block mb-2 text-lg font-semibold">Message Animation:</label>
    <div class="flex items-center gap-4 mb-4">
      <div id="sender" class="w-16 h-16 rounded-full cyber-dark-blue flex items-center justify-center text-3xl shadow-lg">👤</div>
      <div class="flex-1 relative h-4">
        <div id="messageBall" class="absolute left-0 top-[-12px] w-8 h-8 rounded-full cyber-dark-green flex items-center justify-center text-white text-lg opacity-0 transition-all duration-700 shadow-lg">🔄</div>
        <div class="w-full h-1 bg-gradient-to-r from-cyber-blue to-cyber-green rounded-full"></div>
      </div>
      <div id="receiver" class="w-16 h-16 rounded-full cyber-dark-green flex items-center justify-center text-3xl shadow-lg">👥</div>
    </div>
  </div>
  
  <div class="mb-6 flex flex-wrap gap-4 items-center justify-between">
    <div class="flex items-center gap-4">
      <label class="inline-flex items-center text-lg font-semibold">
        <input type="checkbox" id="preserveSpaces" class="mr-2" checked /> Preserve Spaces
      </label>
      <label class="inline-flex items-center text-lg font-semibold">
        <input type="checkbox" id="preserveNumbers" class="mr-2" checked /> Preserve Numbers
      </label>
      <label class="inline-flex items-center text-lg font-semibold">
        <input type="checkbox" id="preservePunctuation" class="mr-2" checked /> Preserve Punctuation
      </label>
    </div>
    <div class="flex items-center gap-2">
      <span class="text-sm font-semibold">Case:</span>
      <button id="caseToggle" class="case-toggle">Preserve Original</button>
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
        <p class="mb-2">The <b>Atbash Cipher</b> is a substitution cipher that replaces each letter with its counterpart from the reversed alphabet. It's one of the oldest known ciphers, originally used for the Hebrew alphabet.</p>
        <p class="mb-2"><b>Example:</b> A↔Z, B↔Y, C↔X, D↔W, etc. The word <span class="font-mono text-cyber-orange">HELLO</span> becomes <span class="font-mono text-cyber-green">SVOOL</span>.</p>
        <p class="mb-2">The cipher is <b>symmetric</b> - encryption and decryption use the same process. It's named after the Hebrew letters Aleph-Tav-Bet-Shin (אתבש).</p>
        <p>Since it uses a fixed substitution pattern, it's vulnerable to frequency analysis but remains useful for simple obfuscation.</p>
      </div>
    </div>
    <div class="cyber-fadein" id="alphabetFade">
      <div class="p-4 bg-dark-bg border border-dark-border rounded text-base">
        <h2 class="text-xl font-bold mb-2 text-cyber-blue font-['JetBrains_Mono','Inter',monospace]">Alphabet Mapping</h2>
        <div id="alphabetVis" class="alphabet-display"></div>
      </div>
    </div>
    <div class="cyber-fadein" id="transformationFade">
      <div class="p-4 bg-dark-bg border border-dark-border rounded text-base">
        <h2 class="text-xl font-bold mb-2 text-cyber-blue font-['JetBrains_Mono','Inter',monospace]">Live Transformation</h2>
        <div id="transformVis" class="transformation-display"></div>
      </div>
    </div>
  </div>
</div>
`;
        this.setupHandlers();
        this.setupFileDragDrop();
        this.setupFadeInOnScroll();
        this.updateAlphabetDisplay();
        this.updateTransformationDisplay();
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
        const fadeEls = [
            document.getElementById('readMoreFade'), 
            document.getElementById('alphabetFade'),
            document.getElementById('transformationFade')
        ];
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
    
    atbashTransform(text, options = {}) {
        const {
            preserveSpaces = true,
            preserveNumbers = true,
            preservePunctuation = true,
            caseMode = 'preserve' 
        } = options;
        
        return text.split('').map(char => {
            const code = char.charCodeAt(0);
            

            if (code >= 65 && code <= 90) {
                const transformed = String.fromCharCode(90 - (code - 65));
                return caseMode === 'lower' ? transformed.toLowerCase() : 
                       caseMode === 'upper' ? transformed : transformed;
            }
            
  
            if (code >= 97 && code <= 122) {
                const transformed = String.fromCharCode(122 - (code - 97));
                return caseMode === 'upper' ? transformed.toUpperCase() : 
                       caseMode === 'lower' ? transformed : transformed;
            }
            

            if (char === ' ' && !preserveSpaces) return '';
            

            if (/\d/.test(char) && !preserveNumbers) return '';
            

            if (/[^\w\s]/.test(char) && !preservePunctuation) return '';
            

            return char;
        }).join('');
    }
    
    updateAlphabetDisplay() {
        const alphabetVis = document.getElementById('alphabetVis');
        
        const upperAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const lowerAlphabet = 'abcdefghijklmnopqrstuvwxyz';
        
        let html = '';
        

        html += '<div class="alphabet-row">';
        html += '<div class="alphabet-label">Original</div>';
        for (let char of upperAlphabet) {
            html += `<div class="alphabet-char">${char}</div>`;
        }
        html += '</div>';
        
        html += '<div class="alphabet-row">';
        html += '<div class="alphabet-label">Atbash</div>';
        for (let char of upperAlphabet) {
            const transformed = this.atbashTransform(char);
            html += `<div class="alphabet-char">${transformed}</div>`;
        }
        html += '</div>';
        
              
        html += '<div class="alphabet-row" style="margin-top: 20px;">';
        html += '<div class="alphabet-label">Original</div>';
        for (let char of lowerAlphabet) {
            html += `<div class="alphabet-char">${char}</div>`;
        }
        html += '</div>';
        
        html += '<div class="alphabet-row">';
        html += '<div class="alphabet-label">Atbash</div>';
        for (let char of lowerAlphabet) {
            const transformed = this.atbashTransform(char);
            html += `<div class="alphabet-char">${transformed}</div>`;
        }
        html += '</div>';
        
        alphabetVis.innerHTML = html;
    }
    
    updateTransformationDisplay() {
        const transformVis = document.getElementById('transformVis');
        const inputText = document.getElementById('inputText').value || 'HELLO WORLD';
        
        if (inputText.length === 0) {
            transformVis.innerHTML = '<div class="text-center text-cyber-purple">Enter text to see live transformation</div>';
            return;
        }
        
        const options = this.getTransformOptions();
        const transformed = this.atbashTransform(inputText, options);
        
        let html = '<div class="transform-row">';
        
        for (let i = 0; i < Math.min(inputText.length, 20); i++) { // Limit to 20 chars for display
            const originalChar = inputText[i];
            const transformedChar = transformed[i];
            const isAlpha = /[a-zA-Z]/.test(originalChar);
            
            html += '<div class="char-transform">';
            html += `<div class="original-char ${isAlpha ? '' : 'non-alpha'}">${originalChar}</div>`;
            html += '<div class="arrow">↓</div>';
            html += `<div class="transformed-char ${isAlpha ? '' : 'non-alpha'}">${transformedChar}</div>`;
            html += '</div>';
        }
        
        if (inputText.length > 20) {
            html += '<div class="char-transform" style="background: transparent; border: none;"><div class="original-char">...</div></div>';
        }
        
        html += '</div>';
        transformVis.innerHTML = html;
    }
    
    getTransformOptions() {
        const caseToggle = document.getElementById('caseToggle');
        let caseMode = 'preserve';
        
        if (caseToggle.textContent.includes('UPPERCASE')) {
            caseMode = 'upper';
        } else if (caseToggle.textContent.includes('lowercase')) {
            caseMode = 'lower';
        }
        
        return {
            preserveSpaces: document.getElementById('preserveSpaces').checked,
            preserveNumbers: document.getElementById('preserveNumbers').checked,
            preservePunctuation: document.getElementById('preservePunctuation').checked,
            caseMode: caseMode
        };
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
    
    setupHandlers() {
        const inputText = document.getElementById('inputText');
        const preserveSpaces = document.getElementById('preserveSpaces');
        const preserveNumbers = document.getElementById('preserveNumbers');
        const preservePunctuation = document.getElementById('preservePunctuation');
        const caseToggle = document.getElementById('caseToggle');
        

        const caseStates = ['Preserve Original', 'FORCE UPPERCASE', 'force lowercase'];
        let currentCaseState = 0;
        
        caseToggle.addEventListener('click', () => {
            currentCaseState = (currentCaseState + 1) % caseStates.length;
            caseToggle.textContent = caseStates[currentCaseState];
            caseToggle.classList.toggle('active', currentCaseState !== 0);
            this.updateTransformationDisplay();
        });
        

        const updateDisplays = () => {
            this.updateTransformationDisplay();
        };
        
        inputText.addEventListener('input', updateDisplays);
        preserveSpaces.addEventListener('change', updateDisplays);
        preserveNumbers.addEventListener('change', updateDisplays);
        preservePunctuation.addEventListener('change', updateDisplays);
        

        document.getElementById('encryptBtn').onclick = () => {
            const text = inputText.value;
            if (!text.trim()) return;
            
            const options = this.getTransformOptions();
            const result = this.atbashTransform(text, options);
            document.getElementById('result').textContent = result;
            this.animateMessage();
        };
        
        document.getElementById('decryptBtn').onclick = () => {
            const text = inputText.value;
            if (!text.trim()) return;
            

            const options = this.getTransformOptions();
            const result = this.atbashTransform(text, options);
            document.getElementById('result').textContent = result;
            this.animateMessage();
        };
        

        document.getElementById('encryptFileBtn').onclick = async () => {
            const fileInput = document.getElementById('fileInput');
            if (fileInput.files.length === 0) return alert('Please select a file.');
            
            const file = fileInput.files[0];
            const text = await file.text();
            const options = this.getTransformOptions();
            const encrypted = this.atbashTransform(text, options);
            this.downloadFile(encrypted, 'encrypted_atbash.txt');
            this.animateMessage();
        };
        
        document.getElementById('decryptFileBtn').onclick = async () => {
            const fileInput = document.getElementById('fileInput');
            if (fileInput.files.length === 0) return alert('Please select a file.');
            
            const file = fileInput.files[0];
            const text = await file.text();
            const options = this.getTransformOptions();
            const decrypted = this.atbashTransform(text, options);
            this.downloadFile(decrypted, 'decrypted_atbash.txt');
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

window.onload = () => new AtbashPage();