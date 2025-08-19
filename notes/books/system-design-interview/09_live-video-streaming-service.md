# Live video streaming service

- Used in platforms like Twitch when users go live.

# High level design

              -----------------------------------------------------
    Video -> | Ingest -> Compression -> Segmentation -> Streaming  | --> CDN
    capture  | server    & encoding                      server    |      |
              ----------------------------------------------------        |
                    |                                                     |
                    |                                                     |
                Video storage service                                 Decoding
                                                                          |
                                                                User video player

1. Components

Ingest
Broadcasters send video to the Ingest Server using protocols like RTMP, SRT, or WebRTC. Real time messaging protocol (RMTP) is best because it is supported by most broadcasters.
The ingest cluster should be distributed geographically to minimize latency for streamers.

Transcoding / Encoding
Raw video is transcoded into multiple bitrates and resolutions (adaptive bitrate streaming).

Segmenting / Packaging
Encoded streams are split into small chunks (2–6s) using HLS (HTTP Live Streaming) or MPEG-DASH.

Streaming Origin Server
Acts as the source for CDNs.
Needs to handle cache misses, scaling, and failover.

CDN Edge Distribution
Global CDN caches segments near viewers.
Reduces latency, improves availability.

Video Storage
Streams can be persisted in object storage (S3, GCS, etc.) for VOD (Video on Demand).
Extra processing: generate thumbnails, metadata, highlight clips.

2. Typical flow

- Raw video data is captured and sent to server.
- Video data is encoded and compressed
- The encoded data is divided into segments so that it is easier to transmit.
- Segmented data is sent to the streaming service
- Live streaming data is pushed to edge servers supported by CDNs.
- Viewers devices decode and compress the video data and play in the video player.
- If the video needs to be stored for replay, the encoded data is sent to storage server.

# Deep dive

1. Data model

Stream data
{
"stream_id": "uuid",
"owner_user_id": "uuid",
"status": "live|offline",
"ingest_endpoint": "rtmp://ingest.example.com/abcd",
"playback_manifest_url": "https://cdn.example.com/live/stream_id/master.m3u8",
"latency_mode": "standard|low|interactive",
"started_at": "timestamp",
"title": "string",
"tags": ["tag1", "tag2"],
"region": "us-east-1"
}

2. APIs (sample)

POST /streams — create stream/session (issues ingest token).
POST /streams/{id}/start — mark stream live.
POST /streams/{id}/stop — stop & finalize VOD.
GET /streams/{id}/manifest — returns CDN manifest URL (or redirect).
GET /streams/{id}/status — current viewers, bitrate, health.

3. Component deep dive

Transcoding

- Stateless workers that consume from a job queue (e.g., Kafka, Google Pub/Sub).- Autoscale worker pool (CPU-only for lower res, GPU for high-res realtime).

Segmenter

- Uses the HTTP Live stream protocol to segment the stream into chunks.
- Performs encryption as well.
