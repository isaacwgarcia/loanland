export const LENS_HUB_CONTRACT_ABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "followNFTImpl",
        type: "address",
      },
      {
        internalType: "address",
        name: "collectNFTImpl",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "CallerNotCollectNFT",
    type: "error",
  },
  {
    inputs: [],
    name: "CallerNotFollowNFT",
    type: "error",
  },
  {
    inputs: [],
    name: "CannotInitImplementation",
    type: "error",
  },
  {
    inputs: [],
    name: "EmergencyAdminCannotUnpause",
    type: "error",
  },
  {
    inputs: [],
    name: "InitParamsInvalid",
    type: "error",
  },
  {
    inputs: [],
    name: "Initialized",
    type: "error",
  },
  {
    inputs: [],
    name: "NotGovernance",
    type: "error",
  },
  {
    inputs: [],
    name: "NotGovernanceOrEmergencyAdmin",
    type: "error",
  },
  {
    inputs: [],
    name: "NotOwnerOrApproved",
    type: "error",
  },
  {
    inputs: [],
    name: "NotProfileOwner",
    type: "error",
  },
  {
    inputs: [],
    name: "NotProfileOwnerOrDispatcher",
    type: "error",
  },
  {
    inputs: [],
    name: "Paused",
    type: "error",
  },
  {
    inputs: [],
    name: "ProfileCreatorNotWhitelisted",
    type: "error",
  },
  {
    inputs: [],
    name: "ProfileImageURILengthInvalid",
    type: "error",
  },
  {
    inputs: [],
    name: "PublicationDoesNotExist",
    type: "error",
  },
  {
    inputs: [],
    name: "PublishingPaused",
    type: "error",
  },
  {
    inputs: [],
    name: "SignatureExpired",
    type: "error",
  },
  {
    inputs: [],
    name: "SignatureInvalid",
    type: "error",
  },
  {
    inputs: [],
    name: "ZeroSpender",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "uint8",
            name: "v",
            type: "uint8",
          },
          {
            internalType: "bytes32",
            name: "r",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "s",
            type: "bytes32",
          },
          {
            internalType: "uint256",
            name: "deadline",
            type: "uint256",
          },
        ],
        internalType: "struct DataTypes.EIP712Signature",
        name: "sig",
        type: "tuple",
      },
    ],
    name: "burnWithSig",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "profileId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "pubId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "collect",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "collector",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "profileId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "pubId",
            type: "uint256",
          },
          {
            internalType: "bytes",
            name: "data",
            type: "bytes",
          },
          {
            components: [
              {
                internalType: "uint8",
                name: "v",
                type: "uint8",
              },
              {
                internalType: "bytes32",
                name: "r",
                type: "bytes32",
              },
              {
                internalType: "bytes32",
                name: "s",
                type: "bytes32",
              },
              {
                internalType: "uint256",
                name: "deadline",
                type: "uint256",
              },
            ],
            internalType: "struct DataTypes.EIP712Signature",
            name: "sig",
            type: "tuple",
          },
        ],
        internalType: "struct DataTypes.CollectWithSigData",
        name: "vars",
        type: "tuple",
      },
    ],
    name: "collectWithSig",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "profileId",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "contentURI",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "profileIdPointed",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "pubIdPointed",
            type: "uint256",
          },
          {
            internalType: "bytes",
            name: "referenceModuleData",
            type: "bytes",
          },
          {
            internalType: "address",
            name: "collectModule",
            type: "address",
          },
          {
            internalType: "bytes",
            name: "collectModuleInitData",
            type: "bytes",
          },
          {
            internalType: "address",
            name: "referenceModule",
            type: "address",
          },
          {
            internalType: "bytes",
            name: "referenceModuleInitData",
            type: "bytes",
          },
        ],
        internalType: "struct DataTypes.CommentData",
        name: "vars",
        type: "tuple",
      },
    ],
    name: "comment",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "profileId",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "contentURI",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "profileIdPointed",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "pubIdPointed",
            type: "uint256",
          },
          {
            internalType: "bytes",
            name: "referenceModuleData",
            type: "bytes",
          },
          {
            internalType: "address",
            name: "collectModule",
            type: "address",
          },
          {
            internalType: "bytes",
            name: "collectModuleInitData",
            type: "bytes",
          },
          {
            internalType: "address",
            name: "referenceModule",
            type: "address",
          },
          {
            internalType: "bytes",
            name: "referenceModuleInitData",
            type: "bytes",
          },
          {
            components: [
              {
                internalType: "uint8",
                name: "v",
                type: "uint8",
              },
              {
                internalType: "bytes32",
                name: "r",
                type: "bytes32",
              },
              {
                internalType: "bytes32",
                name: "s",
                type: "bytes32",
              },
              {
                internalType: "uint256",
                name: "deadline",
                type: "uint256",
              },
            ],
            internalType: "struct DataTypes.EIP712Signature",
            name: "sig",
            type: "tuple",
          },
        ],
        internalType: "struct DataTypes.CommentWithSigData",
        name: "vars",
        type: "tuple",
      },
    ],
    name: "commentWithSig",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            internalType: "string",
            name: "handle",
            type: "string",
          },
          {
            internalType: "string",
            name: "imageURI",
            type: "string",
          },
          {
            internalType: "address",
            name: "followModule",
            type: "address",
          },
          {
            internalType: "bytes",
            name: "followModuleInitData",
            type: "bytes",
          },
          {
            internalType: "string",
            name: "followNFTURI",
            type: "string",
          },
        ],
        internalType: "struct DataTypes.CreateProfileData",
        name: "vars",
        type: "tuple",
      },
    ],
    name: "createProfile",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "wallet",
        type: "address",
      },
    ],
    name: "defaultProfile",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "profileId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "pubId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "collectNFTId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "emitCollectNFTTransferEvent",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "profileId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "followNFTId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "emitFollowNFTTransferEvent",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "exists",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256[]",
        name: "profileIds",
        type: "uint256[]",
      },
      {
        internalType: "bytes[]",
        name: "datas",
        type: "bytes[]",
      },
    ],
    name: "follow",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "follower",
            type: "address",
          },
          {
            internalType: "uint256[]",
            name: "profileIds",
            type: "uint256[]",
          },
          {
            internalType: "bytes[]",
            name: "datas",
            type: "bytes[]",
          },
          {
            components: [
              {
                internalType: "uint8",
                name: "v",
                type: "uint8",
              },
              {
                internalType: "bytes32",
                name: "r",
                type: "bytes32",
              },
              {
                internalType: "bytes32",
                name: "s",
                type: "bytes32",
              },
              {
                internalType: "uint256",
                name: "deadline",
                type: "uint256",
              },
            ],
            internalType: "struct DataTypes.EIP712Signature",
            name: "sig",
            type: "tuple",
          },
        ],
        internalType: "struct DataTypes.FollowWithSigData",
        name: "vars",
        type: "tuple",
      },
    ],
    name: "followWithSig",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getApproved",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "profileId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "pubId",
        type: "uint256",
      },
    ],
    name: "getCollectModule",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "profileId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "pubId",
        type: "uint256",
      },
    ],
    name: "getCollectNFT",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getCollectNFTImpl",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "profileId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "pubId",
        type: "uint256",
      },
    ],
    name: "getContentURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "profileId",
        type: "uint256",
      },
    ],
    name: "getDispatcher",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getDomainSeparator",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "profileId",
        type: "uint256",
      },
    ],
    name: "getFollowModule",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "profileId",
        type: "uint256",
      },
    ],
    name: "getFollowNFT",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getFollowNFTImpl",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "profileId",
        type: "uint256",
      },
    ],
    name: "getFollowNFTURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getGovernance",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "profileId",
        type: "uint256",
      },
    ],
    name: "getHandle",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "profileId",
        type: "uint256",
      },
    ],
    name: "getProfile",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "pubCount",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "followModule",
            type: "address",
          },
          {
            internalType: "address",
            name: "followNFT",
            type: "address",
          },
          {
            internalType: "string",
            name: "handle",
            type: "string",
          },
          {
            internalType: "string",
            name: "imageURI",
            type: "string",
          },
          {
            internalType: "string",
            name: "followNFTURI",
            type: "string",
          },
        ],
        internalType: "struct DataTypes.ProfileStruct",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "handle",
        type: "string",
      },
    ],
    name: "getProfileIdByHandle",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "profileId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "pubId",
        type: "uint256",
      },
    ],
    name: "getPub",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "profileIdPointed",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "pubIdPointed",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "contentURI",
            type: "string",
          },
          {
            internalType: "address",
            name: "referenceModule",
            type: "address",
          },
          {
            internalType: "address",
            name: "collectModule",
            type: "address",
          },
          {
            internalType: "address",
            name: "collectNFT",
            type: "address",
          },
        ],
        internalType: "struct DataTypes.PublicationStruct",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "profileId",
        type: "uint256",
      },
    ],
    name: "getPubCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "profileId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "pubId",
        type: "uint256",
      },
    ],
    name: "getPubPointer",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "profileId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "pubId",
        type: "uint256",
      },
    ],
    name: "getPubType",
    outputs: [
      {
        internalType: "enum DataTypes.PubType",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "profileId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "pubId",
        type: "uint256",
      },
    ],
    name: "getReferenceModule",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getState",
    outputs: [
      {
        internalType: "enum DataTypes.ProtocolState",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "symbol",
        type: "string",
      },
      {
        internalType: "address",
        name: "newGovernance",
        type: "address",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "collectModule",
        type: "address",
      },
    ],
    name: "isCollectModuleWhitelisted",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "followModule",
        type: "address",
      },
    ],
    name: "isFollowModuleWhitelisted",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "profileCreator",
        type: "address",
      },
    ],
    name: "isProfileCreatorWhitelisted",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "referenceModule",
        type: "address",
      },
    ],
    name: "isReferenceModuleWhitelisted",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "mintTimestampOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "profileId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "profileIdPointed",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "pubIdPointed",
            type: "uint256",
          },
          {
            internalType: "bytes",
            name: "referenceModuleData",
            type: "bytes",
          },
          {
            internalType: "address",
            name: "referenceModule",
            type: "address",
          },
          {
            internalType: "bytes",
            name: "referenceModuleInitData",
            type: "bytes",
          },
        ],
        internalType: "struct DataTypes.MirrorData",
        name: "vars",
        type: "tuple",
      },
    ],
    name: "mirror",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "profileId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "profileIdPointed",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "pubIdPointed",
            type: "uint256",
          },
          {
            internalType: "bytes",
            name: "referenceModuleData",
            type: "bytes",
          },
          {
            internalType: "address",
            name: "referenceModule",
            type: "address",
          },
          {
            internalType: "bytes",
            name: "referenceModuleInitData",
            type: "bytes",
          },
          {
            components: [
              {
                internalType: "uint8",
                name: "v",
                type: "uint8",
              },
              {
                internalType: "bytes32",
                name: "r",
                type: "bytes32",
              },
              {
                internalType: "bytes32",
                name: "s",
                type: "bytes32",
              },
              {
                internalType: "uint256",
                name: "deadline",
                type: "uint256",
              },
            ],
            internalType: "struct DataTypes.EIP712Signature",
            name: "sig",
            type: "tuple",
          },
        ],
        internalType: "struct DataTypes.MirrorWithSigData",
        name: "vars",
        type: "tuple",
      },
    ],
    name: "mirrorWithSig",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ownerOf",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "uint8",
            name: "v",
            type: "uint8",
          },
          {
            internalType: "bytes32",
            name: "r",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "s",
            type: "bytes32",
          },
          {
            internalType: "uint256",
            name: "deadline",
            type: "uint256",
          },
        ],
        internalType: "struct DataTypes.EIP712Signature",
        name: "sig",
        type: "tuple",
      },
    ],
    name: "permit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
      {
        components: [
          {
            internalType: "uint8",
            name: "v",
            type: "uint8",
          },
          {
            internalType: "bytes32",
            name: "r",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "s",
            type: "bytes32",
          },
          {
            internalType: "uint256",
            name: "deadline",
            type: "uint256",
          },
        ],
        internalType: "struct DataTypes.EIP712Signature",
        name: "sig",
        type: "tuple",
      },
    ],
    name: "permitForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "profileId",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "contentURI",
            type: "string",
          },
          {
            internalType: "address",
            name: "collectModule",
            type: "address",
          },
          {
            internalType: "bytes",
            name: "collectModuleInitData",
            type: "bytes",
          },
          {
            internalType: "address",
            name: "referenceModule",
            type: "address",
          },
          {
            internalType: "bytes",
            name: "referenceModuleInitData",
            type: "bytes",
          },
        ],
        internalType: "struct DataTypes.PostData",
        name: "vars",
        type: "tuple",
      },
    ],
    name: "post",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "profileId",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "contentURI",
            type: "string",
          },
          {
            internalType: "address",
            name: "collectModule",
            type: "address",
          },
          {
            internalType: "bytes",
            name: "collectModuleInitData",
            type: "bytes",
          },
          {
            internalType: "address",
            name: "referenceModule",
            type: "address",
          },
          {
            internalType: "bytes",
            name: "referenceModuleInitData",
            type: "bytes",
          },
          {
            components: [
              {
                internalType: "uint8",
                name: "v",
                type: "uint8",
              },
              {
                internalType: "bytes32",
                name: "r",
                type: "bytes32",
              },
              {
                internalType: "bytes32",
                name: "s",
                type: "bytes32",
              },
              {
                internalType: "uint256",
                name: "deadline",
                type: "uint256",
              },
            ],
            internalType: "struct DataTypes.EIP712Signature",
            name: "sig",
            type: "tuple",
          },
        ],
        internalType: "struct DataTypes.PostWithSigData",
        name: "vars",
        type: "tuple",
      },
    ],
    name: "postWithSig",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "profileId",
        type: "uint256",
      },
    ],
    name: "setDefaultProfile",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "wallet",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "profileId",
            type: "uint256",
          },
          {
            components: [
              {
                internalType: "uint8",
                name: "v",
                type: "uint8",
              },
              {
                internalType: "bytes32",
                name: "r",
                type: "bytes32",
              },
              {
                internalType: "bytes32",
                name: "s",
                type: "bytes32",
              },
              {
                internalType: "uint256",
                name: "deadline",
                type: "uint256",
              },
            ],
            internalType: "struct DataTypes.EIP712Signature",
            name: "sig",
            type: "tuple",
          },
        ],
        internalType: "struct DataTypes.SetDefaultProfileWithSigData",
        name: "vars",
        type: "tuple",
      },
    ],
    name: "setDefaultProfileWithSig",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "profileId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "dispatcher",
        type: "address",
      },
    ],
    name: "setDispatcher",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "profileId",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "dispatcher",
            type: "address",
          },
          {
            components: [
              {
                internalType: "uint8",
                name: "v",
                type: "uint8",
              },
              {
                internalType: "bytes32",
                name: "r",
                type: "bytes32",
              },
              {
                internalType: "bytes32",
                name: "s",
                type: "bytes32",
              },
              {
                internalType: "uint256",
                name: "deadline",
                type: "uint256",
              },
            ],
            internalType: "struct DataTypes.EIP712Signature",
            name: "sig",
            type: "tuple",
          },
        ],
        internalType: "struct DataTypes.SetDispatcherWithSigData",
        name: "vars",
        type: "tuple",
      },
    ],
    name: "setDispatcherWithSig",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newEmergencyAdmin",
        type: "address",
      },
    ],
    name: "setEmergencyAdmin",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "profileId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "followModule",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "followModuleInitData",
        type: "bytes",
      },
    ],
    name: "setFollowModule",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "profileId",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "followModule",
            type: "address",
          },
          {
            internalType: "bytes",
            name: "followModuleInitData",
            type: "bytes",
          },
          {
            components: [
              {
                internalType: "uint8",
                name: "v",
                type: "uint8",
              },
              {
                internalType: "bytes32",
                name: "r",
                type: "bytes32",
              },
              {
                internalType: "bytes32",
                name: "s",
                type: "bytes32",
              },
              {
                internalType: "uint256",
                name: "deadline",
                type: "uint256",
              },
            ],
            internalType: "struct DataTypes.EIP712Signature",
            name: "sig",
            type: "tuple",
          },
        ],
        internalType: "struct DataTypes.SetFollowModuleWithSigData",
        name: "vars",
        type: "tuple",
      },
    ],
    name: "setFollowModuleWithSig",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "profileId",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "followNFTURI",
        type: "string",
      },
    ],
    name: "setFollowNFTURI",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "profileId",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "followNFTURI",
            type: "string",
          },
          {
            components: [
              {
                internalType: "uint8",
                name: "v",
                type: "uint8",
              },
              {
                internalType: "bytes32",
                name: "r",
                type: "bytes32",
              },
              {
                internalType: "bytes32",
                name: "s",
                type: "bytes32",
              },
              {
                internalType: "uint256",
                name: "deadline",
                type: "uint256",
              },
            ],
            internalType: "struct DataTypes.EIP712Signature",
            name: "sig",
            type: "tuple",
          },
        ],
        internalType: "struct DataTypes.SetFollowNFTURIWithSigData",
        name: "vars",
        type: "tuple",
      },
    ],
    name: "setFollowNFTURIWithSig",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newGovernance",
        type: "address",
      },
    ],
    name: "setGovernance",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "profileId",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "imageURI",
        type: "string",
      },
    ],
    name: "setProfileImageURI",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "profileId",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "imageURI",
            type: "string",
          },
          {
            components: [
              {
                internalType: "uint8",
                name: "v",
                type: "uint8",
              },
              {
                internalType: "bytes32",
                name: "r",
                type: "bytes32",
              },
              {
                internalType: "bytes32",
                name: "s",
                type: "bytes32",
              },
              {
                internalType: "uint256",
                name: "deadline",
                type: "uint256",
              },
            ],
            internalType: "struct DataTypes.EIP712Signature",
            name: "sig",
            type: "tuple",
          },
        ],
        internalType: "struct DataTypes.SetProfileImageURIWithSigData",
        name: "vars",
        type: "tuple",
      },
    ],
    name: "setProfileImageURIWithSig",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "enum DataTypes.ProtocolState",
        name: "newState",
        type: "uint8",
      },
    ],
    name: "setState",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "sigNonces",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "tokenByIndex",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenDataOf",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            internalType: "uint96",
            name: "mintTimestamp",
            type: "uint96",
          },
        ],
        internalType: "struct IERC721Time.TokenData",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "tokenOfOwnerByIndex",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "collectModule",
        type: "address",
      },
      {
        internalType: "bool",
        name: "whitelist",
        type: "bool",
      },
    ],
    name: "whitelistCollectModule",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "followModule",
        type: "address",
      },
      {
        internalType: "bool",
        name: "whitelist",
        type: "bool",
      },
    ],
    name: "whitelistFollowModule",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "profileCreator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "whitelist",
        type: "bool",
      },
    ],
    name: "whitelistProfileCreator",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "referenceModule",
        type: "address",
      },
      {
        internalType: "bool",
        name: "whitelist",
        type: "bool",
      },
    ],
    name: "whitelistReferenceModule",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export const LOAN_FACTORY_ABI = [
  {
    inputs: [
      {
        internalType: "int256",
        name: "_borrowAmount",
        type: "int256",
      },
      {
        internalType: "int8",
        name: "_interestRate",
        type: "int8",
      },
      {
        internalType: "int8",
        name: "_paybackMonths",
        type: "int8",
      },
      {
        internalType: "address",
        name: "_employer",
        type: "address",
      },
      {
        internalType: "address",
        name: "_lender",
        type: "address",
      },
      {
        internalType: "address",
        name: "_borrower",
        type: "address",
      },
      {
        internalType: "contract ISuperToken",
        name: "_borrowToken",
        type: "address",
      },
      {
        internalType: "contract ISuperfluid",
        name: "_host",
        type: "address",
      },
      {
        internalType: "address",
        name: "_scoring",
        type: "address",
      },
    ],
    name: "createNewLoan",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "employmentLoanOwners",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
    ],
    name: "getLoanAddressByID",
    outputs: [
      {
        internalType: "contract EmploymentLoan",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
    ],
    name: "getLoanByOwner",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "idToLoan",
    outputs: [
      {
        internalType: "contract EmploymentLoan",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "admin",
        type: "address",
      },
    ],
    name: "initScore",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "loanId",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

export const LENS_PERIPHERY_ABI = [
  {
    inputs: [
      {
        internalType: "contract ILensHub",
        name: "hub",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "ArrayMismatch",
    type: "error",
  },
  {
    inputs: [],
    name: "FollowInvalid",
    type: "error",
  },
  {
    inputs: [],
    name: "NotProfileOwnerOrDispatcher",
    type: "error",
  },
  {
    inputs: [],
    name: "SignatureExpired",
    type: "error",
  },
  {
    inputs: [],
    name: "SignatureInvalid",
    type: "error",
  },
  {
    inputs: [],
    name: "TokenDoesNotExist",
    type: "error",
  },
  {
    inputs: [],
    name: "HUB",
    outputs: [
      {
        internalType: "contract ILensHub",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "NAME",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "profileId",
        type: "uint256",
      },
    ],
    name: "getProfileMetadataURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "profileId",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "metadata",
        type: "string",
      },
    ],
    name: "setProfileMetadataURI",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "profileId",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "metadata",
            type: "string",
          },
          {
            components: [
              {
                internalType: "uint8",
                name: "v",
                type: "uint8",
              },
              {
                internalType: "bytes32",
                name: "r",
                type: "bytes32",
              },
              {
                internalType: "bytes32",
                name: "s",
                type: "bytes32",
              },
              {
                internalType: "uint256",
                name: "deadline",
                type: "uint256",
              },
            ],
            internalType: "struct DataTypes.EIP712Signature",
            name: "sig",
            type: "tuple",
          },
        ],
        internalType: "struct DataTypes.SetProfileMetadataWithSigData",
        name: "vars",
        type: "tuple",
      },
    ],
    name: "setProfileMetadataURIWithSig",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "sigNonces",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256[]",
        name: "profileIds",
        type: "uint256[]",
      },
      {
        internalType: "bool[]",
        name: "enables",
        type: "bool[]",
      },
    ],
    name: "toggleFollow",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "follower",
            type: "address",
          },
          {
            internalType: "uint256[]",
            name: "profileIds",
            type: "uint256[]",
          },
          {
            internalType: "bool[]",
            name: "enables",
            type: "bool[]",
          },
          {
            components: [
              {
                internalType: "uint8",
                name: "v",
                type: "uint8",
              },
              {
                internalType: "bytes32",
                name: "r",
                type: "bytes32",
              },
              {
                internalType: "bytes32",
                name: "s",
                type: "bytes32",
              },
              {
                internalType: "uint256",
                name: "deadline",
                type: "uint256",
              },
            ],
            internalType: "struct DataTypes.EIP712Signature",
            name: "sig",
            type: "tuple",
          },
        ],
        internalType: "struct DataTypes.ToggleFollowWithSigData",
        name: "vars",
        type: "tuple",
      },
    ],
    name: "toggleFollowWithSig",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export const LOAN_ABI = [
  {
    inputs: [
      {
        internalType: "int256",
        name: "_borrowAmount",
        type: "int256",
      },
      {
        internalType: "int8",
        name: "_interestRate",
        type: "int8",
      },
      {
        internalType: "int256",
        name: "_paybackMonths",
        type: "int256",
      },
      {
        internalType: "address",
        name: "_employer",
        type: "address",
      },
      {
        internalType: "address",
        name: "_lender",
        type: "address",
      },
      {
        internalType: "address",
        name: "_borrower",
        type: "address",
      },
      {
        internalType: "contract ISuperToken",
        name: "_borrowToken",
        type: "address",
      },
      {
        internalType: "contract ISuperfluid",
        name: "_host",
        type: "address",
      },
      {
        internalType: "address",
        name: "_scoringAddress",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "CFA_ID",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISuperToken",
        name: "_superToken",
        type: "address",
      },
      {
        internalType: "address",
        name: "_agreementClass",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "ctx",
        type: "bytes",
      },
    ],
    name: "afterAgreementCreated",
    outputs: [
      {
        internalType: "bytes",
        name: "newCtx",
        type: "bytes",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISuperToken",
        name: "_superToken",
        type: "address",
      },
      {
        internalType: "address",
        name: "_agreementClass",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "ctx",
        type: "bytes",
      },
    ],
    name: "afterAgreementTerminated",
    outputs: [
      {
        internalType: "bytes",
        name: "newCtx",
        type: "bytes",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISuperToken",
        name: "_superToken",
        type: "address",
      },
      {
        internalType: "address",
        name: "_agreementClass",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "ctx",
        type: "bytes",
      },
    ],
    name: "afterAgreementUpdated",
    outputs: [
      {
        internalType: "bytes",
        name: "newCtx",
        type: "bytes",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISuperToken",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "beforeAgreementCreated",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISuperToken",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "beforeAgreementTerminated",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISuperToken",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "beforeAgreementUpdated",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "borrowAmount",
    outputs: [
      {
        internalType: "int256",
        name: "",
        type: "int256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "borrowToken",
    outputs: [
      {
        internalType: "contract ISuperToken",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "borrower",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "cfaV1",
    outputs: [
      {
        internalType: "contract ISuperfluid",
        name: "host",
        type: "address",
      },
      {
        internalType: "contract IConstantFlowAgreementV1",
        name: "cfa",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "closeCompletedLoan",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amountForPayoff",
        type: "uint256",
      },
    ],
    name: "closeOpenLoan",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "employer",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getPaymentFlowRate",
    outputs: [
      {
        internalType: "int96",
        name: "paymentFlowRate",
        type: "int96",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getTotalAmountRemaining",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "host",
    outputs: [
      {
        internalType: "contract ISuperfluid",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "interestRate",
    outputs: [
      {
        internalType: "int8",
        name: "",
        type: "int8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "lend",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "lender",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "loanOpen",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "loanStartTime",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "paybackMonths",
    outputs: [
      {
        internalType: "int256",
        name: "",
        type: "int256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

export const SCORING_ABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "borrower",
        type: "address",
      },
    ],
    name: "closeUnpaid",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getAdmin",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_address",
        type: "address",
      },
    ],
    name: "getOpenLoans",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_address",
        type: "address",
      },
    ],
    name: "getPaidLoans",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_address",
        type: "address",
      },
    ],
    name: "getScore",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "totalLoans",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "totalPaid",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "closedUnpaid",
            type: "uint256",
          },
        ],
        internalType: "struct Scoring.Score",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_address",
        type: "address",
      },
    ],
    name: "getUnpaid",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "borrower",
        type: "address",
      },
    ],
    name: "openLoan",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "borrower",
        type: "address",
      },
    ],
    name: "payLoan",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export const WORLD_ID_ABI = [
  {
    inputs: [
      {
        internalType: "contract IWorldID",
        name: "_worldId",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "InvalidNullifier",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "message",
        type: "string",
      },
    ],
    name: "Log",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "signal",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "root",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "nullifierHash",
        type: "uint256",
      },
      {
        internalType: "uint256[8]",
        name: "proof",
        type: "uint256[8]",
      },
    ],
    name: "verifyAndExecute",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "actionId",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
