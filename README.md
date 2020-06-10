# Deno x Alosaur 🦕🦖

I made **REST** APIs based on my own discography (and my musical tastes), with this technologies:

- **Deno**: A Secure Runtime For JavaScript And TypeScript
  - [http://deno.land/](http://deno.land/)

- **Alosaur**: Deno Web Framework With Many Decorators
  - [https://github.com/alosaur/](https://github.com/alosaur/alosaur/)

## Process

Clone the project:

```
git clone https://github.com/MrDoomy/DenoAlosaur.git
```

Run the project:

```
deno run --allow-env --allow-read --allow-write --allow-net --allow-plugin --config tsconfig.lib.json --unstable app.ts
```

### Note(s)

_This application depends on a NoSQL database. Install MongoDB and run the following commands in a new terminal before launching the project:_

```
mkdir DataBase
mongo --dbpath DataBase
```

_This application supports the `.env` file. Please, create it and override the following properties before launching the project:_

```
DENO_ENV=prod
DENO_HOST=localhost
DENO_PORT=8080
DB_NAME=deno_land
DB_HOST=localhost
DB_PORT=27017
SECRET=HelloWorld
```

## License

```
"THE BEER-WARE LICENSE" (Revision 42):
<phk@FreeBSD.ORG> wrote this file. As long as you retain this notice you
can do whatever you want with this stuff. If we meet some day, and you think
this stuff is worth it, you can buy me a beer in return. Damien Chazoule
```
