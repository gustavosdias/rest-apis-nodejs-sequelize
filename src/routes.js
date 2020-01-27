const express = require('express');
const ImovelController = require('./controllers/ImovelController');

const routes = express.Router();



//tipoCompra, quartos, banheiros, vagas, pet, mobilia, metragem, endereco, tipo
/**
 * 
 * @swagger
 * 
 * 
 * /listar:
 *  get:
 *      summary: Lista todos os imóveis.
 *      responses:
 *          '200':
 *              description: Solicitação bem-sucedida
 *          '500':
 *              description: Erro no servidor
 * 
 * 
 * /cadastrar:
 *  post:
 *      summary: Cadastra um novo imóvel.
 *      consumes:
 *       -application/json
 *      parameters:
 *       - name: Imovel 
 *         in: body
 *         description: Atributos de um imovel
 *         required: true
 *         schema:
 *           $ref: '#/definitions/cadastro'
 *      responses:
 *          '200':
 *              description: Solicitação bem-sucedida
 *          '400':
 *              description: Solicitação com parâmetros errados
 *          '500':
 *              description: Erro no servidor
 * 
 *paths:
 *     /atualizar/{imovelId}:
 *              post:
 *                  summary: Atualiza um imóvel.
 *                  consumes:
 *                      -application/json
 *                  parameters:
 *                      - name: imovelId
 *                        in: path
 *                        description: Id do imovel
 *                        required: true
 *                        type: integer
 *                        format: int32
 *                      - name: Imovel 
 *                        in: body
 *                        description: Atributos de um imovel
 *                        required: true
 *                        schema:
 *                          $ref: '#/definitions/cadastro'
 *                  responses:
 *                      '200':
 *                          description: Solicitação bem-sucedida
 *                      '404':
 *                          description: Imovel não encontrado
 *                      '500':
 *                          description: Erro no servidor
 *     /deletar/{imovelId}:
 *              delete:
 *                  summary: Remove um imovel.
 *                  consumes:
 *                      -application/json
 *                  parameters:
 *                      - name: imovelId
 *                        in: path
 *                        description: Id do imovel
 *                        required: true
 *                        type: integer
 *                        format: int32
 *                  responses:
 *                      '200':
 *                          description: Solicitação bem-sucedida
 *                      '400':
 *                          description: Solicitação com parâmetros errados
 *                      '404':
 *                          description: Imovel não encontrado
 *                      '500':
 *                          description: Erro no servidor
 * 
 *     /buscarImovelPorTipoCompra/{tipoCompra}:
 *              post:
 *                  summary: Busca imóveis pelo tipo da compra.
 *                  consumes:
 *                      -application/json
 *                  parameters:
 *                      - name: tipoCompra
 *                        in: path
 *                        description: Tipo de compra do imóvel (Aluguel ou Venda)
 *                        required: true
 *                        type: string
 *                        enum: 
 *                          - Aluguel
 *                          - Venda
 *                  responses:
 *                      '200':
 *                          description: Solicitação bem-sucedida
 *                      '400':
 *                          description: Solicitação com parâmetros errados
 *                      '404':
 *                          description: Imovel não encontrado
 *                      '500':
 *                          description: Erro no servidor
 * 
 *     /buscarImovelPorId/{imovelId}:
 *              post:
 *                  summary: Busca um imóvel por id.
 *                  consumes:
 *                      -application/json
 *                  parameters:
 *                      - name: imovelId
 *                        in: path
 *                        description: Id do imovel
 *                        required: true
 *                        type: integer
 *                        format: int32
 *                  responses:
 *                      '200':
 *                          description: Solicitação bem-sucedida
 *                      '400':
 *                          description: Solicitação com parâmetros errados
 *                      '404':
 *                          description: Imovel não encontrado
 *                      '500':
 *                          description: Erro no servidor
 * 
 *     /buscarImovelPorBanheiro/{totalBanheiro}:
 *              post:
 *                  summary: Busca imóveis pelo total de banheiros.
 *                  consumes:
 *                      -application/json
 *                  parameters:
 *                      - name: totalBanheiro
 *                        in: path
 *                        description: Quantidade de Banheiros
 *                        required: true
 *                        type: integer
 *                        format: int32
 *                  responses:
 *                      '200':
 *                          description: Solicitação bem-sucedida
 *                      '400':
 *                          description: Solicitação com parâmetros errados
 *                      '404':
 *                          description: Imovel não encontrado
 *                      '500':
 *                          description: Erro no servidor
 * 
 *     /buscarImovelPorQuarto/{totalQuarto}:
 *              post:
 *                  summary: Busca imóveis pelo total de quartos.
 *                  consumes:
 *                      -application/json
 *                  parameters:
 *                      - name: totalQuarto
 *                        in: path
 *                        description: Quantidade de quartos
 *                        required: true
 *                        type: integer
 *                        format: int32
 *                  responses:
 *                      '200':
 *                          description: Solicitação bem-sucedida
 *                      '400':
 *                          description: Solicitação com parâmetros errados
 *                      '404':
 *                          description: Imovel não encontrado
 *                      '500':
 *                          description: Erro no servidor
 * 
 *     /buscarImovelPorVaga/{totalVaga}:
 *              post:
 *                  summary: Busca imóveis pelo total de vagas.
 *                  consumes:
 *                      -application/json
 *                  parameters:
 *                      - name: totalVaga
 *                        in: path
 *                        description: Quantidade de vagas
 *                        required: true
 *                        type: integer
 *                        format: int32
 *                  responses:
 *                      '200':
 *                          description: Solicitação bem-sucedida
 *                      '400':
 *                          description: Solicitação com parâmetros errados
 *                      '404':
 *                          description: Imovel não encontrado
 *                      '500':
 *                          description: Erro no servidor
 * 
 *     /buscarImovelPorPet/{aceitaPet}:
 *              post:
 *                  summary: Busca por imóveis que aceitam animais de estimação. Parâmetro deve ser passado como True ou False
 *                  consumes:
 *                      -application/json
 *                  parameters:
 *                      - name: aceitaPet
 *                        in: path
 *                        description: true, false
 *                        required: true
 *                        type: boolean
 *                  responses:
 *                      '200':
 *                          description: Solicitação bem-sucedida
 *                      '400':
 *                          description: Solicitação com parâmetros errados
 *                      '404':
 *                          description: Imovel não encontrado
 *                      '500':
 *                          description: Erro no servidor
 * 
 *     /buscarImovelPorMobilia/{temMobilia}:
 *              post:
 *                  summary: Busca por imóveis que possuem ou não possuem mobília. Parâmetro deve ser passado como True ou False
 *                  consumes:
 *                      -application/json
 *                  parameters:
 *                      - name: temMobilia
 *                        in: path
 *                        description: true, false
 *                        required: true
 *                        type: boolean
 *                  responses:
 *                      '200':
 *                          description: Solicitação bem-sucedida
 *                      '400':
 *                          description: Solicitação com parâmetros errados
 *                      '404':
 *                          description: Imovel não encontrado
 *                      '500':
 *                          description: Erro no servidor
 * 
 *     /buscarImovelPorTipo/{tipo}:
 *              post:
 *                  summary: Busca imóveis por tipo.
 *                  consumes:
 *                      -application/json
 *                  parameters:
 *                      - name: tipo
 *                        in: path
 *                        description: Casa, apt
 *                        required: true
 *                        type: string
 *                        enum:
 *                          - casa
 *                          - apt
 *                  responses:
 *                      '200':
 *                          description: Solicitação bem-sucedida
 *                      '400':
 *                          description: Solicitação com parâmetros errados
 *                      '404':
 *                          description: Imovel não encontrado
 *                      '500':
 *                          description: Erro no servidor
 * 
 *     /buscarImovelPorMetragem/{metragem}:
 *              post:
 *                  summary: Busca imóveis com metragem acima do número fornecido.
 *                  consumes:
 *                      -application/json
 *                  parameters:
 *                      - name: metragem
 *                        in: path
 *                        description: 60
 *                        required: true
 *                        type: integer
 *                  responses:
 *                      '200':
 *                          description: Solicitação bem-sucedida
 *                      '400':
 *                          description: Solicitação com parâmetros errados
 *                      '404':
 *                          description: Imovel não encontrado
 *                      '500':
 *                          description: Erro no servidor
 * definitions:
 *  cadastro:
 *   description: Atributos do Imovel
 *   properties:
 *     tipoCompra:
 *       type: string
 *       enum: [venda, aluguel]
 *       description: Se o imovel está alugando ou vendendo
 *     quartos:
 *       type: number
 *       description: Quantos quartos o imovel possui
 *     banheiros:
 *       type: number
 *       description: Quantos banheiros o imovel possui
 *     vagas:
 *      type: number
 *      description: Quantas vagas para carro o imovel possui
 *     pet:
 *      type: boolean
 *      description: Se o imovel permite animais
 *     mobilia:
 *      type: boolean
 *      description: Se o imovel esta mobiliado
 *     metragem:
 *      type: number
 *      description: Total de metragem do imovel
 *     endereco:
 *      type: string
 *      description: Endereco do imobel
 *     tipo:
 *      type: string
 *      enum: [casa, apt]
 *      description: Se imovel é uma casa ou apartamento
 */

routes.get('/listar', ImovelController.listAllImoveis); 
routes.post('/cadastrar', ImovelController.create);
routes.delete('/deletar/:imovelId', ImovelController.deleteById);
routes.post('/atualizar/:imovelId', ImovelController.update);
routes.post('/buscarImovelPorTipoCompra/:tipoCompra', ImovelController.getImovelByTipoCompra);
routes.post('/buscarImovelPorId/:imovelId', ImovelController.getImovelById);
routes.post('/buscarImovelPorBanheiro/:totalBanheiro', ImovelController.getImovelByBanheiro);
routes.post('/buscarImovelPorQuarto/:totalQuarto', ImovelController.getImovelByQuarto);
routes.post('/buscarImovelPorVaga/:totalVaga', ImovelController.getImovelByVaga);
routes.post('/buscarImovelPorPet/:aceitaPet', ImovelController.getImovelByPet);
routes.post('/buscarImovelPorMobilia/:temMobilia', ImovelController.getImovelByMobilia);
routes.post('/buscarImovelPorTipo/:tipo', ImovelController.getImovelByTipo);
routes.post('/buscarImovelPorMetragem/:metragem', ImovelController.getImovelByMetragem);




module.exports = routes;

