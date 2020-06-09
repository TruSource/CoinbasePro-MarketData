const Oracle = artifacts.require("Oracle");
const cbor = require("cbor");
const truffleAssert = require("truffle-assertions");

contract("Oracle (Query) - getCurrencies", async accounts => {
  // Note: use .call() where not necessary to use a transaction
  let oracleInstance;
  let contractAddress;
  let encodedQueryParams;
  
  let options;

  // before hook is run before all tests
  before(async () => {
    oracleInstance = await Oracle.deployed();

    encodedQueryParams = cbor.encode([]);


    options = "";

    // Note: does not matter that its an account address - we just need an address to test with
    contractAddress = accounts[2];
  });

  it("Query should succeed and event should be emitted", async () => {
    const tx = await oracleInstance.getCurrencies(
      
      encodedQueryParams,
      options,
      {
        from: contractAddress
      }
    );

    truffleAssert.eventEmitted(tx, "Log");
  });
});

contract("Oracle (Query) - getProducts", async accounts => {
  // Note: use .call() where not necessary to use a transaction
  let oracleInstance;
  let contractAddress;
  let encodedQueryParams;
  
  let options;

  // before hook is run before all tests
  before(async () => {
    oracleInstance = await Oracle.deployed();

    encodedQueryParams = cbor.encode([]);


    options = "";

    // Note: does not matter that its an account address - we just need an address to test with
    contractAddress = accounts[2];
  });

  it("Query should succeed and event should be emitted", async () => {
    const tx = await oracleInstance.getProducts(
      
      encodedQueryParams,
      options,
      {
        from: contractAddress
      }
    );

    truffleAssert.eventEmitted(tx, "Log");
  });
});

contract("Oracle (Query) - getBook", async accounts => {
  // Note: use .call() where not necessary to use a transaction
  let oracleInstance;
  let contractAddress;
  let encodedQueryParams;
  let encodePathParams;
  let options;

  // before hook is run before all tests
  before(async () => {
    oracleInstance = await Oracle.deployed();

    encodedQueryParams = cbor.encode(["level", 1]);

    encodePathParams = cbor.encode(["BTC-USD"]);

    options = "";

    // Note: does not matter that its an account address - we just need an address to test with
    contractAddress = accounts[2];
  });

  it("Query should succeed and event should be emitted", async () => {
    const tx = await oracleInstance.getBook(
      encodePathParams,
      encodedQueryParams,
      options,
      {
        from: contractAddress
      }
    );

    truffleAssert.eventEmitted(tx, "Log");
  });
});

contract("Oracle (Query) - getCandles", async accounts => {
  // Note: use .call() where not necessary to use a transaction
  let oracleInstance;
  let contractAddress;
  let encodedQueryParams;
  let encodePathParams;
  let options;

  // before hook is run before all tests
  before(async () => {
    oracleInstance = await Oracle.deployed();

    encodedQueryParams = cbor.encode(["granularity", 3600]);

    encodePathParams = cbor.encode(["BTC-USD"]);

    options = "";

    // Note: does not matter that its an account address - we just need an address to test with
    contractAddress = accounts[2];
  });

  it("Query should succeed and event should be emitted", async () => {
    const tx = await oracleInstance.getCandles(
      encodePathParams,
      encodedQueryParams,
      options,
      {
        from: contractAddress
      }
    );

    truffleAssert.eventEmitted(tx, "Log");
  });
});

contract("Oracle (Query) - getStats", async accounts => {
  // Note: use .call() where not necessary to use a transaction
  let oracleInstance;
  let contractAddress;
  let encodedQueryParams;
  let encodePathParams;
  let options;

  // before hook is run before all tests
  before(async () => {
    oracleInstance = await Oracle.deployed();

    encodedQueryParams = cbor.encode([]);

    encodePathParams = cbor.encode(["BTC-USD"]);

    options = "";

    // Note: does not matter that its an account address - we just need an address to test with
    contractAddress = accounts[2];
  });

  it("Query should succeed and event should be emitted", async () => {
    const tx = await oracleInstance.getStats(
      encodePathParams,
      encodedQueryParams,
      options,
      {
        from: contractAddress
      }
    );

    truffleAssert.eventEmitted(tx, "Log");
  });
});

contract("Oracle (Query) - getTicker", async accounts => {
  // Note: use .call() where not necessary to use a transaction
  let oracleInstance;
  let contractAddress;
  let encodedQueryParams;
  let encodePathParams;
  let options;

  // before hook is run before all tests
  before(async () => {
    oracleInstance = await Oracle.deployed();

    encodedQueryParams = cbor.encode([]);

    encodePathParams = cbor.encode(["BTC-USD"]);

    options = "";

    // Note: does not matter that its an account address - we just need an address to test with
    contractAddress = accounts[2];
  });

  it("Query should succeed and event should be emitted", async () => {
    const tx = await oracleInstance.getTicker(
      encodePathParams,
      encodedQueryParams,
      options,
      {
        from: contractAddress
      }
    );

    truffleAssert.eventEmitted(tx, "Log");
  });
});

contract("Oracle (Query) - getTrades", async accounts => {
  // Note: use .call() where not necessary to use a transaction
  let oracleInstance;
  let contractAddress;
  let encodedQueryParams;
  let encodePathParams;
  let options;

  // before hook is run before all tests
  before(async () => {
    oracleInstance = await Oracle.deployed();

    encodedQueryParams = cbor.encode([]);

    encodePathParams = cbor.encode(["BTC-USD"]);

    options = "";

    // Note: does not matter that its an account address - we just need an address to test with
    contractAddress = accounts[2];
  });

  it("Query should succeed and event should be emitted", async () => {
    const tx = await oracleInstance.getTrades(
      encodePathParams,
      encodedQueryParams,
      options,
      {
        from: contractAddress
      }
    );

    truffleAssert.eventEmitted(tx, "Log");
  });
});

contract("Oracle (Query) - getTime", async accounts => {
  // Note: use .call() where not necessary to use a transaction
  let oracleInstance;
  let contractAddress;
  let encodedQueryParams;
  
  let options;

  // before hook is run before all tests
  before(async () => {
    oracleInstance = await Oracle.deployed();

    encodedQueryParams = cbor.encode([]);


    options = "";

    // Note: does not matter that its an account address - we just need an address to test with
    contractAddress = accounts[2];
  });

  it("Query should succeed and event should be emitted", async () => {
    const tx = await oracleInstance.getTime(
      
      encodedQueryParams,
      options,
      {
        from: contractAddress
      }
    );

    truffleAssert.eventEmitted(tx, "Log");
  });
});
