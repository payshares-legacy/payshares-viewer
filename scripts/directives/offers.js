paysharesExplorer.directive('offers', function() {
  return {
    restrict: 'E',
    scope: true,
    templateUrl: './templates/offers.html',
    controller: function($scope) {
      $scope.sellValue = function(offer) {
        var value = offer.taker_gets.value || dustToPaysharess(offer.taker_gets);

        return toFinancial(value);
      };

      $scope.sellCurrency= function(offer) {
        return offer.taker_gets.currency || 'XPR';
      };

      $scope.buyCurrency = function(offer) {
        return offer.taker_pays.currency || 'XPR';
      };

      $scope.price = function(offer) {
        var sellAmount = offer.taker_gets.value || dustToPaysharess(offer.taker_gets);
        var buyAmount = offer.taker_pays.value || dustToPaysharess(offer.taker_pays);

        var sellCurrency = offer.taker_gets.currency || 'XPR';
        var buyCurrency = offer.taker_pays.currency || 'XPR';

        return toFinancial(buyAmount / sellAmount) + ' ' + (buyCurrency + ' / ' + sellCurrency);
      };
    }
  };
});