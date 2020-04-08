define({ "api": [
  {
    "type": "post",
    "url": "/login",
    "title": "Login user",
    "name": "LoginUser",
    "group": "User",
    "description": "<p>Login user in system.</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "http://localhost:2306/api/login",
        "type": "js"
      }
    ],
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n \"email\":  \"ivan@mail.com\",\n \"password\":  \"12345\",\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User email</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User password</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Request status</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>Created user.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "jwtToken",
            "description": "<p>Token.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"Successfuly login in system\",\n  \"user\": {\n      \"_id\": \"5e8cc742ada9582a7431ecf2\",\n         \"name\": \" Ivan\",\n         \"surname\": \"Driver1\",\n         \"phone\": \"80500307536\",\n         \"email\": \"driver1@gmail.com\",\n         \"driver\": true\n  },\n \"jwtToken\": \"yJhbGciOiJIUzI1NiJ9...\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ValidationError",
            "description": "<p>Bad request.body.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoUser",
            "description": "<p>No user in databse</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": " HTTP/1.1 400 Validation error\n{\n  status: \"Bad request\",\n  error: {Object},\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": " HTTP/1.1 404 NoUser error\n{\n  status: \"No such user or wrong passport\",\n  error: {object},\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/login.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/auth",
    "title": "Register new user",
    "name": "RegisterUser",
    "group": "User",
    "description": "<p>Register user request. In request choose status of user &quot;shipper&quot; or &quot;driver&quot;.</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "http://localhost:2306/api/auth",
        "type": "js"
      }
    ],
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n \"name\":  \"Ivan\",\n \"surname\":  \"Ivanov\",\n \"phone\":  \"80501234567\",\n \"email\":  \"ivan@mail.com\",\n \"password\":  \"123456\",\n \"driver\": true\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>User name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "surname",
            "description": "<p>User lastname</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "phone",
            "description": "<p>User phone from 10 numbers</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User email</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User password</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "shipper",
            "description": "<p>User status.</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "driver",
            "description": "<p>User status.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Request status</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>Created user.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "jwtToken",
            "description": "<p>Token.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"Driver have been created\",\n  \"user\": {\n     \"_id\": \"5e8cc7a0ada9582a7431e\",\n     \"name\": \"Ivan\",\n     \"surname\": \"Ivanov\",\n     \"phone\": \"80501234567\",\n     \"email\": \"ivan@mail.com\"\n  },\n \"jwtToken\": \"yJhbGciOiJIUzI1NiJ9...\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>Status of user <code>driver</code> or <code>shipper</code> are absent.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ValidationError",
            "description": "<p>Bad request.body.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "DatabaseErorr",
            "description": "<p>Error in mongo databse.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad request\n{\n   \"status\": \"Bad request\",\n   \"error\": \"Choose registration driver or shipper\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": " HTTP/1.1 400 Validation error\n{\n  status: \"Driver have not been created\",\n  error: {object},\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": " HTTP/1.1 404 Database error\n{\n  status: \"Driver have not been created\",\n  error: {object},\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/registartion.js",
    "groupTitle": "User"
  }
] });
