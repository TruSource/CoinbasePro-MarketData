pragma solidity ^0.5.0;

/** 
 * @title Oracle.
 * @author TruSource
 * @notice MarketData oracle contract
 */ 
contract Oracle {
    address private owner;

    enum Operations { getCurrencies, getProducts, getBook, getCandles, getStats, getTicker, getTrades, getTime }

    // number of requests is incremented for each request to generate unique id
    mapping (address => uint256) private numRequests;

    event Log(
        address sender,
        bytes32 queryId,
        Operations operationId,
        bytes pathParams,
        bytes queryParams,
        string options
    );

    constructor() public {
        owner = msg.sender;
    }

    /**
     * @return address owner address
     */
    function getOwner() external view returns (address) {
        return owner;
    }

    /**
     * @param queryParams encoded query parameters buffer
     * @param options options string
     * @return bytes32 query id
     */
    function getCurrencies(bytes calldata queryParams, string calldata options) external returns (bytes32) {
        return makeRequest(Operations.getCurrencies, "", queryParams, options);
    }

    /**
     * @param queryParams encoded query parameters buffer
     * @param options options string
     * @return bytes32 query id
     */
    function getProducts(bytes calldata queryParams, string calldata options) external returns (bytes32) {
        return makeRequest(Operations.getProducts, "", queryParams, options);
    }

    /**
     * @param pathParams encoded path parameters buffer
     * @param queryParams encoded query parameters buffer
     * @param options options string
     * @return bytes32 query id
     */
    function getBook(bytes calldata pathParams, bytes calldata queryParams, string calldata options) external returns (bytes32) {
        return makeRequest(Operations.getBook, pathParams, queryParams, options);
    }

    /**
     * @param pathParams encoded path parameters buffer
     * @param queryParams encoded query parameters buffer
     * @param options options string
     * @return bytes32 query id
     */
    function getCandles(bytes calldata pathParams, bytes calldata queryParams, string calldata options) external returns (bytes32) {
        return makeRequest(Operations.getCandles, pathParams, queryParams, options);
    }

    /**
     * @param pathParams encoded path parameters buffer
     * @param queryParams encoded query parameters buffer
     * @param options options string
     * @return bytes32 query id
     */
    function getStats(bytes calldata pathParams, bytes calldata queryParams, string calldata options) external returns (bytes32) {
        return makeRequest(Operations.getStats, pathParams, queryParams, options);
    }

    /**
     * @param pathParams encoded path parameters buffer
     * @param queryParams encoded query parameters buffer
     * @param options options string
     * @return bytes32 query id
     */
    function getTicker(bytes calldata pathParams, bytes calldata queryParams, string calldata options) external returns (bytes32) {
        return makeRequest(Operations.getTicker, pathParams, queryParams, options);
    }

    /**
     * @param pathParams encoded path parameters buffer
     * @param queryParams encoded query parameters buffer
     * @param options options string
     * @return bytes32 query id
     */
    function getTrades(bytes calldata pathParams, bytes calldata queryParams, string calldata options) external returns (bytes32) {
        return makeRequest(Operations.getTrades, pathParams, queryParams, options);
    }

    /**
     * @param queryParams encoded query parameters buffer
     * @param options options string
     * @return bytes32 query id
     */
    function getTime(bytes calldata queryParams, string calldata options) external returns (bytes32) {
        return makeRequest(Operations.getTime, "", queryParams, options);
    }

    /**
     * @param operationId operation id
     * @return bytes32 query id
     */
    function generateQueryId(Operations operationId) internal returns (bytes32) {
        // increment number requests
        numRequests[msg.sender]++;

        // create id from hash of contract address, requestor address, requestor address count, and operation id
        return keccak256(abi.encodePacked(this, msg.sender, numRequests[msg.sender], operationId));
    }

    /**
     * @param operationId operation id
     * @param pathParams encoded path parameters buffer
     * @param queryParams encoded query parameters buffer
     * @param options options string
     * @return bytes32 query id
     */
    function makeRequest(
        Operations operationId,
        bytes memory pathParams,
        bytes memory queryParams,
        string memory options
    ) internal returns (bytes32) {
        bytes32 queryId = generateQueryId(operationId);
        emit Log(msg.sender, queryId, operationId, pathParams, queryParams, options);
        return queryId;
    }
}
