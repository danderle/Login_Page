const bcrypt = require("bcrypt");

module.exports = {
    hash: async (plain) => bcrypt.hash(plain, 10),

    compare: async (hash1, hash2) => bcrypt.compare(hash1, hash2),
    
};