class MonoalphabeticPage {
    constructor() {
        this.defaultAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
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
  .cyber-btn-purple {
    background: linear-gradient(90deg, #8b5cf6 0%, #a855f7 100%);
    color: #fff !important;
    border: none;
    box-shadow: 0 2px 12px 0 #8b5cf633;
  }
  .cyber-btn-purple:hover {
    background: linear-gradient(90deg, #a855f7 0%, #8b5cf6 100%);
    box-shadow: 0 4px 24px 0 #8b5cf655;
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
    flex-wrap: wrap;
    gap: 2px;
  }
  .alphabet-label {
    background: linear-gradient(135deg, #c084fc 0%, #9333ea 100%);
    color: white;
    padding: 6px 12px;
    border-radius: 6px;
    font-weight: bold;
    margin-right: 16px;
    min-width: 100px;
    text-align: center;
    font-size: 13px;
    flex-shrink: 0;
  }
  .alphabet-content {
    display: flex;
    flex-wrap: wrap;
    gap: 2px;
    flex: 1;
  }
  .alphabet-char {
    display: inline-block;
    width: 24px;
    height: 24px;
    text-align: center;
    line-height: 24px;
    border-radius: 4px;
    transition: all 0.3s ease;
    font-weight: bold;
    font-size: 12px;
  }
  .alphabet-char.plain {
    background: linear-gradient(135deg, #00d4ff 0%, #0284c7 100%);
    color: white;
  }
  .alphabet-char.cipher {
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    color: white;
  }
  .alphabet-char.highlight {
    background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
    color: white;
    transform: scale(1.1);
    box-shadow: 0 0 8px #f59e0b55;
  }
  .alphabet-char.empty {
    color: #374151;
    background: transparent;
    border: 1px dashed #374151;
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
  .key-strength.perfect {
    background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
  }
  .substitution-grid {
    display: grid;
    grid-template-columns: repeat(13, 1fr);
    gap: 2px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 12px;
    margin: 16px 0;
  }
  .substitution-cell {
    background: linear-gradient(135deg, #0a192f 0%, #112d42 100%);
    border: 1px solid #00d4ff;
    padding: 8px 4px;
    text-align: center;
    border-radius: 4px;
    color: white;
    font-weight: bold;
    min-height: 32px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .substitution-cell.header {
    background: linear-gradient(135deg, #c084fc 0%, #9333ea 100%);
  }
  .substitution-cell.plain {
    background: linear-gradient(135deg, #00d4ff 0%, #0284c7 100%);
  }
  .substitution-cell.cipher {
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  }
  .frequency-bar {
    height: 4px;
    background: linear-gradient(90deg, #f59e0b 0%, #d97706 100%);
    border-radius: 2px;
    margin-top: 2px;
    transition: width 0.3s ease;
  }
</style>
<div class="max-w-5xl mx-auto mt-10 bg-dark-card p-8 rounded-xl border border-dark-border">
  <h1 class="text-4xl font-extrabold mb-6 text-cyber-green font-['JetBrains_Mono','Inter',monospace] tracking-tight">Monoalphabetic Substitution Cipher</h1>
  <div class="mb-8">
    <label class="block mb-2 text-lg font-semibold">Message Animation:</label>
    <div class="flex items-center gap-4 mb-4">
      <div id="sender" class="w-16 h-16 rounded-full cyber-dark-blue flex items-center justify-center text-3xl shadow-lg">👤</div>
      <div class="flex-1 relative h-4">
        <div id="messageBall" class="absolute left-0 top-[-12px] w-8 h-8 rounded-full cyber-dark-green flex items-center justify-center text-white text-lg opacity-0 transition-all duration-700 shadow-lg">🔤</div>
        <div class="w-full h-1 bg-gradient-to-r from-cyber-blue to-cyber-green rounded-full"></div>
      </div>
      <div id="receiver" class="w-16 h-16 rounded-full cyber-dark-green flex items-center justify-center text-3xl shadow-lg">👥</div>
    </div>
  </div>
  <div class="mb-6">
    <label class="block mb-2 text-lg font-semibold">Cipher Alphabet:</label>
    <div class="flex gap-4 items-center">
      <input type="text" id="cipherAlphabet" class="flex-1 bg-dark-bg border border-dark-border rounded p-2 text-white font-mono text-lg" placeholder="Enter 26 unique letters (e.g., ZYXWVUTSRQPONMLKJIHGFEDCBA)" maxlength="26" />
      <div id="alphabetStrength" class="key-strength">Enter Alphabet</div>
    </div>
    <div class="flex gap-2 mt-2">
      <button id="generateRandomBtn" class="cyber-btn-purple px-3 py-1 rounded text-sm font-bold">Generate Random</button>
      <button id="reverseAlphabetBtn" class="cyber-btn-purple px-3 py-1 rounded text-sm font-bold">Reverse (Z-A)</button>
      <button id="caesarShiftBtn" class="cyber-btn-purple px-3 py-1 rounded text-sm font-bold">Caesar Shift</button>
    </div>
  </div>
  <div class="mb-4 flex justify-end">
    <div class="flex items-end gap-4">
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
    <div id="result" class="bg-dark-bg border border-dark-border rounded p-2 text-cyber-purple font-mono text-lg min-h-[40px] whitespace-pre-wrap"></div>
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
        <p class="mb-2">The <b>Monoalphabetic Substitution Cipher</b> replaces each letter of the plaintext with a corresponding letter from a cipher alphabet. Each letter is consistently replaced with the same substitute throughout the message.</p>
        <p class="mb-2"><b>Example:</b> With cipher alphabet <span class="font-mono text-cyber-green">ZYXWVUTSRQPONMLKJIHGFEDCBA</span>:</p>
        <pre class="bg-dark-bg p-2 rounded mb-2 font-mono text-base text-cyber-green">Plain:  A B C D E F G H I J K L M N O P Q R S T U V W X Y Z
Cipher: Z Y X W V U T S R Q P O N M L K J H G F E D C B A I

HELLO → SVOOL</pre>
        <p>The security depends on keeping the cipher alphabet secret and using a truly random substitution.</p>
      </div>
    </div>
    <div class="cyber-fadein" id="visualizationFade">
      <div class="p-4 bg-dark-bg border border-dark-border rounded text-base font-mono">
        <h2 class="text-xl font-bold mb-2 text-cyber-blue font-['JetBrains_Mono','Inter',monospace]">Substitution Visualization</h2>
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
        this.updateAlphabetStrength();
    }

    generateRandomAlphabet() {
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
        for (let i = alphabet.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [alphabet[i], alphabet[j]] = [alphabet[j], alphabet[i]];
        }
        return alphabet.join('');
    }
    

    monoEncrypt(text, cipherAlphabet, preserveSpaces, preserveNumbers, preservePunctuation) {
        if (!cipherAlphabet || cipherAlphabet.length !== 26) return text;
        
        const plainAlphabet = this.defaultAlphabet;
        let result = '';
        
        for (let char of text) {
            const upperChar = char.toUpperCase();
            const index = plainAlphabet.indexOf(upperChar);
            
            if (index !== -1) {

                const substituted = cipherAlphabet[index];
                result += char === char.toUpperCase() ? substituted : substituted.toLowerCase();
            } else if (char === ' ' && preserveSpaces) {
                result += char;
            } else if (/\d/.test(char) && preserveNumbers) {
                result += char;
            } else if (/[^\w\s]/.test(char) && preservePunctuation) {
                result += char;
            } else if (!preserveSpaces && !preserveNumbers && !preservePunctuation) {
                continue;
            } else {
                result += char;
            }
        }
        
        return result;
    }
    
    monoDecrypt(text, cipherAlphabet, preserveSpaces, preserveNumbers, preservePunctuation) {
        if (!cipherAlphabet || cipherAlphabet.length !== 26) return text;
        
        const plainAlphabet = this.defaultAlphabet;
        let result = '';
        
        for (let char of text) {
            const upperChar = char.toUpperCase();
            const index = cipherAlphabet.indexOf(upperChar);
            
            if (index !== -1) {
                const decrypted = plainAlphabet[index];
                result += char === char.toUpperCase() ? decrypted : decrypted.toLowerCase();
            } else if (char === ' ' && preserveSpaces) {
                result += char;
            } else if (/\d/.test(char) && preserveNumbers) {
                result += char;
            } else if (/[^\w\s]/.test(char) && preservePunctuation) {
                result += char;
            } else if (!preserveSpaces && !preserveNumbers && !preservePunctuation) {
                continue;
            } else {
                result += char;
            }
        }
        
        return result;
    }
    
    updateAlphabetStrength() {
        const alphabet = document.getElementById('cipherAlphabet').value.toUpperCase();
        const strengthEl = document.getElementById('alphabetStrength');
        
        if (!alphabet) {
            strengthEl.textContent = 'Enter Alphabet';
            strengthEl.className = 'key-strength';
            return;
        }
        
        let strength = 'weak';
        let label = 'Weak';
        
        const uniqueChars = new Set(alphabet);
        const hasAllLetters = alphabet.length === 26 && uniqueChars.size === 26;
        const onlyLetters = /^[A-Z]+$/.test(alphabet);
        
        if (hasAllLetters && onlyLetters) {
            const isReverse = alphabet === 'ZYXWVUTSRQPONMLKJIHGFEDCBA';
            const isCaesar = /^[A-Z]{26}$/.test(alphabet) && alphabet !== this.defaultAlphabet;
            const isRandom = !isReverse && !isCaesar;
            
            if (isRandom) {
                strength = 'perfect';
                label = 'Perfect';
            } else if (isCaesar || isReverse) {
                strength = 'strong';
                label = 'Strong';
            } else {
                strength = 'medium';
                label = 'Medium';
            }
        } else if (alphabet.length >= 20) {
            strength = 'medium';
            label = 'Medium';
        }
        
        strengthEl.textContent = label;
        strengthEl.className = `key-strength ${strength}`;
    }
    
    updateAlphabetDisplay() {
        const alphabet = document.getElementById('cipherAlphabet').value.toUpperCase();
        const text = document.getElementById('inputText').value || 'HELLO';
        const alphabetVis = document.getElementById('alphabetVis');
        
        let html = '';
        

        html += '<div class="alphabet-row">';
        html += '<div class="alphabet-label">Plain</div>';
        html += '<div class="alphabet-content">';
        for (let i = 0; i < 26; i++) {
            const char = this.defaultAlphabet[i];
            const highlight = text.toUpperCase().includes(char) ? 'highlight' : 'plain';
            html += `<span class="alphabet-char ${highlight}">${char}</span>`;
        }
        html += '</div></div>';
        

        html += '<div class="alphabet-row">';
        html += '<div class="alphabet-label">Cipher</div>';
        html += '<div class="alphabet-content">';
        for (let i = 0; i < 26; i++) {
            const char = alphabet[i] || '?';
            const plainChar = this.defaultAlphabet[i];
            const highlight = text.toUpperCase().includes(plainChar) ? 'highlight' : (char === '?' ? 'empty' : 'cipher');
            html += `<span class="alphabet-char ${highlight}">${char}</span>`;
        }
        html += '</div></div>';
        

        if (alphabet.length === 26) {
            html += '<div class="substitution-grid">';
            

            html += '<div class="substitution-cell header">Plain</div>';
            for (let i = 0; i < 12; i++) {
                html += `<div class="substitution-cell plain">${this.defaultAlphabet[i]}</div>`;
            }
            
            html += '<div class="substitution-cell header">Cipher</div>';
            for (let i = 0; i < 12; i++) {
                html += `<div class="substitution-cell cipher">${alphabet[i]}</div>`;
            }
            
            html += '<div class="substitution-cell header">Plain</div>';
            for (let i = 13; i < 26; i++) {
                html += `<div class="substitution-cell plain">${this.defaultAlphabet[i]}</div>`;
            }
            
            html += '<div class="substitution-cell header">Cipher</div>';
            for (let i = 13; i < 26; i++) {
                html += `<div class="substitution-cell cipher">${alphabet[i]}</div>`;
            }
            
            html += '</div>';
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
        const cipherAlphabet = document.getElementById('cipherAlphabet');
        const inputText = document.getElementById('inputText');
        const preserveSpaces = document.getElementById('preserveSpaces');
        const preserveNumbers = document.getElementById('preserveNumbers');
        const preservePunctuation = document.getElementById('preservePunctuation');
        
        const updateDisplays = () => {
            this.updateAlphabetDisplay();
            this.updateAlphabetStrength();
        };
        
        cipherAlphabet.addEventListener('input', (e) => {

            e.target.value = e.target.value.toUpperCase().replace(/[^A-Z]/g, '');
            updateDisplays();
        });
        
        inputText.addEventListener('input', () => this.updateAlphabetDisplay());
        preserveSpaces.addEventListener('change', () => this.updateAlphabetDisplay());
        preserveNumbers.addEventListener('change', () => this.updateAlphabetDisplay());
        preservePunctuation.addEventListener('change', () => this.updateAlphabetDisplay());
        

        document.getElementById('generateRandomBtn').onclick = () => {
            cipherAlphabet.value = this.generateRandomAlphabet();
            updateDisplays();
        };
        
        document.getElementById('reverseAlphabetBtn').onclick = () => {
            cipherAlphabet.value = 'ZYXWVUTSRQPONMLKJIHGFEDCBA';
            updateDisplays();
        };
        
        document.getElementById('caesarShiftBtn').onclick = () => {

            let shifted = '';
            for (let i = 0; i < 26; i++) {
                shifted += String.fromCharCode(((i + 3) % 26) + 65);
            }
            cipherAlphabet.value = shifted;
            updateDisplays();
        };
        
        const getParams = () => ({
            alphabet: cipherAlphabet.value,
            preserveSpaces: preserveSpaces.checked,
            preserveNumbers: preserveNumbers.checked,
            preservePunctuation: preservePunctuation.checked
        });
        
        document.getElementById('encryptBtn').onclick = () => {
            const text = inputText.value;
            const { alphabet, preserveSpaces, preserveNumbers, preservePunctuation } = getParams();
            
            if (!text.trim()) return;
            if (!alphabet || alphabet.length !== 26) return alert('Please enter a complete 26-letter cipher alphabet.');
            
            const result = this.monoEncrypt(text, alphabet, preserveSpaces, preserveNumbers, preservePunctuation);
            document.getElementById('result').textContent = result;
            this.animateMessage();
        };
        
        document.getElementById('decryptBtn').onclick = () => {
            const text = inputText.value;
            const { alphabet, preserveSpaces, preserveNumbers, preservePunctuation } = getParams();
            
            if (!text.trim()) return;
            if (!alphabet || alphabet.length !== 26) return alert('Please enter a complete 26-letter cipher alphabet.');
            
            const result = this.monoDecrypt(text, alphabet, preserveSpaces, preserveNumbers, preservePunctuation);
            document.getElementById('result').textContent = result;
            this.animateMessage();
        };
        
        document.getElementById('encryptFileBtn').onclick = async () => {
            const fileInput = document.getElementById('fileInput');
            const { alphabet, preserveSpaces, preserveNumbers, preservePunctuation } = getParams();
            
            if (fileInput.files.length === 0) return alert('Please select a file.');
            if (!alphabet || alphabet.length !== 26) return alert('Please enter a complete 26-letter cipher alphabet.');
            
            const file = fileInput.files[0];
            const text = await file.text();
            const encrypted = this.monoEncrypt(text, alphabet, preserveSpaces, preserveNumbers, preservePunctuation);
            this.downloadFile(encrypted, 'encrypted_monoalphabetic.txt');
            this.animateMessage();
        };
        
        document.getElementById('decryptFileBtn').onclick = async () => {
            const fileInput = document.getElementById('fileInput');
            const { alphabet, preserveSpaces, preserveNumbers, preservePunctuation } = getParams();
            
            if (fileInput.files.length === 0) return alert('Please select a file.');
            if (!alphabet || alphabet.length !== 26) return alert('Please enter a complete 26-letter cipher alphabet.');
            
            const file = fileInput.files[0];
            const text = await file.text();
            const decrypted = this.monoDecrypt(text, alphabet, preserveSpaces, preserveNumbers, preservePunctuation);
            this.downloadFile(decrypted, 'decrypted_monoalphabetic.txt');
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

window.onload = () => new MonoalphabeticPage();