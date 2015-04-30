function toFinancial(x) {
  if (!x) return x;

  x = +(+x).toFixed(6);

  var parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}

paysharesExplorer.filter('toFinancial', function() {
  return toFinancial;
});

function dustToPaysharess(x) {
  if (!x || !(+x)) return x;
  x = x.toString();

  while(x.length < 7) x = "0" + x;

  return +(x.slice(0, x.length - 6) + '.' + x.slice(x.length - 6));
}

paysharesExplorer.filter('dustToPaysharess', function() {
  return dustToPaysharess;
});