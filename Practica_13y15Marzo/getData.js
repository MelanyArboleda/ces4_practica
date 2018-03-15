function loadData(){
    const sitio = 'https://practica12marzo.firebaseio.com/Errors.json';
    dataErrors(sitio);
}
function dataErrors(sitio) {
    const tab = document.getElementById('Error');
    tab.innerHTML = '';
    fetch(sitio)
      .then((resp) => resp.json())
      .then(function (data) {
        let errores = data;
        let tit1 = createNode('th');
        tit1.innerHTML = 'Status';
        append(tab, tit1);
        tit1 = createNode('th');
        tit1.innerHTML = 'Message';
        append(tab, tit1);
        return errores.map(function (errors, index) {
            let tr = createNode('tr')
              ta = createNode('td'),
              tb = createNode('td'),
              tbot = createNode('td'),
              bot = createNode('button');
            ta.innerHTML = `${errors.Status}`;
            tb.innerHTML = `${errors.Message}`;
            //a.innerHTML = 'Show';
            bot.innerText = 'Show';
            bot.addEventListener('click',() => show(errors));
            append(tr, ta);
            append(tr, tb);
            append(tr, tbot);
            append(tbot, bot);
            append(tab, tr);
        })
      })
        .catch(function (error) {
          console.log(JSON.stringify(error));
        });
}

function createNode(element) {
    return document.createElement(element);
  }
  
function append(parent, el) {
    return parent.appendChild(el);
}
function show(errors){
  errors.innerHTML = '';
  window.open(`http://localhost:3030/stsx?status=${errors.Status}&message=${errors.Message}`, '_blank');
    alert(`${errors.Status}`);
}

loadData();