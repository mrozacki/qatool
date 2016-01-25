//local collection with errors
Errors = new Mongo.Collection(null);

//throw error helpers
throwError = function(message) {
  Errors.insert({message: message});
};
