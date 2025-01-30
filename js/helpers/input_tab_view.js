const tabHandler = () => {
    // Tab switching logic
    const tabs = document.querySelectorAll('#tab-controls button[role="tab"]');
    const panels = document.querySelectorAll('#tab-content div[role="tabpanel"]');

    // Show initial active panel
    const initialActiveTab = document.querySelector('#tab-controls button[aria-selected="true"]');
    const initialActivePanel = document.getElementById(initialActiveTab.dataset.target);
    initialActivePanel.style.display = 'block';

    tabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            // Prevent default action (in case it's in a form)
            e.preventDefault();
            
            // Get target panel
            const target = document.getElementById(tab.dataset.target);
            if (!target) return;

            // Deactivate all tabs and panels
            tabs.forEach(t => {
                t.setAttribute('aria-selected', 'false');
                t.removeAttribute('tabindex');
            });
            
            panels.forEach(panel => {
                panel.style.display = 'none';
                panel.setAttribute('aria-hidden', 'true');
            });

            tab.setAttribute('aria-selected', 'true');
            tab.setAttribute('tabindex', '0');
            target.style.display = 'block';
            target.setAttribute('aria-hidden', 'false');
        });
    });
}
document.addEventListener('DOMContentLoaded', tabHandler());
