# FROM ubuntu:20.04

# # Install Go
# RUN apt-get update && apt-get upgrade -y && \
#     apt-get install software-properties-common -y

# RUN add-apt-repository ppa:longsleep/golang-backports && \
#     apt-get update && \
#     apt-get install golang-go git ca-certificates -y

# ENV GO111MODULE=on

# # show Go version
# ENV PATH=$PATH:/root/go/bin
# RUN go version

# # Set the current working directory
# WORKDIR /root/app

# # Copy go mod and sum files to the workspace
# COPY ./backend/go.mod .
# COPY ./backend/go.sum .

# # Download all dependencies
# RUN go mod download

# # Copy the source code into the container
# COPY ./backend ./

# RUN go build -o ./bin/main ./cmd/main.go

# # Expose port 8080 for the application
# EXPOSE 8080

# CMD ["/root/app/bin/main"]


# Start from the latest golang base image
FROM golang:1.21 as builder

# Set the Current Working Directory inside the container
WORKDIR /app

# Copy go mod and sum files
COPY ./backend/go.mod ./backend/go.sum ./

# Download all dependencies
RUN go mod download

# Copy the source code into the container
COPY ./backend .

# Build the Go app
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o main ./cmd/main.go

# Start a new stage from scratch
FROM alpine:latest

RUN apk --no-cache add ca-certificates

WORKDIR /root/

# Copy the Pre-built binary file from the previous stage
COPY --from=builder /app/main .
COPY --from=builder /app/ .

# Expose port 8080 to the outside world
EXPOSE 8080

# Command to run the executable
CMD ["./main"]
