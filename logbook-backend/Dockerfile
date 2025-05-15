# Build Golang binary
FROM golang:1.23.1 AS build-golang

WORKDIR /logbook-backend

COPY . .
RUN go get -v && go build -v -o /usr/local/bin/logbook

EXPOSE 8080
CMD ["logbook"]

