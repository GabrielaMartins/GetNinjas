function get(url){
  return new Promise(function(resolve, reject) {
    var ajax;

    if(window.XMLHttpRequest){
      ajax = new XMLHttpRequest();
    }else{
      //para navegadores antigos
      ajax = new XMLHttpRequest();
    }

    ajax.onload = function() {
      if (ajax.status == 200){
        data = JSON.parse(ajax.responseText);
        resolve(data);
      } else {
        //mostrar página de erro
        //não achou...
      }
    };

    ajax.onerror = reject;

    ajax.open('GET', url , true);
    ajax.setRequestHeader("Content-type", "application/json");
    ajax.send();
  });
}
