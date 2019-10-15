# Playing around with Kafka.js

This example demonstrates how we can setup [Kafka.js](https://kafka.js.org/) with `Node.js`. We have bootstrapped [Winston logger](https://github.com/winstonjs/winston#readme) with `Kafka.js` and of-course a small example demonstrating the communication between `producer` and `consumer`.

## Kafka.js

`Kafka.js` is a `Node.js` client for `Kafka`. To implement a distributed system the most important component is the messaging system. How do you establish communication between end systems? or let's say how to establish communication between multiple nodes?

This is just one aspect but there are various real world examples where `Kafka` can be used, just to name a few :

- `Event Sourcing`
- `Message Broker`
- `Operation Monitoring`
- `Data Pipelines`
- `Website Application Monitoring`
- `Metrics`
- `Log Aggregation`
- `Stream Processing`

## Kafka Components

### Producer

The `Producer API` allows an application to publish a stream of records to one or more Kafka topics.

### Consumer

The `Consumer API` allows an application to subscribe to one or more topics and process the stream of records produced to them.

### Streams

The `Streams API` allows an application to act as a stream processor, consuming an input stream from one or more topics and producing an output stream to one or more output topics, effectively transforming the input streams to output streams.

### Connector

The `Connector API` allows building and running reusable producers or consumers that connect Kafka topics to existing applications or data systems. For example, a connector to a relational database might capture every change to a table.

### Topics

A `topic` is a category or feed name to which records are published. Topics in Kafka are always multi-subscriber; that is, a topic can have zero, one, or many consumers that subscribe to the data written to it.

## A Simple Example

We have implemented a simple counter example where we have one `broker`, one `producer` and one `consumer`. The `producer` is generating a `message` which has a `counter` variable. Initially, the `counter` is set to `0`. The `producer` is running in every 3 seconds, everytime the `producer` is executed it will increment the `counter` by 1.

The `consumer` is subscribed to the topic on which the `producer` is generating messages. The `consumer` simply picks
up the message and logs the output. In the output you can notice the `value` field, it keeps incrementing.

#### How to start the server

1. `yarn install` : To install all dependencies.

2. `yarn run docker-up` : To spin up docker containers for `Zookeeper` and `Kafka`.

3. To set the `HOST_IP` variable (required):

   ```shell
   export HOST_IP=$(ifconfig | grep -E "([0-9]{1,3}\.){3}[0-9]{1,3}" | grep -v 127.0.0.1 | awk '{ print $2 }' | cut -f2 -d: | head -n1)
   ```

   To understand why `HOST_IP` is required, check out https://github.com/wurstmeister/kafka-docker/wiki/Connectivity

4. `yarn start` : To start the server.
