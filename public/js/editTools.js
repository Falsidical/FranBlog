const textArea = document.querySelector('#body');

const deleteBtn = document.querySelector('#icon-delete');
const icons = document.querySelectorAll('.icon');

const iconText = ['![alt](url)', '*italic*', '~~Strikethrough~~', '**bold**', '# ', '## ', '### ', 'code', 'link'];

for (let i = 0; i <= 6; i++) {
  icons[i].addEventListener('click', (e) => {
    textArea.value += iconText[i];
  });
}

deleteBtn.addEventListener('click', (e) => {
  textArea.value = '';
});
