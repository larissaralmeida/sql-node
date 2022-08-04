const { Op } = require('sequelize');
const User = require('../models/User');

module.exports = {
    async show(req, res){
        //Encontrar todos os usuários que tem email que termina com @...
        //Desses usuários, quero buscar todos que moram na Av Armindo Moura
        //Desses usuários, quero buscar as tecnologias que começam com React

        const users = await User.findAll({
            attributes: ['name', 'email'],
            where: {
                email: {
                    [Op.iLike]: '%@email.com.br'
                }
            },
            include: [
                { 
                    association: 'addresses', 
                    where: { 
                        street: 'Avenida Armindo Moura' 
                    } 
                }, //endereços
                { 
                    association: 'techs',
                    required: false,
                    where: {
                        name: {
                            [Op.iLike]: 'React%'
                        }
                    }
                }, //tecnologias
            ]
        })

        return res.json(users);
    }
}