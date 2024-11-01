
import express from "express"; // Import Request and Response
import {flows, TriggerTypes} from "../flows/flowDefinitions";
import { executeFlow } from "../flows/flowExecutor";
import {ResponsePurchase, ResponseSignUp} from "../types";

const router = express.Router();

router.post('/trigger',  (req, res) => { // Explicitly type req and res
    const { event, data } = req.body;

    const flow = flows.find(f => f.trigger === event);

    if (!flow) {
        return res.status(404).json({ message: "Flow not found for this event." });
    }

    console.log(` >>>>> Executing flow name : ${flow.name}`);
    console.log(` >>>>> Executing flow with : ${data.user_email}`);

    executeFlow(flow, data)
        .then(() => {
            let response = {
                flow: flow.trigger,
                action: flow.actions[0].type,
                actionRecipient: flow.actions[0].params.recipient,
                actionSubject: flow.actions[0].params.subject,
                actionContent: flow.actions[0].params.content,
            };

            if (flow.trigger === TriggerTypes.SIGNUP) {
                response = {
                   ...response,
                    actionDelay: flow.actions[0].params.duration ,
                } as ResponseSignUp
            }

            if (flow.trigger === TriggerTypes.PURCHASE) {
                response = {
                    ...response,
                    actionTwo: flow.actions[1].type,
                    actionTwoRecipient: flow.actions[1].params.recipient,
                    actionTwoSubject: flow.actions[1].params.subject,
                    actionTwoContent: flow.actions[1].params.content
                } as ResponsePurchase
            }

            res.status(200).json({
                ...response,
                message: "Flow executed successfully."
            });
    }).catch((error) => {
        return res.status(422).json({ message: JSON.stringify(error) });
    });


});

export default router;
