class RailFencePage {
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
  .rails-indicator {
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
  .rails-slider {
    background: linear-gradient(90deg, #1a4730 0%, #00d4ff 100%);
    height: 8px;
    border-radius: 4px;
    position: relative;
    margin: 0 20px;
  }
  .rails-slider input[type="range"] {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 8px;
    background: transparent;
    cursor: pointer;
    border-radius: 4px;
  }
  .rails-slider input[type="range"]::-webkit-slider-thumb {
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
  .rails-slider input[type="range"]::-webkit-slider-thumb:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 25px rgba(192, 132, 252, 0.6);
  }
  .rails-slider input[type="range"]::-moz-range-thumb {
    width: 24px;
    height: 24px;
    background: linear-gradient(135deg, #c084fc 0%, #00d4ff 100%);
    border-radius: 50%;
    cursor: pointer;
    border: none;
    box-shadow: 0 4px 20px rgba(192, 132, 252, 0.4);
    transition: all 0.3s ease;
  }
  .rails-display {
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
  .rail-row {
    display: flex;
    align-items: center;
    margin: 4px 0;
    min-height: 24px;
  }
  .rail-label {
    background: linear-gradient(135deg, #c084fc 0%, #9333ea 100%);
    color: white;
    padding: 4px 8px;
    border-radius: 4px;
    font-weight: bold;
    margin-right: 12px;
    min-width: 60px;
    text-align: center;
    font-size: 12px;
  }
  .rail-content {
    font-family: 'JetBrains Mono', monospace;
    color: #00d4ff;
    letter-spacing: 2px;
    font-weight: bold;
  }
  .rail-char {
    display: inline-block;
    width: 20px;
    text-align: center;
    padding: 2px;
    margin: 0 1px;
    border-radius: 3px;
    transition: all 0.3s ease;
  }
  .rail-char.highlight {
    background: linear-gradient(135deg, #00d4ff 0%, #0284c7 100%);
    color: white;
  }
  .rail-char.empty {
    color: #374151;
  }
</style>
<div class="max-w-4xl mx-auto mt-10 bg-dark-card p-8 rounded-xl border border-dark-border">
  <h1 class="text-4xl font-extrabold mb-6 text-cyber-orange font-['JetBrains_Mono','Inter',monospace] tracking-tight">Rail Fence Cipher</h1>
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
    <label class="block mb-4 text-lg font-semibold">Number of Rails:</label>
    <div class="flex items-center gap-4">
      <div class="rails-indicator" id="railsDisplay">3</div>
      <div class="flex-1 rails-slider">
        <input type="range" id="railsSlider" min="2" max="10" value="3" class="w-full" />
      </div>
      <div class="rails-indicator" id="railsDisplay2">3</div>
    </div>
  </div>
  <div class="mb-4 flex justify-end">
    <div class="flex items-end">
      <label class="inline-flex items-center text-lg font-semibold">
        <input type="checkbox" id="preserveSpaces" class="mr-2" /> Preserve Spaces
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
        <p class="mb-2">The <b>Rail Fence Cipher</b> is a transposition cipher that arranges the plaintext in a zigzag pattern across multiple "rails" (rows), then reads off the letters row by row.</p>
        <p class="mb-2"><b>Example:</b> With <span class="font-mono text-cyber-purple">3 rails</span> and message <span class="font-mono text-cyber-orange">HELLO WORLD</span>:</p>
        <pre class="bg-dark-bg p-2 rounded mb-2 font-mono text-base text-cyber-green">H   O   R   (Rail 1)\n E L   W O L   (Rail 2)\n  L     D     (Rail 3)\nResult: HORELWOLLD</pre>
        <p>The cipher creates a fence-like pattern, hence the name "Rail Fence". The number of rails determines the encryption strength.</p>
      </div>
    </div>
    <div class="cyber-fadein" id="visualizationFade">
      <div class="p-4 bg-dark-bg border border-dark-border rounded text-base font-mono">
        <h2 class="text-xl font-bold mb-2 text-cyber-blue font-['JetBrains_Mono','Inter',monospace]">Rails Visualization</h2>
        <div id="railsVis" class="rails-display"></div>
      </div>
    </div>
  </div>
</div>
`;
        this.setupHandlers();
        this.setupFileDragDrop();
        this.setupFadeInOnScroll();
        this.updateRailsDisplay();
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
    
    railFenceEncrypt(text, rails, preserveSpaces) {
        if (rails < 2) return text;
        
        const processedText = preserveSpaces ? text : text.replace(/\s+/g, '');
        if (processedText.length <= 1) return processedText;
        
        const railsArray = Array(rails).fill().map(() => []);
        
        let currentRail = 0;
        let direction = 1;
        
        for (let i = 0; i < processedText.length; i++) {
            railsArray[currentRail].push(processedText[i]);
            
            if (currentRail === 0) {
                direction = 1;
            } else if (currentRail === rails - 1) {
                direction = -1;
            }
            
            currentRail += direction;
        }
        
        return railsArray.map(rail => rail.join('')).join('');
    }
    
    railFenceDecrypt(text, rails, preserveSpaces) {
        if (rails < 2) return text;
        if (text.length <= 1) return text;
        
        const railLengths = Array(rails).fill(0);
        let currentRail = 0;
        let direction = 1;
        
        for (let i = 0; i < text.length; i++) {
            railLengths[currentRail]++;
            
            if (currentRail === 0) {
                direction = 1;
            } else if (currentRail === rails - 1) {
                direction = -1;
            }
            
            currentRail += direction;
        }
        
        const railsArray = Array(rails).fill().map(() => []);
        let textIndex = 0;
        
        for (let i = 0; i < rails; i++) {
            for (let j = 0; j < railLengths[i]; j++) {
                railsArray[i].push(text[textIndex++]);
            }
        }
        
        let result = '';
        currentRail = 0;
        direction = 1;
        const railIndices = Array(rails).fill(0);
        
        for (let i = 0; i < text.length; i++) {
            result += railsArray[currentRail][railIndices[currentRail]++];
            
            if (currentRail === 0) {
                direction = 1;
            } else if (currentRail === rails - 1) {
                direction = -1;
            }
            
            currentRail += direction;
        }
        
        return result;
    }
    
    updateRailsDisplay() {
        const rails = parseInt(document.getElementById('railsSlider').value);
        const railsVis = document.getElementById('railsVis');
        const sampleText = document.getElementById('inputText').value || 'HELLO WORLD';
        const preserveSpaces = document.getElementById('preserveSpaces').checked;
        
        const processedText = preserveSpaces ? sampleText : sampleText.replace(/\s+/g, '');
        
        if (processedText.length === 0) {
            railsVis.innerHTML = '<div class="text-center text-cyber-purple">Enter text to see visualization</div>';
            return;
        }
        
        const railsArray = Array(rails).fill().map(() => Array(processedText.length).fill(''));
        
        let currentRail = 0;
        let direction = 1;
        
        for (let i = 0; i < processedText.length; i++) {
            railsArray[currentRail][i] = processedText[i];
            
            if (currentRail === 0) {
                direction = 1;
            } else if (currentRail === rails - 1) {
                direction = -1;
            }
            
            currentRail += direction;
        }
        
        let html = '';
        for (let i = 0; i < rails; i++) {
            html += '<div class="rail-row">';
            html += `<div class="rail-label">Rail ${i + 1}</div>`;
            html += '<div class="rail-content">';
            
            for (let j = 0; j < processedText.length; j++) {
                const char = railsArray[i][j];
                const className = char ? 'rail-char highlight' : 'rail-char empty';
                html += `<span class="${className}">${char || '·'}</span>`;
            }
            
            html += '</div></div>';
        }
        
        railsVis.innerHTML = html;
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
        const railsSlider = document.getElementById('railsSlider');
        const railsDisplay = document.getElementById('railsDisplay');
        const railsDisplay2 = document.getElementById('railsDisplay2');
        const inputText = document.getElementById('inputText');
        const preserveSpaces = document.getElementById('preserveSpaces');
        
        const updateRailsDisplay = () => {
            const value = railsSlider.value;
            railsDisplay.textContent = value;
            railsDisplay2.textContent = value;
            this.updateRailsDisplay();
        };
        
        railsSlider.addEventListener('input', updateRailsDisplay);
        inputText.addEventListener('input', () => this.updateRailsDisplay());
        preserveSpaces.addEventListener('change', () => this.updateRailsDisplay());
        
        const getParams = () => ({
            rails: parseInt(railsSlider.value),
            preserveSpaces: preserveSpaces.checked
        });
        
        document.getElementById('encryptBtn').onclick = () => {
            const text = inputText.value;
            if (!text.trim()) return;
            
            const { rails, preserveSpaces } = getParams();
            const result = this.railFenceEncrypt(text, rails, preserveSpaces);
            document.getElementById('result').textContent = result;
            this.animateMessage();
        };
        
        document.getElementById('decryptBtn').onclick = () => {
            const text = inputText.value;
            if (!text.trim()) return;
            
            const { rails, preserveSpaces } = getParams();
            const result = this.railFenceDecrypt(text, rails, preserveSpaces);
            document.getElementById('result').textContent = result;
            this.animateMessage();
        };
        
        document.getElementById('encryptFileBtn').onclick = async () => {
            const fileInput = document.getElementById('fileInput');
            if (fileInput.files.length === 0) return alert('Please select a file.');
            
            const file = fileInput.files[0];
            const text = await file.text();
            const { rails, preserveSpaces } = getParams();
            const encrypted = this.railFenceEncrypt(text, rails, preserveSpaces);
            this.downloadFile(encrypted, 'encrypted_railfence.txt');
            this.animateMessage();
        };
        
        document.getElementById('decryptFileBtn').onclick = async () => {
            const fileInput = document.getElementById('fileInput');
            if (fileInput.files.length === 0) return alert('Please select a file.');
            
            const file = fileInput.files[0];
            const text = await file.text();
            const { rails, preserveSpaces } = getParams();
            const decrypted = this.railFenceDecrypt(text, rails, preserveSpaces);
            this.downloadFile(decrypted, 'decrypted_railfence.txt');
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

window.onload = () => new RailFencePage();