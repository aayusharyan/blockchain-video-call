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
						"name": "sdp",
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
								"name": "sdp",
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
			"Contract.sol": "Talkie"
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
		"Contract.sol": {
			"keccak256": "0x9da7171ae1d47e00f35cbefa40f6b8abc3ad44d52979870016567085cbc7dc0a",
			"license": "GPL-3.0",
			"urls": [
				"bzz-raw://9a5342f4896dddc6abbf669a4f000f5a512cd72c7475030b2a097300fa230fb2",
				"dweb:/ipfs/QmfAho7kgMZciZdk9h74HzK1RMqvzP7HYxES2ZqduWxVRJ"
			]
		}
	},
	"version": 1
};

export default contractMetadata;