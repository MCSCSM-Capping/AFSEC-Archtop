# Setting up Postgres on Ubuntu

This guide will walk you through the steps to set up **Postgres** on an Ubuntu system.

## Prerequisites

- **Ubuntu** (version 20.04 or later recommended)
- Internet access to fetch Postgres

## Step 1: Install PostgreSQL

```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
```

## Verify with
```bash
sudo systemctl status postgresql
```

## Switch to User Postgres
```bash
sudo su postgres
```

## Connect to PostgreSQL
```bash
psql
```

## Create the Database
```bash
CREATE DATABASE afsec;
```

## To List Databases
```bash
\l
```

## Connect to that database
```bash
\c afsec
```

## Create Tables as Needed

## To List Tables
```bash
\dt
```

## To Show Table Structure
```bash
\d <table_name>
```

## To Quit Postgres
```bash
\q
```