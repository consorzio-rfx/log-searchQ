#migrate:
#	# bee migrate -driver=postgres -conn="user=migo password=migo dbname=migo sslmode=disable host=localhost port=5432"

build:
	go build main.go

run:
	go run main.go
