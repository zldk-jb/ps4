/* Observe only the host's final visible status, never intermediate exploit logs. */
(function () {
    'use strict';
    var status = document.getElementById('msgs');
    if (!status) return;
    var overlay = null;
    var icon = null;
    var caption = null;
    var lastKind = '';
    function update() {
        var text = (status.textContent || '').replace(/\s+/g, ' ').trim();
        var kind = '';
        if (/\bfailed\b|\bfailure\b|content not found/i.test(text)) kind = 'failure';
        else if (/goldhen/i.test(text) && /\bloaded\b|\bloading successfully\b/i.test(text)) kind = 'success';
        if (!kind) {
            if (overlay) overlay.style.display = 'none';
            lastKind = '';
            return;
        }
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = 'result-image-overlay';
            overlay.setAttribute('role', 'status');
            overlay.setAttribute('aria-live', 'polite');
            icon = document.createElement('img');
            caption = document.createElement('p');
            caption.className = 'result-caption';
            overlay.appendChild(icon);
            overlay.appendChild(caption);
            document.body.appendChild(overlay);
        }
        if (kind !== lastKind) {
            icon.src = 'results/' + kind + '.png';
            icon.alt = kind === 'success' ? 'GoldHEN loaded successfully' : 'Jailbreak failed';
            overlay.className = 'result-' + kind;
            lastKind = kind;
        }
        caption.textContent = text;
        overlay.style.display = 'flex';
    }
    new MutationObserver(update).observe(status, {childList: true, characterData: true, subtree: true});
    update();
}());
