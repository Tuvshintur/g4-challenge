const knex = require("knex")(require("./knex.config.js"));
const tableName = process.env.DB_TABLE;
module.exports = {
    getCustomers() {
        return knex(tableName).select();
    },
    getCustomerById({ id }) {
        return knex(tableName).where("id", id).select();
    },
    getCustomerByPage({ pageId }) {
        const limit = 10;
        return knex(tableName)
            .limit(limit)
            .offset(pageId * limit)
            .select();
    },
    addCustomer({ customer }) {
        let formatted = {
            email: customer.email,
            first_name: customer.first_name,
            last_name: customer.last_name,
            ip: customer.ip,
            latitude: parseFloat(customer.latitude),
            longitude: parseFloat(customer.longitude),
            updated_at: null,
            created_at: knex.fn.now(),
        };
        return knex(tableName).insert(formatted);
    },
    updateCustomer({ customer }) {
        return knex(tableName)
            .where("id", customer.id)
            .update({
                email: customer.email,
                first_name: customer.first_name,
                last_name: customer.last_name,
                ip: customer.ip,
                latitude: parseFloat(customer.latitude),
                longitude: parseFloat(customer.longitude),
                updated_at: knex.fn.now(),
            });
    },
    deleteCustomer({ id }) {
        return knex(tableName).where("id", id).del();
    },
    searchCustomer({ customer }) {
        const formatted = {};

        if (customer.email) {
            formatted.email = customer.email;
        }

        if (customer.first_name) {
            formatted.first_name = customer.first_name;
        }

        if (customer.last_name) {
            formatted.last_name = customer.last_name;
        }

        if (customer.ip) {
            formatted.ip = customer.ip;
        }

        if (customer.latitude) {
            formatted.latitude = parseFloat(customer.latitude);
        }

        if (customer.longitude) {
            formatted.longitude = parseFloat(customer.longitude);
        }

        return knex(tableName).where(formatted).select();
    },
};
