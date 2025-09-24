document.addEventListener('DOMContentLoaded', () => {
  // ===== ESTADO =====
  const LS_KEY = 'cw_assinatura_ativa';
  let isSignatureActive = (localStorage.getItem(LS_KEY) ?? 'true') === 'true';
  const setActive = v => { 
    isSignatureActive = v; 
    localStorage.setItem(LS_KEY, String(v)); 
    refreshToggleUI(); 
  };

  // ===== NOME DO AGENTE =====
  function getUserName() {
    let el = document.querySelector('div.text-n-slate-12.text-sm.leading-4.font-medium.truncate');
    if (!el) el = document.querySelector('[data-testid="agent-name"], [data-test-id="agent-name"], .agent-name, .sidebar .font-medium');
    const name = (el?.textContent || '').trim();
    return name || 'Agente';
  }

  // ===== ENCONTRAR COMPOSERS =====
  function listReplyBoxes() {
    return Array.from(document.querySelectorAll('.reply-box'));
  }

  function isPrivateBox(box) {
    if (box.classList.contains('is-private')) return true;
    const placeholder = box.querySelector('textarea[placeholder]')?.getAttribute('placeholder') || '';
    if (/apenas para agentes/i.test(placeholder)) return true;
    if (box.querySelector('button[title="Bold"], button[aria-label="Bold"], .note-mode, .ProseMirror-menubar')) return true;
    return false;
  }

  function getEditorIn(box) {
    let ed = box.querySelector('textarea.input, textarea');
    if (ed) return { el: ed, kind: 'textarea' };
    ed = box.querySelector('div.ProseMirror.ProseMirror-woot-style, .ProseMirror, [contenteditable="true"]');
    if (ed) return { el: ed, kind: 'prosemirror' };
    return { el: null, kind: null };
  }

  function getSendButtonIn(box) {
    const areas = [
      box,
      box.querySelector('.flex.justify-between.p-3') || box.querySelector('[data-testid="conversation-composer"]')
    ].filter(Boolean);
    for (const scope of areas) {
      const btn = scope.querySelector('button[type="submit"], button.send-button, button[title*="Enviar"], button[aria-label*="Enviar"]');
      if (btn) return btn;
    }
    return null;
  }

  function getToolsBarIn(box) {
    return box.querySelector('.flex.justify-between.p-3') || box.querySelector('[data-testid="conversation-composer"]') || box;
  }

  // ===== TEXTO ATUAL =====
  function getPlainText(editor) {
    if (!editor.el) return '';
    if (editor.kind === 'textarea') {
      return (editor.el.value || '').replace(/\u00A0/g, ' ').trim();
    }
    return (editor.el.innerText || '').replace(/\u00A0/g, ' ').trim();
  }

  // ===== SETAR CONTEÚDO COM ASSINATURA =====
  function setWithSignature(editor, userName, current, opts = {bold: true}) {
    const signatureBold = `**${userName.trim()}**:`; // corrigido: negrito real (**) + dois pontos
    const signaturePlain = `${userName}:`;
    const sig = opts.bold ? signatureBold : signaturePlain;

    if (editor.kind === 'textarea') {
      const withSig = `${sig}\n${current}`;
      editor.el.value = withSig;
      editor.el.dispatchEvent(new Event('input', { bubbles: true }));
      editor.el.dispatchEvent(new Event('change', { bubbles: true }));
      return;
    }

    if (editor.kind === 'prosemirror') {
      const ed = editor.el;
      ed.innerHTML = '';
      const p1 = document.createElement('p'); p1.textContent = sig; ed.appendChild(p1);
      const p2 = document.createElement('p'); p2.textContent = current; ed.appendChild(p2);
      ed.dispatchEvent(new InputEvent('input', { bubbles: true, cancelable: true }));
      ed.dispatchEvent(new Event('change', { bubbles: true }));
    }
  }

  // ===== REGRAS =====
  function shouldPrependSignature(msg, userName) {
    if (!isSignatureActive) return false;
    if (!msg || !msg.trim()) return false;
    const firstLine = (msg.split('\n')[0] || '').trim();
    if (/^\*\*\S.*\*\*\s*$/.test(firstLine)) return false; // já tem negrito (**) na 1ª linha
    if (new RegExp(`^${escapeRegExp(userName)}:`).test(firstLine)) return false;
    if (/^\s*[\/!#]/.test(msg)) return false;
    return true;
  }
  function escapeRegExp(s){ return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

  // ===== BOTÃO LIGA/DESLIGA =====
  let toggleBtn = null;
  function refreshToggleUI(){
    if (!toggleBtn) return;
    if (isSignatureActive) {
      toggleBtn.style.background = '#22c55e'; // verde
      toggleBtn.style.color = '#fff';
      toggleBtn.style.border = '1px solid #16a34a';
    } else {
      toggleBtn.style.background = '#f1f5f9'; // cinza claro
      toggleBtn.style.color = '#0f172a';
      toggleBtn.style.border = '1px solid #cbd5e1';
    }
    toggleBtn.setAttribute('title', isSignatureActive ? 'Assinatura ativa (clique para desativar)' : 'Assinatura desativada (clique para ativar)');
    toggleBtn.setAttribute('aria-pressed', String(isSignatureActive));
  }
  function buildToggleButton(){
    if (toggleBtn) return toggleBtn;
    toggleBtn = document.createElement('button');
    toggleBtn.type = 'button';
    toggleBtn.className = 'cw-assinatura-toggle';
    toggleBtn.style.padding = '4px 8px';
    toggleBtn.style.borderRadius = '6px';
    toggleBtn.style.fontSize = '12px';
    toggleBtn.style.fontWeight = '600';
    toggleBtn.style.cursor = 'pointer';
    toggleBtn.innerText = 'Ass.';
    toggleBtn.addEventListener('click', () => setActive(!isSignatureActive));
    refreshToggleUI();
    return toggleBtn;
  }
  function ensureToggleOn(box){
    const bar = getToolsBarIn(box);
    if (!bar) return;
    if (bar.querySelector('.cw-assinatura-toggle')) return;
    const left = bar.firstElementChild || bar;
    left.insertBefore(buildToggleButton(), left.firstChild);
  }

  // ===== HOOKS =====
  function hookForBox(box){
    const priv = isPrivateBox(box);
    const editor = getEditorIn(box);
    const sendBtn = getSendButtonIn(box);

    if (!priv) ensureToggleOn(box);

    if (editor.el && !editor.el.__assinaturaKeyHooked) {
      editor.el.__assinaturaKeyHooked = true;
      editor.el.addEventListener('keydown', (ev) => {
        if (ev.key === 'Enter' && !ev.shiftKey && !priv) {
          const userName = getUserName();
          const txt = getPlainText(editor);
          if (userName !== 'Agente' && shouldPrependSignature(txt, userName)) {
            setWithSignature(editor, userName, txt, {bold:true});
          }
        }
      }, true);
    }

    if (sendBtn && !sendBtn.__assinaturaClickHooked) {
      sendBtn.__assinaturaClickHooked = true;
      sendBtn.addEventListener('click', () => {
        if (priv) return;
        const editor2 = getEditorIn(box);
        if (!editor2.el) return;
        const userName = getUserName();
        const txt = getPlainText(editor2);
        if (userName !== 'Agente' && shouldPrependSignature(txt, userName)) {
          setWithSignature(editor2, userName, txt, {bold:true});
        }
      }, true);
    }
  }

  function scan(){
    listReplyBoxes().forEach(hookForBox);
  }

  const mo = new MutationObserver(scan);
  mo.observe(document.body, { childList: true, subtree: true });
  scan();
});
