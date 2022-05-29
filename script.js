/** @type{HTMLInputElement} */
const publicKey$ = document.getElementById('public-key');

/** @type{HTMLInputElement} */
const privateKey$ = document.getElementById('private-key');

/** @type{HTMLInputElement} */
const substring$ = document.getElementById('substring');

/** @type{HTMLElement} */
const hash$ = document.getElementById('hash');

publicKey$.addEventListener('input', createHash);
privateKey$.addEventListener('input', createHash);
substring$.addEventListener('input', createHash);
hash$.addEventListener('click', copyHash);

function createHash() {
  const publicKey = publicKey$.value.trim();
  const privateKey = privateKey$.value.trim();
  const substring = +substring$.value.trim();

  if (!publicKey || !privateKey) {
    return;
  }

  let hash = MD5(`${publicKey}:${privateKey}`);

  if (substring) {
    hash = hash.substring(0, substring);
  }

  hash$.innerHTML = hash;
}

function copyHash() {
  navigator.clipboard.writeText(hash$.innerHTML).then(() => toast('Copied'));
}

function toast(message) {
  const element$ = document.getElementById('toast');

  element$.innerHTML = message;
  element$.classList.add('show');

  setTimeout(() => element$.classList.remove('show'), 500);
}
