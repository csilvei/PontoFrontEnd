webpackJsonp([1],{0:function(e,a){},Hj95:function(e,a){},NHnr:function(e,a,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var i=t("7+uW"),s={data:function(){return{exibeLanc:!1,exibeEmpregado:!1,exibeEmpresa:!1,exibePeriodo:!1,exibeLancAll:!1,msg:"Bem Vindo ao TimeSheet",listaFiltro:[],empresa:{cnpj:"",nome:"",regime:"",valorh:""},empregado:{nome:"",empresa:"",cpf:""},Lancamento:[],dataini:"",datafin:"",Banco:{}}},methods:{redirect:function(e){switch(e){case"empregado":this.exibeEmpregado=!0,this.exibeLanc=!1,this.exibeEmpresa=!1,this.exibePeriodo=!1,this.exibeLancAll=!1;break;case"empresa":this.exibeLanc=!1,this.exibeEmpregado=!1,this.exibeEmpresa=!0,this.exibePeriodo=!1,this.exibeLancAll=!1;break;case"lancamento":this.exibeLancAll=!0,this.exibeLanc=!0,this.exibeEmpregado=!1,this.exibeEmpresa=!1,this.exibePeriodo=!1}},submit:function(e){switch(e){case"filtro":if(this.exibeLanc=!1,this.exibeEmpregado=!1,this.exibeEmpresa=!1,this.exibePeriodo=!0,this.dataini&&this.datafin)if(this.dataini>this.datafin)this.msg="Data Inicial deve ser Maior que data Final";else{var a=new Date(this.dataini),t=new Date(this.datafin),i=Math.abs(t.getTime()-a.getTime()),s=Math.ceil(i/864e5),r=0,o="";do{a.setDate(a.getDate()+1),o=a.getDate()+"/"+a.getMonth()+"/"+a.getFullYear(),this.Lancamento.push({horap:"",horan:"",data:o}),r++}while(r<s)}else this.msg="Favor Informar os campos do filtro";this.Lancamento}},voltar:function(){this.exibeLanc=!0,this.exibeEmpregado=!1,this.exibeEmpresa=!1,this.exibePeriodo=!1,this.msg="Bem Vindo ao TimeSheet"}}},r={render:function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{attrs:{id:"app"}},[t("h1",[e._v("Time Sheet - Qualidade de Produto")]),e._v(" "),t("h2",{attrs:{id:"msg"}},[e._v(e._s(e.msg))]),e._v(" "),e._m(0),e._v(" "),t("div",{staticClass:"btn-group",attrs:{id:"menu",role:"group"}},[t("button",{staticClass:"btn",attrs:{id:"empregado"},on:{click:function(a){e.redirect("empregado")}}},[e._v("Cadastrar Empregado")]),e._v(" "),t("button",{staticClass:"btn",attrs:{id:"empresa"},on:{click:function(a){e.redirect("empresa")}}},[e._v("Cadastrar Empresa")]),e._v(" "),t("button",{staticClass:"btn",attrs:{id:"lancamento"},on:{click:function(a){e.redirect("lancamento")}}},[e._v("Realizar Apontamento")]),e._v(" "),t("button",{staticClass:"btn",attrs:{id:"banco"},on:{click:function(a){e.redirect("banco")}}},[e._v("Verificar Extrato")])]),e._v(" "),t("div",{directives:[{name:"show",rawName:"v-show",value:e.exibeEmpregado,expression:"exibeEmpregado"}],staticClass:"form-row",attrs:{id:"cadEmpregado"}},[t("form",[e._m(1),e._v(" "),e._m(2),e._v(" "),t("div",{staticClass:"form-group"},[t("label",[e._v("CPF")]),e._v(" "),t("input",{directives:[{name:"mask",rawName:"v-mask",value:"###.###.###-##",expression:"'###.###.###-##'"}],staticClass:"form-control",attrs:{type:"text",id:"cpf",placeholder:"CPF do Empregado"}})]),e._v(" "),t("div",{staticClass:"form-group"},[t("label",[e._v("CNPJ da Empresa do Empregado")]),e._v(" "),t("input",{directives:[{name:"mask",rawName:"v-mask",value:"##.###.###/####-##",expression:"'##.###.###/####-##'"}],staticClass:"form-control",attrs:{type:"text",id:"cnpjEmpresa",placeholder:"Cnpj da empresa"}})]),e._v(" "),t("button",{staticClass:"btn",attrs:{id:"enviaEmpregado"},on:{click:function(a){a.preventDefault(),e.envia("empregado")}}},[e._v("Enviar")])])]),e._v(" "),t("div",{directives:[{name:"show",rawName:"v-show",value:e.exibeEmpresa,expression:"exibeEmpresa"}],staticClass:"form-row",attrs:{id:"cadEmpresa"}},[t("form",[e._m(3),e._v(" "),e._m(4),e._v(" "),t("div",{staticClass:"form-group"},[t("label",[e._v("CNPJ")]),e._v(" "),t("input",{directives:[{name:"mask",rawName:"v-mask",value:"##.###.###/####-##",expression:"'##.###.###/####-##'"}],staticClass:"form-control",attrs:{type:"text",id:"cnpjEmpresa",placeholder:"Cnpj da Empresa"}})]),e._v(" "),e._m(5),e._v(" "),t("div",{staticClass:"form-group"},[t("label",[e._v("Valor por Hora")]),e._v(" "),t("input",{directives:[{name:"mask",rawName:"v-mask",value:"##.##",expression:"'##.##'"}],staticClass:"form-control",attrs:{type:"text",id:"horaEmpresa",placeholder:" Valor Maximo  99.99"}})]),e._v(" "),t("button",{staticClass:"btn",attrs:{id:"enviaEmpresa"},on:{click:function(a){a.preventDefault(),e.submit("empresa")}}},[e._v("Enviar")])])]),e._v(" "),t("div",{directives:[{name:"show",rawName:"v-show",value:e.exibeLancAll,expression:"exibeLancAll"}],staticClass:"form-row",attrs:{id:"lancamentos"}},[e._m(6),e._v(" "),t("div",{directives:[{name:"show",rawName:"v-show",value:e.exibeLanc,expression:"exibeLanc"}],attrs:{id:"filtro"}},[t("label",{staticClass:"col-sm-2"},[e._v("Período:")]),e._v(" "),t("div",[t("label",{staticClass:"col-sm-1"},[e._v("De:")]),e._v(" "),t("input",{directives:[{name:"model",rawName:"v-model",value:e.dataini,expression:"dataini"}],staticClass:"col-sm-4",attrs:{type:"date",id:"de"},domProps:{value:e.dataini},on:{input:function(a){a.target.composing||(e.dataini=a.target.value)}}}),e._v(" "),t("label",{staticClass:"col-sm-1"},[e._v("Até:")]),e._v(" "),t("input",{directives:[{name:"model",rawName:"v-model",value:e.datafin,expression:"datafin"}],staticClass:"col-sm-4",attrs:{type:"date",id:"ate"},domProps:{value:e.datafin},on:{input:function(a){a.target.composing||(e.datafin=a.target.value)}}}),e._v(" "),t("button",{staticClass:"btn",attrs:{id:"enviaFiltro"},on:{click:function(a){e.submit("filtro")}}},[e._v("Enviar")])])]),e._v(" "),t("div",{directives:[{name:"show",rawName:"v-show",value:e.exibePeriodo,expression:"exibePeriodo"}],staticClass:"form-group"},[e._m(7),e._v(" "),e._l(e.Lancamento,function(a){return t("div",{directives:[{name:"show",rawName:"v-show",value:e.exibePeriodo,expression:"exibePeriodo"}],attrs:{id:"periodo"}},[t("input",{directives:[{name:"mask",rawName:"v-mask",value:"##.##",expression:"'##.##'"},{name:"model",rawName:"v-model",value:a.horap,expression:"lan.horap"}],staticClass:"col-sm-3",attrs:{type:"text"},domProps:{value:a.horap},on:{input:function(t){t.target.composing||e.$set(a,"horap",t.target.value)}}}),e._v(" "),t("input",{directives:[{name:"mask",rawName:"v-mask",value:"##.##",expression:"'##.##'"},{name:"model",rawName:"v-model",value:a.horan,expression:"lan.horan"}],staticClass:"col-sm-3",attrs:{type:"text"},domProps:{value:a.horan},on:{input:function(t){t.target.composing||e.$set(a,"horan",t.target.value)}}}),e._v(" "),t("input",{directives:[{name:"model",rawName:"v-model",value:a.data,expression:"lan.data"}],staticClass:"col-sm-3",attrs:{type:"text",readonly:""},domProps:{value:a.data},on:{input:function(t){t.target.composing||e.$set(a,"data",t.target.value)}}})])}),e._v(" "),t("div",{staticClass:"btn-group",attrs:{role:"group","aria-label":"Basic example"}},[t("button",{directives:[{name:"show",rawName:"v-show",value:e.exibePeriodo,expression:"exibePeriodo"}],staticClass:"btn",attrs:{id:"enviaEmpresa"},on:{click:function(a){a.preventDefault(),e.submit("empresa")}}},[e._v("Enviar")]),e._v(" "),t("button",{directives:[{name:"show",rawName:"v-show",value:e.exibePeriodo,expression:"exibePeriodo"}],staticClass:"btn",attrs:{id:"voltar"},on:{click:function(a){e.voltar()}}},[e._v("Voltar")])])],2)])])},staticRenderFns:[function(){var e=this.$createElement,a=this._self._c||e;return a("div",[a("br"),a("br")])},function(){var e=this.$createElement,a=this._self._c||e;return a("div",[a("br"),a("br")])},function(){var e=this.$createElement,a=this._self._c||e;return a("div",{staticClass:"form-group"},[a("label",[this._v("Nome")]),this._v(" "),a("input",{staticClass:"form-control",attrs:{type:"text",id:"nomeEmpregado",placeholder:"Nome do Empregado"}})])},function(){var e=this.$createElement,a=this._self._c||e;return a("div",[a("br"),a("br")])},function(){var e=this.$createElement,a=this._self._c||e;return a("div",{staticClass:"form-group"},[a("label",[this._v("Nome")]),this._v(" "),a("input",{staticClass:"form-control",attrs:{type:"text",id:"nomeEmpresa",placeholder:"Nome da Empresa"}})])},function(){var e=this.$createElement,a=this._self._c||e;return a("div",{staticClass:"form-group"},[a("label",[this._v("Regime de Horas")]),this._v(" "),a("input",{staticClass:"form-control",attrs:{type:"number",id:"regimeEmpresa",min:"1",max:"100",placeholder:"ex: 8"}})])},function(){var e=this.$createElement,a=this._self._c||e;return a("div",[a("br"),a("br")])},function(){var e=this.$createElement,a=this._self._c||e;return a("div",{attrs:{id:"cabec"}},[a("label",{staticClass:"col-sm-3"},[this._v("Horas Positivas")]),this._v(" "),a("label",{staticClass:"col-sm-3"},[this._v("Horas Negativas")]),this._v(" "),a("label",{staticClass:"col-sm-3"},[this._v("Data")])])}]};var o=t("VU/8")(s,r,!1,function(e){t("Hj95")},null,null).exports,n=t("8+8L"),l=t("hlPV"),m=t.n(l);i.a.use(m.a),i.a.use(n.a),new i.a({render:function(e){return e(o)}}).$mount("#app")}},["NHnr"]);
//# sourceMappingURL=app.a3a649beee1572af4375.js.map