function controllShowHide(form, index){

    //obtém o form (servico ou cliente) que contém os boxForm (cada card de uma pergunta)
    var form = document.getElementById(form);

    //esconde
    if(index != 0){
      form.childNodes[index-1].style.opacity = 0;
      form.childNodes[index-1].style.visibility = "hidden";
    }

    //mostra
    var boxForm = form.childNodes[index].style;
    boxForm.visibility = "visible";
    boxForm.opacity = 1;
}
