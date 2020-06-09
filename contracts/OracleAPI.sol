pragma solidity ^0.5.0;

import "@trusource/solidity-cbor/contracts/CBOR.sol";
import "./Resolver.sol" as Resolver;
import "./Oracle.sol" as Oracle;

/**
 * @title API for Oracle contract
 * @author TruSource
 * @dev API for Oracle contract
 */
contract OracleAPI {
    uint256 internal constant DEFAULT_BUFFER_SIZE = 256;
    using CBOR for Buffer.buffer;

    // keep track of queries that did not get a response yet
    mapping(bytes32 => bool) internal remainingQueries;

    Resolver.Resolver private resolver;
    Oracle.Oracle private oracle;
    address private owner;

    constructor(address resolverAddress) public {
        owner = msg.sender;
        resolver = Resolver.Resolver(resolverAddress);
        oracle = Oracle.Oracle(resolver.getOracleAddress());
    }

    modifier checkAddress() {
        require(
            msg.sender == callback_address(),
            "Only address that deployed the oracle can call this contract back"
        );
        _;
    }

    modifier checkQueryId(bytes32 queryId) {
        require(
            remainingQueries[queryId],
            "Id is not one of a remaining query (query never existed or already fulfilled)"
        );

        // remove query from list of unfulfilled queries
        remainingQueries[queryId] = false;

        _;
    }

    modifier setOracle {
        oracle = Oracle.Oracle(resolver.getOracleAddress());
        _;
    }

    /**
     * @dev get callback address
     * @return address Oracle owner address
     */
    function callback_address() internal view returns (address) {
        return oracle.getOwner();
    }

    /**
     * @dev getCurrencies
     * @return queryId unique id for query
     */
    function trusource_getCurrencies() internal returns (bytes32) {
        return trusource_getCurrencies("");
    }
    
    /**
     * @dev getCurrencies
     * @param options options string
     * @return queryId unique id for query
     */
    function trusource_getCurrencies(string memory options) internal setOracle returns (bytes32) {
        bytes32 queryId = oracle.getCurrencies("", options);
    
        // add query to list of unfulfilled queries
        remainingQueries[queryId] = true;
    
        return queryId;
    }

    /**
     * @dev getCurrencies
     * @param optionalQueryParams encoded query parameters buffer
     * @return queryId unique id for query
     */
    function trusource_getCurrencies(Buffer.buffer memory optionalQueryParams) internal returns (bytes32) {
        return trusource_getCurrencies(optionalQueryParams, "");
    }

    /**
     * @dev getCurrencies
     * @param optionalQueryParams encoded query parameters buffer
     * @param options options string
     * @return queryId unique id for query
     */
    function trusource_getCurrencies(Buffer.buffer memory optionalQueryParams, string memory options) internal setOracle returns (bytes32) {
        bytes32 queryId = oracle.getCurrencies(optionalQueryParams.buf, options);
    
        // add query to list of unfulfilled queries
        remainingQueries[queryId] = true;
    
        return queryId;
    }

    /**
     * @dev getProducts
     * @return queryId unique id for query
     */
    function trusource_getProducts() internal returns (bytes32) {
        return trusource_getProducts("");
    }
    
    /**
     * @dev getProducts
     * @param options options string
     * @return queryId unique id for query
     */
    function trusource_getProducts(string memory options) internal setOracle returns (bytes32) {
        bytes32 queryId = oracle.getProducts("", options);
    
        // add query to list of unfulfilled queries
        remainingQueries[queryId] = true;
    
        return queryId;
    }

    /**
     * @dev getProducts
     * @param optionalQueryParams encoded query parameters buffer
     * @return queryId unique id for query
     */
    function trusource_getProducts(Buffer.buffer memory optionalQueryParams) internal returns (bytes32) {
        return trusource_getProducts(optionalQueryParams, "");
    }

    /**
     * @dev getProducts
     * @param optionalQueryParams encoded query parameters buffer
     * @param options options string
     * @return queryId unique id for query
     */
    function trusource_getProducts(Buffer.buffer memory optionalQueryParams, string memory options) internal setOracle returns (bytes32) {
        bytes32 queryId = oracle.getProducts(optionalQueryParams.buf, options);
    
        // add query to list of unfulfilled queries
        remainingQueries[queryId] = true;
    
        return queryId;
    }

    /**
     * @dev getBook
     * @param productId productId path parameter
     * @return queryId unique id for query
     */
    function trusource_getBook(string memory productId) internal returns (bytes32) {
        return trusource_getBook(productId, "");
    }
    
    /**
     * @dev getBook
     * @param productId productId path parameter
     * @param options options string
     * @return queryId unique id for query
     */
    function trusource_getBook(string memory productId, string memory options) internal setOracle returns (bytes32) {
        Buffer.buffer memory pathParams = createBuffer();
        pathParams.encodeString(productId);
    
        bytes32 queryId = oracle.getBook(pathParams.buf, "", options);
    
        // add query to list of unfulfilled queries
        remainingQueries[queryId] = true;
    
        return queryId;
    }

    /**
     * @dev getBook
     * @param productId productId path parameter
     * @param optionalQueryParams encoded query parameters buffer
     * @return queryId unique id for query
     */
    function trusource_getBook(string memory productId, Buffer.buffer memory optionalQueryParams) internal returns (bytes32) {
        return trusource_getBook(productId, optionalQueryParams, "");
    }

    /**
     * @dev getBook
     * @param productId productId path parameter
     * @param optionalQueryParams encoded query parameters buffer
     * @param options options string
     * @return queryId unique id for query
     */
    function trusource_getBook(string memory productId, Buffer.buffer memory optionalQueryParams, string memory options) internal setOracle returns (bytes32) {
        Buffer.buffer memory pathParams = createBuffer();
        pathParams.encodeString(productId);
    
        bytes32 queryId = oracle.getBook(pathParams.buf, optionalQueryParams.buf, options);
    
        // add query to list of unfulfilled queries
        remainingQueries[queryId] = true;
    
        return queryId;
    }

    /**
     * @dev getCandles
     * @param productId productId path parameter
     * @return queryId unique id for query
     */
    function trusource_getCandles(string memory productId) internal returns (bytes32) {
        return trusource_getCandles(productId, "");
    }
    
    /**
     * @dev getCandles
     * @param productId productId path parameter
     * @param options options string
     * @return queryId unique id for query
     */
    function trusource_getCandles(string memory productId, string memory options) internal setOracle returns (bytes32) {
        Buffer.buffer memory pathParams = createBuffer();
        pathParams.encodeString(productId);
    
        bytes32 queryId = oracle.getCandles(pathParams.buf, "", options);
    
        // add query to list of unfulfilled queries
        remainingQueries[queryId] = true;
    
        return queryId;
    }

    /**
     * @dev getCandles
     * @param productId productId path parameter
     * @param optionalQueryParams encoded query parameters buffer
     * @return queryId unique id for query
     */
    function trusource_getCandles(string memory productId, Buffer.buffer memory optionalQueryParams) internal returns (bytes32) {
        return trusource_getCandles(productId, optionalQueryParams, "");
    }

    /**
     * @dev getCandles
     * @param productId productId path parameter
     * @param optionalQueryParams encoded query parameters buffer
     * @param options options string
     * @return queryId unique id for query
     */
    function trusource_getCandles(string memory productId, Buffer.buffer memory optionalQueryParams, string memory options) internal setOracle returns (bytes32) {
        Buffer.buffer memory pathParams = createBuffer();
        pathParams.encodeString(productId);
    
        bytes32 queryId = oracle.getCandles(pathParams.buf, optionalQueryParams.buf, options);
    
        // add query to list of unfulfilled queries
        remainingQueries[queryId] = true;
    
        return queryId;
    }

    /**
     * @dev getStats
     * @param productId productId path parameter
     * @return queryId unique id for query
     */
    function trusource_getStats(string memory productId) internal returns (bytes32) {
        return trusource_getStats(productId, "");
    }
    
    /**
     * @dev getStats
     * @param productId productId path parameter
     * @param options options string
     * @return queryId unique id for query
     */
    function trusource_getStats(string memory productId, string memory options) internal setOracle returns (bytes32) {
        Buffer.buffer memory pathParams = createBuffer();
        pathParams.encodeString(productId);
    
        bytes32 queryId = oracle.getStats(pathParams.buf, "", options);
    
        // add query to list of unfulfilled queries
        remainingQueries[queryId] = true;
    
        return queryId;
    }

    /**
     * @dev getStats
     * @param productId productId path parameter
     * @param optionalQueryParams encoded query parameters buffer
     * @return queryId unique id for query
     */
    function trusource_getStats(string memory productId, Buffer.buffer memory optionalQueryParams) internal returns (bytes32) {
        return trusource_getStats(productId, optionalQueryParams, "");
    }

    /**
     * @dev getStats
     * @param productId productId path parameter
     * @param optionalQueryParams encoded query parameters buffer
     * @param options options string
     * @return queryId unique id for query
     */
    function trusource_getStats(string memory productId, Buffer.buffer memory optionalQueryParams, string memory options) internal setOracle returns (bytes32) {
        Buffer.buffer memory pathParams = createBuffer();
        pathParams.encodeString(productId);
    
        bytes32 queryId = oracle.getStats(pathParams.buf, optionalQueryParams.buf, options);
    
        // add query to list of unfulfilled queries
        remainingQueries[queryId] = true;
    
        return queryId;
    }

    /**
     * @dev getTicker
     * @param productId productId path parameter
     * @return queryId unique id for query
     */
    function trusource_getTicker(string memory productId) internal returns (bytes32) {
        return trusource_getTicker(productId, "");
    }
    
    /**
     * @dev getTicker
     * @param productId productId path parameter
     * @param options options string
     * @return queryId unique id for query
     */
    function trusource_getTicker(string memory productId, string memory options) internal setOracle returns (bytes32) {
        Buffer.buffer memory pathParams = createBuffer();
        pathParams.encodeString(productId);
    
        bytes32 queryId = oracle.getTicker(pathParams.buf, "", options);
    
        // add query to list of unfulfilled queries
        remainingQueries[queryId] = true;
    
        return queryId;
    }

    /**
     * @dev getTicker
     * @param productId productId path parameter
     * @param optionalQueryParams encoded query parameters buffer
     * @return queryId unique id for query
     */
    function trusource_getTicker(string memory productId, Buffer.buffer memory optionalQueryParams) internal returns (bytes32) {
        return trusource_getTicker(productId, optionalQueryParams, "");
    }

    /**
     * @dev getTicker
     * @param productId productId path parameter
     * @param optionalQueryParams encoded query parameters buffer
     * @param options options string
     * @return queryId unique id for query
     */
    function trusource_getTicker(string memory productId, Buffer.buffer memory optionalQueryParams, string memory options) internal setOracle returns (bytes32) {
        Buffer.buffer memory pathParams = createBuffer();
        pathParams.encodeString(productId);
    
        bytes32 queryId = oracle.getTicker(pathParams.buf, optionalQueryParams.buf, options);
    
        // add query to list of unfulfilled queries
        remainingQueries[queryId] = true;
    
        return queryId;
    }

    /**
     * @dev getTrades
     * @param productId productId path parameter
     * @return queryId unique id for query
     */
    function trusource_getTrades(string memory productId) internal returns (bytes32) {
        return trusource_getTrades(productId, "");
    }
    
    /**
     * @dev getTrades
     * @param productId productId path parameter
     * @param options options string
     * @return queryId unique id for query
     */
    function trusource_getTrades(string memory productId, string memory options) internal setOracle returns (bytes32) {
        Buffer.buffer memory pathParams = createBuffer();
        pathParams.encodeString(productId);
    
        bytes32 queryId = oracle.getTrades(pathParams.buf, "", options);
    
        // add query to list of unfulfilled queries
        remainingQueries[queryId] = true;
    
        return queryId;
    }

    /**
     * @dev getTrades
     * @param productId productId path parameter
     * @param optionalQueryParams encoded query parameters buffer
     * @return queryId unique id for query
     */
    function trusource_getTrades(string memory productId, Buffer.buffer memory optionalQueryParams) internal returns (bytes32) {
        return trusource_getTrades(productId, optionalQueryParams, "");
    }

    /**
     * @dev getTrades
     * @param productId productId path parameter
     * @param optionalQueryParams encoded query parameters buffer
     * @param options options string
     * @return queryId unique id for query
     */
    function trusource_getTrades(string memory productId, Buffer.buffer memory optionalQueryParams, string memory options) internal setOracle returns (bytes32) {
        Buffer.buffer memory pathParams = createBuffer();
        pathParams.encodeString(productId);
    
        bytes32 queryId = oracle.getTrades(pathParams.buf, optionalQueryParams.buf, options);
    
        // add query to list of unfulfilled queries
        remainingQueries[queryId] = true;
    
        return queryId;
    }

    /**
     * @dev getTime
     * @return queryId unique id for query
     */
    function trusource_getTime() internal returns (bytes32) {
        return trusource_getTime("");
    }
    
    /**
     * @dev getTime
     * @param options options string
     * @return queryId unique id for query
     */
    function trusource_getTime(string memory options) internal setOracle returns (bytes32) {
        bytes32 queryId = oracle.getTime("", options);
    
        // add query to list of unfulfilled queries
        remainingQueries[queryId] = true;
    
        return queryId;
    }

    /**
     * @dev getTime
     * @param optionalQueryParams encoded query parameters buffer
     * @return queryId unique id for query
     */
    function trusource_getTime(Buffer.buffer memory optionalQueryParams) internal returns (bytes32) {
        return trusource_getTime(optionalQueryParams, "");
    }

    /**
     * @dev getTime
     * @param optionalQueryParams encoded query parameters buffer
     * @param options options string
     * @return queryId unique id for query
     */
    function trusource_getTime(Buffer.buffer memory optionalQueryParams, string memory options) internal setOracle returns (bytes32) {
        bytes32 queryId = oracle.getTime(optionalQueryParams.buf, options);
    
        // add query to list of unfulfilled queries
        remainingQueries[queryId] = true;
    
        return queryId;
    }


    /**
      * @dev trusource_callback abstract function
      * @param queryId unique id for query
      * @param operationId id for operation
      * @param statusCode HTTP response status code
      * @param result query result
      */
    function trusource_callback(
        bytes32 queryId,
        Oracle.Oracle.Operations operationId,
        uint256 statusCode,
        string calldata result
    ) external;

    /**
      * @dev initialises buffer
      * @return Buffer.buffer
      */
    function createBuffer() internal pure returns (Buffer.buffer memory) {
        Buffer.buffer memory buf;
        Buffer.init(buf, DEFAULT_BUFFER_SIZE);
        return buf;
    }
    
    /**
      * @dev Adds key value pair to buffer
      * @param params buffer that is added
      * @param key key value
      * @param value value
      */
    function addString(Buffer.buffer memory params, string memory key, string memory value) internal pure {
        params.encodeString(key);
        params.encodeString(value);
    }
    
    /**
      * @dev Adds key value pair to buffer
      * @param params buffer that is added
      * @param key key value
      * @param value value
      */
    function addUInt(Buffer.buffer memory params, string memory key, uint256 value) internal pure {
        params.encodeString(key);
        params.encodeUInt(value);
    }

    /**
      * @dev Parses string as a uint
      * @param str string representation of uint
      * @return parsedInt integer
      */
    function parseInt(string memory str) internal pure returns (uint256 parsedInt) {
        bytes memory bstr = bytes(str);
        uint256 mint = 0;
        bool decimals = false;
        for (uint256 i = 0; i < bstr.length; i++) {
            if (
                (uint256(uint8(bstr[i])) >= 48) &&
                (uint256(uint8(bstr[i])) <= 57)
            ) {
                if (decimals) {
                    break;
                }
                mint *= 10;
                mint += uint256(uint8(bstr[i])) - 48;
            } else if (uint256(uint8(bstr[i])) == 46) {
                decimals = true;
            }
        }
        return mint;
    }}
