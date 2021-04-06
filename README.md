# About

This is a simple voice app to demostry a way to use Dialogflow contexts in conversation.

## Setup

1. Register an account and setup `ngrok` from: https://ngrok.com/
2. Run `ngrok http 8080`, copy forwarding URL `https://******.ngrok.io` and replace `https://PLACEHOLDER.ngrok.io` in `agent/agent.json`
3. Compress folder `agent` as `agent.zip`
4. Create a new Dialogflow agent: https://dialogflow.cloud.google.com/
5. In Dialogflow console, Click ⚙️ icon, select `Export and Import`, `RESTORE FROM ZIP` and then follow the steps to restore agent by using `agent.zip`
6. Run `npm install` and `npx @google-cloud/functions-framework --target=fulfillment`
7. In Dialogflow console, click `Integrations` and then click the link in `...Continue with the integration` to open simulator

## Test

### Scenario 1, ask:
1. Pizza
2. Moonpie
3. 12 inches

### Scenario 2, ask:
1. Drinks
2. Coke

### Scenario 3, ask:
1. I want to order a 12 inches moonpie pizza
2. Coke