const diagramCode = `graph TB
    subgraph "External Access"
        U[User/Browser<br/>:30088]
    end
    
    subgraph "Kubernetes Cluster"
        subgraph "Node"
            NP[NodePort: 30088<br/>Routes to Service]
            
            subgraph "Service Layer"
                S[Service<br/>Type: NodePort<br/>Port: 80<br/>TargetPort: 80]
            end
            
            subgraph "Pod"
                C[nginx Container<br/>Port 80]
            end
        end
    end
    
    U -->|HTTP :30088| NP
    NP -->|forwards to| S
    S -.->|load balances| C
    
    style U fill:#fff3e0
    style NP fill:#fff3e0
    style S fill:#e8f5e8
    style Pod fill:#e1f5fe
    style C fill:#e1f5fe`;