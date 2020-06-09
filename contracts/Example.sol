pragma solidity ^0.5.0;

import "./OracleAPI.sol";

/**
 * @title Example contract using MarketData oracle
 * @author TruSource
 * @notice Example contract using MarketData oracle
 * @dev Demonstrates usage of OracleAPI and building queryParams
 */
contract Example is OracleAPI {
    event LogResult(bytes32 queryId, Oracle.Oracle.Operations operationId, uint256 statusCode, string result);

    constructor(address resolverAddress) public OracleAPI(resolverAddress) {}

    /**
     * @notice Make getCurrencies query
     * @dev Make getCurrencies query, queryId is returned to be used to handle query result
     */
    function getCurrencies() external {
        trusource_getCurrencies();
    }

    /**
     * @notice Make getProducts query
     * @dev Make getProducts query, queryId is returned to be used to handle query result
     */
    function getProducts() external {
        trusource_getProducts();
    }

    /**
     * @notice Make getBook query
     * @dev Make getBook query, queryId is returned to be used to handle query result
     */
    function getBook() external {
        Buffer.buffer memory optionalQueryParams = createBuffer();
    
        // Optional
        addUInt(optionalQueryParams, "level", 1);
    
        trusource_getBook("BTC-USD", optionalQueryParams);
    }

    /**
     * @notice Make getCandles query
     * @dev Make getCandles query, queryId is returned to be used to handle query result
     */
    function getCandles() external {
        Buffer.buffer memory optionalQueryParams = createBuffer();
    
        // Optional
        addUInt(optionalQueryParams, "granularity", 3600);
    
        trusource_getCandles("BTC-USD", optionalQueryParams);
    }

    /**
     * @notice Make getStats query
     * @dev Make getStats query, queryId is returned to be used to handle query result
     */
    function getStats() external {
        trusource_getStats("BTC-USD");
    }

    /**
     * @notice Make getTicker query
     * @dev Make getTicker query, queryId is returned to be used to handle query result
     */
    function getTicker() external {
        trusource_getTicker("BTC-USD");
    }

    /**
     * @notice Make getTrades query
     * @dev Make getTrades query, queryId is returned to be used to handle query result
     */
    function getTrades() external {
        trusource_getTrades("BTC-USD");
    }

    /**
     * @notice Make getTime query
     * @dev Make getTime query, queryId is returned to be used to handle query result
     */
    function getTime() external {
        trusource_getTime();
    }

    /**
     * @dev Handle query result using queryId, operationId and statusCode
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
    ) external checkAddress checkQueryId(queryId) {
        if (operationId == Oracle.Oracle.Operations.getCurrencies) {
            emit LogResult(queryId, operationId, statusCode, result);
            return;
        }

        if (operationId == Oracle.Oracle.Operations.getProducts) {
            emit LogResult(queryId, operationId, statusCode, result);
            return;
        }

        if (operationId == Oracle.Oracle.Operations.getBook) {
            emit LogResult(queryId, operationId, statusCode, result);
            return;
        }

        if (operationId == Oracle.Oracle.Operations.getCandles) {
            emit LogResult(queryId, operationId, statusCode, result);
            return;
        }

        if (operationId == Oracle.Oracle.Operations.getStats) {
            emit LogResult(queryId, operationId, statusCode, result);
            return;
        }

        if (operationId == Oracle.Oracle.Operations.getTicker) {
            emit LogResult(queryId, operationId, statusCode, result);
            return;
        }

        if (operationId == Oracle.Oracle.Operations.getTrades) {
            emit LogResult(queryId, operationId, statusCode, result);
            return;
        }

        if (operationId == Oracle.Oracle.Operations.getTime) {
            emit LogResult(queryId, operationId, statusCode, result);
            return;
        }
    }
}
