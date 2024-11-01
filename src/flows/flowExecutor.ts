
import {Flow, Action } from "../types";
import {ActionTypes} from "./flowDefinitions";
const sendEmail = async (): Promise<boolean> => {
    const randomNumber = Math.random();
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate sending email
    return randomNumber < 0.95;
};


// Execute action logic
const executeAction = async (action: Action) => {
    if (action.type === "send_email") {
        if (!!action.params.duration) {
            setTimeout(async () => {
                console.log(`Completed waiting for ${ Math.floor(action.params.duration / 60000 )} minutes...`);
                await sendEmail();
            }, +action.params.duration);
            console.log(` >>>>> Waiting for ${ Math.floor(action.params.duration / 60000 )} minutes to send the welcome email`);
        } else {
            const result = await sendEmail();
            if (result) {
                console.log(` >>>>> Email sent: ${JSON.stringify(action.params)}`);
            } else {
                console.error("Email failed to send.");
            }
        }
    }

};

// Main flow executor
export const executeFlow = async (flow: Flow, data: any) => {
    try {
        for (const action of flow.actions) {
            if (action.type === ActionTypes.SEND_EMAIL && action.params) {
                action.params = {
                    ...action.params,
                    recipient : data.user_email
                }
                await executeAction(action);
            }
        }
    } catch (err) {
        console.log(err)
    }
};
