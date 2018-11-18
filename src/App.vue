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
            <div><br /><br /></div>
        </div>
    
        <div id="cadEmpregado" class="form-row" v-show="exibeEmpregado"> 
            <form>        
                <div><br /><br /></div>
                <div class="form-group">
                    <label>Nome</label>
                    <input type="text" class="form-control" id="nomeEmpregado" v-model="empregado.nome" placeholder="Nome do Empregado">
                </div>
                <div class="form-group">
                    <label>CPF</label>
                    <input type="text" class="form-control" id="cpf" v-mask="'###.###.###-##'" v-model="empregado.empresa" placeholder="CPF do Empregado">
                </div>
                <div class="form-group">
                    <label>CNPJ da Empresa do Empregado</label>
                    <input type="text" class="form-control" id="cnpjEmpresa" v-model="empregado.cpf" v-mask="'##.###.###/####-##'" placeholder="Cnpj da empresa">
                </div>
                
                <button  class="btn"  id="enviaEmpregado"  v-on:click.prevent="submit('empregado')">Enviar</button>
            </form>
        </div>
        <div id="cadEmpresa" class="form-row" v-show="exibeEmpresa"> 
            <form>        
                <div><br /><br /></div>
                <div class="form-group">
                    <label>Nome</label>
                    <input type="text" class="form-control" id="nomeEmpresa" v-model="empresa.nome" placeholder="Nome da Empresa">
                </div>
                <div class="form-group">
                    <label>CNPJ</label>
                    <input type="text" class="form-control" v-mask="'##.###.###/####-##'" v-model="empresa.cnpj" id="cnpjEmpresa" placeholder="Cnpj da Empresa">
                </div>
                <div class="form-group">
                    <label>Regime de Horas</label>
                    <input type="text" class="form-control" id="regimeEmpresa"  v-mask="'##'" v-model="empresa.regime" placeholder="Informe de 1 a 99">
                </div>
                <div class="form-group">
                    <label>Valor por Hora</label>
                    <input type="text" class="form-control" v-model="empresa.valorh" v-mask="'##'"  id="horaEmpresa" placeholder="Informe de 1 a 99">
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
                        <input type="date" class="col-sm-4"  v-model="dataini" id="de">
                        <label class="col-sm-1">Até:</label>
                        <input type="date" class="col-sm-4" v-model="datafin" id="ate">
                        <button  class="btn" id="enviaFiltro"  v-on:click="submit('filtro')">Enviar</button>
                    </div>
                </div>
                <div class="form-group" v-show="exibePeriodo">
                    <div id="form-row" v-show="exibePeriodo"> 
                    
                        <table style="border:0" summary="Lançamentos do Funcionario">
                            <tbody>
                                <tr>
                                    <td style="border:0">Horas Positivas</td>
                                    <td style="border:0">Horas Negativas</td>
                                    <td style="border:0">Data</td>
                                    <td style="border:0">CPF do Empregado</td>
                                    <td style="border:0">CNPJ da Empresa</td>
                                </tr> 
                                <tr v-for="lan in Lancamento">
                                    <td style="border:0"><input type="text" v-mask="'##.##'"  class="col-sm-6" v-model="lan.horap"></td>
                                    <td style="border:0"><input type="text" v-mask="'##.##'"  class="col-sm-6" v-model="lan.horan"></td>
                                    <td style="border:0"><input type="text" class="col-sm-6" readonly v-model="lan.data"></td>
                                    <td style="border:0"><input type="text" class="col-sm-8" id="cpfl"  v-model="lan.user"     v-mask="'###.###.###-##'"></td>
                                    <td style="border:0"><input type="text" class="col-sm-8" id="cnpjl" v-model="lan.empresa" v-mask="'##.###.###/####-##'"></td>
                                    <td style="border:0"><button  v-show="exibePeriodo" class="btn"  id="enviaEmpresa"  v-on:click.prevent="enviaponto(lan)">Enviar</button></td>
                                </tr>
                                <tr>
                                    <div class="btn-group" role="group" aria-label="Basic example">
                                        <button  v-show="exibePeriodo" class="btn"  id="voltar"  v-on:click="voltar('lanc')">Voltar</button>
                                    </div>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>                
                
        </div>
        <div id="banco" class="form-row" v-show="exibeBancoAll">         
                <div><br /><br /></div>
                <div v-show="exibeBancoFiltro" id="filtroBanco">
                    <td style="border:0"><label class="col-sm-1">Competência</label></td>
                    <div><br /></div>
                    <tr>
                        <td style="border:0"><input type="text" v-mask="'##'"  class="col-sm-6" v-model="mes" placeholder="mês"></td>
                        <td style="border:0"><input type="text" v-mask="'####'"  class="col-sm-6" v-model="ano" placeholder="ano"></td>
                    </tr>
                    <tr>
                    <td style="border:0"><input type="text" class="col-sm-9" id="cpfl"  placeholder="cpf do empregado" v-model="cpf"     v-mask="'###.###.###-##'"></td>
                    <td style="border:0"><input type="text" class="col-sm-9" id="cnpjl" placeholder="cnpj da empresa" v-model="cnpj" v-mask="'##.###.###/####-##'"></td>
                    </tr>
                    <button  class="btn" id="enviaFiltroB"  v-on:click="submit('filtroBanco')">Enviar</button>
                </div>        
        </div>
        <div id="form-row" v-show="exibeBanco"> 
                    
            <table style="border:0" summary="Banco do Funcionário">
                <tbody>
                    <tr>
                        <td style="border:0">Funcionário: </td>
                        <td style="border:0">{{Banco.nome}}</td>
                    </tr> 
                    <tr>
                        <td style="border:0">Empresa: </td>
                        <td style="border:0">{{Banco.empresa}}</td>
                    </tr>    
                    <tr>
                        <td style="border:0">Competência: </td>
                        <td style="border:0">{{Banco.comp}}</td>
                    </tr> 
                    <tr>
                        <td style="border:0">Total de Horas Positivas:</td>
                        <td style="border:0">{{Banco.pos}}</td>
                    </tr>    
                    <tr>
                        <td style="border:0">Total de Horas Negativas:</td>
                        <td style="border:0">{{Banco.neg}}</td>
                    </tr>
                    <tr>
                        <td style="border:0">Salário a Receber:</td>
                        <td style="border:0">{{Banco.sal}}</td>
                    </tr>
                </tbody>
            </table>
            <button class="btn"  id="returnb" v-on:click="voltar('banco')">Voltar</button>
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
                exibeBancoAll: false,
                exibeBanco: false,
                exibePeriodo: false,
                exibeLancAll: false,
                exibeBancoFiltro:false,
                datadefault : new Date(),
                mes:"",
                ano:"",
                cnpj: "",
                cpf:"",
                msg : 'Bem Vindo ao TimeSheet',
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
                        this.msg = "Cadastro de Empregado";
                        this.Lancamento = [],
                        this.dataini =new Date(),
                        this.datafin =new Date(),
                        this.dataini ="",
                        this.datafin ="",
                        this.empresa = {cnpj:"",nome:"",regime:"",valorh:""},
                        this.exibeEmpregado = true,
                        this.exibeLanc = false,
                        this.exibeEmpresa= false,
                        this.exibePeriodo= false,
                        this.exibeLancAll= false,
                        this.exibeBancoAll= false,
                        this.exibeBanco= false,
                        this.mes="",
                        this.ano="",
                        this.cnpj= "",
                        this.cpf="",
                        this.Banco= {}
                    break;
                    case 'empresa':
                        this.empregado = {nome:"",empresa:"",cpf:""},
                        this.msg = "Cadastro de Empresa";
                        this.exibeLanc = false,
                        this.Lancamento = [],
                        this.dataini =new Date(),
                        this.datafin =new Date(),
                        this.dataini ="",
                        this.datafin ="",
                        this.exibeEmpregado = false,
                        this.exibeEmpresa= true,
                        this.exibePeriodo= false,
                        this.exibeLancAll= false,
                        this.exibeBancoAll= false,
                        this.exibeBanco= false,
                        this.mes="",
                        this.ano="",
                        this.cnpj= "",
                        this.cpf="",
                        this.Banco= {}
                    break;
                    case 'lancamento':
                        this.empregado = {nome:"",empresa:"",cpf:""},
                        this.empresa = {cnpj:"",nome:"",regime:"",valorh:""},
                        this.msg = "Cadastro de Lançamentos";
                        this.exibeLancAll= true,
                        this.exibeLanc = true,
                        this.dataini =new Date(),
                        this.datafin =new Date(),
                        this.dataini ="",
                        this.datafin ="",
                        this.exibeEmpregado = false,
                        this.exibeEmpresa= false,
                        this.exibePeriodo= false,
                        this.exibeBancoAll= false,
                        this.exibeBanco= false,
                        this.mes="",
                        this.ano="",
                        this.cnpj= "",
                        this.cpf="",
                        this.Banco= {},
                        this.Lancamento = []
                    break;
                    case 'banco':
                        this.empregado = {nome:"",empresa:"",cpf:""},
                        this.empresa = {cnpj:"",nome:"",regime:"",valorh:""},
                        this.msg = "Conferência do Banco de Horas";
                        this.exibeLancAll= false,
                        this.exibeLanc = false,
                        this.Lancamento = [],
                        this.dataini =new Date(),
                        this.datafin =new Date(),
                        this.dataini ="",
                        this.datafin ="",
                        this.exibeEmpregado = false,
                        this.exibeEmpresa= false,
                        this.exibePeriodo= false,
                        this.exibeBancoAll= true,
                        this.exibeBancoFiltro= true,
                        this.exibeBanco = false,
                        this.mes="",
                        this.ano="",
                        this.cnpj= "",
                        this.cpf="",
                        this.Banco= {}
                    break;
                }
            },
            submit(opcao){
                switch(opcao){     
                   case 'filtro':
                        this.exibeLanc = false,
                        this.exibeEmpregado = false,
                        this.exibeEmpresa= false,
                        this.exibePeriodo= true,
                        this.dataini,
                        this.datadefault  = new Date("01/01/2018")
                        var auxdataini = new Date(this.dataini);
                        var datafut = new Date();
                       
                        if(!this.dataini || !this.datafin ){
                           this.msg = "Favor Informar datas validas";   
                           this.exibePeriodo= false;   
                           this.exibeLanc = true;
                        }
                        else if(this.dataini > this.datafin){
                           this.msg = "Data Inicial deve ser Maior que data Final";     
                           this.exibePeriodo= false;
                           this.exibeLanc = true;
                        }else if(auxdataini < this.datadefault){
                            this.msg = "Lançamentos permitidos a partir de 01/01/2018"; 
                            this.exibePeriodo= false;   
                            this.exibeLanc = true;
                        }else if(auxdataini > datafut){
                            this.msg = "Lançamentos futuros não permitidos"; 
                            this.exibePeriodo= false;   
                            this.exibeLanc = true;
                        }else{ 
                           var auxdataini = new Date(this.dataini);
                           var auxdatafin = new Date(this.datafin); 
                           var timeDiff = Math.abs(auxdatafin.getTime() - auxdataini.getTime());
                           var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
                           var aux = 0;
                           var display = "";
                           if(diffDays > 7){
                              this.msg = "Limite de 7 dias por Lançamento";  
                              this.exibePeriodo= false;   
                              this.exibeLanc = true;
                           }else{
                                do{
                                     auxdataini.setDate(auxdataini.getDate() + 1);

                                     let dat = "";
                                     if(auxdataini.getDate() < 10){
                                         dat = "0" + auxdataini.getDate().toString();

                                     }else{
                                         dat = auxdataini.getDate();
                                     }
                                     display = dat + '/' + (auxdataini.getMonth() + 1) + '/' + auxdataini.getFullYear();

                                     this.Lancamento.push({horap:'',horan:'',data:display,user:'',empresa:''});
                                     aux ++;
                                }while (aux <= diffDays);  
                           }   
                        }
                    break;
                    case 'empresa':
                            this.msg = "Cadastro de Empresa";
                            if(!this.empresa.nome || !this.empresa.cnpj || !this.empresa.regime || !this.empresa.valorh){
                                 this.msg = "Todos os Campos são obrigatórios.";   
                            }else{
                                var payload = this.empresa.cnpj;
                                    payload = payload.replace("/","");
                                    payload = payload.replace(".","");
                                    payload = payload.replace(".","");
                                    payload = payload.replace("-","");
                                this.$http.get(`https://pontobackend.herokuapp.com/empresa/busca/${payload}`,{
                                }).then(function(data){
                                    if(data.body.length == 0){
                                        this.$http.post('https://pontobackend.herokuapp.com/empresa/criar',{
                                            nome: this.empresa.nome,
                                            cnpj: payload,
                                            regime: this.empresa.regime,
                                            valorh: this.empresa.valorh
                                        }).then(function(data){
                                             this.msg = "Empresa Criada com Sucesso";
                                             this.empresa.nome = "";
                                             this.empresa.cnpj = "";
                                             this.empresa.regime = "";
                                             this.empresa.valorh = "";
                                        });
                                    }else{
                                        this.msg = "Já Existe uma Empresa com Este CNPJ cadastrada.";
                                    }
                                });
                            }
                    break;
                    case 'empregado' :
                        this.msg = "Cadastro de Empresa";
                        if(!this.empregado.nome || !this.empregado.cpf || !this.empregado.empresa){
                            this.msg = "Todos os Campos são obrigatórios.";   
                        }else{
                            var payload = this.empregado.cpf;
                                payload = payload.replace("/","");
                                payload = payload.replace(".","");
                                payload = payload.replace(".","");
                                payload = payload.replace("-","");
                            var payloadAux = this.empregado.empresa;
                                payloadAux = payloadAux.replace(".","");
                                payloadAux = payloadAux.replace(".","");
                                payloadAux = payloadAux.replace("-","");    

                            this.$http.get(`https://pontobackend.herokuapp.com/empregado/busca/${payloadAux}/${payload}`,{
                                }).then(function(data){
                                    if(data.body.length == 0){
                                            this.$http.get(`https://pontobackend.herokuapp.com/empresa/busca/${payload}`,{
                                            }).then(function(data){
                                                if(data.body.length != 0){
                                                     this.$http.post(`https://pontobackend.herokuapp.com/empregado`,{
                                                         nome : this.empregado.nome,
                                                         cpf  : payloadAux,
                                                         empresa: payload
                                                     }).then(function(data){
                                                         this.msg = "Empregado Cadastrado com Sucesso.";
                                                         this.empregado.nome = "";
                                                         this.empregado.cpf = "";
                                                         this.empregado.empresa = "";
                                                     })    
                                                }else{
                                                    this.msg = "Não existe uma empresa com o CNPJ informado Cadastrada.";    
                                                }
                                            });
                                    }else{
                                        this.msg = "Já Existe um Empregado com Este CPF cadastrado.";
                                    }
                                });
                            
                        }
                    break;
                    case 'filtroBanco' :
                        this.exibeBancoFiltro = false,
                        this.exibeBanco = false
                        this.msg = "Conferência do Banco de Horas";
                        if(!this.mes || !this.ano || !this.cpf || !this.cnpj){
                            this.msg = "Todos os Campos são obrigatórios.";
                            this.exibeBancoFiltro = true,
                            this.exibeBanco = false   
                        }else if(this.mes == 0 || this.mes > 12){
                            this.msg = "Mês inválido.";
                            this.exibeBancoFiltro = true,
                            this.exibeBanco = false
                        }else if(this.ano < 2018){
                            this.msg = "Sistema guarda registros de ponto a partir de 2018.";    
                            this.exibeBancoFiltro = true,
                            this.exibeBanco = false
                        }else{
                              var payload = this.cnpj;
                        payload = payload.replace("/","");
                        payload = payload.replace(".","");
                        payload = payload.replace(".","");
                        payload = payload.replace("-","");
                    var payload2 = this.cpf;
                        payload2 = payload2.replace(".","");
                        payload2 = payload2.replace(".","");
                        payload2 = payload2.replace("-","");
                    
                    this.$http.get(`https://pontobackend.herokuapp.com/empresa/busca/${payload}`,{
                    }).then(function(data){
                        if(data.body.length > 0){
                            var emp1 = data.body[0];
                            this.$http.get(`https://pontobackend.herokuapp.com/empregado/busca/${payload2}/${payload}`,{  
                            }).then(function(data){
                                if(data.body.length > 0){
                                        var emp2 = data.body[0];
                                        this.$http.get(`https://pontobackend.herokuapp.com/lancamento/all/${payload2}/${payload}`,{  
                                        }).then(function(data){
                                            var response = [];
                                            for (var i in data.body){
                                                 if (data.body[i].mes == this.mes && data.body[i].ano == this.ano){
                                                     response.push(data.body[i]);
                                                 }     
                                            }
                                            this.exibeBanco = true;
                                            var totalPos = 0;
                                            var totalNeg = 0;
                                            var Soma     = 0;
                                            
                                            for (var i in response){
                                                var totalPos = totalPos + response[i].pos;
                                                var totalNeg = totalNeg + response[i].neg;
                                            }
                                            
                                            Soma = (totalPos * (emp1.regime * emp1.valorh) - (totalNeg * (emp1.regime * emp1.valorh)));
                                            if(Soma < 0){
                                                Soma = 0;
                                            }
                                            this.Banco = {nome: emp2.nome,empresa:emp1.nome,comp:this.mes + "/" + this.ano,pos:totalPos,neg:totalNeg,sal:Soma.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })};
                                        });
                                }else{
                                    this.msg = "Não Existe um Empregado com Este CPF cadastrado.";
                                    this.exibeBancoFiltro = true,
                                    this.exibeBanco = false
                                }
                            });
                        }else{
                            this.msg = "Não Existe uma Empresa com Este CNPJ cadastrada.";
                            this.exibeBancoFiltro = true,
                            this.exibeBanco = false
                        }
                    });
                            
                        }
                    break;
                }
            },
            enviaponto(reg){
                if(!reg.horap || !reg.horan || !reg.user || !reg.empresa){
                     this.msg = "Todos os Campos são obrigatórios.";   
                }else{

                    var payload = reg.empresa;
                        payload = payload.replace("/","");
                        payload = payload.replace(".","");
                        payload = payload.replace(".","");
                        payload = payload.replace("-","");
                    var payload2 = reg.user;
                        payload2 = payload2.replace(".","");
                        payload2 = payload2.replace(".","");
                        payload2 = payload2.replace("-","");
                    var payload3 = reg.data.replace("/","-"); 
                        payload3 = payload3.replace("/","-");   
                        payload3 = payload3.split("-");

                    this.$http.get(`https://pontobackend.herokuapp.com/empresa/busca/${payload}`,{
                    }).then(function(data){
                        if(data.body.length > 0){
                            this.$http.get(`https://pontobackend.herokuapp.com/empregado/busca/${payload2}/${payload}`,{  
                            }).then(function(data){
                                if(data.body.length > 0){
                                        this.$http.get(`https://pontobackend.herokuapp.com/lancamento/busca/${payload2}/${payload}/${payload3[0]}/${payload3[1]}/${payload3[2]}`,{  
                                        }).then(function(data){
                                            if(data.body.length == 0){
                                                   
                                                    this.$http.post(`https://pontobackend.herokuapp.com/lancamento`,{  
                                                        empregado : payload2,
                                                        empresa: payload,
                                                        dia: payload3[0],
                                                        mes: payload3[1],
                                                        ano: payload3[2],
                                                        pos:reg.horap,
                                                        neg:reg.horan
                                                    }).then(function(data){
                                                        this.msg = "Registro inserido com sucesso para a data: " + reg.data;
                                                        reg.horap = "";
                                                        reg.horan = "";
                                                        reg.user = "";
                                                        reg.empresa = "";
                                                    })
                                            }else{
                                               this.msg = "Já existe um lançamento para esta data";
                                            }
                                        });
                                }else{
                                    this.msg = "Não Existe um Empregado com Este CPF cadastrado.";
                                }
                            });
                        }else{
                            this.msg = "Não Existe uma Empresa com Este CNPJ cadastrada.";
                        }
                    });
                }   
            },
            /*volta a tela inicial */
            voltar(opc){
                switch(opc){
                    case "lanc":
                        this.exibeLanc = true,
                        this.exibeEmpregado = false,
                        this.exibeEmpresa= false,
                        this.exibePeriodo= false
                        this.msg = 'Bem Vindo ao TimeSheet',
                        this.dataini =new Date(),
                        this.datafin =new Date(),
                        this.dataini ="",
                        this.datafin =""
                    break;
                    case "banco":
                        this.exibeBanco = false,
                        this.exibeEmpregado = false,
                        this.exibeEmpresa= false,
                        this.exibePeriodo= false,
                        this.exibeBancoAll=true,
                        this.msg = 'Bem Vindo ao TimeSheet'
                    break;
                }
            
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
        border: 0;
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
