const LoggerModel = require('./models/Logs');

// TODO export all middlewares so that they can be accessed like action.SAVE
const modelMiddlewares = ['save', 'remove'];

// TODO add insertMany model middleware (it should be separate from query middlewares).
//  For reference: https://mongoosejs.com/docs/middleware.html

// TODO test if bulk operations are working fine
const queryMiddlewares = [
	'deleteOne',
	'deleteMany',
	'updateMany',
	'update',
	'updateOne',
	'findOneAndDelete',
	'findOneAndRemove',
	'findOneAndUpdate',
];

const formatUpdateQuery = (_update) =>
	Object.keys(_update).reduce(
		(accumulator, key) =>
			key.charAt(0) === '$' ? { ...accumulator, ..._update[key] } : { ...accumulator, [key]: _update[key] },
		{},
	);

// TODO also log process.env
const logAction = (actionLog) => new LoggerModel(actionLog).save();

module.exports = function(schema) {
	modelMiddlewares.forEach((action) => {
		schema.pre(action, function(next) {
			logAction( { data: this, action, collectionName: this.constructor.modelName });

			next();
		});
	});

	queryMiddlewares.forEach((action) => {
		schema.pre(action, function(next) {
			const {
				_update,
				mongooseCollection: { collectionName },
				_conditions: conditions,
				options,
			} = this;

			const data = _update && formatUpdateQuery(_update);

			logAction( { data, action, collectionName, conditions, options });

			next();
		});
	});
};
