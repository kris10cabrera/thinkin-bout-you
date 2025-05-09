export const abi = [
  { inputs: [], stateMutability: "nonpayable", type: "constructor" },
  { inputs: [], name: "InvalidPagination", type: "error" },
  { inputs: [], name: "LimitReached", type: "error" },
  { inputs: [], name: "NotAdmin", type: "error" },
  { inputs: [], name: "NotAllowed", type: "error" },
  { inputs: [], name: "NotTwoInitials", type: "error" },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address"
      }
    ],
    name: "AddressAllowlisted",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes2",
        name: "initials",
        type: "bytes2"
      }
    ],
    name: "CrushAdded",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "crushId",
        type: "uint256"
      }
    ],
    name: "CrushDeleted",
    type: "event"
  },
  {
    inputs: [{ internalType: "bytes2", name: "_initials", type: "bytes2" }],
    name: "addCrush",
    outputs: [{ internalType: "uint256", name: "crushId", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "address", name: "user", type: "address" }],
    name: "addToAllowlist",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "admin",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "allowlist",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "crushCount",
    outputs: [{ internalType: "uint16", name: "", type: "uint16" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "crushes",
    outputs: [{ internalType: "bytes2", name: "initials", type: "bytes2" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "crushId", type: "uint256" }],
    name: "deleteCrush",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "crushId", type: "uint256" }],
    name: "getCrush",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "uint256", name: "page", type: "uint256" },
      { internalType: "uint256", name: "pageSize", type: "uint256" }
    ],
    name: "getCrushes",
    outputs: [{ internalType: "string[]", name: "", type: "string[]" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "address", name: "user", type: "address" }],
    name: "isAllowlisted",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function"
  }
] as const
