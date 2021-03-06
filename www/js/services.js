angular.module('yourAppsName.services',[])

.factory('stockDataService', function($q, $http){

  var getDetailsData = function(ticker){
    var deferred = $q.defer(),
    url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quote%20where%20symbol%20IN%20(%22" + ticker + "%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=";

    $http.get(url)
      .success(function(json){
        var jsonData = json.query.results.quote;
        deferred.resolve(jsonData);
      })
      .error(function(){
        console.log("Details data error: " + error);
        deferred.reject();
      });

      return deferred.promise;

  };

  var getPriceData = function(ticker){

    var deferred = $q.defer(),
    url = "http://finance.yahoo.com/webservice/v1/symbols/" + ticker  + "/quote?format=json&view=detail";

    $http.get(url)
      .success(function(json){
        var jsonData = json.list.resources[0].resource.fields;
        deferred.resolve(jsonData);
      })
      .error(function(){
        console.log("Price data error: " + error);
        deferred.reject();
      });

      return deferred.promise;

  };

  return{
    getPriceData: getPriceData,
    getDetailsData: getDetailsData
  };

})

;
