import request from "supertest";
import app from "../src/app";
import {ActionTypes, TriggerTypes} from "../src/flows/flowDefinitions";

describe("Event Flow Trigger Tests", () => {

    beforeAll(() => {
        // uncomment below line if you want to ignore the server logs for a cleaner test output
        // console.log = function() {}
    })

    it("should trigger the signup flow and send a welcome email", async () => {
        const res = await request(app)
            .post("/api/trigger")
            .send({ event: TriggerTypes.SIGNUP, data: { user_email: "test@example.com" } });

        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toBe("Flow executed successfully.");
        expect(res.body.flow).toBe(TriggerTypes.SIGNUP);
        expect(res.body.action).toBe(ActionTypes.SEND_EMAIL);
        expect(res.body.actionDelay).toBe(2000);
        expect(res.body.actionRecipient).toBe("test@example.com");
        expect(res.body.actionSubject).toBe(process.env.SIGNUP_SUBJECT);
        expect(res.body.actionContent).toBe(process.env.SIGNUP_CONTENT);
    });

    it("should trigger the purchase flow and send a payment email and a dispatch email", async () => {
        const res = await request(app)
            .post("/api/trigger")
            .send({ event: TriggerTypes.PURCHASE, data: { user_email: "test@example.com" } });

        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toBe("Flow executed successfully.");
        expect(res.body.flow).toBe(TriggerTypes.PURCHASE);
        expect(res.body.action).toBe(ActionTypes.SEND_EMAIL);
        expect(res.body.actionRecipient).toBe("test@example.com");
        expect(res.body.actionSubject).toBe(process.env.PURCHASE_SUBJECT_PAYMENT);
        expect(res.body.actionContent).toBe(process.env.PURCHASE_CONTENT_PAYMENT);
        expect(res.body.actionTwo).toBe(ActionTypes.SEND_EMAIL);
        expect(res.body.actionTwoRecipient).toBe("test@example.com");
        expect(res.body.actionTwoSubject).toBe(process.env.PURCHASE_SUBJECT_DISPATCH);
        expect(res.body.actionTwoContent).toBe(process.env.PURCHASE_CONTENT_DISPATCH);
    });


    it("should return 404 for unknown events", async () => {
        const res = await request(app)
            .post("/api/trigger")
            .send({ event: "unknown_event", data: {} });

        expect(res.statusCode).toEqual(404);
        expect(res.body.message).toBe("Flow not found for this event.");
    });
});
