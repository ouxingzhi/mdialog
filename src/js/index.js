
var dialog = require('./dialog.js');

exports.dialog = window.dialog = window.mdialog = dialog;

dialog.alert = require('./alert.js');
dialog.loading = require('./loading.js');
dialog.toast = require('./toast.js');