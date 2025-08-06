class CaesarPage {
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
  .shift-indicator {
    background: linear-gradient(135deg, #c084fc 0%, #00d4ff 100%);
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bold;
    font-size: 18px;
    box-shadow: 0 4px 20px rgba(192, 132, 252, 0.4);
    transition: all 0.3s ease;
  }
  .shift-slider {
    background: linear-gradient(90deg, #1a4730 0%, #00d4ff 100%);
    height: 8px;
    border-radius: 4px;
    position: relative;
    margin: 0 20px;
  }
  .shift-slider input[type="range"] {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 8px;
    background: transparent;
    cursor: pointer;
    border-radius: 4px;
  }
  .shift-slider input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 24px;
    height: 24px;
    background: linear-gradient(135deg, #c084fc 0%, #00d4ff 100%);
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 4px 20px rgba(192, 132, 252, 0.4);
    transition: all 0.3s ease;
  }
  .shift-slider input[type="range"]::-webkit-slider-thumb:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 25px rgba(192, 132, 252, 0.6);
  }
  .shift-slider input[type="range"]::-moz-range-thumb {
    width: 24px;
    height: 24px;
    background: linear-gradient(135deg, #c084fc 0%, #00d4ff 100%);
    border-radius: 50%;
    cursor: pointer;
    border: none;
    box-shadow: 0 4px 20px rgba(192, 132, 252, 0.4);
    transition: all 0.3s ease;
  }
  .alphabet-display {
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
  .alphabet-row {
    display: flex;
    align-items: center;
    margin: 8px 0;
    min-height: 32px;
  }
  .alphabet-label {
    background: linear-gradient(135deg, #c084fc 0%, #9333ea 100%);
    color: white;
    padding: 6px 12px;
    border-radius: 4px;
    font-weight: bold;
    margin-right: 16px;
    min-width: 80px;
    text-align: center;
    font-size: 12px;
  }
  .alphabet-content {
    font-family: 'JetBrains Mono', monospace;
    color: #00d4ff;
    letter-spacing: 3px;
    font-weight: bold;
    font-size: 16px;
  }
  .alphabet-char {
    display: inline-block;
    width: 24px;
    text-align: center;
    padding: 4px;
    margin: 0 2px;
    border-radius: 4px;
    transition: all 0.3s ease;
  }
  .alphabet-char.highlight {
    background: linear-gradient(135deg, #00d4ff 0%, #0284c7 100%);
    color: white;
  }
  .shift-arrow {
    font-size: 20px;
    color: #f59e0b;
    margin: 0 8px;
  }
</style>
<div class="max-w-4xl mx-auto mt-10 bg-dark-card p-8 rounded-xl border border-dark-border">
  <h1 class="text-4xl font-extrabold mb-6 text-cyber-orange font-['JetBrains_Mono','Inter',monospace] tracking-tight">Caesar Cipher</h1>
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
    <label class="block mb-4 text-lg font-semibold">Shift Value:</label>
    <div class="flex items-center gap-4">
      <div class="shift-indicator" id="shiftDisplay">3</div>
      <div class="flex-1 shift-slider">
        <input type="range" id="shiftSlider" min="1" max="25" value="3" class="w-full" />
      </div>
      <div class="shift-indicator" id="shiftDisplay2">3</div>
    </div>
  </div>
  <div class="mb-4 flex justify-end gap-4">
    <div class="flex items-end">
      <label class="inline-flex items-center text-lg font-semibold">
        <input type="checkbox" id="preserveCase" class="mr-2" checked /> Preserve Case
      </label>
    </div>
    <div class="flex items-end">
      <label class="inline-flex items-center text-lg font-semibold">
        <input type="checkbox" id="preserveSpaces" class="mr-2" checked /> Preserve Spaces
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
        <p class="mb-2">The <b>Caesar Cipher</b> is a substitution cipher where each letter is shifted by a fixed number of positions in the alphabet.</p>
        <p class="mb-2"><b>Example:</b> With shift <span class="font-mono text-cyber-purple">3</span> and message <span class="font-mono text-cyber-orange">HELLO</span>:</p>
        <pre class="bg-dark-bg p-2 rounded mb-2 font-mono text-base text-cyber-green">H → K, E → H, L → O, L → O, O → R
Result: KHOOR</pre>
        <p>Named after Julius Caesar, who used it for military communications. The shift value acts as the encryption key.</p>
      </div>
    </div>
    <div class="cyber-fadein" id="visualizationFade">
      <div class="p-4 bg-dark-bg border border-dark-border rounded text-base font-mono">
        <h2 class="text-xl font-bold mb-2 text-cyber-blue font-['JetBrains_Mono','Inter',monospace]">Alphabet Shift Visualization</h2>
        <div id="alphabetVis" class="alphabet-display"></div>
      </div>
    </div>
  </div>
</div>
`;
        this.setupHandlers();
        this.setupFileDragDrop();
        this.setupFadeInOnScroll();
        this.updateAlphabetDisplay();
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
                    observer.unobserve(entry.target); // Only animate once
                }
            });
        }, { threshold: 0.2 });
        
        fadeEls.forEach(el => { if (el) observer.observe(el); });
    }
    
    caesarEncrypt(text, shift, preserveCase, preserveSpaces) {
        let result = '';
        
        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            
            if (char.match(/[a-zA-Z]/)) {
                const isUpperCase = char === char.toUpperCase();
                const baseCode = isUpperCase ? 65 : 97; // 'A' or 'a'
                const charCode = char.charCodeAt(0);
                const shiftedCode = ((charCode - baseCode + shift) % 26) + baseCode;
                let shiftedChar = String.fromCharCode(shiftedCode);
                
                if (preserveCase) {
                    result += shiftedChar;
                } else {
                    result += shiftedChar.toUpperCase();
                }
            } else if (char === ' ' && preserveSpaces) {
                result += char;
            } else if (char !== ' ') {
                result += char; 
            }
        }
        return result;
    }
    
    caesarDecrypt(text, shift, preserveCase, preserveSpaces) {
       
        return this.caesarEncrypt(text, 26 - shift, preserveCase, preserveSpaces);
    }
    
    updateAlphabetDisplay() {
        const shift = parseInt(document.getElementById('shiftSlider').value);
        const alphabetVis = document.getElementById('alphabetVis');
        
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const shiftedAlphabet = alphabet.split('').map(char => {
            const charCode = char.charCodeAt(0);
            const shiftedCode = ((charCode - 65 + shift) % 26) + 65;
            return String.fromCharCode(shiftedCode); 
        }).join('');
        
        let html = '';
        

        html += '<div class="alphabet-row">';
        html += '<div class="alphabet-label">Original</div>';
        html += '<div class="alphabet-content">';
        for (let i = 0; i < alphabet.length; i++) {
            html += `<span class="alphabet-char">${alphabet[i]}</span>`;
        }
        html += '</div></div>';
        

        html += '<div class="alphabet-row">';
        html += '<div class="alphabet-label">Shift</div>';
        html += '<div class="alphabet-content">';
        for (let i = 0; i < alphabet.length; i++) {
            html += `<span class="shift-arrow">↓</span>`;
        }
        html += '</div></div>';
        
        html += '<div class="alphabet-row">';
        html += '<div class="alphabet-label">Encrypted</div>';
        html += '<div class="alphabet-content">';
        for (let i = 0; i < shiftedAlphabet.length; i++) {
            html += `<span class="alphabet-char highlight">${shiftedAlphabet[i]}</span>`;
        }
        html += '</div></div>';
        

        const sampleText = document.getElementById('inputText').value || 'HELLO';
        const sampleUpper = sampleText.toUpperCase().replace(/[^A-Z]/g, '');
        if (sampleUpper) {
            const encrypted = this.caesarEncrypt(sampleUpper, shift, false, false);
            
            html += '<div class="alphabet-row" style="margin-top: 16px; padding-top: 16px; border-top: 1px solid #374151;">';
            html += '<div class="alphabet-label">Example</div>';
            html += '<div class="alphabet-content">';
            html += `<span style="color: #f59e0b;">${sampleUpper}</span>`;
            html += '<span class="shift-arrow">→</span>';
            html += `<span style="color: #10b981;">${encrypted}</span>`;
            html += '</div></div>';
        }
        
        alphabetVis.innerHTML = html;
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
        const shiftSlider = document.getElementById('shiftSlider');
        const shiftDisplay = document.getElementById('shiftDisplay');
        const shiftDisplay2 = document.getElementById('shiftDisplay2');
        const inputText = document.getElementById('inputText');
        const preserveCase = document.getElementById('preserveCase');
        const preserveSpaces = document.getElementById('preserveSpaces');
        
        const updateShiftDisplay = () => {
            const value = shiftSlider.value;
            shiftDisplay.textContent = value;
            shiftDisplay2.textContent = value;
            this.updateAlphabetDisplay();
        };
        
        shiftSlider.addEventListener('input', updateShiftDisplay);
        inputText.addEventListener('input', () => this.updateAlphabetDisplay());
        preserveCase.addEventListener('change', () => this.updateAlphabetDisplay());
        preserveSpaces.addEventListener('change', () => this.updateAlphabetDisplay());
        
        const getParams = () => ({
            shift: parseInt(shiftSlider.value),
            preserveCase: preserveCase.checked,
            preserveSpaces: preserveSpaces.checked
        });
        
        document.getElementById('encryptBtn').onclick = () => {
            const text = inputText.value;
            if (!text.trim()) return;
            
            const { shift, preserveCase, preserveSpaces } = getParams();
            const result = this.caesarEncrypt(text, shift, preserveCase, preserveSpaces);
            document.getElementById('result').textContent = result;
            this.animateMessage();
        };
        
        document.getElementById('decryptBtn').onclick = () => {
            const text = inputText.value;
            if (!text.trim()) return;
            
            const { shift, preserveCase, preserveSpaces } = getParams();
            const result = this.caesarDecrypt(text, shift, preserveCase, preserveSpaces);
            document.getElementById('result').textContent = result;
            this.animateMessage();
        };
        
        document.getElementById('encryptFileBtn').onclick = async () => {
            const fileInput = document.getElementById('fileInput');
            if (fileInput.files.length === 0) return alert('Please select a file.');
            
            const file = fileInput.files[0];
            const text = await file.text();
            const { shift, preserveCase, preserveSpaces } = getParams();
            const encrypted = this.caesarEncrypt(text, shift, preserveCase, preserveSpaces);
            this.downloadFile(encrypted, 'encrypted_caesar.txt');
            this.animateMessage();
        };
        
        document.getElementById('decryptFileBtn').onclick = async () => {
            const fileInput = document.getElementById('fileInput');
            if (fileInput.files.length === 0) return alert('Please select a file.');
            
            const file = fileInput.files[0];
            const text = await file.text();
            const { shift, preserveCase, preserveSpaces } = getParams();
            const decrypted = this.caesarDecrypt(text, shift, preserveCase, preserveSpaces);
            this.downloadFile(decrypted, 'decrypted_caesar.txt');
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

window.onload = () => new CaesarPage();