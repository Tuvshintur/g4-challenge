const express = require("express");
const knex = require("../db/knex.file");
const router = express.Router();
const validator = require("../middlewares/json-validator");

router.get("/", async (req, res) => {
    const customers = await knex.getCustomers();
    res.send(customers);
});

router.get("/:id(\\d+)", async (req, res) => {
    const customerId = Number(req.params.id);
    const customer = await knex.getCustomerById({ id: customerId });

    if (!customer) {
        res.status(500).send({ error: "customer not found." });
    } else {
        res.json(customer);
    }
});

router.post("/", validator, async (req, res) => {
    const newCustomer = req.body;

    const result = await knex.addCustomer({ customer: newCustomer });
    if (result) {
        res.json({ msg: "Successfully inserted" });
    } else {
        res.status(500).send({ error: "Error on insertion" });
    }
});

router.put("/", async (req, res) => {
    const updatedCustomer = req.body;

    const result = await knex.updateCustomer({ customer: updatedCustomer });
    if (result) {
        res.json({ msg: "Successfully updated" });
    } else {
        res.status(500).send({ error: "Error on update" });
    }
});

router.delete("/:id(\\d+)", async (req, res) => {
    const customerId = Number(req.params.id);
    const result = await knex.deleteCustomer({ id: customerId });

    if (Number(result) > 0) {
        res.json({ msg: "Successfully deleted" });
    } else {
        res.status(500).send({ error: "Error on deletion" });
    }
});

router.post("/search", async (req, res) => {
    const result = await knex.searchCustomer({ customer: req.body });

    res.send(result);
});

module.exports = router;
