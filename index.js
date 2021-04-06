const functions = require('firebase-functions');
const { dialogflow } = require('actions-on-google');

const app = dialogflow({ debug: false });
const PIZZA_INTENT_FOLLOWUP = 'PizzaIntent-followup'.toLowerCase();

app.intent('Default Welcome Intent', conv => {
  conv.ask(
    'Welcome to West Pizza, you can order pizza and drinks from us, what can I help you with?'
  );
});

app.intent('PizzaIntent', conv => {
  // log(conv);
  elicitPizza(conv, PIZZA_INTENT_FOLLOWUP);
});

app.intent('PizzaIntent - FollowupName', conv => {
  // log(conv);
  elicitPizza(conv, PIZZA_INTENT_FOLLOWUP);
});

app.intent('PizzaIntent - FollowupSize', conv => {
  // log(conv);
  elicitPizza(conv, PIZZA_INTENT_FOLLOWUP);
});

app.intent('DrinksIntent - FollowupName', conv => {
  // log(conv);
  const pizzaContextName = PIZZA_INTENT_FOLLOWUP;
  const { pizzaName, pizzaSize } =
    conv.contexts.get(pizzaContextName)?.parameters || {};
  const drinksName = conv.parameters?.drinksName?.toString() || '';
  conv.followup('event_drinks_intent', { drinksName, pizzaName, pizzaSize });
});

app.intent('DrinksIntent', conv => {
  // log(conv);
  const { drinksName, pizzaName, pizzaSize } = conv.parameters;

  if (pizzaName && pizzaSize && !drinksName) {
    return conv.ask(
      `Okay, you are ordering a ${pizzaSize} ${pizzaName} pizza. do you want to add some drinks? we have coffee and coke.`
    );
  }

  if (!drinksName) {
    return conv.ask(`What do you want to drink? we have coffee and coke.`);
  }

  if (pizzaName && pizzaSize && drinksName) {
    return conv.ask(
      `Okay, you are ordering a ${pizzaSize} ${pizzaName} pizza and a cup of ${drinksName}.`
    );
  }

  conv.ask(`Okay, you are ordering a cup of ${drinksName}.`);
});

app.intent('Default Fallback Intent', conv => {
  conv.ask(`I didn't understand. Can you tell me something else?`);
});

function elicitPizza(conv, contextName) {
  const { pizzaName, pizzaSize } = conv.contexts.get(contextName).parameters;

  if (!pizzaName) {
    return conv.ask('What pizza do you want to order? we have Moonpie and Cheese Pizza.');
  }

  if (!pizzaSize) {
    return conv.ask(
      `What size of the ${pizzaName} pizza do you want to order? we have 12 inches and 18 inches.`
    );
  }

  conv.followup('event_drinks_intent', { pizzaName, pizzaSize });
}

// function log(conv) {
//   console.log({
//     conv: JSON.stringify(conv, null, 2),
//     Contexts: JSON.stringify(conv.contexts, null, 2),
//     Parameters: JSON.stringify(conv.parameters, null, 2),
//     Intent: conv.intent,
//   });
// }

exports.fulfillment = functions.https.onRequest(app);
