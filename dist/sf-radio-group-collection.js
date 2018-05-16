angular.module("sfRadioGroupCollectionTemplates", []).run(["$templateCache", function($templateCache) {$templateCache.put("src/templates/radio-group-collection.html","<div class=\"form-group\"\n     ng-controller=\"RadioGroupCollectionController\"\n     ng-class=\"{\'has-error\': form.disableErrorState !== true && hasError(),\n                \'has-success\': form.disableSuccessState !== true && hasSuccess(),\n                \'has-feedback\': form.feedback !== false }\"\n     sf-field-model\n     schema-validate=\"form\" >\n  <!--<pre>{{form|json}}</pre>-->\n  <label ng-if=\"showTitle()\">{{showTitle()}}</label>\n  <div>\n    <div class=\"row\" ng-repeat=\"item in form.schema.items\">\n      <div class=\"col-xs-6\">\n        <span class=\"control-label\" ng-bind-html=\"item.name\"></span>\n      </div>\n      <div class=\"col-xs-6\">\n        <label class=\"radio-inline\" ng-repeat=\"(value, caption) in form.schema.values\">\n          <input type=\"radio\" ng-model=\"model[key][item.key]\" name=\"{{item.key}}\" id=\"inlineRadio{{$index}}\" value=\"{{value}}\"> {{caption}}\n        </label>\n      </div>\n    </div>\n  </div>\n  <span class=\"help-block\" sf-message=\"form.description\"></span>\n</div>\n");}]);
angular.module('sfRadioGroupCollection', [
  'schemaForm',
  'sfRadioGroupCollectionTemplates'
]).config(['schemaFormProvider', 'schemaFormDecoratorsProvider', 'sfBuilderProvider', 'sfPathProvider',
  function (schemaFormProvider, schemaFormDecoratorsProvider, sfBuilderProvider, sfPathProvider) {

    var radioGroupCollection = function (name, schema, options) {
      if (schema.type === 'object' && schema.format === 'radioGroupCollection') {
        var f = schemaFormProvider.stdFormObj(name, schema, options);
        f.key = options.path;
        f.type = 'radioGroupCollection';
        options.lookup[sfPathProvider.stringify(options.path)] = f;
        return f;
      }
    };

    schemaFormProvider.defaults.object.unshift(radioGroupCollection);

    schemaFormDecoratorsProvider.defineAddOn(
      'bootstrapDecorator',           // Name of the decorator you want to add to.
      'radioGroupCollection',                      // Form type that should render this add-on
      'src/templates/radio-group-collection.html',  // Template name in $templateCache
      sfBuilderProvider.stdBuilders   // List of builder functions to apply.
    );

  }])
  .controller('RadioGroupCollectionController', ['$scope', function ($scope) {
    $scope.$watch('ngModel.$modelValue', function () {
      if ($scope.ngModel.$validate) {
        // Make sure that allowInvalid is always true so that the model is preserved when validation fails

        $scope.ngModel.$validate();
        if ($scope.ngModel.$invalid) { // The field must be made dirty so the error message is displayed
          $scope.ngModel.$dirty = true;
          $scope.ngModel.$pristine = false;
        }
      }
      else {
        $scope.ngModel.$setViewValue(ngModel.$viewValue);
      }
    }, true);

    $scope.$watch('form', function () {
      $scope.key = $scope.form.key[0];
      $scope.form.disableErrorState = $scope.form.hasOwnProperty('readonly') && $scope.form.readonly;
    });
  }]);
