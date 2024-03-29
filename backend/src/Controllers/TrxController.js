const dotenv = require("dotenv");
const { powerOfTen, tronWebCall, customToWei } = require("../Heplers/helper");
const trcToken = require("./TrcTokenController");
const { json } = require("express/lib/response");
const TronWeb = require("tronweb");

dotenv.config();

// create trx address account
async function createAccount(req, res) {
  try {
    const tronWeb = tronWebCall(req, res);
    const response = await tronWeb.createAccount();

    if (response) {
      res.json({
        status: true,
        message: "TRC Wallet created successfully",
        data: {
          address: response.address.base58,
          privateKey: response.privateKey,
          publicKey: response.publicKey,
        },
      });
    } else {
      res.json({
        status: false,
        message: "TRC Wallet create failed",
        data: {},
      });
    }
  } catch (err) {
    console.log('createAccount ex', err);
    res.json({
      status: false,
      message: String(err),
      data: {},
    });
  }
}

// get tron balance
async function getTronBalance(req, res) {
  try {
    const type = req.body.type;
    let netBalance = 0;
    let tokenBalance = 0;
    let message = "Balance get successfully";
    let success = true;
    const address = req.body.address;
    if (address) {
      if (type == 1) {
        let a = await getTrxBalance(req, res);
        if (a.status == true) {
          netBalance = a.data;
        } else {
          message = a.message;
          success = a.status;
        }
      } else if (type == 2) {
        let b = await trcToken.getTrc20TokenBalance(req, res);

        if (b.status == true) {
          tokenBalance = b.data;
        } else {
          message = b.message;
          success = b.status;
        }
      } else {
        let a = await getTrxBalance(req, res);
        if (a.status == true) {
          netBalance = a.data;
        } else {
          message = a.message;
          success = a.status;
        }
        let b = await trcToken.getTrc20TokenBalance(req, res);
        if (b.status == true) {
          tokenBalance = b.data;
        } else {
          message = b.message;
          success = b.status;
        }
      }

      const data = {
        net_balance: netBalance,
        token_balance: tokenBalance,
      };
      res.send({
        status: success,
        message: message,
        data: data,
      });
    } else {
      res.json({
        status: false,
        message: "Address is required",
        data: {},
      });
    }
  } catch (err) {
    console.log('getTronBalance ex', err);
    res.json({
      status: false,
      message: String(err),
      data: {},
    });
  }
}

// get TRX Balance
async function getTrxBalance(req, res) {
  try {
    const tronWeb = tronWebCall(req, res);
    const address = req.body.address;
    let balance = await tronWeb.trx.getBalance(address);
    balance = parseFloat(tronWeb.fromSun(balance));

    return {
      status: true,
      message: "Get TRX balance",
      data: balance,
    };
  } catch (err) {
    console.log('getTrxBalance ex', err);
    return {
      status: false,
      message: String(err),
      data: {},
    };
  }
}

// get account details by address
async function getTrxAccount(req, res) {
  try {
    const tronWeb = tronWebCall(req, res);
    const address = req.body.address;

    if (address) {
      const response = await tronWeb.trx.getAccount(address);

      if (response) {
        res.json({
          status: true,
          message: "TRC data get successfully",
          data: response,
        });
      } else {
        res.json({
          status: false,
          message: "Data get failed",
          data: {},
        });
      }
    } else {
      res.json({
        status: false,
        message: "Address is required",
        data: {},
      });
    }
  } catch (err) {
    res.json({
      status: false,
      message: String(err),
      data: {},
    });
  }
}

// get address by private key
async function getTrxAddressByPk(req, res) {
  try {
    const tronWeb = tronWebCall(req, res);
    const key = req.body.contracts;
    if (key) {
      const response = await tronWeb.address.fromPrivateKey(key);

      if (response) {
        res.json({
          status: true,
          message: "TRC data get successfully",
          data: { address: response },
        });
      } else {
        res.json({
          status: false,
          message: "Data get failed",
          data: {},
        });
      }
    } else {
      res.json({
        status: false,
        message: "Pk is required",
        data: {},
      });
    }
  } catch (err) {
    console.log('getTrxAddressByPk ex', err);
    res.json({
      status: false,
      message: String(err),
      data: {},
    });
  }
}

// check trx address
async function checkTrxAddress(req, res) {
  try {
    const tronWeb = tronWebCall(req, res);
    const address = req.body.address;
    if (address) {
      const response = await tronWeb.isAddress(address);
      if (response) {
        res.json({
          status: true,
          message: "Address valid",
          data: response,
        });
      } else {
        res.json({
          status: false,
          message: "Address not found",
          data: false,
        });
      }
    } else {
      res.json({
        status: false,
        message: "Address is required",
        data: {},
      });
    }
  } catch (err) {
    console.log('checkTrxAddress ex', err);
    res.json({
      status: false,
      message: String(err),
      data: {},
    });
  }
}

// send trx process
async function sendTrxProcess(req, res) {
  console.log('sendTrxProcess','process start');
  try {
    const tronWeb = tronWebCall(req, res);
    const to = req.body.to_address;

    const amount = parseInt(tronWeb.toSun(req.body.amount_value));

    const key = req.body.contracts;

    const checkAddress = await tronWeb.isAddress(to);
    if (checkAddress) {
      const response = await tronWeb.trx.sendTransaction(to, amount, key);

      if (response && response.result == true) {
        res.json({
          status: true,
          message: "Send trx success",
          data: {
            hash: response.txid,
          },
        });
      } else {
        res.json({
          status: false,
          message: "Send trx failed",
          data: {},
        });
      }
    } else {
      res.json({
        status: false,
        message: "Invalid address",
        data: {},
      });
    }
  } catch (err) {
    console.log('sendTrxProcess ex',err);
    res.json({
      status: false,
      message: String(err),
      data: {},
    });
  }
}

// get trx transaction by hash
async function getTrxTransaction(req, res) {
  try {
    const tronWeb = tronWebCall(req, res);
    const txId = req.body.transaction_hash;

    const response = await tronWeb.trx.getTransaction(txId);

    if (response) {
      res.json({
        status: true,
        message: "Get transaction success",
        data: {
          hash: response,
          gas_used: 0,
          txID: response.txId,
        },
      });
    } else {
      res.json({
        status: false,
        message: "Get transaction failed",
        data: {},
      });
    }
  } catch (err) {
    console.log('getTrxTransaction ex', err);
    res.json({
      status: false,
      message: String(err),
      data: {},
    });
  }
}

// get trx confirmed transaction by hash
async function getTrxConfirmedTransaction(req, res) {
  try {
    const tronWeb = tronWebCall(req, res);
    const txId = req.body.transaction_hash;

    const response = await tronWeb.trx.getTransactionInfo(txId);

    if (response) {
      const contractAddress = req.body.contract_address;
      const contract = await tronWeb.contract().at(contractAddress);

      res.json({
        status: true,
        message: "Get transaction success",
        data: {
          hash: response,
          gas_used: parseFloat(tronWeb.fromSun(response.fee)),
          txID: response.id,
        },
      });
    } else {
      res.json({
        status: false,
        message: "Get transaction failed",
        data: {},
      });
    }
  } catch (err) {
    console.log('getTrxConfirmedTransaction ex', err);
    res.json({
      status: false,
      message: String(err),
      data: {},
    });
  }
}

async function getTrxTransactionBlock(req, res) {
  try {
    const tronWeb = tronWebCall(req, res);
    const txId = req.body.transaction_hash ?? "trx_hash";
    const response = await tronWeb.getEventByTransactionID(txId);

    if (typeof response == "object" && response.length > 0) {
      let transaction = response[0];
      let from = transaction.result.from;
      let to = transaction.result.to;
      transaction.result.from = tronWeb.address.fromHex(
        tronWeb.address.toHex(from)
      );
      transaction.result.to = tronWeb.address.fromHex(
        tronWeb.address.toHex(to)
      );

      res.json({
        status: true,
        message: "Transaction details get successfully",
        data: transaction,
      });
    } else {
      res.json({
        status: false,
        message: "Transaction details not found",
        data: {},
      });
    }
  } catch (err) {
    console.log('getTrxTransactionBlock ex', err);
    res.json({
      status: false,
      message: err.stack ?? "Something went wrong with node api",
      data: {},
    });
  }
}

async function getTrxEstimateGas(req, res) {
  try {
    const tronWeb = tronWebCall(req, res);
    const ownerWallet = req.body.from_wallet;
    const receiverWallet = req.body.to_wallet;
    const contractAddress = req.body.contract;
    const amount = req.body.amount;
    const _function = "transfer(address,uint256)";
    const options = {
      feeLimit: 1_000_000,
      callValue: 0,
    };
    const parameter = [
      {
        type: "address",
        value: receiverWallet,
      },
      {
        type: "uint256",
        value: customToWei(amount, 6),
      },
    ];
    const response = await tronWeb.transactionBuilder.triggerConstantContract(
      tronWeb.address.toHex(contractAddress),
      _function,
      {},
      parameter,
      tronWeb.address.toHex(ownerWallet)
    );

    if (typeof response == "object" && response.result.result) {
      let energy = response.energy_used;

      let gas = Number(TronWeb.fromSun(energy * 420));

      res.json({
        status: true,
        message: "Estimted energy found successfully",
        data: {
          gasLimit: 420,
          gasPrice: energy,
          estimateGasFees: gas,
        },
      });
    } else {
      res.json({
        status: false,
        message: "Estimted energy not found",
        data: {},
      });
    }
  } catch (err) {
    console.log('getTrxEstimateGas err', err);
    res.json({
      status: false,
      message: err.stack ?? "Something went wrong with node api",
      data: {},
    });
  }
}

module.exports = {
  createAccount,
  getTronBalance,
  getTrxBalance,
  getTrxAccount,
  getTrxAddressByPk,
  checkTrxAddress,
  sendTrxProcess,
  getTrxTransaction,
  getTrxConfirmedTransaction,
  getTrxTransactionBlock,
  getTrxEstimateGas,
};
