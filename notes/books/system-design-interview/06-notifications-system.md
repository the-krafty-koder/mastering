# Notifications

- Should support IOS and Android push notifications, SMS message and email.

# Contact info gathering flow

    User sign up -> Load balancer -> API servers -> DB

# Notification sending/receiving flow

                                                                    click tracking
                                                Analytics service <----------------
                                                          >                        |
                                                          |                        |
    Service ----> Notification ----> Message Q ------- Workers -->3rd party ----> IOS
                    servers                               |         service
                       |                                  |
                       |                 Notification <---  --> Notification log
                       |                    template
                    Cache
                       |
                       |
        DB (user info, device info, notification settings)



    1. Notification servers - provide APIs that services use to send notifications
                            - validate emails and phone_numbers
                            - query database/cache to fetch data needed to render notification
                            - push notification data to message queues for parallel processing.
                            - authentication and rate limiting functionality.

    2. Cache - user info, device info, notification templates are cached.
    3. Message queues - serve as buffers when high volumes of notifications are sent out. Each notification type has a distinct message queue.
    4. Workers - pull notification events and send them to corresponding 3rd party services.
    5. 3rd party service -> deliver notification to users, eg Twilio, Sendgrid etc.

# Deep Dive

1. Reliability

- To prevent data loss, persist notification data in a database at the workers stage and implement a retry mechanism.

2. Notification templates

- Introduce notification templates to avoid recreating each notification from scratch.

3. Notification setting

- Before each notification is sent, first check if a user is opted in on the notification setting table.

4. Rate limiting

- Rate limit the number of notifications a user can receive.

5. Retry mechanism

- When a 3rd party service fails to send a notification, it will be added to a message queue for retrying.If problem persists an alert will be sent out to developers.

6. Events tracking

- Analytics service is required to track open rates, click rate and engagement.
