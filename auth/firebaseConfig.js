var admin = require("firebase-admin");

var serviceAccount = require("./messangergpt-firebase-adminsdk-b3qv7-42edd05227.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// // ... or use the equivalent shorthand notation
// defaultAuth = getAuth();
// defaultDatabase = getDatabase();
