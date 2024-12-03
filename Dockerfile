# Build Golang binary
FROM golang:1.20.2 AS build-golang

WORKDIR /home/andrea/Nextcloud/YFinGames/devel/andrea/rewsrv-gin

COPY . .
RUN go get -v && go build -v -o /usr/local/bin/rewsrv

EXPOSE 8080
CMD ["rewsrv"]

