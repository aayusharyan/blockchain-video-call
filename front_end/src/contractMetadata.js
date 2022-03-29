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
				"inputs": [],
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
			"keccak256": "0xb37c94aa2198e628c23ad58f71eda03fe6aaac6c9f69b92b998f2dbd1d46d0ad",
			"license": "GPL-3.0",
			"urls": [
				"bzz-raw://eb01576fb3bb9d351522411a71cc7f3811180445c7533ed6c399b8c21966187c",
				"dweb:/ipfs/QmNXn858LjZ74iSKcuUd1ahTSTBg2LEAmfpnKH93VSVAmF"
			]
		}
	},
	"version": 1
};

export default contractMetadata;