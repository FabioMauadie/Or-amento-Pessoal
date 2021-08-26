
// CRIANDO A CLASSE DESPESA PARA O FORMULARIO DE CADASTRO
class Despesa {
   constructor(ano,mes,dia,tipo,descricao,valor) {
      this.ano = ano
      this.mes = mes
      this.dia = dia
      this.tipo = tipo
      this.descricao = descricao
      this.valor = valor
   }
   // metodo q vai ver se todos os campos estao preenhidos
   validarDados() {
      //  o for in vai passar por todos os itens do formulario e ver se eles estao preenchidos se eles nao estiver preenchidos vai ser retornado false e se estiver vai retornar true... na funcao cadastrar despesas vai ser chamando o metodo e caso ele seja true vai mostrar a mensagem de cadastro realizado com sucesso e caso false vai mostrar para preencher todos os campos.
      for(let i in this) {
         if(this[i] == undefined || this[i] == '' || this[i] == null) {
            return false
         }
        
      }
      return true
   }
}




// classe responsavel por criar um indice no localStorage sem ela a gente nao consegue salvar mais de 1 item no localStorage
class Bd {
   constructor() {
      let id = localStorage.getItem('id')
      // caso nao exista um id no localStorage o retorno sera null entao iremo setar o id passando o valor 0
      if(id === null) {
         localStorage.setItem('id',0)
      }
   }
      // esse metodo vai verificar se ja existe um id inserido no localStorage
      getProximoId() {
         // get item serve para recuperar um dado dentro de localStorage
         let proximoId = localStorage.getItem('id')
         return parseInt(proximoId) + 1
      }
      // metodo que grava os dados no localStorage
      gravar(d) {
         // devemos chamar o nome da variavel instanciada e converter para JSON o setItem serve para inserir um dado dentro de localStorage
         let id = this.getProximoId()
         localStorage.setItem(id,JSON.stringify(d))
         // vai acrescentar no indice do localstorage
         localStorage.setItem('id',id)
      }


      // metodo reposavel por recuperar as despesas para realizar a listagem
      recuperarTodosRegistros() {
         // só conseguimos chamar a despesa na view se colocarmos ela dentro de um array apos ser convertida para objeto literal
         let despesas = Array()
         // recuperando os dados que estao contidos dentro de localStorage
         let id = localStorage.getItem('id')
         // com o for recuperamos todas as dispesas cadastradas em localStorage
         for (let i = 1; i<= id; i++) {
            // recuperando a despesa
             // convertendo as depesas de json para objeto literal
            let despesa = JSON.parse(localStorage.getItem(i)) 
           
            // iremos verificar se tem a chance de ter indices removido se existir iremos pular esses indices
            if(despesa === null) {
               continue
            }
            // recupera o atributo id ...vai ajudar na hora de excluir um item
            despesa.id = i
            despesas.push(despesa)
      
         }
         return despesas

    
       
      }
      
      pesquisar(despesa) {
         // estamos recuperando todos os dados do localStorage
         let despesasFiltradas = Array()
         despesasFiltradas =  this.recuperarTodosRegistros()
         console.log(despesasFiltradas);
		   console.log(despesa)
       
         // realizando os filtros
         // ano
      
         if(despesa.ano != '') {
            console.log('filtro de ano')
            despesasFiltradas =  despesasFiltradas.filter(d => d.ano == despesa.ano)
         }
          // mes
           if(despesa.mes != '') {
            console.log('filtro de mes')
            despesasFiltradas =  despesasFiltradas.filter(d => d.mes == despesa.mes)
         }
           // dia
           if(despesa.dia != '') {
            console.log('filtro de dia')
            despesasFiltradas =  despesasFiltradas.filter(d => d.dia == despesa.dia)
         }
             // tipo
            if(despesa.tipo != '') {
            console.log('filtro de tipo')
            despesasFiltradas =  despesasFiltradas.filter(d => d.tipo == despesa.tipo)
         }
         //   descricao
           if(despesa.descricao != '') {
            console.log('filtro de descricao')
            despesasFiltradas =  despesasFiltradas.filter(d => d.descricao == despesa.descricao)
         }
            //  valor
           if(despesa.valor != '') {
              console.log('filtro de valor')
            despesasFiltradas =  despesasFiltradas.filter(d => d.valor == despesa.valor)
         }
        
         
            return despesasFiltradas

      }
      // metodo que remove um item no localStorage
      remover(id) {

            localStorage.removeItem(id)

      }

}

// instanciando a classe bd
let bd = new Bd()





// FUNÇÃO CADASTRO QUE É CHAMADA ATRAVES DO ONCLICK +

function cadastrarDespesa() {
   // pegando os valores preenchidos no formulario
   let ano = document.getElementById('ano')
   let mes = document.getElementById('mes')
   let dia = document.getElementById('dia')
   let tipo = document.getElementById('tipo')
   let descricao = document.getElementById('descricao')
   let valor = document.getElementById('valor')

   // instanciando a classe Despesa e passando o valores para a classe
   let despesa = new Despesa (
      ano.value,
      mes.value,
      dia.value,
      tipo.value,
      descricao.value,
      valor.value
   )

  if (despesa.validarDados()) {
  document.getElementById('modal_titulo').innerHTML = 'Registro inserido com suscesso!'
  document.getElementById('modal_titulo_div').className = 'modal-header text-success'
   document.getElementById('modal_conteudo').innerHTML = 'Despesa foi cadastrada com suscesso!'
   document.getElementById('modal_btn').className = 'btn btn-success'
   document.getElementById('modal_btn').innerHTML = 'Voltar'
 

   // estamos executando a funcao gravar, para gravar os dados do cadastro no localStorage
   bd.gravar(despesa)

     // dialog de sucesso 
     $('#modalRegistraDespesa').modal('show')

   // limpando os campos após gravar as despesas
    ano.value=''
    mes.value=''
    dia.value=''
    tipo.value=''
    descricao.value=''
    valor.value=''
  } else {
      // dialog de erro linha 112 do index.html
      document.getElementById('modal_titulo').innerHTML = 'Erro na inclusão do Resgistro!'
      document.getElementById('modal_titulo_div').className = 'modal-header text-danger'
      document.getElementById('modal_conteudo').innerHTML = 'Erro na gravação, verifique se todos os campos foram preenchidos corretamente!'
      document.getElementById('modal_btn').className = 'btn btn-danger'
      document.getElementById('modal_btn').innerHTML = 'Voltar e Corrigir'

        // dialog de sucesso 
   $('#modalRegistraDespesa').modal('show')
  }
   


}

//                             IMPLEMENTAÇÃO DA LISTAGEM

function carregaListaDespesa(despesas = Array(),filtro = false) {

   if(despesas.length == 0 && filtro == false) {
      despesas =  bd.recuperarTodosRegistros()
      // console.log(despesas)
   }
   // selecionando o elemento tbody da tabela
   let listaDespesas = document.getElementById('listaDespesas')
   listaDespesas.innerHTML=''
   /*          <tr>
                <td>15/03/2020</td>
                <td>Alimentação</td>
                <td>Compra do mes</td>
                <td>447,50</td>
              </tr> */

   // percorer o array despesas, listando cada despesa de forma dinamica
   // forEach permite pecorrer cada posicao do array recuperando um valor
   despesas.forEach(function(d){
      // criando os elementos html

      // criando a linha 
      let linha = listaDespesas.insertRow()

      // criando a colunas
      linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`
    
      // ajustar o titulo pois esta vindo em id
      switch(d.tipo) {
         case '1':
            d.tipo = 'Alimentação'
            break
         case '2':
            d.tipo = 'Educação'
             break
         case '3':
         d.tipo = 'Lazer'
            break
         case '4':
            d.tipo = 'Saúde'
               break
         case '5':
            d.tipo = 'Transporte'
               break
      }
      // criando as colunas no html
      linha.insertCell(1).innerHTML = d.tipo
      linha.insertCell(2).innerHTML = d.descricao
      linha.insertCell(3).innerHTML = d.valor
      // criando o botao de exclusão
      let btn = document.createElement("button")
      // colocando uma class bootstrap
      btn.className = 'btn btn-danger'
      // colocando um icone de x no botao 
      btn.innerHTML = '<i class = "fas fa-times"></i>'
   
      // estamos pegando o atributo id do objeto despesa e atribuindo ao botao 
      // com isso cada um dos botoes tera um id correspondente ao documento do localstorage
      btn.id = 'id_despesa_' + d.id
      // dando uma ação ao botao
      btn.onclick = function() {
         // tira o testo id_despesa_ deixando apenas o id
         let id  = this.id.replace('id_despesa_', '')
         
         // chama o metodo que remove o item no localStorage
         bd.remover(id)
         // recarrega a pagina para q a despesa removida possa sumir tbm na tela
         window.location.reload()


      }

      linha.insertCell(4).append(btn)
   })
}

//    ------------------------- pesquisar despesas ------------------------------------------

function pesquisarDespesas() {
   // pegando os valores preenchidos no formulario
   let ano = document.getElementById('ano').value
   let mes = document.getElementById('mes').value
   let dia = document.getElementById('dia').value
   let tipo = document.getElementById('tipo').value
   let descricao = document.getElementById('descricao').value
   let valor = document.getElementById('valor').value

   let despesa = new Despesa(ano,mes,dia,tipo,descricao,valor)

 let despesas =  bd.pesquisar(despesa)

  this.carregaListaDespesa(despesas,true)

}



