const contractMetadata = {
	"compiler": {
		"version": "0.8.7+commit.e28d00a7"
	},
	"language": "Solidity",
	"output": {
		"abi": [
			{
				"inputs": [],
				"stateMutability": "nonpayable",
				"type": "constructor"
			},
			{
				"anonymous": false,
				"inputs": [
					{
						"indexed": false,
						"internalType": "string",
						"name": "CallURL",
						"type": "string"
					}
				],
				"name": "ICEUpdated",
				"type": "event"
			},
			{
				"anonymous": false,
				"inputs": [
					{
						"indexed": false,
						"internalType": "address",
						"name": "participant",
						"type": "address"
					},
					{
						"indexed": false,
						"internalType": "string",
						"name": "callURL",
						"type": "string"
					}
				],
				"name": "callLogs",
				"type": "event"
			},
			{
				"inputs": [
					{
						"internalType": "bytes",
						"name": "callURL",
						"type": "bytes"
					},
					{
						"components": [
							{
								"internalType": "string",
								"name": "candidate",
								"type": "string"
							},
							{
								"internalType": "uint8",
								"name": "sdpMLineIndex",
								"type": "uint8"
							},
							{
								"internalType": "string",
								"name": "sdpMid",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "usernameFragment",
								"type": "string"
							}
						],
						"internalType": "struct Talkie.ICECandidate",
						"name": "iceDetails",
						"type": "tuple"
					}
				],
				"name": "addICECandidate",
				"outputs": [],
				"stateMutability": "nonpayable",
				"type": "function"
			},
			{
				"inputs": [],
				"name": "destroy",
				"outputs": [],
				"stateMutability": "nonpayable",
				"type": "function"
			},
			{
				"inputs": [
					{
						"internalType": "string",
						"name": "o_sdp",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "o_type",
						"type": "string"
					}
				],
				"name": "generateCall",
				"outputs": [],
				"stateMutability": "nonpayable",
				"type": "function"
			},
			{
				"inputs": [
					{
						"internalType": "bytes",
						"name": "callURL",
						"type": "bytes"
					}
				],
				"name": "getCallDetails",
				"outputs": [
					{
						"components": [
							{
								"internalType": "string",
								"name": "key",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "offer_sdp",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "offer_type",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "answer_sdp",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "answer_type",
								"type": "string"
							},
							{
								"internalType": "address",
								"name": "initiator_addr",
								"type": "address"
							},
							{
								"internalType": "address",
								"name": "joinee_addr",
								"type": "address"
							},
							{
								"components": [
									{
										"internalType": "string",
										"name": "candidate",
										"type": "string"
									},
									{
										"internalType": "uint8",
										"name": "sdpMLineIndex",
										"type": "uint8"
									},
									{
										"internalType": "string",
										"name": "sdpMid",
										"type": "string"
									},
									{
										"internalType": "string",
										"name": "usernameFragment",
										"type": "string"
									}
								],
								"internalType": "struct Talkie.ICECandidate[]",
								"name": "initiator",
								"type": "tuple[]"
							},
							{
								"components": [
									{
										"internalType": "string",
										"name": "candidate",
										"type": "string"
									},
									{
										"internalType": "uint8",
										"name": "sdpMLineIndex",
										"type": "uint8"
									},
									{
										"internalType": "string",
										"name": "sdpMid",
										"type": "string"
									},
									{
										"internalType": "string",
										"name": "usernameFragment",
										"type": "string"
									}
								],
								"internalType": "struct Talkie.ICECandidate[]",
								"name": "joinee",
								"type": "tuple[]"
							}
						],
						"internalType": "struct Talkie.Call",
						"name": "",
						"type": "tuple"
					}
				],
				"stateMutability": "view",
				"type": "function"
			},
			{
				"inputs": [
					{
						"internalType": "bytes",
						"name": "callURL",
						"type": "bytes"
					},
					{
						"internalType": "string",
						"name": "a_sdp",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "a_type",
						"type": "string"
					}
				],
				"name": "joinCall",
				"outputs": [],
				"stateMutability": "nonpayable",
				"type": "function"
			},
			{
				"inputs": [],
				"name": "owner",
				"outputs": [
					{
						"internalType": "address payable",
						"name": "",
						"type": "address"
					}
				],
				"stateMutability": "view",
				"type": "function"
			}
		],
		"devdoc": {
			"kind": "dev",
			"methods": {},
			"version": 1
		},
		"userdoc": {
			"kind": "user",
			"methods": {},
			"version": 1
		}
	},
	"settings": {
		"compilationTarget": {
			"Talkie.sol": "Talkie"
		},
		"evmVersion": "london",
		"libraries": {},
		"metadata": {
			"bytecodeHash": "ipfs"
		},
		"optimizer": {
			"enabled": false,
			"runs": 200
		},
		"remappings": []
	},
	"sources": {
		"Talkie.sol": {
			"keccak256": "0x1207c2ea37d1f3bb27dffe9cc803232d447ccdcd27dc75c68c3d5879e8e669d3",
			"license": "GPL-3.0",
			"urls": [
				"bzz-raw://3f604692e47502681dc59b769964e11eea4865748b2444cc26eece28be4be557",
				"dweb:/ipfs/QmeGb1UDQ9evv72bk8za2RJYjoovEtczNzocdG7eH26BgQ"
			]
		}
	},
	"version": 1
};

export default contractMetadata;