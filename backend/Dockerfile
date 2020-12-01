# Base golang
FROM golang:1.15 as build

# I own this >:D
LABEL maintainer="Brett Broadhurst <brettbroadhurst@gmail.com>"

# Enable Go Modules
ENV GO111MODULE=on

# Install needed packages
RUN apt update && apt install -y ca-certificates

# Create build directory
RUN mkdir -p /go/src/github.com/brettbroadhurst/script-generator/backend
WORKDIR /go/src/github.com/brettbroadhurst/script-generator/backend 

# Copy files
COPY go.mod go.sum main.go ./
ADD data data

# Download all dependancies
RUN go mod download
RUN CGO_ENABLED=0 go build -o app

FROM alpine:latest as deploy
WORKDIR /app

COPY --from=build /go/src/github.com/brettbroadhurst/script-generator/backend .

# Run the app
CMD ["/app/app"]
