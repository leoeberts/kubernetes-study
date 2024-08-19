const diagramCode = `graph TB
    subgraph "External Access"
        U[User/Browser<br/>:30080]
    end
    
    subgraph "Kubernetes Cluster"
        subgraph "Frontend Layer"
            WS[Web Service<br/>Type: NodePort<br/>Port: 30080]
            WP[Web Pod<br/>nginx proxy]
        end
        
        subgraph "Backend Layer"
            AS[API Service<br/>Type: ClusterIP<br/>Port: 80]
            AP[API Pod<br/>echo server]
        end
    end
    
    U -->|HTTP :30080| WS
    WS -.->|load balances| WP
    WP -->|proxy_pass| AS
    AS -.->|internal routing| AP
    
    style U fill:#fff3e0
    style WS fill:#e8f5e8
    style WP fill:#e1f5fe
    style AS fill:#e8f5e8
    style AP fill:#e1f5fe`;