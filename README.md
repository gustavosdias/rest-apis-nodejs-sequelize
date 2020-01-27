# Projeto de APIs

Este projeto demonstra funcionalidades de APIs REST, trabalhando com Node.js, Sequelize e Swagger

## Installation

Importar estrutura da tabela “imoveis” para o banco de dados a ser usado (arquivo dump_banco_imoveis.sql) 

Configurar acesso do banco de dados no arquivo /src/config/database.js

Configurar Porta do servidor no arquivo /src/server.js (Porta padrão está para 3333)

Inicializar arquivo server.js pelo código ```node server.js```

Acessar localhost:porta/keycash-apis

Deve mostrar a tela de testes da ferramenta Swagger UI, disponibilizando todas as APIs




## Input e Output

```
/listar, ImovelController.listAllImoveis
    -Irá listar todos os imóveis
/cadastrar, ImovelController.create
    - Cadastra um novo imóvel
/deletar/:imovelId, ImovelController.deleteById
    - Deleta um imóvel
/atualizar/:imovelId, ImovelController.update
    - Atualiza um imóvel
/buscarImovelPorTipoCompra/:tipoCompra, ImovelController.getImovelByTipoCompra
    - Busca imóvel por tipo da compra (aluguel, venda)
/buscarImovelPorId/:imovelId, ImovelController.getImovelById
    - Busca imóvel pelo Id do imóvel
/buscarImovelPorBanheiro/:totalBanheiro, ImovelController.getImovelByBanheiro
    - Busca imóveis pela quantidade de banheiros
/buscarImovelPorQuarto/:totalQuarto, ImovelController.getImovelByQuarto
    - Busca imóveis pela quantidade de quartos
/buscarImovelPorVaga/:totalVaga, ImovelController.getImovelByVaga
    - Busca imóveis pela quantidade de vagas
/buscarImovelPorPet/:aceitaPet, ImovelController.getImovelByPet
    - Busca imóveis que aceitam ou não aceitam animais de estimação
/buscarImovelPorMobilia/:temMobilia, ImovelController.getImovelByMobilia
    - Busca imóveis que possuem ou não possuem mobília
/buscarImovelPorTipo/:tipo, ImovelController.getImovelByTipo
    - Busca imóveis pelo tipo da compra (Venda, Aluguel)

```

## Restrições e Regras
É preciso passar a estrutura inteira do imóvel, mesmo se for atualizar apenas um dado

Quando um imóvel é atualizado, o imóvel retornado contém os atributos já atualizados

## Comentários e Conclusões
Utilizei diversas ferramentas neste teste e tive a oportunidade de me desenvolver ainda mais ainda com elas. Foquei bastante no desenvolvimento e tratamento de erros das APIs.
 Acredito que o banco de dados não seja o foco, logo, deixei ele o mais simples possível.
  
Resolvi experimentar a ferramenta Swagger-js neste projeto, pois nunca tinha usado. Foi uma ótima experiência.
Ainda dá para escalar muito mais o projeto, tanto as APIs quanto o banco de dados. 
