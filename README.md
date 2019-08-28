
# nawikurdi.com

source files

* UI contains react project and source code

* API contains express.js app

  

## API documentation

public API link is `api.nawikurdi.com` routes

### GET routes
`/` main route will accept these query parameters

|Parameter name  | description |
|--|--|
| **limit** | limit is positive integer greater than 0 and its `required` the api will throw 422 error code if it wasn't provided or have an invalid value this indicates how many records to fetch |
| **offset** | an integer greater than -1 which indicates where to start fetching from dataset |
| **q** | an optional parameter if it exists  the length of this search parameter should be between 1->255 it will search names similar to this search query  |
| **gender** | an optional parameter if it exists  it should take one of these values `[O,F,M]`  |
Note: `q`,`gender` parameters are optional and additive if you add them they will effect the result set together, `limit`,`offset` are relative to final dataset after applying wanted filter parameters

------------------------
`/records`  will fetch total number of active names in the dataset no params required

### POST routes
`/` if you want to submit a new name to our dataset make a post request to main route you should provide some parameters in body of the post request

|Parameter name  | description |
|--|--|
| **name** | name to be submited |
| **desc** | a description of the name |
| **gender** |it should take one of these values `[O,F,M]` `O` indicates that this name is for both genders  |



