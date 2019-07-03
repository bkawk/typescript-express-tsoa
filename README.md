# typescript-express  
An API Starting point in Typescript & Express connecting to MongoDB. Self Generates Swagger document that can then be converted into an SDK in many languages.  

## Installation  
```
git clone https://github.com/bkawk/typeScript-express
npm install
mv .env.example .env 
```  

## Usage  

```
npm run build
npm run watch
```  

Swagger docs will be served to [http://127.0.0.1:8888/docs](http://127.0.0.1:8888/docs)

API Example Endpoints are accessable at [http://127.0.0.1:8888/user/register](http://127.0.0.1:8888/user/register)

WebSocket test at [http://127.0.0.1:8888/socket](http://127.0.0.1:8888/socket)

Modify example endpoints at ```/src/controllers/register``` and your routes file will be automatically updated when you run the server again via 
```
npm run watch
```.  

## SDK Languages
aspnetcore, csharp, csharp-dotnet2, dynamic-html, html, html2, java, jaxrs-cxf-client, jaxrs-cxf, inflector, jaxrs-cxf-cdi, jaxrs-spec, jaxrs-jersey, jaxrs-di, jaxrs-resteasy-eap, jaxrs-resteasy, spring, nodejs-server, openapi, openapi-yaml, kotlin-client, kotlin-server, php, python, python-flask, scala, scala-akka-http-server, swift3, swift4, typescript-angular

## Generate SDK
install [swagger-codegen](https://swagger.io/docs/open-source-tools/swagger-codegen/)
```
swagger-codegen generate -i swagger.json -l $language -o sdk/$language
```

## Contributing  
Join our Google [Hangout Chat](https://hangouts.google.com/group/bAFRQEwL4CFK47328)  


