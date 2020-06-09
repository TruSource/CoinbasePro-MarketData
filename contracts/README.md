## Example.sol

`Example.sol` implements `OracleAPI.sol` and demonstrates the usage of the MarketData api.

Your implementation must meet the following:

1. Inherit `OracleAPI.sol`

```javascript
contract yourContract is OracleAPI { ... }
```

2. The constructor should accept a resolver address argument which is passed to the base contract using a **OracleAPI** modifier.

`constructor(address resolverAddress, ... ) OracleAPI (resolverAddress) public { ... }`

3. Implement `trusource_callback`

### Callback

Trusource will make callback calls to your contract.

```javascript
function trusource_callback(
        bytes32 queryId,
        Oracle.Oracle.Operations operationId,
        uint256 statusCode,
        string calldata result
    ) external checkAddress checkQueryId(queryId)
```

You can write conditional logic in `trusource_callback` based on the operationId and the status code.

```javascript
if (operationId == Oracle.Oracle.Operations.getCurrencies) {
	if (statusCode == 200) {
		emit LogResult(queryId, operationId, statusCode, result);
		return;
	}
	return;
}
```

### Operation Ids

operationsIds are used to identify the operation, it is useful in the `trusource_callback` if multiple operations are used in your contract to differentiate between them.

| operationId | Operation     |
| ----------- | ------------- |
| 0  | getCurrencies |
| 1  | getProducts |
| 2  | getBook |
| 3  | getCandles |
| 4  | getStats |
| 5  | getTicker |
| 6  | getTrades |
| 7  | getTime |
