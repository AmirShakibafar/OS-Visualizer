document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const targetPanel = this.getAttribute('data-target');

      document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
      document.querySelectorAll('.tab-panel').forEach(panel => panel.classList.remove('active-body'));
      
      this.classList.add('active');
      document.getElementById(targetPanel).classList.add('active-body');
    });
});
  