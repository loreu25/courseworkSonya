document.addEventListener('DOMContentLoaded', function () {
  const tabs = document.querySelectorAll('.day-tab');
  const grid = document.querySelector('[data-schedule-grid]');
  const title = document.querySelector('[data-schedule-title]');
  const tplA = document.getElementById('schedule-template-a');
  const tplB = document.getElementById('schedule-template-b');

  if (!tabs.length || !grid || !title || (!tplA && !tplB)) return;

  const dayNames = {
    pn: 'Понедельник',
    vt: 'Вторник',
    sr: 'Среда',
    cht: 'Четверг',
    pt: 'Пятница',
    sb: 'Суббота',
    vs: 'Воскресенье',
  };

  function renderTemplateFor(dayKey) {
    // choose template A for ПН/СР/ПТ/ВС, B for ВТ/ЧТ/СБ
    const useA = ['pn', 'sr', 'pt', 'vs'].includes(dayKey);
    const tpl = useA ? tplA : tplB;
    if (!tpl) return;
    grid.innerHTML = '';
    const clone = tpl.content.cloneNode(true);
    grid.appendChild(clone);
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', function () {
      tabs.forEach(t => t.classList.remove('is-active'));
      this.classList.add('is-active');
      const day = this.dataset.day || this.textContent.trim().toLowerCase();
      // normalize common labels: ПН etc -> keys used above
      let key = (this.dataset.day) ? this.dataset.day : day;
      key = key.toLowerCase();
      title.textContent = dayNames[key] || title.textContent;
      renderTemplateFor(key);
    });
  });

  // initial render — find active tab or default to pn
  const active = document.querySelector('.day-tab.is-active') || tabs[0];
  if (active) active.click();
});
