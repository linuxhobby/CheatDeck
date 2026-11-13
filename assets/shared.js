/* CLI 速查工具箱 - 共享渲染逻辑 (hermes / pve / tailscale)
 * 页面需提供: const data = [...] (可含 { cat, type:'info', items:[{label,desc}] })
 * 元素: #search 搜索框, #content 内容容器
 */
function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function showToast(msg) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'copy-toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toast._t);
  toast._t = setTimeout(() => toast.classList.remove('show'), 1600);
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    showToast('已复制：' + text);
  }).catch(() => {
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    showToast('已复制');
  });
}

function render(q) {
  const container = document.getElementById('content');
  q = (q || '').toLowerCase().trim();
  let html = '';
  let any = false;

  data.forEach(section => {
    const items = q
      ? section.items.filter(i =>
          (i.cmd || i.label || '').toLowerCase().includes(q) ||
          (i.desc || '').toLowerCase().includes(q)
        )
      : section.items;
    if (!items.length) return;
    any = true;

    if (section.type === 'info') {
      html += `<div class="section"><div class="section-title">${esc(section.cat)}</div><div class="info-box">`;
      items.forEach(i => {
        html += `<div class="info-item"><span class="info-label">${esc(i.label || '')}</span><span class="info-text">${esc(i.desc)}</span></div>`;
      });
      html += `</div></div>`;
      return;
    }

    html += `<div class="section"><div class="section-title">${esc(section.cat)}</div><div class="cmd-grid">`;
    items.forEach(i => {
      html += `<div class="cmd-card" title="点击复制命令"><span class="cmd-name clickable" data-cmd="${esc(i.cmd)}">${esc(i.cmd)}</span><span class="cmd-desc">${esc(i.desc)}</span></div>`;
    });
    html += `</div></div>`;
  });

  if (!any) html = `<div class="no-result">未找到匹配的命令或描述</div>`;
  container.innerHTML = html;

  container.querySelectorAll('.cmd-card').forEach(card => {
    card.addEventListener('click', () => {
      const el = card.querySelector('.cmd-name');
      copyToClipboard(el.getAttribute('data-cmd'));
    });
  });
}

function filter() { render(document.getElementById('search').value); }

render('');

document.addEventListener('keydown', (e) => {
  if (e.key === '/' && document.activeElement.tagName === 'BODY') {
    e.preventDefault();
    document.getElementById('search').focus();
    document.getElementById('search').select();
  }
  if (e.key === 'Escape' && document.activeElement.id === 'search') {
    document.getElementById('search').blur();
  }
});
