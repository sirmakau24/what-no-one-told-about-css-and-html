// Wait for DOM content to load
document.addEventListener('DOMContentLoaded', () => {
  // 1. Show/Hide Code Toggle Buttons
  const codeToggleButtons = document.querySelectorAll('.code-toggle');

  codeToggleButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetId = button.getAttribute('data-target');
      if (!targetId) return;

      const codeBlock = document.getElementById(targetId);
      if (!codeBlock) return;

      const isHidden = codeBlock.style.display === 'none' || getComputedStyle(codeBlock).display === 'none';

      if (isHidden) {
        codeBlock.style.display = 'block';
        button.textContent = 'Hide Code';
      } else {
        codeBlock.style.display = 'none';
        button.textContent = 'Show Code';
      }
    });
  });

  // 2. Toggle All Code Blocks (if you add a #toggleAllCode button in future)
  const toggleAllBtn = document.getElementById('toggleAllCode');
  if (toggleAllBtn) {
    toggleAllBtn.addEventListener('click', () => {
      const allCodeBlocks = document.querySelectorAll('.code-block');
      // Determine if any are hidden
      const anyHidden = Array.from(allCodeBlocks).some(block => {
        return block.style.display === 'none' || getComputedStyle(block).display === 'none';
      });

      allCodeBlocks.forEach(block => {
        block.style.display = anyHidden ? 'block' : 'none';
      });

      toggleAllBtn.textContent = anyHidden ? 'Hide All Code' : 'Show All Code';

      // Also update individual toggle buttons accordingly
      codeToggleButtons.forEach(btn => {
        btn.textContent = anyHidden ? 'Hide Code' : 'Show Code';
      });
    });
  }

  // 3. Theme Toggle (Dark/Light Mode)
  const modeToggleBtn = document.getElementById('mode-toggle');
  const body = document.body;

  // Load saved theme from localStorage
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    if (modeToggleBtn) modeToggleBtn.textContent = '☀️';
  } else {
    if (modeToggleBtn) modeToggleBtn.textContent = '🌙';
  }

  if (modeToggleBtn) {
    modeToggleBtn.addEventListener('click', () => {
      body.classList.toggle('dark-mode');
      const isDark = body.classList.contains('dark-mode');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      modeToggleBtn.textContent = isDark ? '☀️' : '🌙';
    });
  }

  // 4. Form Validation
  const exampleForm = document.getElementById('example-form');
  if (exampleForm) {
    exampleForm.addEventListener('submit', (e) => {
      // Check required inputs
      const requiredFields = exampleForm.querySelectorAll('[required]');
      let allFilled = true;

      requiredFields.forEach(field => {
        // For radio groups, check if any radio with same name is checked
        if (field.type === 'radio') {
          const radios = exampleForm.querySelectorAll(`input[name="${field.name}"]`);
          const anyChecked = Array.from(radios).some(radio => radio.checked);
          if (!anyChecked) allFilled = false;
        } else if (!field.value.trim()) {
          allFilled = false;
        }
      });

      if (!allFilled) {
        e.preventDefault();
        alert('Please fill all required fields.');
      }
    });
  }
});
