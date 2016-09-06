/*--------------------------------------------------------------
Esta função faz a validação dos dados que são required e chama a função
para mostrar e esconder os boxForm (card que contém cada pergunta)
---------------------------------------------------------------*/

function validation(id, index, isRequired){
  var form = document.getElementById(id);
  var boxForm = form.childNodes[index];
  var isValid = false;

  //seleciona todos os inputs e selects de cada boxForm
  for (var i = 0; i < boxForm.childNodes.length; i++) {
    if (boxForm.childNodes[i].className == "box_input") {
      var inputs = boxForm.childNodes[i].getElementsByTagName('input');
      var select = boxForm.childNodes[i].getElementsByTagName('select');

      //se existirem inputs no boxForm
      if(inputs.length != 0){
        for(var j = 0; j < inputs.length; j++) {
          //verifica se o input do tipo checkbox está checado
          if(inputs[j].type.toLowerCase() == 'checkbox' && inputs[j].checked == true) {
            isValid = true;
          }
          //verifica para os outros tipos de input se o campo está preenchido
          if(inputs[j].type.toLowerCase() === 'text' || inputs[j].type.toLowerCase() === 'tel' || inputs[j].type.toLowerCase() === 'email'){
            if(inputs[j].value != ""){
              isValid = true;
            }
          }
        }
      }
      //se existem elementos do tipo select
      if(select.length != 0){
        for(var j = 0; j < select.length; j++) {
          //verifica se há algum elemento selecionado
          if(select[j].selectedIndex !== 0){
            isValid = true;
          }
        }
      }
    }
  }

  //se o campo é required e não está válido, mostra mensagem de erro e adiciona animação
  if(isRequired && !isValid){
    boxForm.className +=  " animacao erro-animacao";
    boxForm.getElementsByClassName("message_error")[0].style.display = "block";
  }else{
    //se não, passa para a próxima pergunta
    if(id == "form_servico"){
      if(index != form.childNodes.length-1){
        controllShowHide(id, index+1);
      }else{
        controllShowHide("form_cliente", 0);
      }
    }else{
      if(index != form.childNodes.length-1){
        controllShowHide(id, index+1);
      }else{
        //faz post...
      }
    }
  }


}
