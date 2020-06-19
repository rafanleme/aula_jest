const Manager = require("../models/Manager");
const Condominium = require("../models/Condominium");
const { v4: uuid } = require("uuid");

module.exports = {
  async index(req, res) {
    const condominium = await Condominium.findAll();
    res.send(condominium);
  },

  async store(req, res) {
    //converter o token e recuperar o created_manager_id logado
    const token = req.headers.authorization;
    const [Bearer, created_manager_id] = token.split(" ");

    const { name, cnpj } = req.body;
    const {
      zipcode,
      street,
      number,
      neighborhood,
      city,
      uf,
    } = req.body.address;

    try {
      const manager = await Manager.findByPk(created_manager_id);

      if (!manager) return res.status(404).json({ error: "Manager not found" });

      let condominium = await Condominium.findOne({ where: { cnpj: cnpj } });

      if (condominium)
        return res.status(400).json({ error: "cnpj already exists" });

      condominium = await Condominium.create({
        name,
        cnpj,
        created_manager_id,
        ticket: uuid(),
      });

      await condominium.addManager(manager, {
        through: { created_manager_id, principal: true },
      });

      res.status(201).json(condominium);
    } catch (e) {
      console.log(e);
      res.status(500).send(e);
    }
  },
};
