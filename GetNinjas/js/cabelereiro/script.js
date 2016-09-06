/**--------------------------------------------------------------------------------------//
Aqui é feito o controle para a página de cabeleireiro, de acordo com o endereço de onde
encontra o modelo de dados.
//--------------------------------------------------------------------------------------**/

(function(){
  
  //cria o titulo e subtitulo da página
  insereTitulo("Você está procurando cabeleireiro?", "Preencha as informações abaixo para que possamos te ajudar!");

  //obtem os dados do json da página de cabeleireiro
  carregaDados();

})();

function carregaDados(){
  get('../../model/cabelereiro/fields.json').then(function(data){

    //obtém os dados da página de cabeleireiro
    insereElemento(data._embedded.request_fields, 'form_servico');
    insereElemento(data._embedded.user_fields, 'form_cliente');

    //inicia mostrando o primeiro boxForm do form de serviço
    controllShowHide("form_servico", 0);

  }).catch(function(){
    //em caso de erro mostrar página de erro
  });
}
