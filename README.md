# Doubler Notifier

Google Action to experiment with how daily notifications work. The Action asks for a number then doubles it. It also allows set up of a daily notification to allow a user to hear the result of a number they specified doubled (no I don't know why you'd want an Action that does that either...)

## Set up

- You need the [firebase cli](https://github.com/firebase/firebase-tools) installed
- You need to log in to firebase using `firebase login`
- You need to run `yarn install` from inside the `functions` directory

## Deploy

- `yarn deploy`

This is the firebase function back end of the Action. There is also the `NumberDoubler.zip` file that provides the Dialogflow aspect of the project. In Dialogflow it is possible to restore a project from a zip file. This function needs to be deployed to firebase and the URL of the function set in the `fulfillment` tab of Dialogflow. Also automatic discovery flow needs to be added in the Actions console for the intent that will fulfill the notification. In this case the intent is `doubler` 

[tutorial](https://developers.google.com/actions/assistant/updates/daily)
