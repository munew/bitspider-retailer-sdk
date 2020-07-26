# bitspider-retailer-sdk

A SDK for develop Retailer Service. Retailer service decide what task to excute and how to parse the receive data.

## Installation

This is a [Node.js](https://nodejs.org/en/) module and available through the [npmjs.com](https://npmjs.com).

> If you didn't install NodeJS before, please install [Node.js](https://nodejs.org/en/download/) before you continue. Node.js 10.x or higher is required.

Run following command to install:

```bash
npm install bitspider-retailer-sdk
```

## Getting Started

```JavaScript
const baseRetailerService = require("bitspider-retailer-sdk");

const triggerFun = async function(){
  return {
    tasks: [
      baseRetailerService.generateTask({
        url: "http://exampleblog.munew.io/"
      })]
  }
}
const parseFun = async function({req}){
  const data = req.body;
  // You can add your logic to parse and decide whether need to add additional tasks
  // For this example, I store get data to disk
  return {
    data: data
  }
}
// You must set `GLOBAL_ID` and `MUNEW_BASE_URL`
baseRetailerService.setConfigs({
  GLOBAL_ID: "c29pOjoxNTkyNzk1NTI1NjAzOjpmZmFkNTI4Zi02NzYyLTRlNmQtOGQyYS05Njk1NzM0YjhkM2Q=",
  MUNEW_BASE_URL: "http://localhost:9099",
});
baseRetailerService.init();
baseRetailerService.trigger(triggerFun);
baseRetailerService.parse(parseFun);
baseRetailerService.express();
baseRetailerService.routers();
await baseRetailerService.listen();
```

## APIs

Please download [API Doc](https://github.com/munew/bitspider-retailer-sdk/release/latest/apidoc.zip), and open it in your browser

> Will host to a server in future

## Schemas

### Task

```json
{
  "type": "object",
  "required": ["url", "soi"],
  "properties": {
    "url": {
      "type": "string",
      "description": "web page url that need to be processed"
    },
    "soi": {
      "type": "object",
      "required": ["globalId"],
      "additionalProperties": false,
      "properties": {
        "globalId": {
          "type": "string",
          "description": "The **global id** of your Retailer Service"
        }
      }
    },
    "priority": {
      "type": "integer",
      "minimum": 1,
      "default": 100,
      "description": "Priority of this task. Only compare priority for same Retailer Service, doesn't compare cross Retailer Service. Bigger value low priority. Priority value 1 is higher than priority value 2."
    },
    "suitableAgents": {
      "type": "array",
      "description": "What kind of agents can execute this task",
      "default": ["HEADLESSBROWSER"],
      "items": {
        "type": "string",
        "enum": ["HEADLESSBROWSER", "SERVICE"]
      },
      "minItems": 1,
      "uniqueItems": true
    },
    "metadata": {
      "type": "object",
      "additionalProperties": true,
      "description": "Additional metadata for this task",
      "properties": {
        "script": {
          "type": "string",
          "description": "Code want to execute after **window.onload**. If you need agent to execute your code, Only work with **HEADLESSBROSWER** agent"
        }
      }
    }
  }
}
```

### TriggerFunReturn

```json
{
  "type": "object",
  "additionalProperties": false,
  "properties": {
    "tasks": {
      "type": "array",
      "description": "`tasks`: Send `tasks` to **Munew** application",
      "items": {
        "$ref": "#schema/task"
      }
    }
  }
}
```

### ParseFunReturn

```json
{
  "type": "object",
  "additionalProperties": false,
  "required": [],
  "properties": {
    "tasks": {
      "type": "array",
      "description": "Send `tasks` to **Munew** application",
      "items": {
        "$ref": "#schema/task"
      }
    },
    "key": {
      "type": "string",
      "description": "Key value for the data you want to save. Default is `data`."
    },
    "data": {
      "type": ["integer", "string", "object", "array"],
      "description": "Data need to save. It will be appended to the `key`. If `data` is empty or `undefined` or `null`, then nothing will be saved. `data` will be saved to `DATA_PATH`"
    },
    "response": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "status": {
          "type": "number",
          "default": 200,
          "description": "HTTP Status. Any value big than 300 will be considered of fail"
        },
        "data": {
          "type": ["integer", "string", "object", "array"],
          "description": "Data want to send back. Only use when you want to return an error, and you can add the reason of error, it is useful for troubleshoot"
        }
      }
    }
  }
}
```
