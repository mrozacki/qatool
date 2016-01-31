Template.registerHelper('formatDate', function(date) {
  return moment(date).format('llll');
});

Template.registerHelper('formatDateForDatePicker', function(date) {
  return moment(date).format('YYYY-MM-DDThh:mm');
});
