type InvalidPaginationError = {
  inputs: never[]
  name: "InvalidPagination"
  type: "error"
}

type LimitReachedError = {
  inputs: never[]
  name: "LimitReached"
  type: "error"
}

type NotAdminError = {
  inputs: never[]
  name: "NotAdmin"
  type: "error"
}

type NotTwoInitialsError = {
  inputs: never[]
  name: "NotTwoInitials"
  type: "error"
}

type CrushAddedEvent = {
  anonymous: false
  inputs: [
    {
      indexed: false
      internalType: "bytes2"
      name: "initials"
      type: "bytes2"
    }
  ]
  name: "CrushAdded"
  type: "event"
}

type CrushDeletedEvent = {
  anonymous: false
  inputs: [
    {
      indexed: false
      internalType: "uint256"
      name: "crushId"
      type: "uint256"
    }
  ]
  name: "CrushDeleted"
  type: "event"
}

type AddCrushFunction = {
  inputs: [
    {
      internalType: "bytes2"
      name: "_initials"
      type: "bytes2"
    }
  ]
  name: "addCrush"
  outputs: [
    {
      internalType: "uint256"
      name: "crushId"
      type: "uint256"
    }
  ]
  stateMutability: "nonpayable"
  type: "function"
}

type AdminFunction = {
  inputs: []
  name: "admin"
  outputs: [
    {
      internalType: "address"
      name: ""
      type: "address"
    }
  ]
  stateMutability: "view"
  type: "function"
}

type CrushCountFunction = {
  inputs: []
  name: "crushCount"
  outputs: [
    {
      internalType: "uint16"
      name: ""
      type: "uint16"
    }
  ]
  stateMutability: "view"
  type: "function"
}

type CrushesFunction = {
  inputs: [
    {
      internalType: "uint256"
      name: "crushId"
      type: "uint256"
    }
  ]
  name: "crushes"
  outputs: [
    {
      internalType: "bytes2"
      name: "initials"
      type: "bytes2"
    }
  ]
  stateMutability: "view"
  type: "function"
}

type DeleteCrushFunction = {
  inputs: [
    {
      internalType: "uint256"
      name: "crushId"
      type: "uint256"
    }
  ]
  name: "deleteCrush"
  outputs: []
  stateMutability: "nonpayable"
  type: "function"
}

type GetCrushFunction = {
  inputs: [
    {
      internalType: "uint256"
      name: "crushId"
      type: "uint256"
    }
  ]
  name: "getCrush"
  outputs: [
    {
      internalType: "string"
      name: ""
      type: "string"
    }
  ]
  stateMutability: "view"
  type: "function"
}

type GetCrushCountFunction = {
  inputs: []
  name: "getCrushCount"
  outputs: [
    {
      internalType: "uint256"
      name: ""
      type: "uint256"
    }
  ]
  stateMutability: "view"
  type: "function"
}

type GetCrushesFunction = {
  inputs: [
    {
      internalType: "uint256"
      name: "page"
      type: "uint256"
    },
    {
      internalType: "uint256"
      name: "pageSize"
      type: "uint256"
    }
  ]
  name: "getCrushes"
  outputs: [
    {
      internalType: "string[]"
      name: ""
      type: "string[]"
    }
  ]
  stateMutability: "view"
  type: "function"
}

type Constructor = {
  inputs: []
  stateMutability: "nonpayable"
  type: "constructor"
}

export type CrushAbi = [
  Constructor,
  InvalidPaginationError,
  LimitReachedError,
  NotAdminError,
  NotTwoInitialsError,
  CrushAddedEvent,
  CrushDeletedEvent,
  AddCrushFunction,
  AdminFunction,
  CrushCountFunction,
  CrushesFunction,
  DeleteCrushFunction,
  GetCrushFunction,
  GetCrushCountFunction,
  GetCrushesFunction
]

export const abi: CrushAbi = [
  { inputs: [], stateMutability: "nonpayable", type: "constructor" },
  { inputs: [], name: "InvalidPagination", type: "error" },
  { inputs: [], name: "LimitReached", type: "error" },
  { inputs: [], name: "NotAdmin", type: "error" },
  { inputs: [], name: "NotTwoInitials", type: "error" },
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
    inputs: [],
    name: "admin",
    outputs: [{ internalType: "address", name: "", type: "address" }],
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
    inputs: [{ internalType: "uint256", name: "crushId", type: "uint256" }],
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
    inputs: [],
    name: "getCrushCount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
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
  }
]
