import { Flow } from "../types";

const EMAIL_DELAY = process.env.NODE_ENV === 'test' ? 2000 : process.env.EMAIL_DELAY

export const ActionTypes = {
    SEND_EMAIL: "send_email",
    WAIT: "wait",
};

export const TriggerTypes = {
    SIGNUP: "user_signup",
    PURCHASE: "user_purchase_socks",
};
// Flow 1: Signup flow with a 2-hour delay / 2secs delay(for tests)
export const Flow1: Flow = {
    name: "User Signup Flow",
    trigger: TriggerTypes.SIGNUP,
    actions: [
        { type: ActionTypes.SEND_EMAIL, params: { duration: EMAIL_DELAY, recipient: "", subject: process.env.SIGNUP_SUBJECT, content: process.env.SIGNUP_CONTENT } }
    ]
};

// Flow 2: Purchase flow
export const Flow2: Flow = {
    name: "Purchase Socks Flow",
    trigger: TriggerTypes.PURCHASE,
    actions: [
        { type: ActionTypes.SEND_EMAIL, params: { recipient: "", subject: process.env.PURCHASE_SUBJECT_PAYMENT, content: process.env.PURCHASE_CONTENT_PAYMENT } },
        { type: ActionTypes.SEND_EMAIL, params: { recipient: "", subject: process.env.PURCHASE_SUBJECT_DISPATCH, content: process.env.PURCHASE_CONTENT_DISPATCH } }
    ]
};

export const flows = [Flow1, Flow2];
