# Microservices

An approach to developing a single application as a suite of small services, each running its own processes and communicating using lightweight mechanisms, typically HTTP resource APIs

# Monolithic

An application built as a single unit. Any changes involve building and deploying a new version of the application

# Xtics of microservices

1. Componentization via services
   component - a unit of software that is independently upgradable and replaceable. The software is broken down into components called services(eg authentication, order processing, email sending etc). Main advantage is that any change to a service requires only that service to be redeployed.

2. Organized around business features
   Software is organized to reflect business lines (products), eg for Amazon - aws team, ecommerce team, kindle team etc

3. Products not projects
   Enforces that teams own products for the duration of that product life time

4. Communication mechanisms
   Microservices communication methods only serves as a routing layer and dont use complex protocols. Methods commonly used are HTTP request-response and message queues

5. Tool variety
   Different services can be built using different technology because the services are decoupled.

6. Infrastructure automation
   Continuous integration and continuous deployment (CI/CD) pipelines are considered the foundation of any microservices architecture. Automated testing and deployment through these methodologies ensure quick and reliable releases

7. Decentralized data management
   Each service manages its own database, either an instance of the same database technology or different database altogether ( Polyglot persistence )

8. Scalability
   Each service can be seperately scaled to meet demand

# Advantages of microservice architecture

1. Microservices are self contained - they can be debugged and deployed independently.
2. Scaling is easier since it is done horizontally per each service. ( Each service can be scaled independently)
3. More adaptable as the number of microservices needed to develop a system varies depending on business requirements.
4. It is expendable, crashes on a single service do not affect the entire application.

# Challenges of microservice architecture

1. Managing multiple independent service is complex. It requires robust orchestration and monitoring tools.
2. Communication overhead - poor communication choices can lead to latency. Communication APIs need to be efficient and optimized.
3. Data management - decentralization of data management often leads to synchronization problems
4. Security - each service would have to be secured independently, and the APIS secured as well.

# Advantages of monolithic application.

1. Easier to develop and deploy - all components of a monolith are centralized, they may be relatively simple to build and deploy, resulting in a shorter time to market
2. Easier to test since they have a single code source to manage
3. Fewer skills required from the development team to manage. No need for dedicated talent.
4. Singular security management - using a monolith guarantees security is maintained at one spot.

# Disadvantages of monolithic applications.

1. Monolithic codebase may become expensive to maintain as the codebase grows.
2. Difficulty implementing changes as it requires the whole system to be rebuilt and redeployed.
3. Difficult to scale - you cant scale individual part because everything is tightly coupled.

# When to use microservices

1. Organizational topology - when the teams have grown and it is necessary to split a system to represent that structure.
2. Seperate deployment - when you need to seperate deployment of various services depending on requirements.

# Integration patterns for microservices

1. Use an API proxy - provides a single access point for multiple API endpoints
2. Use API orchestration - an abstraction that connects different micro services to implement new services particular that fits the needs of an application. Example , a frontend combining checkout, cart and product microservice to implement a customer buying a product. Alternatively, the orchestration layer could be used to collect data from various microservice and aggregate it into one response. Orchestration itself could form another layer of the app by living in its own dedicated microservice instead of inside the frontend.
3. Using a message broker - effective as it decouples senders and receivers of messages, allowing a centralized Pub-Sub system.
