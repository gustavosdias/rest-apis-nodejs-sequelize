const {Op} = require('sequelize');
const Imovel = require('../models/Imovel');

module.exports = {

    async create(req, res){
        
        try{
            const { tipoCompra, quartos, banheiros, vagas, pet, mobilia, metragem, endereco, tipo } = req.body;

            const validationMessage =  validateVariables(tipoCompra, tipo, endereco, metragem);
            if(validationMessage) return res.status(400).json(validationMessage);

            const imovel = await Imovel.create({ tipoCompra, quartos, banheiros, vagas, pet, mobilia, metragem, endereco, tipo });
    
            return res.status(200).json({
                Descricao: "Imovel criado com sucesso.",
                Resultado: imovel
            });
        }catch(e){
            return res.status(500).json({
                Descricao: "Não foi possível criar imovel.",
                Erro: e
            });
        }
    },

    async listAllImoveis(req, res){
        try{
            const imoveis = await Imovel.findAll();
            return res.json({
                totalDeImoveis : imoveis.length,
                imoveis: imoveis
            });
        }catch(e){
            console.log(e);
            return res.status(500).json({
                erro: "Erro interno. Não foi possível listar imóveis. Tente novamente."
            });
        }
    },

    async update(req, res){

       
        
        try{
            const { tipoCompra, quartos, banheiros, vagas, pet, mobilia, metragem, endereco, tipo } = req.body;
            const imovelId = req.params.imovelId;
    
            const validationMessage =  validateVariables(tipoCompra, tipo, endereco, metragem);
            if(validationMessage) return res.status(400).json(validationMessage);

            const getImovel = await Imovel.findOne({where: {id: imovelId}});

            if(getImovel){
                const updateResponse = await Imovel.upsert( 
                    { 
                        id: imovelId,
                        tipoCompra: tipoCompra, 
                        quartos: quartos, 
                        banheiros: banheiros, 
                        vagas: vagas, 
                        pet: pet, 
                        mobilia: mobilia, 
                        metragem: metragem, 
                        endereco: endereco, 
                        tipo: tipo },
                        {where: { id: imovelId} } );
    
                    //Row foi atualizada. Fazendo nova solicitação para retornar row modificada
                    if(!updateResponse){
                        const updatedImovel = await Imovel.findOne({where: {id: imovelId}});
                        return res.status(200).json({
                            Descricao: "Imovel atualizado com sucesso.",
                            ImovelAtualizado: updatedImovel
                        });
                    }
            }else{
                return res.status(404).json({
                    Descricao: "Imovel com id: " + imovelId + " não encontrado"
                });
            }
        }catch(err){
            console.log(err);
            return res.status(500).json({
                erro: "Erro interno. Não foi possível atualizar imóvel. Tente novamente.",
                Descricao: err
            });
        }
       
    },
   
    async deleteById(req, res){
        
        
        try{
            const imovelId = req.params.imovelId;
            const getImovel = await Imovel.findOne({where: {id: imovelId}});

            if(getImovel){
                const removedRows = await Imovel.destroy({where: {id: imovelId}});
                if(removedRows === 1){
                    return res.status(200).json({
                        Descricao: "Imovel deletado com sucesso."
                    });
                }
            }else{
                return res.status(404).json({
                    Descricao: "Imovel com id: " + imovelId + " não encontrado"
                });
            }
        }catch(err){
            console.log(err);
            return res.status(500).json({
                erro: "Erro interno. Não foi possível atualizar imóvel. Tente novamente."
            });
        }

    },

    async getImovelByTipoCompra(req, res){
        
        try{

            const imovelTipoCompra = req.params.tipoCompra;
            
            const imoveis = await Imovel.findAll({where: {tipoCompra: imovelTipoCompra}});
            console.log(imoveis);

            if(imoveis.length !== 0){
                return res.status(200).json({
                    Descricao: imoveis.length + "imoveis encontrado(s).",
                    imoveis: imoveis
                });
            }else{
                return res.status(404).json({
                    Descricao: "Nenhum imóvel foi encontrado."
                });
            }

        }catch(err){
            console.log(err);
            return res.status(500).json({
                erro: "Erro interno. Não foi possível atualizar imóvel. Tente novamente."
            });
        }

    },

    async getImovelById(req, res){
        

        try{

            const imovelId = req.params.imovelId;
            const imovel = await Imovel.findOne({where: {id: imovelId}});

            if(imovel){
                return res.status(200).json({
                    Imovel: imovel,
                    Descricao: "Imovel encontrado."
                });
            }else{
                return res.status(404).json({
                    Descricao: "Imovel com id: " + imovelId + " não encontrado"
                });
            }

        }catch(err){
            console.log(err);
            return res.status(500).json({
                erro: "Erro interno. Não foi possível atualizar imóvel. Tente novamente."
            });
        }

    },

    async getImovelByBanheiro(req, res){
       

        try{

            const totalBanheiro = req.params.totalBanheiro;
            const imoveis = await Imovel.findAll({where: {banheiros: totalBanheiro}});

            if(imoveis.length !== 0){
                return res.status(200).json({
                    Descricao: imoveis.length + " imoveis encontrado(s).",
                    imoveis: imoveis
                });
            }else{
                return res.status(404).json({
                    Descricao: "Nenhum imóvel foi encontrado."
                });
            }

        }catch(err){
            console.log(err);
            return res.status(500).json({
                erro: "Erro interno. Não foi possível atualizar imóvel. Tente novamente."
            });
        }

    },

    async getImovelByQuarto(req, res){
       

        try{

            const totalQuarto = req.params.totalQuarto;

            const imoveis = await Imovel.findAll({where: {quartos: totalQuarto}});

            if(imoveis.length !== 0){
                return res.status(200).json({
                    Descricao: imoveis.length + " imoveis encontrado(s).",
                    imoveis: imoveis
                });
            }else{
                return res.status(404).json({
                    Descricao: "Nenhum imóvel foi encontrado."
                });
            }

        }catch(err){
            console.log(err);
            return res.status(500).json({
                erro: "Erro interno. Não foi possível atualizar imóvel. Tente novamente."
            });
        }

    },

    async getImovelByVaga(req, res){
     

        try{

            const totalVaga = req.params.totalVaga;

            const imoveis = await Imovel.findAll({where: {vagas: totalVaga}});

            if(imoveis.length !== 0){
                return res.status(200).json({
                    Descricao: imoveis.length + " imoveis encontrado(s).",
                    imoveis: imoveis
                });
            }else{
                return res.status(404).json({
                    Descricao: "Nenhum imóvel foi encontrado."
                });
            }

        }catch(err){
            console.log(err);
            return res.status(500).json({
                erro: "Erro interno. Não foi possível atualizar imóvel. Tente novamente."
            });
        }

    },

    async getImovelByPet(req, res){
        
        try{

            const aceitaPet = req.params.aceitaPet;
            let intAceitaPet = aceitaPet === ("true") ? 1 : 0;

            const imoveis = await Imovel.findAll({where: {pet: intAceitaPet}});

            if(imoveis.length !== 0){
                return res.status(200).json({
                    Descricao: imoveis.length + " imoveis encontrado(s).",
                    imoveis: imoveis
                });
            }else{
                return res.status(404).json({
                    Descricao: "Nenhum imóvel foi encontrado."
                });
            }

        }catch(err){
            console.log(err);
            return res.status(500).json({
                erro: "Erro interno. Não foi possível atualizar imóvel. Tente novamente."
            });
        }

    },

    async getImovelByMobilia(req, res){
        
        try{

            const temMobilia = req.params.temMobilia;
            let intTemMobilia = temMobilia === ("true") ? 1 : 0;

            const imoveis = await Imovel.findAll({where: {mobilia: intTemMobilia}});

            if(imoveis.length !== 0){
                return res.status(200).json({
                    Descricao: imoveis.length + " imoveis encontrado(s).",
                    imoveis: imoveis
                });
            }else{
                return res.status(404).json({
                    Descricao: "Nenhum imóvel foi encontrado."
                });
            }
        }catch(err){
            console.log(err);
            return res.status(500).json({
                erro: "Erro interno. Não foi possível atualizar imóvel. Tente novamente."
            });
        }

    },

    async getImovelByTipo(req, res){
        
        try{

            const tipoImovel = req.params.tipo;

            if(tipoImovel !== "casa" && tipoImovel !== "apt"){
                console.log("BAD REQUEST: atributo 'tipo' esta com valor diferente dos parametros permitidos.");
                return ({
                    erro: "'tipo' deve ter um dos dois valores: 'casa' ou 'apt'."
                });
            }

            const imoveis = await Imovel.findAll({where: {tipo: tipoImovel}});

            if(imoveis.length !== 0){
                return res.status(200).json({
                    Descricao: imoveis.length + " imoveis encontrado(s).",
                    imoveis: imoveis
                });
            }else{
                return res.status(404).json({
                    Descricao: "Nenhum imóvel foi encontrado."
                });
            }


        }catch(err){
            console.log(err);
            return res.status(500).json({
                erro: "Erro interno. Não foi possível atualizar imóvel. Tente novamente."
            });
        }

    },

    async getImovelByMetragem(req, res){

        try{
            const metros = req.params.metragem;

            const imoveis = await Imovel.findAll({
                where: {
                    metragem: {
                        [Op.gt]: metros
                    }
                }
            });

            if(imoveis.length !== 0){
                return res.status(200).json({
                    Descricao: imoveis.length + " imoveis encontrado(s).",
                    imoveis: imoveis
                });
            }else{
                return res.status(404).json({
                    Descricao: "Nenhum imóvel foi encontrado."
                });
            }
        }catch(err){
            console.log(err);
            return res.status(500).json({
                erro: "Erro interno. Não foi possível atualizar imóvel. Tente novamente."
            });
        }
    }

}; 

function validateVariables(tipoCompra, tipo, endereco, metragem){

    if(tipoCompra !== "aluguel" && tipoCompra !== "venda") {
        console.log("BAD REQUEST: atributo 'tipoCompra' esta com valor diferente dos parametros permitidos.");
        return ({
            erro: "tipoCompra deve ter um dos dois valores: 'aluguel' ou 'venda'."
        });
    }

    if(tipo !== "casa" && tipo !== "apt"){
        console.log("BAD REQUEST: atributo 'tipo' esta com valor diferente dos parametros permitidos.");
        return ({
            erro: "'tipo' deve ter um dos dois valores: 'casa' ou 'apt'."
        });
    }

    if(!endereco){
        console.log("BAD REQUEST: atributo 'endereco' esta vazio.");
        return ({
            erro: "'endereco' não pode estar vazio."
        });
    }

    if(metragem <= 0){
        console.log("BAD REQUEST: atributo 'metragem' é menor ou igual a zero.");
        return ({
            erro: "'metragem' deve ser maior que zero."
        });
    }
}