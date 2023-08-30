# Simple RestAPI using GO Gin Framework

simple RestAPI with Go, Gin, Gorm, and MySQL

## Requirements

Simple RestAPI is currently extended with the following requirements.  
Instructions on how to use them in your own application are linked below.

| Requirement | Version |
| ----------- | ------- |
| Go          | 1.18.4  |
| Mysql       | 8.0.30  |

## Installation

Make sure the requirements above already install on your system.  
Clone the project to your directory and install the dependencies.

```bash
$ git clone https://github.com/wisnuuakbr/simple-rest-api-go
$ cd simple-rest-api-go
$ go mod tidy
```

## Configuration

Change the config on Config/Database.go for your dbconfig

```bash
Host:     "localhost",
Port:     3306,
User:     "root",
Password: "",
DBName:   "guitar_store",
```

## Running Server

```bash
$ go run main.go
```

## Endpoints

These are the endpoints we will use to create, update, read and delete the guitar data.

```bash
GET guitar-store/guitar → Retrieves all the guitar data
POST guitar-store/guitar → Add new guitar data
PUT guitar-store/guitar/{id} → Update the guitar data
DELETE guitar-store/guitar/{id} → Delete the guitar data
```
