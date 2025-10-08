"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var database_js_1 = require("../models/database.js");
function getUser(vendorName) {
    // Should only ever get one user back, as vendors can only register once.
    return (0, database_js_1.default)('SELECT * FROM users WHERE vendorName=$1', [vendorName])
        .then(function (res) {
        if (res.rowCount === 0) {
            return undefined;
        }
        return res.rows[0];
    })
        .catch(function (err) {
        throw new Error("Database error when fetching user: ".concat(err.message));
    });
}
