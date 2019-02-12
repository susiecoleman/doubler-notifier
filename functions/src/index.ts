import * as functions from 'firebase-functions';

import { RegisterUpdate, Suggestions, dialogflow } from 'actions-on-google';

interface UserData {
  hasNotifications?: boolean;
}

const app = dialogflow<{}, UserData>({
  debug: true,
});

app.intent('WelcomeIntent', conv => {
  conv.ask('I can double numbers, which number would you like doubling?');
});

app.intent<{ num: number }>('doubler', (conv, { num }) => {
  const response = `${num} doubled is ${num * 2}.`;
  // const subscribed = conv.user.storage.hasNotifications || false;
  const subscribed = false;
  if (!subscribed) {
    conv.ask(response);
    conv.ask('Would you like a daily update?');
    conv.ask(new Suggestions('Send daily', 'no'));
  } else {
    conv.close(response);
  }
});

app.intent<{ num: string }>('setup_update', (conv, { num }) => {
  conv.ask(
    new RegisterUpdate({
      intent: 'doubler',
      arguments: [{ name: 'number', textValue: num }],
      frequency: 'DAILY',
    })
  );
});

app.intent<{}, { status: string }>(
  'finish_update_setup',
  (conv, params, registered) => {
    if (registered && registered.status === 'OK') {
      conv.user.storage.hasNotifications = true;
      conv.close(`Ok, I'll start giving you daily updates.`);
    } else {
      conv.close(`Ok, I won't give you daily updates.`);
    }
  }
);

app.intent('no_daily_update', conv => {
  conv.close('No problem, come back any time for more number doubling fun!');
});

exports.notifyMe = functions.region('europe-west1').https.onRequest(app);
