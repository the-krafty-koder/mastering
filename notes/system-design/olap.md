# OLAP

- A category of systems optimized for analyzing large volumes of data (historical) rather than processing day to day transactions (OLTP).
- Lets users explore data interactively, slice, dice drill-down.
- Contrasts with OLTP(Online transactions processing) which handles frequent updates/inserts for apps.

# Xtics

- Ready heavy workloads, light on writes
- Stores data in a denormalized multidimensional format.
- Supports complex aggregations across dimensions.
- Often uses columnar storage.

# Types of OLAP

1. Relational - ROLAP -> servers are placed between relational backend server nad client frontend. Uses relational DBMS.
2. Multidimensional OLAP -> uses array based multidimensional storage engines for multidimensional storage of data.
3. Hybrid OLAP -> combination of both OLAP and ROLAP

# Supported operations

1. Rollup - performs aggregation on a data cube by climbing up a dimension or dimension reduction.
2. Drill-down - the reverse of rollup.
3. Slice - selects 1 dimension from a given cube and provides a new subcube from a given cube.
4. Dice - selects 2 or more dimensions from a given cube and provides a new subcube.
5. Pivot - rotates the data axes in order to provide an alternative presentation of the data.

# Examples

1. Cloud warehouses - snowflake, BigQUery, redshift, Azure Synapse.
2. Open source engines -> Apache Druid (best for real-time + historical analytics), Clickhouse, Apache Pinot ( best for low query latency real time processing).

# Typical flow for real time analytics.

1. Event streaming - Apache Kafka
2. Stream processing - aggregation, transform, filter data on the fly -> Apache Flink, Apache Spark Streams
3. Analytics/Storage -> where data is stored for queries -> Apache Druid, Apache Pinot, Clickhouse.
4. Visualization/Alerting -> Grafana, Metabase.

# Four Golden Signals of Monitoring

Google’s Site Reliability Engineering handbook lists four signals that you should monitor

Latency - the time it takes for your system to process a request. You can measure this with median latency, percentiles (P90, P99), average latency etc.

Traffic - The amount of requests your system is receiving. This is typically measured in requests per minute or requests per second.

Errors - the number of requests that are failing. In any system at scale, you’ll always be seeing some amount of errors so you’ll have to figure out a proper threshold that indicates something is truly wrong with the system without constantly triggering false alarms.

Saturation - How much load the system is under relative to it’s total capacity. This could be measured by CPU/memory usage, bandwidth, etc.
