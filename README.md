# baseplate-core

A tool for helping build prototypes and pattern libraries.

The core server heavily borrows from [component-styleguide](https://github.com/webpro/component-styleguide) but is possible simpler in approach as this project tries to keep the amount of client-side structure it imposes to an absolute minumum. Although as a result it does assume a bit more of a directory structure. It's probably very specific to my use-case so you probably want to look at component-styleguide first.

## Details

### Templating

[Handlebars](http://handlebarsjs.com) is used as the template engine.

### Helpers

Handlebars is a logicless templating engine so you need helpers to do anyting interesting in tehm. A set of helpers are provided in the templates to make prototyping as simple as possible.

| Helper | Description
|---|---|---|
|`{{envIs 'production'}}`  | Check the current environment |
|`{{envIsNot 'production'}}` | Reverse of `envIs` check |
|`{{capitalize 'production'}}` | Capitalize a string |
|`{{getOrElse maybeValue "Default" }}`| Get a value if it exists otherwise return a default |
|`{{#repeat count}}block{{/repeat}}`| Repeat a block `count` times |
|`{{#repeatRange min max}}block{{/repeatRange}}`| Repeat a block between `min` and `max` times |
|`{{couldBeTrue threshold}}`| Returns `true/false` based on `threshold`, e.g. `0.9` will return `true` 90% of the time. |
|`{{lorem count}}`| Lorem ipsum generator. Returns `count` sentences |
|`{{loremWords min max}}`| Lorem ipsum generator. Returns random words between `min` and `max` |
|`{{inlineFile 'path/to/file.ext'}}`| Returns the contents of a file |

### Partials

Everything under `components/patterns` is automatically registered as a partial. For example `{{> objects/icon}}` will render `components/patterns/objects/icon.html`). This is powerful for making components comprised of other components.

### Usage notes

You can add markdown files in the `patterns/` directory and the contents will be displayed alongside the pattern. The file needs to be named the same as the pattern e.g., `patterns/base/text.md` alongside `patterns/base/text.html`.

### Stub data

All JSON files under `data/` are concatenated into one context for the templates. E.g. `users.json` containing `[]` and `profile.json` containing `{}` will result in the following data for the templates:

    {
       "users": [],
       "profile": {}
    }

Now, the `{{#users}}` collection can be iterated over in any template.

### Static assets

By default anything under `/static` will be exposed by the server under `/static` (this is configurable). This is just a static directory so you are responsible for loading them in your layout, but this means you have full control over how you manage your assets.

## Installation Steps

If you don't want to start with the example app, or just want to start from scratch you can follow these steps.

### 1. Install baseplate-core

```
npm init
npm install baseplate-core --save
```

### 2. Structure

Create a directory structure similar to this:

```
├── baseplate-config.json
├── components
│   ├── pages
│   │   └── example-page.html
│   └── patterns
│       ├── base
│       └── modules
├── data
├── server.js
├── static
│   ├── images
│   ├── javascripts
│   └── stylesheets
└── views
    └── layout.html
```

### 3. Layout

In order to display anything you need to add a `layout.html` file under `views/`.

Three snippets are required: `{{baseplateStyles}}` which returns a link to the pattern library styles and `{{baseplateScripts}}` which returns a link to the pattern library styles and `{{{body}}}` which renders the current view. Otherwise you are free to provide any html you like.

For example:

```
<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>My Project</title>
    <meta name="viewport" content="width=device-width,initial-scale=1">
    {{> baseplateStyles}}
    <link rel="stylesheet" href="/static/stylesheets/my-styles.css"/>
</head>
<body>
    {{{body}}}
    {{> baseplateScripts}}
    <script src="/static/javascripts/my-app.js" async></script>
</body>
</html>
```

**Custom partials**: You can provide custom partials under `views/partials` this is mostly useful if you want to break your layout template into smaller parts.


### 4. Start

Add a `server.js` using the following template.

```
var baseplate = require('baseplate-core');
var styleguide = require('./baseplate-styleguide.json');
var config = require('./baseplate-config.json');

baseplate(styleguide, config).then(function (server) {
    server.start();
});
```

And run it with: `npm start`. The example app uses `nodemon` instead so you may want to use that as well: `nodemon -e js,html -- server.js`

#### 5. Build Components

Baseplate (currently) assumes two directories: `patterns` and `pages`. Patterns should be organised into subdirectories, e.g. `patterns/base/ etc.`, and are rendered in a single view. Pages is a flat directory, e.g. `pages/example-page.html`, and are displayed as standalone views.

## API

```
baseplate(styleguide<Object>, [config<Object>]) // returns <Promise>
```

```
baseplate(styleguide).then(function (server) {
	/**
	 * server.app contains the Express app used internally
	 * Helpful if you want to add your own routes or modify the server
	 */
	server.app.get('/my-custom-route', function(req, res){
	  res.send('hello world');
	});

	/**
	 * Start the server
	 */
	 server.start();
});
```

## License

MIT
