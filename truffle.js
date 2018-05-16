const HDWalletProvider = require("truffle-hdwallet-provider");
const infura_apikey = "INFURA_APIKEY";
const wallets = {
    mainnet: {
        mnemonic: '',
        network_id: 1,
    },
    ropsten: {
        mnemonic: 'ROPSTEN_MNEMONIC',
        network_id: 3,
        gas: 4612388
    },
    rinkeby: {
        mnemonic: 'RINKEBY_MNEMONIC',
        network_id: 4,
        gas: 4612388
    },
    kovan: {
        mnemonic: 'KOVAN_MNEMONIC',
        network_id: 42,
        gas: 4612388
    }
}

module.exports = {
    migrations_directory: "./migrations",
    networks: {
        development: {
            host: "localhost",
            port: 8545,
            network_id: "*" // Match any network id
        },
        mainnet: {
            provider: function () {
                return new HDWalletProvider(wallets.mainnet.mnemonic, "https://mainnet.infura.io/" + infura_apikey)
            },
            network_id: wallets.mainnet.network_id,
            gas: wallets.mainnet.gas,
        },
        ropsten: {
            provider: function () {
                return new HDWalletProvider(wallets.ropsten.mnemonic, "https://ropsten.infura.io/" + infura_apikey)
            },
            network_id: wallets.ropsten.network_id,
            gas: wallets.ropsten.gas,
        },
        rinkeby: {
            provider: function () {
                return new HDWalletProvider(wallets.rinkeby.mnemonic, "https://rinkeby.infura.io/" + infura_apikey)
            },
            network_id: wallets.rinkeby.network_id,
            gas: wallets.rinkeby.gas,
        },
        kovan: {
            provider: function () {
                return new HDWalletProvider(wallets.kovan.mnemonic, "https://kovan.infura.io/" + infura_apikey)
            },
            network_id: wallets.kovan.network_id,
            gas: wallets.kovan.gas,
        }
    }
};
