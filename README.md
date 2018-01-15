# easy-lunch

Tool to select where to have lunch today in Berlin

## Usage

1. Open `index.html` in your browser
2. Open the dev console to see where to eat today

To modify the program, you need to update the list of restaurants and people inside `index.js`

## JSON Schema proposal

### Restaurant

```json
{
  "title": "Restaurant",
  "type": "object",
  "properties": {
    "id": {
      "type": "number"
    },
    "name": {
      "type": "string"
    },
    "cuisine": {
      "type": "array",
      "minItems": 1,
      "items": {
        "type": "string"
      }
    }
  }
}
```

### People

```json
{
  "title": "People",
  "type": "object",
  "properties": {
    "name": {
      "type": "string"
    },
    "favCuisine": {
      "type": "array",
      "minItems": 1,
      "items": {
        "type": "string"
      }
    },
    "restaurants": {
      "type": "array",
      "minItems": 1,
      "items": {
        "type": "object",
        "properties": {
          "id": {
            "type": "number"
          },
          "score": {
            "type": "number",
            "min": -3,
            "max": 3,
            "description": "Steps from -3 -1 0 1 3"
          }
        }
      },
      "uniqueItems": true
    },
    "lunchThisWeek": {
      "type": "array",
      "minItems": 1,
      "items": {
        "type": "object",
        "properties": {
          "id": {
            "type": "number"
          }
        }
      }
    }
  }
}
```
