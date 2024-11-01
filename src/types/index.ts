
export type ActionResponseBase = {
    message:string;
    action: string;
    actionRecipient: string;
    actionContent: string;
    actionSubject: string;
};

// Base type for the flow response
export type FlowResponse = {
    flow: string;
} & ActionResponseBase; // Combine with ActionResponseBase

// Specific type for SignUp responses
export type ResponseSignUp = FlowResponse & {
    actionDelay?: number; // Optional delay for the SignUp flow
};

// Specific type for Purchase responses
export type ResponsePurchase = FlowResponse & {
    actionTwo: string;
    actionTwoRecipient: string;
    actionTwoSubject: string;
    actionTwoContent: string;
};

export type Action = {
    type: string;
    params?: any;
};

export type Flow = {
    name: string;
    trigger: string;
    actions: Action[];
};


