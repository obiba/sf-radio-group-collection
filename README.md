Schema Form Radio Group Collection Add-on
===================================
 
**sf-radio-group-collection** add-on 

Installation
------------

```
$ bower install sf-radio-group-collection --save
```

Alternatively:

```
$ bower install https://github.com/obiba/sf-radio-group-collection.git#<release-number> --save
```


Make sure to include `sf-radio-group-collection.min.js` in your index file and load the module in your application:

```
var myModule = angular.module('myModule', [
 ...
 'sfRadioGroupCollection',
]);
```

Usage
-----

The schema:

```
{
  "type": "object",
  "properties": {
    "option": {
      "type": "object",
      "format": "radioGroupCollection",
      "title": "Tell us about yourself",
      "values": {"yes": "Yes", "no": "No", "n/a": "N/A"},
      "items": [
        {
          "name": "Are you married?", "key": "are_you_married"
        },
        {
          "name": "Are you happy?", "key": "are_you_happy"
        },
        {
          "name": "Do you drink red wine?", "key": "do_you_drink_red_wine"
        },
        {
          "name": "Do you have a horse?", "key": "do_you_have_a_horse"
        }
      ]
    }
  }
}
```

The Definition:

```
{
  "type":"radioGroupCollection",
  "key":"option",
  "required": true
}
```

To provide the `radio-group-collection` possible values you need to provide them in the schema `values` section:

```
"values": {"yes": "Yes", "no": "No", "n/a": "N/A"}

```