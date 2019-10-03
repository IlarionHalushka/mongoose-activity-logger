const env = process.env.NODE_ENV;

const formatActionLog = ({ hook, ...rest }) => ({
	action: hook,
	env,
	...rest,
});

const formatUpdateQuery = (_update) =>
	Object.keys(_update).reduce(
		(accumulator, key) =>
			key.charAt(0) === '$' ? { ...accumulator, ..._update[key] } : { ...accumulator, [key]: _update[key] },
		{},
	);

const logAction = (schema, options) => {
	if (schema.methods.logAction) {
		const actionLog = formatActionLog(options);
		schema.methods.logAction(actionLog);
	}
};

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

exports.activityLoggerPlugin = function(schema) {
	modelMiddlewares.forEach((hook) => {
		schema.pre(hook, function(next) {
			logAction(schema, { data: this, hook, collectionName: this.constructor.modelName });

			next();
		});
	});

	queryMiddlewares.forEach((hook) => {
		schema.pre(hook, function(next) {
			const {
				_update,
				mongooseCollection: { collectionName },
				_conditions: conditions,
				options,
			} = this;

			const data = _update && formatUpdateQuery(_update);

			logAction(schema, { data, hook, collectionName, conditions, options });

			next();
		});
	});
};
