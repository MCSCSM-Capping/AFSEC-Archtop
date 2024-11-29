# How to fix Postgres to allow scripts to import data into DB

## Switch to user postgres and open postgresql

```bash
sudo su postgres
psql
```

## Set user postgres's password
```bash
ALTER USER postgres PASSWORD 'capping2024';
```

## Quit out of Postgres
```bash
\q
```

## Switch back to root or superuser and modify the config file
```bash
sudo nano /etc/postgresql/<version>/main/pg_hba.conf
```

## Adjust the part that looks like this
```bash
local   all   postgres   peer
```

## To This
```bash
local   all   postgres   md5
```

## Save and reload 
```bash
sudo systemctl restart postgresql
sudo systemctl daemon-reload
```