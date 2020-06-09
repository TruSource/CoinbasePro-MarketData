const Oracle = artifacts.require("Oracle");
const Example = artifacts.require("Example");
const cbor = require("cbor");
const truffleAssert = require("truffle-assertions");

const { decodeRawLog } = require("./utils/helpers.js");

// EACH TEST NEED TO BE GENERATED FOR EACH SOURCE
contract("Example (End to End tests)", async accounts => {
  // accounts[0] is the address that deployed the contracts (especially the oracle contract)
  let ownerAddress, otherAccountAddress;
  let serverResponse;
  let oracleInstance, exampleInstance;
  let OPERATIONS;
  let statusCode;
  let queryId;

  // before hook is run before all tests
  before(async () => {
    ownerAddress = accounts[0];
    otherAccountAddress = accounts[1];
    serverResponse = "placeholder response";

    oracleInstance = await Oracle.deployed();
    exampleInstance = await Example.deployed();

    OPERATIONS = {
      getCurrencies: 0,
      getProducts: 1,
      getBook: 2,
      getCandles: 3,
      getStats: 4,
      getTicker: 5,
      getTrades: 6,
      getTime: 7
    };

    statusCode = 200;
  });

  describe("getCurrencies operation", () => {
    it("Query getCurrencies should succeed", async () => {
      await truffleAssert.passes(
        exampleInstance.getCurrencies({
          from: ownerAddress
        })
      );
    });

    it("Callback for getCurrencies should fail if not called by address that deployed the oracle contract", async () => {
      const result = await exampleInstance.getCurrencies();
      const decodedRawLogs = decodeRawLog(oracleInstance, "Log", result);
      queryId = decodedRawLogs.queryId;

      await truffleAssert.reverts(
        exampleInstance.trusource_callback.call(
          queryId,
          OPERATIONS.getCurrencies,
          statusCode,
          serverResponse,
          {
            from: otherAccountAddress
          }
        ),
        "Only address that deployed the oracle can call this contract back"
      );
    });

    it("Callback for getCurrencies should succeed if called by address that deployed the oracle contract", async () => {
      let result = await exampleInstance.getCurrencies();

      const decodedRawLogs = decodeRawLog(oracleInstance, "Log", result);
      queryId = decodedRawLogs.queryId;

      await truffleAssert.passes(
        exampleInstance.trusource_callback(
          queryId,
          OPERATIONS.getCurrencies,
          statusCode,
          serverResponse,
          {
            from: ownerAddress
          }
        )
      );
    });

    it("Callback for getCurrencies should fail if query is already fulfilled", async () => {
      await truffleAssert.reverts(
        exampleInstance.trusource_callback.call(
          queryId,
          OPERATIONS.getCurrencies,
          statusCode,
          serverResponse,
          {
            from: ownerAddress
          }
        ),
        "Id is not one of a remaining query (query never existed or already fulfilled)"
      );
    });

    // EVENTS
    it("(Event) Log event should be emitted when the getCurrencies function is called", async () => {
      const exampleTxObj = await exampleInstance.getCurrencies();
      // Example.sol makes a contract call to Oracle.sol where the event is emitted, oracle tx result needed
      const oracleTxObj = await truffleAssert.createTransactionResult(oracleInstance, exampleTxObj.tx);

      // check if Log event is emitted by Oracle.sol
      truffleAssert.eventEmitted(oracleTxObj, "Log");
    });

    it("(Event) Result event should be emitted when getCurrencies callback function is called", async () => {
      let result = await exampleInstance.getCurrencies();

      const decodedRawLogs = decodeRawLog(oracleInstance, "Log", result);
      queryId = decodedRawLogs.queryId;

      const tx = await exampleInstance.trusource_callback(
        queryId,
        OPERATIONS.getCurrencies,
        statusCode,
        serverResponse,
        {
          from: ownerAddress
        }
      );

      truffleAssert.eventEmitted(tx, "LogResult");
    });


  });

  describe("getProducts operation", () => {
    it("Query getProducts should succeed", async () => {
      await truffleAssert.passes(
        exampleInstance.getProducts({
          from: ownerAddress
        })
      );
    });

    it("Callback for getProducts should fail if not called by address that deployed the oracle contract", async () => {
      const result = await exampleInstance.getProducts();
      const decodedRawLogs = decodeRawLog(oracleInstance, "Log", result);
      queryId = decodedRawLogs.queryId;

      await truffleAssert.reverts(
        exampleInstance.trusource_callback.call(
          queryId,
          OPERATIONS.getProducts,
          statusCode,
          serverResponse,
          {
            from: otherAccountAddress
          }
        ),
        "Only address that deployed the oracle can call this contract back"
      );
    });

    it("Callback for getProducts should succeed if called by address that deployed the oracle contract", async () => {
      let result = await exampleInstance.getProducts();

      const decodedRawLogs = decodeRawLog(oracleInstance, "Log", result);
      queryId = decodedRawLogs.queryId;

      await truffleAssert.passes(
        exampleInstance.trusource_callback(
          queryId,
          OPERATIONS.getProducts,
          statusCode,
          serverResponse,
          {
            from: ownerAddress
          }
        )
      );
    });

    it("Callback for getProducts should fail if query is already fulfilled", async () => {
      await truffleAssert.reverts(
        exampleInstance.trusource_callback.call(
          queryId,
          OPERATIONS.getProducts,
          statusCode,
          serverResponse,
          {
            from: ownerAddress
          }
        ),
        "Id is not one of a remaining query (query never existed or already fulfilled)"
      );
    });

    // EVENTS
    it("(Event) Log event should be emitted when the getProducts function is called", async () => {
      const exampleTxObj = await exampleInstance.getProducts();
      // Example.sol makes a contract call to Oracle.sol where the event is emitted, oracle tx result needed
      const oracleTxObj = await truffleAssert.createTransactionResult(oracleInstance, exampleTxObj.tx);

      // check if Log event is emitted by Oracle.sol
      truffleAssert.eventEmitted(oracleTxObj, "Log");
    });

    it("(Event) Result event should be emitted when getProducts callback function is called", async () => {
      let result = await exampleInstance.getProducts();

      const decodedRawLogs = decodeRawLog(oracleInstance, "Log", result);
      queryId = decodedRawLogs.queryId;

      const tx = await exampleInstance.trusource_callback(
        queryId,
        OPERATIONS.getProducts,
        statusCode,
        serverResponse,
        {
          from: ownerAddress
        }
      );

      truffleAssert.eventEmitted(tx, "LogResult");
    });


  });

  describe("getBook operation", () => {
    it("Query getBook should succeed", async () => {
      await truffleAssert.passes(
        exampleInstance.getBook({
          from: ownerAddress
        })
      );
    });

    it("Callback for getBook should fail if not called by address that deployed the oracle contract", async () => {
      const result = await exampleInstance.getBook();
      const decodedRawLogs = decodeRawLog(oracleInstance, "Log", result);
      queryId = decodedRawLogs.queryId;

      await truffleAssert.reverts(
        exampleInstance.trusource_callback.call(
          queryId,
          OPERATIONS.getBook,
          statusCode,
          serverResponse,
          {
            from: otherAccountAddress
          }
        ),
        "Only address that deployed the oracle can call this contract back"
      );
    });

    it("Callback for getBook should succeed if called by address that deployed the oracle contract", async () => {
      let result = await exampleInstance.getBook();

      const decodedRawLogs = decodeRawLog(oracleInstance, "Log", result);
      queryId = decodedRawLogs.queryId;

      await truffleAssert.passes(
        exampleInstance.trusource_callback(
          queryId,
          OPERATIONS.getBook,
          statusCode,
          serverResponse,
          {
            from: ownerAddress
          }
        )
      );
    });

    it("Callback for getBook should fail if query is already fulfilled", async () => {
      await truffleAssert.reverts(
        exampleInstance.trusource_callback.call(
          queryId,
          OPERATIONS.getBook,
          statusCode,
          serverResponse,
          {
            from: ownerAddress
          }
        ),
        "Id is not one of a remaining query (query never existed or already fulfilled)"
      );
    });

    // EVENTS
    it("(Event) Log event should be emitted when the getBook function is called", async () => {
      const exampleTxObj = await exampleInstance.getBook();
      // Example.sol makes a contract call to Oracle.sol where the event is emitted, oracle tx result needed
      const oracleTxObj = await truffleAssert.createTransactionResult(oracleInstance, exampleTxObj.tx);

      // check if Log event is emitted by Oracle.sol
      truffleAssert.eventEmitted(oracleTxObj, "Log");
    });

    it("(Event) Result event should be emitted when getBook callback function is called", async () => {
      let result = await exampleInstance.getBook();

      const decodedRawLogs = decodeRawLog(oracleInstance, "Log", result);
      queryId = decodedRawLogs.queryId;

      const tx = await exampleInstance.trusource_callback(
        queryId,
        OPERATIONS.getBook,
        statusCode,
        serverResponse,
        {
          from: ownerAddress
        }
      );

      truffleAssert.eventEmitted(tx, "LogResult");
    });

    it("(Event) Event queryParams should be generated correctly for getBook function", async () => {
      let result = await exampleInstance.getBook();

      const decodedRawLogs = decodeRawLog(oracleInstance, "Log", result);
      const encodedBuf = Buffer.from(
        decodedRawLogs.queryParams.slice(2),
        "hex"
      );

      const queryParams = await cbor.decodeAll(encodedBuf);
      assert.deepEqual(
        queryParams,
        ["level", 1],
        "Event not emitted or incorrect queryParams"
      );
    });

    it("(Event) Event pathParams should be generated correctly for getBook function", async () => {
      let result = await exampleInstance.getBook();

      const decodedRawLogs = decodeRawLog(oracleInstance, "Log", result);

      const encodedBuf = Buffer.from(decodedRawLogs.pathParams.slice(2), "hex");
      const pathParams = await cbor.decodeAll(encodedBuf);
      assert.deepEqual(
        pathParams,
        ["BTC-USD"],
        "Event not emitted or incorrect pathParams"
      );
    });
  });

  describe("getCandles operation", () => {
    it("Query getCandles should succeed", async () => {
      await truffleAssert.passes(
        exampleInstance.getCandles({
          from: ownerAddress
        })
      );
    });

    it("Callback for getCandles should fail if not called by address that deployed the oracle contract", async () => {
      const result = await exampleInstance.getCandles();
      const decodedRawLogs = decodeRawLog(oracleInstance, "Log", result);
      queryId = decodedRawLogs.queryId;

      await truffleAssert.reverts(
        exampleInstance.trusource_callback.call(
          queryId,
          OPERATIONS.getCandles,
          statusCode,
          serverResponse,
          {
            from: otherAccountAddress
          }
        ),
        "Only address that deployed the oracle can call this contract back"
      );
    });

    it("Callback for getCandles should succeed if called by address that deployed the oracle contract", async () => {
      let result = await exampleInstance.getCandles();

      const decodedRawLogs = decodeRawLog(oracleInstance, "Log", result);
      queryId = decodedRawLogs.queryId;

      await truffleAssert.passes(
        exampleInstance.trusource_callback(
          queryId,
          OPERATIONS.getCandles,
          statusCode,
          serverResponse,
          {
            from: ownerAddress
          }
        )
      );
    });

    it("Callback for getCandles should fail if query is already fulfilled", async () => {
      await truffleAssert.reverts(
        exampleInstance.trusource_callback.call(
          queryId,
          OPERATIONS.getCandles,
          statusCode,
          serverResponse,
          {
            from: ownerAddress
          }
        ),
        "Id is not one of a remaining query (query never existed or already fulfilled)"
      );
    });

    // EVENTS
    it("(Event) Log event should be emitted when the getCandles function is called", async () => {
      const exampleTxObj = await exampleInstance.getCandles();
      // Example.sol makes a contract call to Oracle.sol where the event is emitted, oracle tx result needed
      const oracleTxObj = await truffleAssert.createTransactionResult(oracleInstance, exampleTxObj.tx);

      // check if Log event is emitted by Oracle.sol
      truffleAssert.eventEmitted(oracleTxObj, "Log");
    });

    it("(Event) Result event should be emitted when getCandles callback function is called", async () => {
      let result = await exampleInstance.getCandles();

      const decodedRawLogs = decodeRawLog(oracleInstance, "Log", result);
      queryId = decodedRawLogs.queryId;

      const tx = await exampleInstance.trusource_callback(
        queryId,
        OPERATIONS.getCandles,
        statusCode,
        serverResponse,
        {
          from: ownerAddress
        }
      );

      truffleAssert.eventEmitted(tx, "LogResult");
    });

    it("(Event) Event queryParams should be generated correctly for getCandles function", async () => {
      let result = await exampleInstance.getCandles();

      const decodedRawLogs = decodeRawLog(oracleInstance, "Log", result);
      const encodedBuf = Buffer.from(
        decodedRawLogs.queryParams.slice(2),
        "hex"
      );

      const queryParams = await cbor.decodeAll(encodedBuf);
      assert.deepEqual(
        queryParams,
        ["granularity", 3600],
        "Event not emitted or incorrect queryParams"
      );
    });

    it("(Event) Event pathParams should be generated correctly for getCandles function", async () => {
      let result = await exampleInstance.getCandles();

      const decodedRawLogs = decodeRawLog(oracleInstance, "Log", result);

      const encodedBuf = Buffer.from(decodedRawLogs.pathParams.slice(2), "hex");
      const pathParams = await cbor.decodeAll(encodedBuf);
      assert.deepEqual(
        pathParams,
        ["BTC-USD"],
        "Event not emitted or incorrect pathParams"
      );
    });
  });

  describe("getStats operation", () => {
    it("Query getStats should succeed", async () => {
      await truffleAssert.passes(
        exampleInstance.getStats({
          from: ownerAddress
        })
      );
    });

    it("Callback for getStats should fail if not called by address that deployed the oracle contract", async () => {
      const result = await exampleInstance.getStats();
      const decodedRawLogs = decodeRawLog(oracleInstance, "Log", result);
      queryId = decodedRawLogs.queryId;

      await truffleAssert.reverts(
        exampleInstance.trusource_callback.call(
          queryId,
          OPERATIONS.getStats,
          statusCode,
          serverResponse,
          {
            from: otherAccountAddress
          }
        ),
        "Only address that deployed the oracle can call this contract back"
      );
    });

    it("Callback for getStats should succeed if called by address that deployed the oracle contract", async () => {
      let result = await exampleInstance.getStats();

      const decodedRawLogs = decodeRawLog(oracleInstance, "Log", result);
      queryId = decodedRawLogs.queryId;

      await truffleAssert.passes(
        exampleInstance.trusource_callback(
          queryId,
          OPERATIONS.getStats,
          statusCode,
          serverResponse,
          {
            from: ownerAddress
          }
        )
      );
    });

    it("Callback for getStats should fail if query is already fulfilled", async () => {
      await truffleAssert.reverts(
        exampleInstance.trusource_callback.call(
          queryId,
          OPERATIONS.getStats,
          statusCode,
          serverResponse,
          {
            from: ownerAddress
          }
        ),
        "Id is not one of a remaining query (query never existed or already fulfilled)"
      );
    });

    // EVENTS
    it("(Event) Log event should be emitted when the getStats function is called", async () => {
      const exampleTxObj = await exampleInstance.getStats();
      // Example.sol makes a contract call to Oracle.sol where the event is emitted, oracle tx result needed
      const oracleTxObj = await truffleAssert.createTransactionResult(oracleInstance, exampleTxObj.tx);

      // check if Log event is emitted by Oracle.sol
      truffleAssert.eventEmitted(oracleTxObj, "Log");
    });

    it("(Event) Result event should be emitted when getStats callback function is called", async () => {
      let result = await exampleInstance.getStats();

      const decodedRawLogs = decodeRawLog(oracleInstance, "Log", result);
      queryId = decodedRawLogs.queryId;

      const tx = await exampleInstance.trusource_callback(
        queryId,
        OPERATIONS.getStats,
        statusCode,
        serverResponse,
        {
          from: ownerAddress
        }
      );

      truffleAssert.eventEmitted(tx, "LogResult");
    });


    it("(Event) Event pathParams should be generated correctly for getStats function", async () => {
      let result = await exampleInstance.getStats();

      const decodedRawLogs = decodeRawLog(oracleInstance, "Log", result);

      const encodedBuf = Buffer.from(decodedRawLogs.pathParams.slice(2), "hex");
      const pathParams = await cbor.decodeAll(encodedBuf);
      assert.deepEqual(
        pathParams,
        ["BTC-USD"],
        "Event not emitted or incorrect pathParams"
      );
    });
  });

  describe("getTicker operation", () => {
    it("Query getTicker should succeed", async () => {
      await truffleAssert.passes(
        exampleInstance.getTicker({
          from: ownerAddress
        })
      );
    });

    it("Callback for getTicker should fail if not called by address that deployed the oracle contract", async () => {
      const result = await exampleInstance.getTicker();
      const decodedRawLogs = decodeRawLog(oracleInstance, "Log", result);
      queryId = decodedRawLogs.queryId;

      await truffleAssert.reverts(
        exampleInstance.trusource_callback.call(
          queryId,
          OPERATIONS.getTicker,
          statusCode,
          serverResponse,
          {
            from: otherAccountAddress
          }
        ),
        "Only address that deployed the oracle can call this contract back"
      );
    });

    it("Callback for getTicker should succeed if called by address that deployed the oracle contract", async () => {
      let result = await exampleInstance.getTicker();

      const decodedRawLogs = decodeRawLog(oracleInstance, "Log", result);
      queryId = decodedRawLogs.queryId;

      await truffleAssert.passes(
        exampleInstance.trusource_callback(
          queryId,
          OPERATIONS.getTicker,
          statusCode,
          serverResponse,
          {
            from: ownerAddress
          }
        )
      );
    });

    it("Callback for getTicker should fail if query is already fulfilled", async () => {
      await truffleAssert.reverts(
        exampleInstance.trusource_callback.call(
          queryId,
          OPERATIONS.getTicker,
          statusCode,
          serverResponse,
          {
            from: ownerAddress
          }
        ),
        "Id is not one of a remaining query (query never existed or already fulfilled)"
      );
    });

    // EVENTS
    it("(Event) Log event should be emitted when the getTicker function is called", async () => {
      const exampleTxObj = await exampleInstance.getTicker();
      // Example.sol makes a contract call to Oracle.sol where the event is emitted, oracle tx result needed
      const oracleTxObj = await truffleAssert.createTransactionResult(oracleInstance, exampleTxObj.tx);

      // check if Log event is emitted by Oracle.sol
      truffleAssert.eventEmitted(oracleTxObj, "Log");
    });

    it("(Event) Result event should be emitted when getTicker callback function is called", async () => {
      let result = await exampleInstance.getTicker();

      const decodedRawLogs = decodeRawLog(oracleInstance, "Log", result);
      queryId = decodedRawLogs.queryId;

      const tx = await exampleInstance.trusource_callback(
        queryId,
        OPERATIONS.getTicker,
        statusCode,
        serverResponse,
        {
          from: ownerAddress
        }
      );

      truffleAssert.eventEmitted(tx, "LogResult");
    });


    it("(Event) Event pathParams should be generated correctly for getTicker function", async () => {
      let result = await exampleInstance.getTicker();

      const decodedRawLogs = decodeRawLog(oracleInstance, "Log", result);

      const encodedBuf = Buffer.from(decodedRawLogs.pathParams.slice(2), "hex");
      const pathParams = await cbor.decodeAll(encodedBuf);
      assert.deepEqual(
        pathParams,
        ["BTC-USD"],
        "Event not emitted or incorrect pathParams"
      );
    });
  });

  describe("getTrades operation", () => {
    it("Query getTrades should succeed", async () => {
      await truffleAssert.passes(
        exampleInstance.getTrades({
          from: ownerAddress
        })
      );
    });

    it("Callback for getTrades should fail if not called by address that deployed the oracle contract", async () => {
      const result = await exampleInstance.getTrades();
      const decodedRawLogs = decodeRawLog(oracleInstance, "Log", result);
      queryId = decodedRawLogs.queryId;

      await truffleAssert.reverts(
        exampleInstance.trusource_callback.call(
          queryId,
          OPERATIONS.getTrades,
          statusCode,
          serverResponse,
          {
            from: otherAccountAddress
          }
        ),
        "Only address that deployed the oracle can call this contract back"
      );
    });

    it("Callback for getTrades should succeed if called by address that deployed the oracle contract", async () => {
      let result = await exampleInstance.getTrades();

      const decodedRawLogs = decodeRawLog(oracleInstance, "Log", result);
      queryId = decodedRawLogs.queryId;

      await truffleAssert.passes(
        exampleInstance.trusource_callback(
          queryId,
          OPERATIONS.getTrades,
          statusCode,
          serverResponse,
          {
            from: ownerAddress
          }
        )
      );
    });

    it("Callback for getTrades should fail if query is already fulfilled", async () => {
      await truffleAssert.reverts(
        exampleInstance.trusource_callback.call(
          queryId,
          OPERATIONS.getTrades,
          statusCode,
          serverResponse,
          {
            from: ownerAddress
          }
        ),
        "Id is not one of a remaining query (query never existed or already fulfilled)"
      );
    });

    // EVENTS
    it("(Event) Log event should be emitted when the getTrades function is called", async () => {
      const exampleTxObj = await exampleInstance.getTrades();
      // Example.sol makes a contract call to Oracle.sol where the event is emitted, oracle tx result needed
      const oracleTxObj = await truffleAssert.createTransactionResult(oracleInstance, exampleTxObj.tx);

      // check if Log event is emitted by Oracle.sol
      truffleAssert.eventEmitted(oracleTxObj, "Log");
    });

    it("(Event) Result event should be emitted when getTrades callback function is called", async () => {
      let result = await exampleInstance.getTrades();

      const decodedRawLogs = decodeRawLog(oracleInstance, "Log", result);
      queryId = decodedRawLogs.queryId;

      const tx = await exampleInstance.trusource_callback(
        queryId,
        OPERATIONS.getTrades,
        statusCode,
        serverResponse,
        {
          from: ownerAddress
        }
      );

      truffleAssert.eventEmitted(tx, "LogResult");
    });


    it("(Event) Event pathParams should be generated correctly for getTrades function", async () => {
      let result = await exampleInstance.getTrades();

      const decodedRawLogs = decodeRawLog(oracleInstance, "Log", result);

      const encodedBuf = Buffer.from(decodedRawLogs.pathParams.slice(2), "hex");
      const pathParams = await cbor.decodeAll(encodedBuf);
      assert.deepEqual(
        pathParams,
        ["BTC-USD"],
        "Event not emitted or incorrect pathParams"
      );
    });
  });

  describe("getTime operation", () => {
    it("Query getTime should succeed", async () => {
      await truffleAssert.passes(
        exampleInstance.getTime({
          from: ownerAddress
        })
      );
    });

    it("Callback for getTime should fail if not called by address that deployed the oracle contract", async () => {
      const result = await exampleInstance.getTime();
      const decodedRawLogs = decodeRawLog(oracleInstance, "Log", result);
      queryId = decodedRawLogs.queryId;

      await truffleAssert.reverts(
        exampleInstance.trusource_callback.call(
          queryId,
          OPERATIONS.getTime,
          statusCode,
          serverResponse,
          {
            from: otherAccountAddress
          }
        ),
        "Only address that deployed the oracle can call this contract back"
      );
    });

    it("Callback for getTime should succeed if called by address that deployed the oracle contract", async () => {
      let result = await exampleInstance.getTime();

      const decodedRawLogs = decodeRawLog(oracleInstance, "Log", result);
      queryId = decodedRawLogs.queryId;

      await truffleAssert.passes(
        exampleInstance.trusource_callback(
          queryId,
          OPERATIONS.getTime,
          statusCode,
          serverResponse,
          {
            from: ownerAddress
          }
        )
      );
    });

    it("Callback for getTime should fail if query is already fulfilled", async () => {
      await truffleAssert.reverts(
        exampleInstance.trusource_callback.call(
          queryId,
          OPERATIONS.getTime,
          statusCode,
          serverResponse,
          {
            from: ownerAddress
          }
        ),
        "Id is not one of a remaining query (query never existed or already fulfilled)"
      );
    });

    // EVENTS
    it("(Event) Log event should be emitted when the getTime function is called", async () => {
      const exampleTxObj = await exampleInstance.getTime();
      // Example.sol makes a contract call to Oracle.sol where the event is emitted, oracle tx result needed
      const oracleTxObj = await truffleAssert.createTransactionResult(oracleInstance, exampleTxObj.tx);

      // check if Log event is emitted by Oracle.sol
      truffleAssert.eventEmitted(oracleTxObj, "Log");
    });

    it("(Event) Result event should be emitted when getTime callback function is called", async () => {
      let result = await exampleInstance.getTime();

      const decodedRawLogs = decodeRawLog(oracleInstance, "Log", result);
      queryId = decodedRawLogs.queryId;

      const tx = await exampleInstance.trusource_callback(
        queryId,
        OPERATIONS.getTime,
        statusCode,
        serverResponse,
        {
          from: ownerAddress
        }
      );

      truffleAssert.eventEmitted(tx, "LogResult");
    });


  });
});
