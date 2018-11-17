<template>
    <div id="app">
        <h1>Time Sheet - Qualidade de Produto</h1>
        <h2 id="msg">{{msg}}</h2>
        <div><br /><br /></div>
        <div id="menu" class="btn-group" role="group" >
            <button class="btn"  id="empregado"  v-on:click="redirect('empregado')">Cadastrar Empregado</button>
            <button class="btn"  id="empresa"  v-on:click="redirect('empresa')">Cadastrar Empresa</button>
            <button class="btn"  id="lancamento"  v-on:click="redirect('lancamento')">Realizar Apontamento</button>
            <button class="btn"  id="banco"  v-on:click="redirect('banco')">Verificar Extrato</button>
        </div>
    
        <div id="cadEmpregado" class="form-row" v-show="exibeEmpregado"> 
            <form>        
                <div><br /><br /></div>
                <div class="form-group">
                    <label>Nome</label>
                    <input type="text" class="form-control" id="nomeEmpregado" placeholder="Nome do Empregado">
                </div>
                <div class="form-group">
                    <label>CPF</label>
                    <input type="text" class="form-control" id="cpf" v-mask="'###.###.###-##'" placeholder="CPF do Empregado">
                </div>
                <div class="form-group">
                    <label>CNPJ da Empresa do Empregado</label>
                    <input type="text" class="form-control" id="cnpjEmpresa" v-mask="'##.###.###/####-##'" placeholder="Cnpj da empresa">
                </div>
                
                <button  class="btn"  id="enviaEmpregado"  v-on:click.prevent="envia('empregado')">Enviar</button>
            </form>
        </div>
        <div id="cadEmpresa" class="form-row" v-show="exibeEmpresa"> 
            <form>        
                <div><br /><br /></div>
                <div class="form-group">
                    <label>Nome</label>
                    <input type="text" class="form-control" id="nomeEmpresa" placeholder="Nome da Empresa">
                </div>
                <div class="form-group">
                    <label>CNPJ</label>
                    <input type="text" class="form-control" v-mask="'##.###.###/####-##'" id="cnpjEmpresa" placeholder="Cnpj da Empresa">
                </div>
                <div class="form-group">
                    <label>Regime de Horas</label>
                    <input type="number" class="form-control" id="regimeEmpresa" min="1" max="100" placeholder="ex: 8">
                </div>
                <div class="form-group">
                    <label>Valor por Hora</label>
                    <input type="text" class="form-control" v-mask="'##.##'"  id="horaEmpresa" placeholder=" Valor Maximo  99.99">
                </div>
                
                <button  class="btn"  id="enviaEmpresa"  v-on:click.prevent="submit('empresa')">Enviar</button>
            </form>
        </div>
       <div id="lancamentos" class="form-row" v-show="exibeLancAll">         
                <div><br /><br /></div>
                    <div v-show="exibeLanc" id="filtro">
                        <label class="col-sm-2">Período:</label>

                    <div> 
                        <label class="col-sm-1">De:</label>
                        <input type="date" class="col-sm-4" v-model="dataini" id="de">
                        <label class="col-sm-1">Até:</label>
                        <input type="date" class="col-sm-4" id="ate" v-model="datafin">
                        <button  class="btn" id="enviaFiltro"  v-on:click="submit('filtro')">Enviar</button>
                    </div>
                </div>
                <div class="form-group" v-show="exibePeriodo">
                    <div id="cabec"> 
                        <label class="col-sm-3">Horas Positivas</label>
                        <label class="col-sm-3">Horas Negativas</label>
                        <label class="col-sm-3">Data</label>
                    </div>
                    <div id="periodo" v-show="exibePeriodo" v-for="lan in Lancamento">
                        <input type="text" v-mask="'##.##'"  class="col-sm-3" v-model="lan.horap">
                        <input type="text" v-mask="'##.##'"  class="col-sm-3" v-model="lan.horan">
                        <input type="text" class="col-sm-3" readonly v-model="lan.data">
                    
                    </div>
                    <div class="btn-group" role="group" aria-label="Basic example">
                        <button  v-show="exibePeriodo" class="btn"  id="enviaEmpresa"  v-on:click.prevent="submit('empresa')">Enviar</button>
                        <button  v-show="exibePeriodo" class="btn"  id="voltar"  v-on:click="voltar()">Voltar</button>
                    </div>
                </div>                
                
        </div>
    </div>    
</template>

<script>
    export default {
        data : function() {
            return{
                exibeLanc : false,
                exibeEmpregado : false,
                exibeEmpresa: false,
                exibePeriodo: false,
                exibeLancAll: false,
                msg : 'Bem Vindo ao TimeSheet',
                listaFiltro : [],
                empresa: {cnpj:"",nome:"",regime:"",valorh:""},
                empregado :{nome:"",empresa:"",cpf:""},
                Lancamento: [],
                dataini:"",
                datafin:"",
                Banco: {},
            }
        },
        methods: {

            redirect(opcao){
                switch(opcao){
                    case 'empregado':
                        this.exibeEmpregado = true,
                        this.exibeLanc = false,
                        this.exibeEmpresa= false,
                        this.exibePeriodo= false,
                        this.exibeLancAll= false
                    break;
                    case 'empresa':
                        this.exibeLanc = false,
                        this.exibeEmpregado = false,
                        this.exibeEmpresa= true,
                        this.exibePeriodo= false,
                        this.exibeLancAll= false
                    break;
                    case 'lancamento':
                        this.exibeLancAll= true,
                        this.exibeLanc = true,
                        this.exibeEmpregado = false,
                        this.exibeEmpresa= false,
                        this.exibePeriodo= false
                    break;
                    
                }
            },
            submit(opcao){
                switch(opcao){     
                   case 'filtro':
                        this.exibeLanc = false,
                        this.exibeEmpregado = false,
                        this.exibeEmpresa= false,
                        this.exibePeriodo= true
                        debugger
                        if(!this.dataini || !this.datafin ){
                           this.msg = "Favor Informar os campos do filtro";      
                        }
                        else if(this.dataini > this.datafin){
                           this.msg = "Data Inicial deve ser Maior que data Final";     
                        }else{
                           var auxdataini = new Date(this.dataini);
                           var auxdatafin = new Date(this.datafin); 
                           var timeDiff = Math.abs(auxdatafin.getTime() - auxdataini.getTime());
                           var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
                           var aux = 0;
                           var display = "";
                           do{
                                auxdataini.setDate(auxdataini.getDate() + 1);
                                display = auxdataini.getDate() + '/' + auxdataini.getMonth() + '/' + auxdataini.getFullYear()
                                this.Lancamento.push({horap:'',horan:'',data:display});
                                aux ++;
                                debugger
                           }while (aux < diffDays);     
                        }
                       this.Lancamento;
                        debugger  
                    break;
                }
            },
            /*volta a tela inicial */
            voltar(){
                this.exibeLanc = true,
                this.exibeEmpregado = false,
                this.exibeEmpresa= false,
                this.exibePeriodo= false
                this.msg = 'Bem Vindo ao TimeSheet'

               /* this.$http.get('https://pontobackend.herokuapp.com/empresa/all',{
                 
            }),then(function(data){

            }); */
            }
        }
    }
</script>

<style>
    * {
       box-sizing: border-box;
       font-family: 'Montserrat', "sans-serif"; 
    }

    body {
        color: #fff;
        background: linear-gradient(to right, rgb(21, 153, 87), rgb(21, 87, 153));
    }

    #app {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    #app h1 {
        border: 1px solid #000;
        background-color: #0004;
        padding: 20px;
        margin-bottom: 60px;
    }

    #app h2 {
        border: 1px solid #000;
        background-color: #0004;
        padding: 20px;
        margin-top: 120px;
        position: absolute;
        margin-bottom: 30px;
    }


    .tooltip {
        position: relative;
        display: inline-block;
    }

    .tooltip .tooltiptext {
        visibility: hidden;
        background-color: black;
        color: #fff;
        text-align: center;
        border-radius: 6px;
        padding: 5px 0;

        /* Position the tooltip */
        position: absolute;
        z-index: 1;
    }

    .tooltip:hover .tooltiptext {
        visibility: visible;
    }

    .cmd{
        width: 300px;
        margin-top: 80px;
    }

    .btn {
        position: relative;
        border:1px solid #000; 
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 10px;
        margin-bottom: 20px;
    }

    #tbRoad,#tbOut {
        border: 1px solid #000;
        background-color: #0004;
        padding: 20px;
        position: absolute;
        margin-bottom: 60px;
        margin-top: 200px;
    }

    tbRoad,tbOut, td, th, tfoot {
        border:solid 1px #000;
        padding:5px;
    }
</style>
