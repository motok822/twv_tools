# syntax=docker/dockerfile:1

FROM golang:1.20.3-alpine3.17

WORKDIR /
COPY ./ ./
WORKDIR /cmd/Mainapp
EXPOSE 443
RUN go mod download
RUN go build -o main
CMD ["/cmd/Mainapp/main"]
