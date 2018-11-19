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
      .click("#empresa")
      .assert.title('TimeSheet')
      .end()
  },

  'Valida Criação da Empresa': function (browser) {
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer)
      .click("#empresa")
      .setValue("#nomeEmpresa","Empresa")
      .setValue("#cnpjEmpresa",111111111)
      .setValue("#regimeEmpresa",10)
      .setValue("#horaEmpresa",1)
      .click("#enviaEmpresa")
      .assert.title('TimeSheet')
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
      .assert.title('TimeSheet')
      .end()
  },

}
