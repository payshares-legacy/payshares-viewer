paysharesExplorer.factory('paysharesTxt', ['$http', '$q', '$rootScope', function ($http, $q, $scope) {
  var txts = {};

  function get(domain) {
    if (txts[domain]) {
      return txts[domain];
    } else {
      var txtPromise = $q.defer();

      txts[domain] = txtPromise;

      var urls = [
          'https://www.'+domain+'/payshares.txt',
          'https://'+domain+'/payshares.txt',
          'https://payshares.'+domain+'/payshares.txt'
      ];
      var next = function (xhr, status) {
        if (!urls.length) {
          txts[domain] = {};
          txtPromise.reject(new Error("No payshares.txt found"));
          return;
        }
        var url = urls.pop();
        $http({
          url: url,
          responseType: 'text'
        })
          .success(function (data) {
            var sections = parse(data);
            txts[domain] = sections;
            txtPromise.resolve(sections);
          })
          .error(function (xhr, status) {
            next(xhr, status);
          })
        ;
      };
      next();

      return txtPromise.promise;
    }
  }

  // TODO: Consider using JSON.
  function parse(txt) {
    txt = txt.replace('\r\n', '\n');
    txt = txt.replace('\r', '\n');
    txt = txt.split('\n');

    var currentSection = "", sections = {};
    for (var i = 0, l = txt.length; i < l; i++) {
      var line = txt[i];
      if (!line.length || line[0] === '#') {
        continue;
      } else if (line[0] === '[' && line[line.length-1] === ']') {
        currentSection = line.slice(1, line.length-1);
        sections[currentSection] = [];
      } else {
        line = line.replace(/^\s+|\s+$/g, '');
        if (sections[currentSection]) {
          sections[currentSection].push(line);
        }
      }
    }

    return sections;
  }

  return {
    get: get,
    parse: parse
  };
}]);