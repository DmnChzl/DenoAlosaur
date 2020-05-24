# Deno x Alosaur 🦕🦖

**[Deno](https://deno.land)** (Land) REST API Made With ([Alosaur](https://github.com/alosaur/alosaur))

## Process

Run

```
deno run --allow-env --allow-read --allow-write --allow-net --allow-plugin --config tsconfig.lib.json --unstable app.ts
```

### Note(s)

`.env`

```
DENO_ENV=prod
DENO_HOST=localhost
DENO_PORT=8080
DB_NAME=deno_land
DB_HOST=localhost
DB_PORT=27017
SECRET=HelloWorld
```

Mongo**DB**

```
mkdir DataBase
mongo --dbpath DataBase
```

## License

```
"THE BEER-WARE LICENSE" (Revision 42):
<phk@FreeBSD.ORG> wrote this file. As long as you retain this notice you
can do whatever you want with this stuff. If we meet some day, and you think
this stuff is worth it, you can buy me a beer in return. Damien Chazoule
```
