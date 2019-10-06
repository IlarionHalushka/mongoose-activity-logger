## @hilarion/mongoose-activity-logger

Plugin adds a new document to `Logs` collection on each `save`, `create`, `remove`, `deleteOne`, `deleteMany`, `updateMany`, `update`, `updateOne`, `findOneAndDelete`, `findOneAndRemove`, `findOneAndUpdate` actions performed on other models.

Note: actions that don't modify documents (e.g. `find`, `findOne`) are not logged.

### Getting started

1. Install plugin:

`npm i --save @hilarion/mongoose-activity-logger`

2. In your mongoose initialization file after importing mongoose add:

`mongoose.plugin(require('@hilarion/mongoose-activity-logger'));`

### Viewing logs

1. Import `Logs` model:

`const Logs = require('@hilarion/mongoose-activity-logger/models/Logger');`

2. Query `Logs`: 
- by action: `Logs.find({ action: 'save' })`
- by collectionName: `Logs.find({ collectionName: 'user' })`
- by environment: `Logs.find({ env: 'local' })`
- by createdAt timestamp: `Logs.find({ createdAt: { $gte: new Date("2019-10-01T00:00:00.000Z") } })`
