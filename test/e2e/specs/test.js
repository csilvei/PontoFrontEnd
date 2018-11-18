module.exports = {

  /* bloco de testes de validação de dados de entrada e acesso ao site */
  /* testes de acesso ao site */
  'Verificar se Acessou o site pelo Título': function (browser) {
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer)
      .assert.title('TimeSheet')

      .end()
  },


  /* testes de Empresa */
  'Valida envio vazio': function (browser) {
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer)
      .click('#empresa')
      .click("#enviaEmpresa")
      .assert.containsText("#msg","Todos os Campos são obrigatórios.")
      .end()
  },

  'Valida Criação da Empresa': function (browser) {
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer)
      .click('#empresa')
      .setValue("#nomeEmpresa","Empresa")
      .setValue("#cnpjEmpresa",)
      .setValue("#regimeEmpresa",10)
      .setValue("#horaEmpresa",1)
      .click("#enviaEmpresa")
      .assert.containsText("#msg","Empresa Criada com Sucesso")
      .end()
  },

  'Valida Erro Empresa Já Existente': function (browser) {
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer)
      .click('#empresa')
      .setValue("#nomeEmpresa","Empresa")
      .setValue("#cnpjEmpresa",1)
      .setValue("#regimeEmpresa",10)
      .setValue("#horaEmpresa",1)
      .click("#enviaEmpresa")
      .assert.containsText("#msg","Já Existe uma Empresa com Este CNPJ cadastrada.")
      .end()
  },

}
