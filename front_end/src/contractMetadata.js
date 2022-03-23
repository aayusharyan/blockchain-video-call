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
						"internalType": "address",
						"name": "participant",
						"type": "address"
					},
					{
						"indexed": false,
						"internalType": "string",
						"name": "callId",
						"type": "string"
					}
				],
				"name": "callLogs",
				"type": "event"
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
						"name": "password",
						"type": "string"
					},
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
						"internalType": "string",
						"name": "callURL",
						"type": "string"
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
								"internalType": "struct Talkie.ICECandidates[]",
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
								"internalType": "struct Talkie.ICECandidates[]",
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
						"internalType": "string",
						"name": "callURL",
						"type": "string"
					}
				],
				"name": "isPasswordNeeded",
				"outputs": [
					{
						"internalType": "bool",
						"name": "",
						"type": "bool"
					}
				],
				"stateMutability": "view",
				"type": "function"
			},
			{
				"inputs": [
					{
						"internalType": "string",
						"name": "callURL",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "password",
						"type": "string"
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
						"internalType": "struct Talkie.ICECandidates[]",
						"name": "iceDetails",
						"type": "tuple[]"
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
						"name": "password",
						"type": "string"
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
						"internalType": "struct Talkie.ICECandidates[]",
						"name": "iceDetails",
						"type": "tuple[]"
					}
				],
				"name": "updateICECandidates",
				"outputs": [],
				"stateMutability": "nonpayable",
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
			"keccak256": "0x233ba857d7fcc5162ba2a69426b40286edf30ecc21d5b5d3968438ad760b942e",
			"license": "GPL-3.0",
			"urls": [
				"bzz-raw://f5c9d56fe57903b13e40f80afc52a1ca97d92ca57ceec1e2eafc2eb67801ce1e",
				"dweb:/ipfs/QmNv45rprbDcrLcsDDizqwDu4EH4WessffdJUw6TDQq5gc"
			]
		}
	},
	"version": 1
};

export default contractMetadata;