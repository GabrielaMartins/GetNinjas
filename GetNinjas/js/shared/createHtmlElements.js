/*Para criar os elementos é fornecido os dados do forms e o id do formulário onde os elementos serão adicionados*/

function insereTitulo(titulo_texto, subtitulo_texto){
  //título do documento
  document.title = titulo_texto;

  var titulo_container = document.getElementById("title_service");

  //cria título e subtítulo
  var titulo = document.createElement('h1');
  titulo.appendChild(document.createTextNode(titulo_texto));

  var subtitulo = document.createElement('h2');
  subtitulo.appendChild(document.createTextNode(subtitulo_texto));

  //adiciona ao DOM
  titulo_container.appendChild(titulo);
  titulo_container.appendChild(subtitulo);
}

function insereElemento(dados, id_elemento){
  debugger;
  var form = document.getElementById(id_elemento);

  dados.forEach(function(objeto, index){

    //acrescenta uma div que delimitará cada "pergunta"
    var boxForm = document.createElement('div');
    boxForm.className = 'box_form box_form_size';
    boxForm.id = index;
    form.appendChild(boxForm);

    //cria o título do item do form
    var titleForm = document.createElement('h3');
    titleForm.className = 'title_form';
    titleForm.appendChild(document.createTextNode(objeto.label));
    boxForm.appendChild(titleForm);

    //cria mensagem de erro para os campos "required"
    var messageError;
    if(objeto.required == true){
      messageError = document.createElement('span');
      messageError.style.display = "none";
      messageError.className = "message_error";
    }

    //verifica qual tipo de input ou select e especifica a mensagem de erro para cada um dos tipos
    if(objeto.type === 'enumerable' && objeto.allow_multiple_value === true){
      insereCheckbox(objeto, boxForm);
      if(messageError != undefined)
        messageError.innerHTML = 'Marque pelo menos uma opção.';
    }else if(objeto.type === 'enumerable' && objeto.allow_multiple_value === false){
      insereSelect(objeto, boxForm);
      if(messageError != undefined)
        messageError.innerHTML = 'Selecione uma opção.';
    }else{
      insereInputs(objeto, boxForm);
      if(messageError != undefined)
        messageError.innerHTML = 'Este campo é requerido.';
    }

    //se existir mensagem, é feito um append no boxForm
    if(messageError!=undefined)
      boxForm.appendChild(messageError);

    //acrescenta div para os botões
    var boxBotoes = document.createElement('div');
    boxBotoes.className = 'box_botoes';
    boxForm.appendChild(boxBotoes);

    //cria o botão "proximo", continuar ou "procurar"
    var botao = document.createElement('button');

    //adiciona um tipo de botão específico
    if(id_elemento == "form_servico" || (id_elemento == "form_cliente" && index != dados.length-1)){
      if(index != dados.length-1){
        botao.type = 'button';
        botao.id = "proximo";
        botao.innerHTML = "Próximo";
        botao.addEventListener ("click", function() {
          validation(id_elemento, index, objeto.required);
        });
      }else{
        botao.type = 'button';
        botao.id = "continuar";
        botao.innerHTML = "Continuar";
        botao.addEventListener ("click", function() {
          validation(id_elemento, index, objeto.required);
        });
      }
    }else{
      botao.type = 'submit';
      botao.id = "procurar";
      botao.innerHTML = "Procurar";
      botao.addEventListener ("click", function() {
        validation(id_elemento, index, objeto.required);
      });
    }

    //adiciona o botão ao DOM
    boxBotoes.appendChild(botao);

  });


}

//função para inserir inputs
function insereInputs(dados, boxForm){
  var input;

  //acrescenta uma div que demilitará cada input
  var inputForm = document.createElement('div');
  inputForm.className = 'box_input';
  boxForm.appendChild(inputForm);

  //adiciona um tipo de input
  if(dados.type === 'big_text'){
    input = document.createElement('textarea');
  }else{
    input = document.createElement('input');
    switch (dados.type) {
      case 'small_text':
      case 'lat_lng':
        input.type = 'text';
        break;
      case 'phone':
        input.type = 'tel';
        break;
      default:
        input.type = dados.type;
    }
  }

  input.id = dados.name;
  input.name = dados.name;
  input.placeholder = dados.placeholder;

  //adiciona o input ao DOM
  inputForm.appendChild(input);

}

//insere input do tipo checkbox
function insereCheckbox(dados, boxForm){

  for(var key in dados.values){

    //acrescenta uma div que demilitará cada input
    var inputForm = document.createElement('div');
    inputForm.className = 'box_input';
    boxForm.appendChild(inputForm);

    //cria um checkbox
    var checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    checkbox.name = dados.values[key];
    checkbox.value = dados.values[key];
    checkbox.id = dados.values[key];
    inputForm.appendChild(checkbox);

    //cria a label
    var label = document.createElement('label');
    label.htmlFor = dados.values[key];
    label.appendChild(document.createTextNode(dados.values[key]));
    inputForm.appendChild(label);

  }

}

//insere select
function insereSelect(dados, boxForm){

  //acrescenta uma div que demilitará cada select
  var inputForm = document.createElement('div');
  inputForm.className = 'box_input';
  boxForm.appendChild(inputForm);

  //cria um select
  var select = document.createElement('select');

  //cria um option vazio
  var option = document.createElement('option');
  option.value = "";
  option.textContent = dados.mask;
  select.appendChild(option);

  //adiciona os options de um select
  for(var key in dados.values){
    var option = document.createElement('option');
    option.value = dados.values[key];
    option.textContent = dados.values[key];

    select.appendChild(option);

  }

  inputForm.appendChild(select);
}
