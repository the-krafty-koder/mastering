# Designing Youtube

## High level design

                          Client
                            |
                   video    |   everything else
        CDN  --------------- -------------- API Servers

CDN - videos are stored in CDN. Streaming video is from the CDN.
API Servers - user signup, feed recommendation, video metadata

# Video uploading flow

            Original <----------------------------User
            storage                                |
                |                                  |
                |                             Load balancer
                |                                  |
                |                               API Servers
                |                                  |
                |                       Metadata--- ----Metadata DB
                |                          cache            |
                |                           |<--------------<-------
                |                                                  |
                |                                                  |
        Transcoding service --------->Completion queue------->Completion handler
                |
                |
            Transcoded storage -----> CDN

1. Videos are uploaded to original storage.
2. Transcoding servers fetch video and start transcoding
3. When transcoding is complete:
   1. videos are sent to transcoded storage.
   2. transcoding completion events are queued in the completion queue.
4. API servers inform client that video is ready for streaming.
5. While file is being uploaded to original storage, client in parallel sends a request to update video metadata via API Servers.

# Video download flow

                Client
                   |
                   |  (obtain URLS from API servers and stream from CDN)
                   >
                  CDN

# System improvements

1. Speed optimization -> parallel video uploading. Split a video into smaller chunks by GOP alignment. The job of spitting can be implemented by a client to fasten upload speeds.
2. Speed optimization -> place upload centres close to users.Use CDNs as upload centres.
3. Speed optimization: loose coupling and high parallelism -> introduce message queues to decouple components and create parallelism, eg an MQ between the download module and the encoding module.
4. Safety optimization: presigned url -> . The client makes a HTTP request to API servers to fetch the pre-signed URL, which gives the access permission to the object identified in the URL. API servers respond with a pre-signed URL.Once the client receives the response, it uploads the video using the pre-signed URL.
5. Safety optimization -> to protect copyright videos, you can introduce Digital Rights Managament (DRM), Visual watermarking.
6. Cost optimizations - only serve popular content from CDN, others from high capacity servers. Dont distribute videos to regions where they are not popular.For less popular content, dont store many encoded versions.

# Error handling

Upload error - retry
Video splitting error - send whole video to server and split it server side
Transcoding error - retry
API server down - send request to replicated servers
Metadata DB server down - upgrade slave to master/ read from other slaves.
